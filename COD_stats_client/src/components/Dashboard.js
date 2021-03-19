import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import Ratio_KD from './stats/Ratio_KD.js';
import Ratio_WL from './stats/Ratio_WL.js';
import LastGames from './stats/LastGames.js';
import BestWeapons from './stats/BestWeapons.js'
import { Container, Row, Col } from 'reactstrap';



class Dashboard extends Component {
    render() {
        const [kills, death] = [1048, 735];
        const [win, lose] = [35, 25];
        return (
            // <Container>
            <div>
                <Row>
                    <Col  className="text-center">Ratio Kill / Death = {(kills/death).toFixed(2)}<Ratio_KD kills = {kills} death = {death}/></Col>
                    <Col/>
                    <Col className="text-center">Ratio Win / Lose = {(win/lose).toFixed(2)}<Ratio_WL win = {win} lose = {lose}/></Col>
                </Row>
                <Row>
                    <Col><LastGames/></Col>
                    <Col><BestWeapons/></Col>
                </Row>
            {/* </Container> */}
            </div>
        );  
    }

};

export default Dashboard;