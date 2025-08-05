// Toggle Mode
const toggleBtn = document.getElementById("toggleModeBtn");
const body = document.body;

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const img = toggleBtn.querySelector("img");

    if (body.classList.contains("dark-mode")) {
      img.src = "imgs/light.png";
    } else {
      img.src = "imgs/dark.png";
    }
  });
}

// Check if user is logged in
const currentUser = localStorage.getItem("currentUser");

// Redirect to login if not logged in
if (
  !currentUser &&
  !window.location.href.includes("welcome.html") &&
  !window.location.href.includes("Welcome.html")
) {
  window.location.href = "welcome.html";
}

// Storage key for current user's data
const storageKey = `budget_${currentUser}`;

// Get user's transactions from localStorage
let transactions = JSON.parse(localStorage.getItem(storageKey)) || [];

// Login Functionality
const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("usernameInput");

if (loginBtn && usernameInput) {
  const handleLogin = (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();

    if (username) {
      localStorage.setItem("currentUser", username);
      window.location.href = "home.html";
    } else {
      alert("Please enter your username");
    }
  };

  loginBtn.addEventListener("click", handleLogin);

  // Allow Enter key to login
  usernameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  });
}

// Transaction Class with default parameters
class Transaction {
  constructor(description, amount, type, category = "General") {
    this.id = Date.now() + Math.random(); // Unique ID
    this.description = description;
    this.amount = parseFloat(amount);
    this.type = type;
    this.category = category;
    this.date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
}

// Display current user name
const currentUserNameElement = document.getElementById("currentUserName");
if (currentUserNameElement && currentUser) {
  currentUserNameElement.textContent = currentUser;
}

// Add Transaction Form Handler
const form = document.getElementById("transactionForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = form.elements["description"].value.trim();
    const amount = form.elements["amount"].value.trim();
    const type = form.elements["type"].value;
    const category = form.elements["category"].value.trim();

    if (!description || !amount || !type) {
      alert("Please fill in all required fields");
      return;
    }

    if (parseFloat(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    // Create new transaction using class
    const transaction = new Transaction(
      description,
      amount,
      type,
      category || "General"
    );

    // Add to transactions array
    transactions.push(transaction);

    // Save to localStorage
    localStorage.setItem(storageKey, JSON.stringify(transactions));

    // Show success message
    alert("Transaction added successfully!");

    // Reset form
    form.reset();

    // Update display automatically
    displayTransactions();
    calculateSummary();
  });
}

// Calculate Summary
const calculateSummary = () => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  const totalIncomeElement = document.getElementById("totalIncome");
  const totalExpensesElement = document.getElementById("totalExpenses");
  const totalBalanceElement = document.getElementById("totalBalance");

  if (totalIncomeElement)
    totalIncomeElement.textContent = `$${totalIncome.toFixed(2)}`;
  if (totalExpensesElement)
    totalExpensesElement.textContent = `$${totalExpenses.toFixed(2)}`;
  if (totalBalanceElement) {
    totalBalanceElement.textContent = `$${totalBalance.toFixed(2)}`;
    //color changes based on balance
    const balanceCard = totalBalanceElement.closest(".card");
    if (totalBalance >= 0) {
      balanceCard.className = "card text-center bg-primary text-white";
    } else {
      balanceCard.className = "card text-center bg-warning text-white";
    }
  }
};

// Display Transactions
const displayTransactions = () => {
  const transactionsList = document.getElementById("transactionsList");

  if (!transactionsList) return;

  if (transactions.length === 0) {
    transactionsList.innerHTML = `
      <tr class="no-transactions">
        <td colspan="6" class="text-center">
          <i class="fas fa-inbox fa-3x mb-3"></i>
          <p>No transactions yet. Add your first transaction!</p>
        </td>
      </tr>
    `;
    return;
  }

  // Sort transactions
  const sortedTransactions = [...transactions].sort((a, b) => b.id - a.id);

  // Create table rows
  const transactionsHTML = sortedTransactions
    .map((transaction) => {
      const typeClass =
        transaction.type === "income" ? "type-income" : "type-expense";
      const amountClass =
        transaction.type === "income" ? "amount-income" : "amount-expense";
      const amountPrefix = transaction.type === "income" ? "+" : "-";

      return `
      <tr>
        <td>${transaction.date}</td>
        <td>${transaction.description}</td>
        <td>${transaction.category}</td>
        <td>
          <span class="transaction-type ${typeClass}">
            ${transaction.type}
          </span>
        </td>
        <td class="${amountClass}">
          ${amountPrefix}${transaction.amount.toFixed(2)}
        </td>
        <td>
          <button class="delete-btn" onclick="deleteTransaction(${
            transaction.id
          })">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
    })
    .join("");

  transactionsList.innerHTML = transactionsHTML;
};

// Delete Transaction function
const deleteTransaction = (transactionId) => {
  if (confirm("Are you sure you want to delete this transaction?")) {
    // Filter out the transaction with the given ID
    transactions = transactions.filter((t) => t.id !== transactionId);

    // Update localStorage
    localStorage.setItem(storageKey, JSON.stringify(transactions));

    // Update display automatically
    displayTransactions();
    calculateSummary();
  }
};

// Calculate button handler
const calculateBtn = document.getElementById("calculate-btn");
if (calculateBtn) {
  calculateBtn.addEventListener("click", () => {
    calculateSummary();
    alert("Summary calculated and updated!");
  });
}

// Clear All Transactions
const clearAllBtn = document.getElementById("clearAllBtn");
if (clearAllBtn) {
  clearAllBtn.addEventListener("click", () => {
    if (
      confirm(
        "Are you sure you want to delete all transactions?"
      )
    ) {
      transactions = [];
      localStorage.setItem(storageKey, JSON.stringify(transactions));
      displayTransactions();
      calculateSummary();
      alert("All transactions have been cleared!");
    }
  });
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("currentUser");
      window.location.href = "welcome.html";
    }
  });
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("transactionsList")) {
    displayTransactions();
    calculateSummary();
  }
});

// filter trans by category
const getTransactionsByCategory = (category) =>
  transactions.filter((transaction) =>
    transaction.category.toLowerCase().includes(category.toLowerCase())
  );

// get transaction by its type
const getTransactionsByType = (type) =>
  transactions.filter((transaction) => transaction.type === type);

// Default parameter 7 day ago transactions
const getRecentTransactions = (days = 7) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return transactionDate >= cutoffDate;
  });
};
