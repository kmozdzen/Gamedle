import "./Game.css";
import React from 'react';
import { Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

interface Games {
    games: string[];
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    selectedValue: string | null;
    setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>;
}

const DropDownMenu: React.FC<Games> = ({
    games,
    inputValue,
    setInputValue,
    selectedValue,
    setSelectedValue,
}) => {
    const filteredOptions = inputValue.length > 0
        ? games.filter((game) =>
            game.toLowerCase().startsWith(inputValue.toLowerCase())
        )
        : [];

    return (
        <Form.Group className='game-drop-down-menu'>
            <Typeahead
                id="autocomplete-input"
                options={filteredOptions}
                placeholder="Wpisz nazwę gry..."
                emptyLabel="Brak pasujących opcji"
                onInputChange={setInputValue}
                onChange={(selected) => {
                    if (selected.length > 0) {
                        setSelectedValue(selected[0] as string);
                    } else {
                        setSelectedValue(null);
                    }
                }}
                selected={selectedValue ? [selectedValue] : []}
            />
        </Form.Group>
    );
};

export default DropDownMenu;
