// getting elemnets

const form = document.querySelector("#add-savings-form");
const amountInput = document.querySelector("#amount");
const methodInput = document.querySelector("#method");
const dateInput = document.querySelector("#date");
const modal = document.querySelector(".modal-container");
const addBtn = document.querySelector("#add-btn");
const cancelBtn = document.querySelector("#close");
const heroSubtext = document.querySelector(".hero-subtext");
const chartEmptyState = document.querySelector("#trend-empty");
const error = document.querySelector(".error");
const chartDisplay = document.querySelector("#trend-chart");

// getting renderer and recent trnxs container

const totalSavingsDisplay = document.querySelector(".amount");
const transactionsContainer = document.querySelector("#transactions-container");

// showing modal with the addbtn

const transactions = [];

const trendChart = new Chart(chartDisplay, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Transactions recorded",
        data: [],
        borderColor: "#8B5CF6",
        backgroundColor: "rgba(139, 92, 246, 0.15)",
        borderWidth: 3,
        pointBackgroundColor: "#22D3EE",
        pointBorderColor: "#080B18",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
      },
    ],
  },
});

const updateChart = () => {
  const dailyTrnxsCount = {};
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
};

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

  if (amount === 0 || amount < 1) {
    error.classList.remove("hidden");
  } else {
    error.classList.add("hidden");

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
    modal.remove();
    form.reset();

    const chartData = updateChart();
    const labels = Object.keys(chartData);
    const data = Object.values(chartData);
    trendChart.data.labels = labels;
    trendChart.data.datasets[0].data = data;

    if (chartEmptyState) {
      chartEmptyState.remove();
    }
    trendChart.update();
  }
});
