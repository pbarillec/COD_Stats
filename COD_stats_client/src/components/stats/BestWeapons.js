// import React, { Component } from 'react';
// import ReactEcharts from 'echarts-for-react';

// class BestWeapons extends Component {
//     render() {
//         return (
//             <div>
//                 <ReactEcharts
//                     option={{
//                         tooltip: {
//                             trigger: 'item'
//                         },
//                         dataset: [{
//                             dimensions: ['name',  'kills'],
//                             source: [
//                                 [' AK-47 ',  314],
//                                 [' M4 ', 540,],
//                                 [' M13', 256],
//                                 [' TEST ', 10],
//                                 [' RPG ', 25],
//                                 [' Arbalète', 19],
//                                 [' AX-50 ', 71],
//                                 [' MP5 ', 178],
//                                 [' MAC-10 ', 278],
//                             ]
//                         }, {
//                             transform: {
//                                 type: 'sort',
//                                 config: { dimension: 'kills', order: 'desc' }
//                             }
//                         }],
//                         xAxis: {
//                             type: 'category',
//                             axisLabel: { interval: 0, rotate: 30 },
//                         },
//                         yAxis: {},
//                         series: {
//                             type: 'bar',
//                             encode: { x: 'name', y: 'score' },
//                             datasetIndex: 1
//                         }
//                     }}
//                 />
//             </div>
//         );  
//     }

// };

// export default BestWeapons;


import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Bar } from '@reactchartjs/react-chart.js';

const BestWeapons = (props) => {
    const data = {
        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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
            },
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
        }],
        //     datasets: [
        //   {
        //     label: '# of Votes',
        //     data: [12, 19, 3, 5, 2, 3],
        //     backgroundColor: [
        //       'rgba(255, 99, 132, 0.2)',
        //       'rgba(54, 162, 235, 0.2)',
        //       'rgba(255, 206, 86, 0.2)',
        //       'rgba(75, 192, 192, 0.2)',
        //       'rgba(153, 102, 255, 0.2)',
        //       'rgba(255, 159, 64, 0.2)',
        //     ],
        //     borderColor: [
        //       'rgba(255, 99, 132, 1)',
        //       'rgba(54, 162, 235, 1)',
        //       'rgba(255, 206, 86, 1)',
        //       'rgba(75, 192, 192, 1)',
        //       'rgba(153, 102, 255, 1)',
        //       'rgba(255, 159, 64, 1)',
        //     ],
        //     borderWidth: 1,
        //   },
        // ],
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
            <Bar data={data} options={options}/>
        </div>
    );
};

export default BestWeapons;