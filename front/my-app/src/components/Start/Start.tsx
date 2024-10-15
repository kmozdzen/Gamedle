import "./Start.css"
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from './Header';
import GameTitle from './GameTitle';
import CategoryButton from './CategoryButton';

const Start = () => {
    return (
        <div className="start-container d-flex justify-content-center align-items-center">
            <Container fluid="md" className="start-container-container">
                <Header />
                <Row className="start-down-menu" style={{ flex: '1' }}>
                    <Container fluid="md" className="d-flex flex-column" style={{ height: '100%' }}>
                        <GameTitle />
                        <Row className="start-down-menu-row">
                            <CategoryButton page="/game" title="Klasyczne" description="Odgadnij grę po wskazówkach" />
                        </Row>
                        <Row className="start-down-menu-row">
                            <CategoryButton page="/character"title="Postać" description="Odgadnij postać po arcie" />
                        </Row>
                        <Row className="start-down-menu-row">
                            <CategoryButton page="/sound" title="Dźwięk" description="Odgadnij grę po dźwięku" />
                        </Row>
                        <Row className="start-down-menu-row">
                            gamedle 2024
                        </Row>
                    </Container>
                </Row>
            </Container>
        </div>
    );
};

export default Start;
