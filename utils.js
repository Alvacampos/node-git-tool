import { Octokit } from "octokit";
import "dotenv/config";

const octokit = new Octokit({
  auth: process.env.OCTOKIT_TOKE,
});

const projectFilter = (list, input) =>
  list.filter((file) => file.name.match(input));

const requestHandler = (url, options) => {
  return octokit.request(url, options)
}
const displayData = (projectData, cardsData) => {
  process.stdout.write("Project:\n");

  projectData.forEach((project) => {
    process.stdout.write(
      `${project.name}, ${project.body}. ID: ${project.id}.\n`
    );
  });

  process.stdout.write("Tasks:\n");

  cardsData.forEach((card) => {
    process.stdout.write(
      ` \nTask: ${card.id}.
      \n${card.note}.`
    );
  });
};


const getProjectData = async (input) => {
  try {
    const projectData = await requestHandler("GET /orgs/moove-it/projects");

    const filteredProject = projectFilter(projectData.data, input);

    const fetchColumnCards = await requestHandler('GET /projects/columns/{column_id}/cards', {
      column_id: 2393577
    });

    displayData(filteredProject, fetchColumnCards.data);

  } catch (e) {
    console.log(e);
    process.exitCode = 0;
  }
};

const handShake = async () => {
  try {
    const {
      data: { login },
    } = await octokit.rest.users.getAuthenticated();

    console.log("Hello, %s", login);
  } catch (e) {
    console.log(e);

    process.exitCode = 0;
  }
};

export { getProjectData, handShake };
