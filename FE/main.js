const getAllTasks = async () => {
  const url = "http://localhost:3000/tasks";
  try {
    const response = await fetch(url);
    if (!response) {
      throw new Error(`Response status: ${response.status}`);
    }
    const parseResponse = await response.json();
    console.log(parseResponse);
    return parseResponse;
  } catch (error) {
    console.error(error.message);
  }
};

const getTaskById = async (id) => {
  const url = `http://localhost:3000/tasks/${id}`;
  try {
    const response = await fetch(url);
    if (!response) {
      throw new Error(`Response status: ${response.status}`);
    }
    const parseResponse = await response.json();
    console.log(parseResponse);
    return parseResponse;
  } catch (error) {
    console.error(error.message);
  }
};

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
  // const descriptionP = document.getElementById("description-p");
  // const duedateP = document.getElementById("due-date-p");
  resultArray.forEach((result) => {
    const getMoreInfoDiv = document.getElementById("more-info");
    titleP.innerHTML = result.title;
    statusP.innerHTML = result.status;
    // descriptionP.innerHTML = result.description;
    // duedateP.innerHTML = result.duedate;
    // const createEditButton = document.createElement("button");
    const createMoreInfo = document.createElement("p");
    createMoreInfo.innerHTML = "Click for more info";
    createMoreInfo.style.color = "blue";
    // createEditButton.innerHTML = "Edit";
    // createEditButton.id = "edit";
    // getButtonDiv.appendChild(createEditButton);
    // const createDeleteButton = document.createElement("button");
    // createDeleteButton.innerHTML = "Delete";
    // createDeleteButton.id = "delete";
    // getButtonDiv.appendChild(createDeleteButton);
    getMoreInfoDiv.appendChild(createMoreInfo);
    getMoreInfoDiv.addEventListener("click", async (event) => {
      event.preventDefault();
      const getById = await getTaskById(result.id);
      console.log(getById);
    });
  });
};
