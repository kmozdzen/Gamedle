import "./Game.css";
import React, { useEffect, useState } from "react";
import Header from "../Start/Header";
import { Container, Row, Col } from "react-bootstrap";
import GuessInput from "./GuessInput";
import axios from 'axios';
import GameCard from "./GameCard";

interface GameType {
    id: number;
    name: string;
    genre: string;
    platform: string | null;
    publisher: string;
    year: number;
}

const Game = () => {
    const [games, setGames] = useState<GameType[]>([]);
    const [name, setName] = useState(null);
    const [year, setYear] = useState(null);
    const [genre, setGenre] = useState(null);
    const [platform, setPlatform] = useState(null);
    const [publisher, setPublisher] = useState(null);

    useEffect(() => {
        // Funkcja do pobierania danych
        const fetchGames = async () => {
            try {
                const response = await axios.get<GameType[]>('http://localhost:8080/api/games/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                setGames(response.data); // Ustawienie stanu gier
            } catch (error) {
                console.error("Błąd podczas pobierania gier:", error); // Obsługa błędów
            }
        };

        fetchGames(); // Wywołanie funkcji
    }, []); // Pusta tablica zależności, więc efekt uruchomi się tylko raz

    const getGames = () => {
        // Logika do uzyskiwania gier
    };

    return (
        <div className="game-container d-flex justify-content-center align-items-center">
            <Container fluid="md" className="game-container-container">
                <Header />
                <Row className="game-title-menu mb-3">
                    <div className="game-title">
                        Odgadnij dzisiejszą grę! <br />
                        Wpisz nazwę gry, żeby zacząć
                    </div>
                </Row>
                <Row>
                    <GuessInput 
                        placeholder={"Odgadnij grę..."} 
                        onButtonClick={getGames} 
                        games={games.map((game) => game.name)} // Uproszczona wersja
                    />
                </Row>
                <Row className="justify-content-center">
                    <Col md={2}>
                        <GameCard backgroundColor="red" categoryName="Gra"></GameCard>
                    </Col>
                    <Col md={2}>
                        <GameCard backgroundColor="green" categoryName="Rok"></GameCard>
                    </Col>
                    <Col md={2}>
                        <GameCard backgroundColor="red" categoryName="Gatunek"></GameCard>
                    </Col>
                    <Col md={2}>
                        <GameCard backgroundColor="orange" categoryName="Platforma"></GameCard>
                    </Col>
                    <Col md={2}>
                        <GameCard backgroundColor="red" categoryName="Wydawca"></GameCard>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Game;
