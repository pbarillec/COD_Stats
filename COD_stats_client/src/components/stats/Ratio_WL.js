import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

const Ratio_WL = (props) => {
// class Ratio_WL extends Component {
//     render() {
//         const win = 45;
//         const lose = 30;
//         let ratio = win / lose;
//         ratio = ratio.toFixed(2);
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
                        color: ['#fac858', '#ee6666' ],
                        series: [
                            {
                                name: 'W/L = ' + (props.win/props.lose).toFixed(2),
                                type: 'pie',
                                radius: ['40%', '70%'],
                                avoidLabelOverlap: false,
                                label: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    label: {
                                        show: false,
                                        fontSize: '40',
                                        fontWeight: 'bold'
                                    }
                                },
                                labelLine: {
                                    show: false
                                },
                                data: [
                                    {value: props.win, name: 'LOSE'},
                                    {value: props.lose, name: 'WIN'}
                                ]
                            }
                        ]
                    }}
                />
            </div>
        );  
    // }

};

export default Ratio_WL;