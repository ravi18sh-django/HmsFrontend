export const inventorySalesChartOption = () => {
    return {
      chart: {
        type: 'bar',
        height: 350,
      },
      series: [
        {
          name: 'Sales',
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      },
      yaxis: {
        title: {
          text: 'Units Sold',
        },
      },
      title: {
        text: 'Inventory Sales Over Time',
        align: 'center',
      },
    };
  };
  