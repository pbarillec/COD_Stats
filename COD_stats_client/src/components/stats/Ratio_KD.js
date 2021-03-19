import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
<<<<<<< HEAD
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
=======

const Ratio_KD = (props) => {
        return (
            <div>
                <ReactEcharts
                    option={{
                        tooltip: {
                            trigger: 'item'
                        },
                        legend: {
                            bottom: '5%',
                            left: 'center'
                        },

                        series: [
                            {
                                name: `K/D = ` + (props.kills/props.death).toFixed(2),
                                type: 'pie',
                                radius: ['40%', '70%'],
                                avoidLabelOverlap: false,
                                label: {
                                    show: false,
                                    position: 'right',
                                    text: 'test'
                                },
                                emphasis: {
                                    label: {
                                        show: false,
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                },
                                labelLine: {
                                    show: false
                                },
                                data: [
                                    {value: props.kills, name: 'KILLS'},
                                    {value: props.death, name: 'DEATH'}
                                ],
                            }
                        ]
                    }}
                />
            </div>
        );  
    // }

};

export default Ratio_KD;
>>>>>>> 85579ab... ADD- widgets
