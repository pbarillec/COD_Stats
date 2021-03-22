import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import Chart from "chart.js";
import { Doughnut } from '@reactchartjs/react-chart.js';


const Ratio_KD = (props) => {
    const data = {
        labels: ['Kill', 'Death',],
        datasets: [
          {
            label: 'Ratio kill/death',
            data: [props.kills, props.death],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
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

export default Ratio_KD;
