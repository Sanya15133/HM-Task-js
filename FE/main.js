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

window.onload = () => {
  const results = getAllTasks();
  console.log(results);
};
