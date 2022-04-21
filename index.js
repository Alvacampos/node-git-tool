import { handShake, fetchProjectData, displayTasks } from "./utils.js";

process.stdout.write("Sending request\n");

(function getGitData() {
  //handShake();
  fetchProjectData();
  displayTasks();
})();

process.exitCode = 0;
