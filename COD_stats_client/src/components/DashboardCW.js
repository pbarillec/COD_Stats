import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import Ratio_KD from './stats/Ratio_KD.js';
import Ratio_WL from './stats/Ratio_WL.js';
import LastGames from './stats/LastGames.js';
import BestWeapons from './stats/BestWeapons.js'
import { Container, Row, Col } from 'reactstrap';
import NavBar from './NavBar.js'




class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            kills: undefined,
            death: undefined,
            win: undefined,
            lose: undefined,
            weapons: []
        };
        this.temp = []


    }

    async componentDidMount() {
        const token = localStorage.getItem('access_token');
        const config = { headers: { 'Authorization': 'Bearer ' + token }};
        this.get_stats_cw(config);
        this.get_matches_cw(config);
        // this.get_weapons_cw(config);
    }

    async get_stats_cw(config) {
        var call_api = await fetch('http://localhost:8080/stats/cw', config);
        var response = await call_api.json();
        this.setState( {kills: response.data.lifetime.all.properties.kills} );
        this.setState( {death: response.data.lifetime.all.properties.deaths} );
        this.setState( {win: response.data.lifetime.all.properties.wins} );
        this.setState( {lose: (response.data.lifetime.all.properties.totalGamesPlayed - response.data.lifetime.all.properties.wins)} );
    }

    async get_matches_cw(config) {
        var call_api = await fetch('http://localhost:8080/stats/cw/matches', config);
        var response = await call_api.json();
        for(var i= 0; i < 10; i++)
        {
            this.temp.push(response.data.matches[i].playerStats.score)
        }
        console.log(this.temp)
    }

    async get_weapons_cw(config) {
        var call_api = await fetch('http://localhost:8080/stats/cw/weapon', config);
        var response = await call_api.json();
        this.setState( {weapons: response.weapons} );
    }

    render() {
        const { kills, death, win, lose } = this.state;
        // const [kills, death] = [1048, 735];
        // const [win, lose] = [35, 25];
        // const last_games = [3450, 2340, 2000, 950, 3600, 2500, 2650, 1280, 1890, 2110];
        const matches = this.temp

        return (
            // <Container>
            <div>
                <NavBar game="Cold War"/>
                <Row>
                    <Col  className="text-center">Ratio Kill / Death = {(kills/death).toFixed(2)}<Ratio_KD kills = {kills} death = {death}/></Col>
                    <Col/>
                    <Col className="text-center">Ratio Win / Lose = {(win/lose).toFixed(2)}<Ratio_WL win = {win} lose = {lose}/></Col>
                </Row>
                <Row>
                    <Col><LastGames lg = {matches}/></Col>
                    <Col><BestWeapons/></Col>
                </Row>
            {/* </Container> */}
            </div>
        );  
    }

};

export default Dashboard;