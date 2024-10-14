import "./Game.css";
import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const GuessInput = ({ placeholder, onButtonClick }) => {
    return (
        <InputGroup className="mb-3 guess-input-group">
            <Form.Control 
                className="guess-input"
                placeholder={placeholder} 
            />
            <Button className="guess-button" variant="Warning" onClick={onButtonClick}>
                <FontAwesomeIcon className="paper-plane-icon" icon={faPaperPlane} />
            </Button>
        </InputGroup>
    );
}

export default GuessInput;
