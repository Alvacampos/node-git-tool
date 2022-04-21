import { Octokit } from "octokit";
import "dotenv/config";

const octokit = new Octokit({
  auth: process.env.OCTOKIT_TOKE,
});

const projectFilter = (list, input) =>
  list.filter((file) => file.name.match(input));

const displayProjects = async (projectData) => {
  process.stdout.write("Projects:\n");

  projectData.forEach((project) => {
    process.stdout.write(
      `${project.name}, ${project.body}. ID: ${project.id}.\n`
    );
  });
};

const displayTasks = async () => {
  try {
    const fetchProjectsData = await octokit.request(
      "GET /projects/{id}/columns’",
      {
        id: "1373142",
        mediaType: {
          previews: ["inertia"],
        },
      }
    );

    console.log(fetchProjectsData);
    // console.log(JSON.stringify(fetchData.data[0].owner));
  } catch (e) {
    console.log(e);
    process.exitCode = 0;
  }
};

const fetchProjectData = async (input) => {
  let fetchProjectsData;
  try {
    fetchProjectsData = await octokit.request(
      "GET /repos/{owner}/{repo}/projects",
      {
        owner: "Alvacampos",
        repo: "apprenticeship",
      }
    );
  } catch (e) {
    console.log(e);
    process.exitCode = 0;
  }

  displayProjects(projectFilter(fetchProjectsData.data, input));
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

export { displayTasks, fetchProjectData, handShake };
