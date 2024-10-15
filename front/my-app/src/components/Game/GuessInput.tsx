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
}

const GuessInput: React.FC<{ placeholder: string; onButtonClick: () => void; games: string[] }> = ({ placeholder, onButtonClick, games }) => {
    return (
        <InputGroup className="mb-3 guess-input-group">
            <DropDownMenu games={games}/>
            <Button className="guess-button" variant="warning" onClick={onButtonClick}>
                <div className="paper-plane-icon-border">
                    <FontAwesomeIcon className="paper-plane-icon" icon={faPaperPlane} />
                </div>
            </Button>
        </InputGroup>
    );
}

export default GuessInput;