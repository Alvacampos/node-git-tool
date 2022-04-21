import { handShake, fetchProjectData, displayTasks } from "./utils.js";

let input;
try {
  input = new RegExp(`${process.argv[2]}$`);
} catch (e) {
  console.log("Invalid Input", e);
  process.exitCode = 0;
}

(function getGitData() {
  handShake();
  process.stdout.write(`Sending request... searching for ${input}\n`);
  fetchProjectData(input);
  //displayTasks();
})();

process.exitCode = 0;

/*
curl \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/moove/apprenticeship

Get org info
const fetchData = await octokit.request('GET /orgs/{org}/projects', {
    org: 'moove-it',
  });

Get repo
const fetchData = await octokit.request('GET /repos/{owner}/{repo}', {
    owner: 'moove-it',
    repo: 'apprenticeship',
  });

Get projects from specific repo
  const fetchData = await octokit.request('GET /repos/{owner}/{repo}/projects', {
    owner: 'Alvacampos',
    repo: 'apprenticeship',
  });

   if (element) {
      try {
        const fetchProjectsData = await octokit.request('GET /repos/{owner}/{repo}/projects', {
          owner: 'Alvacampos',
          repo: 'apprenticeship',
        });
      } catch (e) {
        console.log(e);
        process.exitCode = 0;
      }
    }

*/
