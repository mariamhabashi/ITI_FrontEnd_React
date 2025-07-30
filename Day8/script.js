document.addEventListener("DOMContentLoaded", function () {
  // --- Task 1: Form ---
  var contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = document.getElementById("nameInput").value;
    var email = document.getElementById("emailInput").value;
    var message = document.getElementById("messageInput").value;
    var outputDiv = document.getElementById("formOutput");
    outputDiv.innerHTML =
      "<h3>Submitted Information:</h3>" +
      "<p><strong>Name:</strong> " +
      name +
      "</p>" +
      "<p><strong>Email:</strong> " +
      email +
      "</p>" +
      "<p><strong>Message:</strong> " +
      message +
      "</p>";
  });

//   --- Task 2: Dark Mode ---
  var darkModeToggle = document.getElementById("darkModeToggle");
  darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });

  // --- Task 3: Counter ---
  var count = 0;
  var countDisplay = document.getElementById("countDisplay");
  var incrementBtn = document.getElementById("incrementBtn");
  var decrementBtn = document.getElementById("decrementBtn");
  var resetBtn = document.getElementById("resetBtn");
  incrementBtn.addEventListener("click", function () {
    count++;
    countDisplay.textContent = count;
  });
  decrementBtn.addEventListener("click", function () {
    count--;
    countDisplay.textContent = count;
  });
  resetBtn.addEventListener("click", function () {
    count = 0;
    countDisplay.textContent = count;
  });

//   --- Task 4: addEventListener ---
  var eventBox = document.getElementById("eventBox");
  eventBox.addEventListener("mouseover", function () {
    eventBox.style.backgroundColor = "#e9f5ff";
    eventBox.style.borderColor = "#1a3c61ff";
  });
  eventBox.addEventListener("mouseout", function () {
    eventBox.style.backgroundColor = "";
    eventBox.style.borderColor = "var(--primary-color)";
  });
  eventBox.addEventListener("click", function () {
    eventBox.textContent = "You clicked me!";
  });

  // --- Task 5: To-Do List ---
  var addTodoBtn = document.getElementById("addTodoBtn");
  var todoInput = document.getElementById("todoInput");
  var todoList = document.getElementById("todoList");
  function addTask() {
    var taskText = todoInput.value.trim();
    if (taskText !== "") {
      var listItem = document.createElement("li");
      var taskSpan = document.createElement("span");
      taskSpan.textContent = taskText;
      var deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      listItem.appendChild(taskSpan);
      listItem.appendChild(deleteBtn);
      todoList.appendChild(listItem);
      todoInput.value = "";
    }
  }
  addTodoBtn.addEventListener("click", addTask);
  todoList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
      var listItemToDelete = event.target.parentElement;
      todoList.removeChild(listItemToDelete);
    }
  });
});
