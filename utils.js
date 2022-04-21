import { Octokit } from "octokit";
import "dotenv/config";

const octokit = new Octokit({
  auth: process.env.OCTOKIT_TOKE,
});

const displayProjects = async (projectData) => {
  process.stdout.write("Projects:\n");

  projectData.data.forEach((project) => {
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

const fetchProjectData = async () => {
  let fetchProjectsData;
  try {
    fetchProjectsData = await octokit.request("GET /orgs/{owner}/projects", {
      owner: "moove-it",
    });
  } catch (e) {
    console.log(e);
    process.exitCode = 0;
  }
  console.log(fetchProjectsData);
  //displayProjects(fetchProjectsData);
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
