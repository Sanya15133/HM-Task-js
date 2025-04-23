async function getAllTasks() {
  const url = "http://localhost:3000/tasks";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const parseResponse = await response.json();
    console.log(parseResponse);
    return parseResponse;
  } catch (error) {
    console.error(error.message);
  }
}

// const taskForm = document.getElementsByTagName("form");

// taskForm.addEventListener("submit", (event) => {
//   event.preventDefault();
// });

window.onload = async () => {
  const results = await getAllTasks();
  const resultArray = results.tasks;
  console.log(resultArray, "array");
  const titleP = document.getElementById("title-p");
  const statusP = document.getElementById("status-p");
  const descriptionP = document.getElementById("description-p");
  const duedateP = document.getElementById("due-date-p");
  resultArray.forEach((result) => {
    titleP.innerHTML = result.title;
  });
};
