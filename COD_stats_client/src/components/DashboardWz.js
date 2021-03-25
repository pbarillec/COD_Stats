import React, { Component } from 'react';
import Ratio_KD from './stats/Ratio_KD.js';
import Ratio_WL from './stats/Ratio_WL.js';
import LastGamesScore from './stats/LastGamesScore.js';
import { Row, Col } from 'reactstrap';
import NavBar from './NavBar.js'
import LastGamesKD from './stats/LastGamesKD.js';

class DashboardWz extends Component {
    constructor(props) {
        super(props)
        this.state = {
            kills: undefined,
            death: undefined,
            win: undefined,
            lose: undefined
        }
        this.matches_score = [],
        this.matches_kills = [],
        this.matches_deaths = []
    }

    async componentDidMount() {
        const token = localStorage.getItem('access_token');
        const config = { headers: { 'Authorization': 'Bearer ' + token }};
        this.get_stats_wz(config);
        this.get_matches_wz(config);
    }

    async get_stats_wz(config) {
        var call_api = await fetch('http://localhost:8080/stats/wz', config);
        var response = await call_api.json();
        this.setState( {kills: response.data.lifetime.all.properties.kills} );
        this.setState( {death: response.data.lifetime.all.properties.deaths} );
        this.setState( {win: response.data.lifetime.all.properties.wins} );
        this.setState( {lose: (response.data.lifetime.all.properties.totalGamesPlayed - response.data.lifetime.all.properties.wins)} );
    }

    async get_matches_wz(config) {
        var call_api = await fetch('http://localhost:8080/stats/wz/matches', config);
        var response = await call_api.json();
        console.log(response);

        for(var i= 0; i < 5; i++)
        {
            this.matches_score.push(response.data.matches[i].playerStats.score)
            this.matches_kills.push(response.data.matches[i].playerStats.kills)
            this.matches_deaths.push(response.data.matches[i].playerStats.deaths)
        }
    }

    render() {
        const { kills, death, win, lose } = this.state;
        const matches_score = this.matches_score;
        const matches_kills = this.matches_kills;
        const matches_deaths = this.matches_deaths;

        return (
            <div>
                <NavBar game="Warzone"/>
                <Row>
                    <Col  className="text-center">Ratio Kill / Death = {(kills/death).toFixed(2)}<Ratio_KD kills = {kills} death = {death}/></Col>
                    <Col/>
                    <Col className="text-center">Ratio Win / Lose = {(win/lose).toFixed(2)}<Ratio_WL win = {win} lose = {lose}/></Col>
                </Row>
                <Row>
                    <Col><LastGamesScore lg = {matches_score}/></Col>
                    <Col><LastGamesKD kills = {matches_kills} deaths = {matches_deaths} /></Col>
                </Row>
            </div>
        );  
    }
};

export default DashboardWz;