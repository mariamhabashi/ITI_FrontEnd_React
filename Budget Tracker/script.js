// Toggle Mode
const toggleBtn = document.getElementById("toggleModeBtn");
const modeIcon = document.getElementById("modeIcon");
const body = document.body;

if (toggleBtn && modeIcon) {
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      modeIcon.src = "imgs/light.png"; 
      toggleBtn.classList.replace("btn-outline-dark", "btn-outline-light");
    } else {
      modeIcon.src = "imgs/dark.png"; 
      toggleBtn.classList.replace("btn-outline-light", "btn-outline-dark");
    }
  });
}

// ===================
const currentUser = localStorage.getItem('currentUser');
if (!currentUser && !window.location.href.includes('Welcome.html')) {
  window.location.href = 'Welcome.html';
}
const storageKey = `budget_${currentUser}`;
let transactions = JSON.parse(localStorage.getItem(storageKey)) || [];

// ===================
const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('usernameInput');

if (loginBtn && usernameInput) {
  loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (username) {
      localStorage.setItem('currentUser', username);
      window.location.href = 'Home.html';
    } else {
      alert('Please enter your username');
    }
  });
}

// ===================
class Transaction {
  constructor(description, amount, type, category = 'General') {
    this.id = Date.now();
    this.description = description;
    this.amount = parseFloat(amount);
    this.type = type;
    this.category = category;
    this.date = new Date().toLocaleDateString();
  }
}

// ===================
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const description = form.elements['description'].value.trim();
    const amount = form.elements['amount'].value.trim();
    const type = form.elements['type'].value;
    const category = form.elements['category'].value.trim();

    if (!description || !amount || !type) {
      alert('Please fill in all required fields');
      return;
    }

    const transaction = new Transaction(description, amount, type, category || 'General');
    transactions.push(transaction);
    localStorage.setItem(storageKey, JSON.stringify(transactions));

    alert('Transaction added successfully!');
    form.reset();
  });
}

// ===================
const logoutLink = document.querySelector('.nav-link[href="Welcome.html"]');
if (logoutLink) {
  logoutLink.addEventListener('click', function () {
    localStorage.removeItem('currentUser'); 
  });
}
