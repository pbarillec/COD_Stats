import React, { Component } from 'react';
import { logout, isLogin } from '../utils';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { Image } from 'react-bootstrap';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogin: isLogin()
        }
    }

    handleLogout = () => {
        logout();
        this.setState({
            isLogin: false
        })
    }

    render() {
        return (
            <div>
                <Row>
                    <Col/>
                    <Col><h1>Home</h1></Col>
                    <Col/>
                </Row>
                <Row>
                    <Col/>
                    <Col>                
                        <span>Welcome to dashboard for Call Of Duty stats. Please sign in to use it.</span><br/>
                        {this.state.isLogin ? 
                            <button onClick={() => this.handleLogout()}>Click here to log out</button>
                            : <Link to="/login">Go to sign in page</Link>
                        }
                    </Col>
                    <Col/>
                </Row>
                <Row xs="2">
                    <Image src="Call_of_Duty_Warzone_Logo.png" alt="" />
                    <Image src="Call_of_Duty_Cold_War_Logo.png" alt="" />
                </Row>
            </div>
        );
    }
}

export default Home;