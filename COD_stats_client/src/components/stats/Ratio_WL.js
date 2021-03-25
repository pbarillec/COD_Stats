import React, { Component } from 'react';
import { Doughnut } from '@reactchartjs/react-chart.js';

const Ratio_WL = (props) => {
    const data = {
        labels: ['Lose', 'Win',],
        datasets: [
          {
            label: 'Ratio win/lose',
            data: [props.lose, props.win],
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 159, 64, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
    }
    return (
        <div>
            <Doughnut data={data} />
        </div>
    );
};

export default Ratio_WL;