const getAllTasks = async () => {
  const url = "http://localhost:3000/tasks";
  try {
    const response = await fetch(url);
    if (!response) {
      throw new Error(`Response status: ${response.status}`);
    }
    const parseResponse = await response.json();
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
    return parseResponse;
  } catch (error) {
    console.error(error.message);
  }
};

const deleteTask = async (id) => {
  const url = `http://localhost:3000/tasks/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
};

const postTaskValues = async (title, description, status, duedate) => {
  const url = "http://localhost:3000/tasks";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        status,
        duedate,
      }),
    });
    if (!response) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
};

const updateStatus = async (id, status) => {
  const url = `http://localhost:3000/tasks/${id}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    if (!response) {
      throw new Error(`Response.status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
};

const taskForm = document.getElementById("input-form");

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const status = document.getElementById("status").value;
  const duedate = document.getElementById("duedate").value;

  if (title.length < 5) {
    console.log("title too short");
  }
  if (description.length < 5) {
    console.log("description too short");
  }
  if (status.length < 5) {
    console.log("status too short");
  }
  if (!duedate) {
    console.log("missing duedate");
  }
  postTaskValues(title, description, status, duedate);
});

const createEditButton = document.createElement("button");
const createDeleteButton = document.createElement("button");
const createMoreInfo = document.createElement("p");
let taskId = "";

window.onload = async () => {
  const results = await getAllTasks();
  const resultArray = results.tasks;
  const titleP = document.getElementById("title-p");
  const statusP = document.getElementById("status-p");
  resultArray.forEach((result) => {
    const getMoreInfoDiv = document.getElementById("more-info");
    taskId = result.id;
    titleP.innerHTML = result.title;
    statusP.innerHTML = result.status;
    createMoreInfo.innerHTML = "Click for more info";
    createMoreInfo.style.color = "blue";

    getMoreInfoDiv.appendChild(createMoreInfo);
    getMoreInfoDiv.addEventListener("click", async (event) => {
      event.preventDefault();
      const getById = await getTaskById(result.id);
      createMoreInfo.innerHTML = "";
      const descriptionP = document.getElementById("description-p");
      const duedateP = document.getElementById("due-date-p");
      descriptionP.innerHTML = result.description;
      duedateP.innerHTML = result.duedate;
      createEditButton.innerHTML = "Edit";
      createEditButton.id = "edit";
      const getButtonDiv = document.getElementById("button-div");
      getButtonDiv.appendChild(createEditButton);
      createDeleteButton.innerHTML = "Delete";
      createDeleteButton.id = "delete";
      getButtonDiv.appendChild(createDeleteButton);
    });
  });
  createEditButton.addEventListener("click", async (event) => {
    event.preventDefault();
    createEditButton.innerHTML = "Save";
    const editInputBox = document.createElement("input");
    statusP.appendChild(editInputBox);
    const newVal = editInputBox.value;
    createEditButton.addEventListener("click", async (event) => {
      event.preventDefault();
      statusP.innerHTML = newVal;
      updateStatus(taskId, newVal);
    });
  });
  createDeleteButton.addEventListener("click", async (event) => {
    event.preventDefault();
    deleteTask(taskId);
  });
};
