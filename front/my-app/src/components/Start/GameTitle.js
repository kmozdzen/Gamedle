
import React from 'react';
import { Row } from 'react-bootstrap';

const GameTitle = () => {
    return (
        <Row className="flex-fill justify-content-center align-items-center">
            <p className="start-down-menu-title">
                Zgadywanie Gier i Postaci: <br />
                Sprawdź swoją wiedzę, odgaduj tytuły <br />
                i rywalizuj z innymi! 🎮✨
            </p>
        </Row>
    );
};

export default GameTitle;
