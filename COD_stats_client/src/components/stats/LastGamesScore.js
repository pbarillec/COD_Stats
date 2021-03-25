import React, { Component } from 'react';
import { Line } from '@reactchartjs/react-chart.js';

const LastGamesScore = (props) => {
    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [
          {
            label: 'Score per game',
            data: props.lg,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
    }
    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
    }
    return (
        <div>
            <Line data={data} options={options}/>
        </div>
    );
};

export default LastGamesScore;