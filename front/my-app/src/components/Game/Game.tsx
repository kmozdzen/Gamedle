import React, { useEffect, useState } from "react";
import "./Game.css";
import Header from "../Start/Header";
import { Container, Row } from "react-bootstrap";
import GuessInput from "./GuessInput";
import axios from 'axios';
import GameCards from "./GameCards";
import HeaderGameCard from "./HeaderGameCard";
import Submit from "./Submit";

interface GameType {
    id: number;
    name: string;
    genre: string;
    platform: string | null;
    publisher: string;
    year: number;
}

const gameToGuess = {
    name: "The Last of Us Part II",
    genre: "Akcja, Przygodowa",
    platform: "PS4",
    publisher: "Sony Interactive Entertainment",
    year: 2020
};

const Game = () => {
    const [games, setGames] = useState<GameType[]>([]);
    const [guessedGames, setGuessedGames] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [components, setComponents] = useState<JSX.Element[]>([]);
    const [showMessage, setShowMessage] = useState(''); // Treść komunikatu
    const [submitComponents, setSubmitComponents] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get<GameType[]>('http://localhost:8080/api/games/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                setGames(response.data);
            } catch (error) {
                console.error("Błąd podczas pobierania gier:", error);
            }
        };

        fetchGames();
    }, []);

    const getGames = () => {
        const foundGame = games.find(game => inputValue === game.name || selectedValue === game.name);
    
        if (foundGame) {
            if (!guessedGames.includes(foundGame.name)) {
                const newComponent = createGameCardComponent(foundGame);
                setGuessedGames([...guessedGames, foundGame.name]);
                addComponentWithDelay(newComponent, foundGame); // Przekazanie foundGame
            }
        }
    };
    
    const createGameCardComponent = (foundGame: GameType) => {
        const nameBackgroundColor = foundGame.name === gameToGuess.name ? "green" : "red";
        const yearBackgroundColor = foundGame.year === gameToGuess.year ? "green" : "red";
        const genreBackgroundColor = foundGame.genre === gameToGuess.genre ? "green" : "red";
        const platformBackgroundColor = foundGame.platform === gameToGuess.platform ? "green" : "red";
        const publisherBackgroundColor = foundGame.publisher === gameToGuess.publisher ? "green" : "red";

        return (
            <GameCards
                key={foundGame.id}
                name={foundGame.name}
                year={foundGame.year}
                genre={foundGame.genre}
                platform={foundGame.platform || "Nieznana"}
                publisher={foundGame.publisher}
                nameBackgroundColor={nameBackgroundColor}
                yearBackgroundColor={yearBackgroundColor}
                genreBackgroundColor={genreBackgroundColor}
                platformBackgroundColor={platformBackgroundColor}
                publisherBackgroundColor={publisherBackgroundColor}
            />
        );
    };

    const addComponentWithDelay = (newComponent: JSX.Element, foundGame: GameType) => {
        setComponents((prevComponents) => [...prevComponents, newComponent]);

        const delay = 500; // Opóźnienie 0.5 sekundy
        const cardCount = 5; // Liczba kafelków do pokazania
        
        // Dodaj kafelki z opóźnieniem
        for (let i = 0; i < cardCount; i++) {
            setTimeout(() => {
                setComponents((prevComponents) => {
                    const newComponents = [...prevComponents];
                    newComponents[newComponents.length - 1] = newComponent; // Zaktualizuj ostatni komponent
                    return newComponents;
                });
            }, delay * i);
        }

        // Ustaw komponent Submit po wyświetleniu wszystkich kafelków
        setTimeout(() => {
            if (foundGame.name === gameToGuess.name) {
                setSubmitComponents((prevComponents) => [
                    ...prevComponents,
                    <Submit key={Date.now()} /> // Użyj unikalnego klucza
                ]);
                setShowMessage(`Brawo! Zgadłeś grę: ${foundGame.name}`); // Ustaw komunikat
            } else {
                setShowMessage(`Niestety, to nie ta gra: ${foundGame.name}. Spróbuj ponownie!`);
            }
        }, delay * cardCount); // Ustaw komunikat po zakończeniu opóźnienia
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
                        games={games.map((game) => game.name)}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        selectedValue={selectedValue}
                        setSelectedValue={setSelectedValue}
                    />
                </Row>
                <HeaderGameCard />
                {components}
                {submitComponents}
            </Container>
        </div>
    );
};

export default Game;
