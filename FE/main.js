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
  console.log(status, "status");
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
  await postTaskValues(title, description, status, duedate);
});

let isEditing = false;

const displayTasks = async () => {
  const results = await getAllTasks();
  const taskArray = results.tasks;
  const displayDiv = document.getElementById("fetched-task");
  taskArray.forEach((task) => {
    let taskTitle = document.createElement("p");
    let descriptionP = document.createElement("p");
    const taskDiv = document.createElement("div");
    const moreInfoP = document.createElement("p");
    moreInfoP.innerHTML = "Click for more info";
    moreInfoP.style.color = "blue";
    taskTitle.innerHTML = `${task.title}`;
    descriptionP.innerHTML = `${task.description}`;
    taskDiv.append(taskTitle);
    taskDiv.append(descriptionP);
    taskDiv.append(moreInfoP);
    taskDiv.className = "t-div";
    displayDiv.append(taskDiv);
    moreInfoP.addEventListener("click", async (event) => {
      event.preventDefault();
      const getTask = await getTaskById(task.id);
      const individualTask = getTask.task[0];
      displayDiv.innerHTML = "";
      let taskTitle = document.createElement("p");
      let descriptionP = document.createElement("p");
      const taskDiv2 = document.createElement("div");
      taskDiv2.className = "t-div";
      let statusP = document.createElement("p");
      statusP.id = "status";
      let dateP = document.createElement("p");
      taskTitle.innerHTML = individualTask.title;
      descriptionP.innerHTML = individualTask.description;
      statusP.innerHTML = individualTask.status;
      dateP.innerHTML = individualTask.duedate;
      const createEditButton = document.createElement("button");
      const createDeleteButton = document.createElement("button");
      taskDiv2.append(taskTitle);
      taskDiv2.append(statusP);
      taskDiv2.append(dateP);
      taskDiv2.append(descriptionP);
      createEditButton.innerHTML = "Edit";
      taskDiv2.append(createEditButton);
      createDeleteButton.innerHTML = "Delete";
      taskDiv2.append(createDeleteButton);
      displayDiv.append(taskDiv2);
      createEditButton.addEventListener("click", async (event) => {
        event.preventDefault();
        if (!isEditing) {
          isEditing = true;
          const editInputBox = document.createElement("input");
          editInputBox.type = "text";
          editInputBox.value = statusP.innerHTML;
          statusP.innerHTML = "";
          statusP.appendChild(editInputBox);
          createEditButton.innerHTML = "Save";
        } else {
          isEditing = false;
          const editInputBox = statusP.querySelector("input");
          const newVal = editInputBox.value;
          statusP.innerHTML = newVal;
          createEditButton.innerHTML = "Edit";
          await updateStatus(task.id, newVal);
        }
      });
      createDeleteButton.addEventListener("click", async (event) => {
        event.preventDefault();
        await deleteTask(task.id);
      });
    });
  });
};

const displayButton = document.getElementById("display-button");
displayButton.addEventListener("click", async (event) => {
  event.preventDefault();
  await displayTasks();
});
