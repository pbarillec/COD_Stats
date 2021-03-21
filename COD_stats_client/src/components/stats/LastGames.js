<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 26aab66... ADD - navbar
// import React, { Component } from 'react';
// import ReactEcharts from 'echarts-for-react';
// import Chart from "chart.js";

// // class LastGames extends Component {
// //     render() {
// //         return (
// //             <div>
// //                 <ReactEcharts
// //                     option={{
// //                         tooltip: {
// //                             trigger: 'item'
// //                         },
// //                         xAxis: {
// //                             type: 'category',
// //                             data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
// //                         },
// //                         yAxis: {
// //                             type: 'value'
// //                         },
// //                         series: [{
// //                             name: 'Score for this game',
// //                             data: [3450, 2340, 2000, 950, 3600, 2500, 2650, 1280, 1890, 2110],
// //                             type: 'line'
// //                         }]
// //                     }}
// //                 />
// //             </div>
// //         );  
// //     }

// // };

// class LastGames extends Component {
//     chartRef = React.createRef();

//     componentDidMount() {
//         const myChartRef = this.chartRef.current.getContext("2d");

//         new Chart(myChartRef, {
//             type: "line",
//             data: {
//                 //Bring in data
//                 labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
//                 datasets: [
//                     {
//                         label: "Score per game",
//                         data: [3450, 2340, 2000, 950, 3600, 2500, 2650, 1280, 1890, 2110],
//                     }
//                 ]
//             },
//             options: {
//                 //Customize chart options
//             }
//         });
//     }
//     render() {
//         return (
//             <div >
//                 <canvas
//                     id="myChart"
//                     ref={this.chartRef}
//                 />
//             </div>
//         )
//     }
// } 

// export default LastGames;

<<<<<<< HEAD
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Line } from '@reactchartjs/react-chart.js';

const LastGames = (props) => {
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
=======
=======
>>>>>>> 26aab66... ADD - navbar
import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Line } from '@reactchartjs/react-chart.js';

const LastGames = (props) => {
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
<<<<<<< HEAD

>>>>>>> 85579ab... ADD- widgets
=======
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
>>>>>>> 26aab66... ADD - navbar
};

export default LastGames;