import "./Game.css"
import React from "react";
import Header from "../Start/Header";
import { Container, Row } from "react-bootstrap";
import GuessInput from "./GuessInput";
import axios from 'axios';

const Game = () => {
    
    const test = () => {
        axios.get('http://localhost:8080/api/games/', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((res) => {
            console.log(res.data[0].name)    
        })
        .catch(error => {
            console.error(error);
        });
    }
    return (
        <div className="game-container d-flex justify-content-center align-items-center">
            <Container fluid="md" className="game-container-container">;
                <Header></Header>
                <Row className="game-title-menu mb-3">
                    <div className="game-title">
                    Odgadnij dzisiejszą grę! <br></br>
                    Wpisz nazwę gry, żeby zacząć
                    </div>
                </Row>
                <Row>
                    <GuessInput placeholder={"Odgadnij grę..."} onButtonClick={test}></GuessInput>
                </Row>
            </Container>
        </div>);
}

export default Game;