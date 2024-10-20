import "./Game.css";
import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import DropDownMenu from "./DropDownMenu";

interface GuessInputProps {
    placeholder: string;
    onButtonClick: () => void;
    games: string[];
    guessedGames: string[];
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    selectedValue: string | null;
    setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>;
}

const GuessInput: React.FC<GuessInputProps> = ({
    placeholder,
    onButtonClick,
    games,
    guessedGames,
    inputValue,
    setInputValue,
    selectedValue,
    setSelectedValue,
}) => {
    return (
        <InputGroup className="mb-3 guess-input-group">
            <DropDownMenu
                games={games.filter(game => !guessedGames.includes(game))}
                inputValue={inputValue}
                setInputValue={setInputValue}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
            />
            <Button className="guess-button" variant="warning" onClick={onButtonClick}>
                <div className="paper-plane-icon-border">
                    <FontAwesomeIcon className="paper-plane-icon" icon={faPaperPlane} />
                </div>
            </Button>
        </InputGroup>
    );
}

export default GuessInput;
