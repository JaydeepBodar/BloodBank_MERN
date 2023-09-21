import React from 'react'
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
const Chartdata = ({totalblood}) => {
	// console.log("totalblood",totalblood)
    const ndata = {
        labels: totalblood?.map(val=>val?.blood),
        datasets: [
          {
            label: 'Total Avilable Blood',
            backgroundColor: '#0d6efd',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: totalblood?.map(val=>val?.totalblood),
          },
        ],
      };
      
      const options = {
        title: {
          display: true,
          text: 'Sample Bar Chart',
          fontSize: 14,
        },
        legend: {
          display: true,
          position: 'top',
        },
      };
  return (
    <Bar data={ndata} options={options} />
  )
}

export default Chartdata
