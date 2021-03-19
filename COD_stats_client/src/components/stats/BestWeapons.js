import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class BestWeapons extends Component {
    render() {
        return (
            <div>
                <ReactEcharts
                    option={{
                        tooltip: {
                            trigger: 'item'
                        },
                        dataset: [{
                            dimensions: ['name',  'kills'],
                            source: [
                                [' AK-47 ',  314],
                                [' M4 ', 540,],
                                [' M13', 256],
                                [' TEST ', 10],
                                [' RPG ', 25],
                                [' Arbalète', 19],
                                [' AX-50 ', 71],
                                [' MP5 ', 178],
                                [' MAC-10 ', 278],
                            ]
                        }, {
                            transform: {
                                type: 'sort',
                                config: { dimension: 'kills', order: 'desc' }
                            }
                        }],
                        xAxis: {
                            type: 'category',
                            axisLabel: { interval: 0, rotate: 30 },
                        },
                        yAxis: {},
                        series: {
                            type: 'bar',
                            encode: { x: 'name', y: 'score' },
                            datasetIndex: 1
                        }
                    }}
                />
            </div>
        );  
    }

};

export default BestWeapons;