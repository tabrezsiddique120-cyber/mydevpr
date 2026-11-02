const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const priorityInput = document.getElementById("priority");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const taskCountPill = document.getElementById("taskCountPill");
const coachTitle = document.getElementById("coachTitle");
const coachMessage = document.getElementById("coachMessage");

let tasks = [];
let nextId = 1;

// Add a task when the form is submitted.
taskForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop the browser from reloading the page.

  const name = taskInput.value.trim();
  if (name === "") return;

  tasks.push({
    id: nextId++,
    name: name,
    priority: priorityInput.value,
    completed: false
  });

  taskInput.value = "";
  priorityInput.value = "Medium";
  renderTasks();
  taskInput.focus();
});

// Rebuild the task list and update dashboard numbers.
function renderTasks() {
  taskList.replaceChildren();

  tasks.forEach(function (task) {
    const item = document.createElement("li");
    item.className = "task";
    if (task.completed) item.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Mark " + task.name + " complete");

    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const info = document.createElement("div");
    info.className = "task-info";

    const name = document.createElement("strong");
    name.className = "task-name";
    name.textContent = task.name;

    const details = document.createElement("p");
    details.textContent = "Priority: ";

    const priorityBadge = document.createElement("span");
    priorityBadge.className = "priority priority-" + task.priority.toLowerCase();
    priorityBadge.textContent = task.priority;
    details.append(priorityBadge);

    info.append(name, details);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", "Delete " + task.name);

    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter(function (currentTask) {
        return currentTask.id !== task.id;
      });
      renderTasks();
    });

    item.append(checkbox, info, deleteButton);
    taskList.append(item);
  });

  const completed = tasks.filter(function (task) {
    return task.completed;
  }).length;

  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completed;
  pendingTasks.textContent = tasks.length - completed;
  taskCountPill.textContent = tasks.length + (tasks.length === 1 ? " task" : " tasks");
  emptyMessage.hidden = tasks.length > 0;

  updateSmartNudge();
}

// This is a rule-based nudge, not a real AI API call.
function updateSmartNudge() {
  const pending = tasks.filter(function (task) {
    return !task.completed;
  });

  if (pending.length === 0 && tasks.length > 0) {
    coachTitle.textContent = "Mission accomplished!";
    coachMessage.textContent = "All tasks are complete. Add a new small goal to keep your momentum going.";
    return;
  }

  if (pending.length === 0) {
    coachTitle.textContent = "Ready when you are";
    coachMessage.textContent = "Add a task and SkillPilot will suggest a practical next step using simple built-in rules.";
    return;
  }

  const highPriority = pending.find(function (task) {
    return task.priority === "High";
  });

  const nextTask = highPriority || pending[0];
  coachTitle.textContent = "Your suggested next step";
  coachMessage.textContent = "Try this next: " + nextTask.name +
    (highPriority ? ". It's marked high priority, so consider starting here." :
    ". Finish one task before adding more to your plate.");
}

// Show a useful initial state.
renderTasks();
