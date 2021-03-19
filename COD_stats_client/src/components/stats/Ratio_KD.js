import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

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