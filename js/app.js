// getting elements

const form = document.querySelector("#add-savings-form");
const amountInput = document.querySelector("#amount");
const methodInput = document.querySelector("#method");
const dateInput = document.querySelector("#date");

const modal = document.querySelector(".modal-container");

const addBtn = document.querySelector("#add-btn");
const cancelBtn = document.querySelector("#close");

const heroSubtext = document.querySelector(".hero-subtext");

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// getting renderer and recent trnxs container

const totalSavingsDisplay = document.querySelector(".amount");
const transactionsContainer = document.querySelector("#transactions-container");

// showing modal with the addbtn

addBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

const transactions = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const method = methodInput.value.trim();
  const date = dateInput.value;

  const transaction = {
    amount,
    method,
    date,
  };

  transactions.push(transaction);

  const totalSavings = transactions.reduce((initialTotal, transaction) => {
    return initialTotal + transaction.amount;
  }, 0);

  // creating time stamp

  const time = new Date();
  const currentTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  // displaying recent transactions

  const emptyState = document.querySelector(".transactions-empty-state");

  // removing empty state

  if (emptyState) {
    emptyState.remove();
  }

  // adding cards

  const recentCard = document.createElement("div");
  recentCard.classList.add("recent-trnxs-card");

  const recentAmount = document.createElement("h4");
  recentAmount.classList.add("recent-amount");
  recentAmount.textContent = `₦${transaction.amount}`;

  const recentType = document.createElement("p");
  recentType.classList.add("recent-type");
  recentType.textContent = transaction.method;

  const recentDateTime = document.createElement("small");
  recentDateTime.classList.add("date-time");
  recentDateTime.textContent = `Added on ${transaction.date}, ${currentTime}`;

  // adding cards to container

  recentCard.append(recentAmount, recentType, recentDateTime);

  transactionsContainer.prepend(recentCard);

  totalSavingsDisplay.textContent = `₦${totalSavings}`;
});
