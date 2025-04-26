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

let taskId = "";

const displayButton = document.getElementById("display-button");
displayButton.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log("hello");
  await displayTasks();
});

let isEditing = false;

const createEditButton = document.createElement("button");

createEditButton.addEventListener("click", async (event) => {
  console.log("hello in edit button");
  event.preventDefault();
  if (!isEditing) {
    isEditing = true;
    createEditButton.innerHTML = "Save";
    const currentStatus = statusP.innerText;
    statusP.innerHTML = "";
    const editInputBox = document.createElement("input");
    editInputBox.value = currentStatus;
    statusP.appendChild(editInputBox);
  } else {
    isEditing = false;
    createEditButton.innerHTML = "Edit";
    const editInputBox = statusP.querySelector("input");
    const newVal = editInputBox.value;
    statusP.innerHTML = newVal;
    console.log(newVal, "new val");
    await updateStatus(taskId, newVal);
  }
});

const createDeleteButton = document.createElement("button");

createDeleteButton.addEventListener("click", async (event) => {
  event.preventDefault();
  await deleteTask(taskId);
});
