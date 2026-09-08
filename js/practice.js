const form = document.querySelector("#savings-form");
const amountInput = document.querySelector("#amount");
const typeInput = document.querySelector("#type");
const dateInput = document.querySelector("#date");
const transactionsContainer = document.querySelector("#transactions-container");

const transactions = [];

const renderTransactions = () => {
  transactionsContainer.innerHTML = "";
  transactions.forEach((transaction) => {
    const trxnElement = document.createElement("h3");
    trxnElement.textContent = `${transaction.amount}, on ${transaction.date} by ${transaction.type}`;
    transactionsContainer.append(trxnElement);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let amount = amountInput.value;
  amount = Number(amount);
  const type = typeInput.value;
  const date = dateInput.value;

  const transaction = {
    amount,
    type,
    date,
  };

  transactions.push(transaction);
  renderTransactions();
  amountInput.value = "";
  typeInput.value = "";
  dateInput.value = "";
});
