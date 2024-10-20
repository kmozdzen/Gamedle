import React from "react";
import "./Game.css";
import { Row, Col } from "react-bootstrap";

const HeaderGameCard = () => {
    return(
        <Row>
            <Col ms={2} className="margin-auto">
                <div className='game-card-container'>
                <div className='game-card-label-container'>
                        <span className='game-card-label'>Gra</span>
                    </div>
                    <hr className='game-card-hr'></hr>
                </div>
            </Col>
            <Col ms={2} className="margin-auto">
                <div className='game-card-container'>
                <div className='game-card-label-container'>
                        <span className='game-card-label'>Rok</span>
                    </div>
                    <hr className='game-card-hr'></hr>
                </div>
            </Col>
            <Col ms={2} className="margin-auto">
                <div className='game-card-container'>
                <div className='game-card-label-container'>
                        <span id="game-card-label-genre" className='game-card-label'>Gatunek</span>
                    </div>
                    <hr className='game-card-hr'></hr>
                </div>
            </Col>
            <Col ms={2} className="margin-auto">
                <div className='game-card-container'>
                <div className='game-card-label-container'>
                        <span id="game-card-label-platform" className='game-card-label'>Platforma</span>
                    </div>
                    <hr className='game-card-hr'></hr>
                </div>
            </Col>
            <Col ms={2} className="margin-auto">
                <div className='game-card-container'>
                <div className='game-card-label-container'>
                        <span id="game-card-label-publisher" className='game-card-label'>Wydawca</span>
                    </div>
                    <hr className='game-card-hr'></hr>
                </div>
            </Col>
        </Row>
    );
}

export default HeaderGameCard;