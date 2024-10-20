import React, { useEffect, useRef, useState } from "react";
import "./Game.css";
import Header from "../Start/Header";
import { Container, Row } from "react-bootstrap";
import GuessInput from "./GuessInput";
import axios from 'axios';
import GameCards from "./GameCards";
import HeaderGameCard from "./HeaderGameCard";
import Submit from "./Submit";

// Typ dla gry
interface GenreType {
    idGenre: number;
    name: string;
}

interface PlatformType {
    idPlatform: number;
    name: string;
}

interface GameType {
    idGame: number;
    name: string;
    genres: GenreType[]; // Lista gatunków
    platforms: PlatformType[]; // Lista platform
    publisher: string; // Pojedynczy string wydawcy
    year: number;
}

// Typ do sprawdzenia gry
interface CheckGameType {
    name: boolean;
    genre: boolean;
    platform: boolean;
    publisher: boolean;
    year: boolean;
}

const Game = () => {
    const [gameCheckStates, setGameCheckStates] = useState<Record<number, CheckGameType>>({});
    const [games, setGames] = useState<GameType[]>([]);
    const [guessedGames, setGuessedGames] = useState<string[]>(() => {
        const storedGuessedGames = localStorage.getItem('guessedGames');
        return storedGuessedGames ? JSON.parse(storedGuessedGames) : [];
    });

    const [inputValue, setInputValue] = useState('');
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [components, setComponents] = useState<JSX.Element[]>([]);
    const [submitComponents, setSubmitComponents] = useState<JSX.Element[]>([]);
    const [showGuessInput, setShowGuessInput] = useState(true);
    const [isLoading, setIsLoading] = useState(true); 

    const submitRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const updateGameToGuess = async () => {
            try {
                const response = await axios.get<GameType[]>('https://gamedle-kk4y.onrender.com/api/games/random', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                if(localStorage.getItem('gameToGuess') != JSON.stringify(response.data)){
                    localStorage.clear();
                    setGuessedGames([]);
                    setComponents([]);
                    setGameCheckStates({});
                    localStorage.setItem('gameToGuess', JSON.stringify(response.data));
                }
            } catch (error) {
                console.error("Błąd podczas pobierania gier:", error);
            } finally {
                setIsLoading(false);
            }
        };
        updateGameToGuess();
    }, []);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get<GameType[]>('https://gamedle-kk4y.onrender.com/api/games/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                setGames(response.data);
            } catch (error) {
                console.error("Błąd podczas pobierania gier:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGames();
    }, []);

    const getGames = () => {
        const foundGame = games.find(game => inputValue === game.name || selectedValue === game.name);

        if (foundGame && !guessedGames.includes(foundGame.name)) {
            setInputValue("");
            setSelectedValue("");
            setIsLoading(true);

            const showFast = true;

            axios.get<CheckGameType>(`https://gamedle-kk4y.onrender.com/api/games/${foundGame.idGame}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then((response) => {
                console.log(response.data)
                const newCheckGame = response.data;
           
                setGameCheckStates((prevStates) => ({
                    ...prevStates,
                    [foundGame.idGame]: newCheckGame,
                }));

                const newComponent = createGameCardComponent(foundGame, showFast, newCheckGame);
                setComponents((prevComponents) => [newComponent, ...prevComponents]);

                const updatedGuessedGames = [foundGame.name, ...guessedGames];
                setGuessedGames(updatedGuessedGames);
                localStorage.setItem('guessedGames', JSON.stringify(updatedGuessedGames));

                if (newCheckGame.name) {
                    setShowGuessInput(false);
                    setSubmitComponents((prevComponents) => [
                        <div ref={submitRef} key={Date.now()}>
                            <Submit />
                        </div>
                    ]);
                }
            }).catch((error) => {
                console.error("Błąd podczas pobierania stanu gry:", error);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    };

    const createGameCardComponent = (foundGame: GameType, showFast: boolean, checkGame: CheckGameType) => {
        const nameBackgroundColor = checkGame.name ? "green" : "red"; 
        const yearBackgroundColor = checkGame.year ? "green" : "red";
        const genreBackgroundColor = checkGame.genre ? "green" : "red";
        const platformBackgroundColor = checkGame.platform ? "green" : "red";
        const publisherBackgroundColor = checkGame.publisher ? "green" : "red";
    
        return (
            <GameCards
                key={foundGame.idGame}
                name={foundGame.name}
                year={foundGame.year}
                genre={foundGame.genres.map(genre => genre.name).join(', ')} // Wyświetlanie listy gatunków
                platform={foundGame.platforms.map(platform => platform.name).join(', ') || "Nieznana"} // Wyświetlanie listy platform
                publisher={foundGame.publisher} // Wyświetlanie pojedynczego stringu wydawcy
                nameBackgroundColor={nameBackgroundColor}
                yearBackgroundColor={yearBackgroundColor}
                genreBackgroundColor={genreBackgroundColor}
                platformBackgroundColor={platformBackgroundColor}
                publisherBackgroundColor={publisherBackgroundColor}
                showFast={showFast}
            />
        );
    };

    useEffect(() => {
        if (submitComponents.length > 0 && submitRef.current) {
            submitRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [submitComponents]);

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
                    {showGuessInput && ( 
                        <GuessInput 
                            placeholder={"Odgadnij grę..."} 
                            onButtonClick={getGames} 
                            games={games.map((game) => game.name)}
                            guessedGames={guessedGames.map((game) => game)}
                            inputValue={inputValue}
                            setInputValue={setInputValue}
                            selectedValue={selectedValue}
                            setSelectedValue={setSelectedValue}
                        />
                    )}
                </Row>
                <HeaderGameCard />
                
                {components}
                {submitComponents}
            </Container>
        </div>
    );
};

export default Game;
