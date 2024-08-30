export const MonthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const ChartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false
        },
        stacked: false
      }
    ],
    yAxes: [
      {
        gridLines: {
          display: false
        },
        stacked: false,
        ticks: {
          display: false
        }
      }
    ]
  }
};
