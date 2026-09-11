const progressChart = document.querySelector("#progress-chart");

const savingsTrendChart = document.querySelector("#trend-chart");

new Chart(progressChart, {
  type: "pie",
  data: {
    labels: [],
    datasets: [
      {
        label: "last week",
        data: [12, 8],
      },
    ],
  },
});

new Chart(savingsTrendChart, {
  type: "line",
  data: {
    labels: ["Sep 1", "Sep 2", "Sep 3", "Sep 4", "Sep 5", "Sep 6"],
    datasets: [
      {
        label: "Daily",
        data: [12, 14, 8, 18, 4, 15],
      },
      {
        label: "Weekly",
        data: [21, 10, 14, 10, 1, 12],
      },
    ],
  },
});
