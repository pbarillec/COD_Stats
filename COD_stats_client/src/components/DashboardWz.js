import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import Ratio_KD from './stats/Ratio_KD.js';
import Ratio_WL from './stats/Ratio_WL.js';
import LastGames from './stats/LastGames.js';
import BestWeapons from './stats/BestWeapons.js'
import { Container, Row, Col } from 'reactstrap';
import NavBar from './NavBar.js'



class DashboardWz extends Component {
    constructor(props) {
        super(props)
        this.state = {
            kills: undefined,
            death: undefined,
            win: undefined,
            lose: undefined,
            matches: [],
            weapons: []
        }
    }

    async componentDidMount() {
        const token = localStorage.getItem('access_token');
        const config = { headers: { 'Authorization': 'Bearer ' + token }};
        this.get_stats_wz(config);
        this.get_matches_wz(config);
        this.get_weapons_wz(config);
    }

    async get_stats_wz(config) {
        var call_api = await fetch('http://localhost:8080/stats/wz', config);
        var response = await call_api.json();
        this.setState( {kills: response.kill} );
        this.setState( {death: response.death} );
        this.setState( {win: response.win} );
        this.setState( {lose: response.lose} );
    }

    async get_matches_wz(config) {
        var call_api = await fetch('http://localhost:8080/stats/wz/matches', config);
        var response = await call_api.json();
        this.setState( {matches: response.matches} );
    }

    async get_weapons_wz(config) {
        var call_api = await fetch('http://localhost:8080/stats/wz/weapon', config);
        var response = await call_api.json();
        this.setState( {weapons: response.weapons} );
    }    
    render() {
        const { kills, death, win, lose } = this.state;
        // const [kills, death] = [1048, 735];
        // const [win, lose] = [35, 25];
        const last_games = [3450, 2340, 2000, 950, 3600, 2500, 2650, 1280, 1890, 2110];

        return (
            <div>
                <NavBar game="Warzone"/>
                <Row>
                    <Col  className="text-center">Ratio Kill / Death = {(kills/death).toFixed(2)}<Ratio_KD kills = {kills} death = {death}/></Col>
                    <Col/>
                    <Col className="text-center">Ratio Win / Lose = {(win/lose).toFixed(2)}<Ratio_WL win = {win} lose = {lose}/></Col>
                </Row>
                <Row>
                    <Col><LastGames lg = {last_games}/></Col>
                    <Col><BestWeapons/></Col>
                </Row>
            </div>
        );  
    }

};

export default DashboardWz;