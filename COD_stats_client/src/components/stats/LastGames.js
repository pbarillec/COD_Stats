import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class LastGames extends Component {
    render() {
        return (
            <div>
                <ReactEcharts
                    option={{
                        tooltip: {
                            trigger: 'item'
                        },
                        xAxis: {
                            type: 'category',
                            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            name: 'Score for this game',
                            data: [3450, 2340, 2000, 950, 3600, 2500, 2650, 1280, 1890, 2110],
                            type: 'line'
                        }]
                    }}
                />
            </div>
        );  
    }

};

export default LastGames;