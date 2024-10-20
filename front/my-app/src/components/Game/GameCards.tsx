import React, { useEffect, useState } from "react";
import "./Game.css";
import GameCard from "./GameCard";
import { Col, Row } from "react-bootstrap";

interface GameCardsType {
    nameBackgroundColor: string;
    yearBackgroundColor: string;
    genreBackgroundColor: string;
    platformBackgroundColor: string;
    publisherBackgroundColor: string;

    name: string;
    year: number;
    genre: string;
    platform: string;
    publisher: string;

    showFast: boolean;
}

const GameCards: React.FC<GameCardsType> = ({
    name,
    year,
    genre,
    platform,
    publisher,
    nameBackgroundColor,
    yearBackgroundColor,
    genreBackgroundColor,
    platformBackgroundColor,
    publisherBackgroundColor,
    showFast
}) => {
    // Stan do przechowywania widoczności kafelków
    const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false, false]);

    useEffect(() => {
        // Funkcja do pokazywania kafelków jeden po drugim
        const showCards = () => {
            const newVisibleCards = [...visibleCards];
            if (showFast) {
                visibleCards.forEach((_, index) => {
                    setTimeout(() => {
                        newVisibleCards[index] = true;
                        setVisibleCards([...newVisibleCards]);
                    }, index * 500); // 0.5 sekundy
                });
            } else {
                newVisibleCards.fill(true); // Ustaw wszystkie karty jako widoczne
                setVisibleCards(newVisibleCards);
            }
        };

        showCards(); // Uruchamiamy funkcję przy montowaniu komponentu
    }, []); // Pusty array oznacza, że efekt uruchomi się tylko raz

    return (
        <Row className="justify-content-center margin-top">
            <Col ms={2} className="margin-auto">
                {visibleCards[0] && (
                    <GameCard backgroundColor={nameBackgroundColor} categoryName="Gra" gameCategoryName={name} />
                )}
            </Col>
            <Col ms={2} className="margin-auto">
                {visibleCards[1] && (
                    <GameCard backgroundColor={yearBackgroundColor} categoryName="Rok" gameCategoryName={year} />
                )}
            </Col>
            <Col ms={2} className="margin-auto">
                {visibleCards[2] && (
                    <GameCard backgroundColor={genreBackgroundColor} categoryName="Gatunek" gameCategoryName={genre} />
                )}
            </Col>
            <Col ms={2} className="margin-auto">
                {visibleCards[3] && (
                    <GameCard backgroundColor={platformBackgroundColor} categoryName="Platforma" gameCategoryName={platform} />
                )}
            </Col>
            <Col ms={2} className="margin-auto">
                {visibleCards[4] && (
                    <GameCard backgroundColor={publisherBackgroundColor} categoryName="Wydawca" gameCategoryName={publisher} />
                )}
            </Col>
        </Row>
    );
};

export default GameCards;
