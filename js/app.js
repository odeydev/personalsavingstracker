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
const dailyTrnxsCount = {};

function updateChart() {
  transactions.forEach((transaction) => {
    const recordedDate = transaction.recordedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    if (dailyTrnxsCount[recordedDate]) {
      dailyTrnxsCount[recordedDate]++;
    } else {
      dailyTrnxsCount[recordedDate] = 1;
    }
  });

  return dailyTrnxsCount;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const method = methodInput.value.trim();
  const date = dateInput.value;

  const transaction = {
    amount,
    method,
    date,
    recordedDate: new Date(),
  };

  transactions.push(transaction);

  const totalSavings = transactions.reduce((initialTotal, transaction) => {
    return initialTotal + transaction.amount;
  }, 0);

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
  recentAmount.textContent = `₦${transaction.amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const recentType = document.createElement("p");
  recentType.classList.add("recent-type");
  recentType.textContent = transaction.method;

  const recentDateTime = document.createElement("small");
  recentDateTime.classList.add("date-time");
  recentDateTime.textContent = `Added on ${transaction.recordedDate.toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      month: "short",
      day: "2-digit",
    },
  )} 
  at ${transaction.recordedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "numeric",
  })}, Created ${transaction.date}`;

  // adding cards to container

  recentCard.append(recentAmount, recentType, recentDateTime);

  transactionsContainer.prepend(recentCard);

  while (transactionsContainer.children.length > 3) {
    transactionsContainer.lastElementChild.remove();
  }

  totalSavingsDisplay.textContent = `₦${totalSavings.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  heroSubtext.textContent = `Last updated ${transaction.recordedDate.toLocaleDateString(
    "en-US",
    {
      weekday: "short",
      month: "long",
      day: "numeric",
    },
  )}, at ${transaction.recordedDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })}`;

  //  removing modal and clearing form
  modal.style.display = "none";
  form.reset();
  updateChart();
  console.log(Object.keys(transaction));
});
