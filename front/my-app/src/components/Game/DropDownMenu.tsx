import "./Game.css";
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

interface Games {
    games: string[]; // Typ dla przekazywanych gier
}

const DropDownMenu: React.FC<Games> = ({ games }) => { // Destrukturyzacja props
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  // Używamy games jako źródła danych
  const filteredOptions = (inputValue.length > 0) ? 
    games.filter((game) => 
      game.toLowerCase().startsWith(inputValue.toLowerCase()) // Filtrowanie gier na podstawie wprowadzonego tekstu
    )
    : [];


    console.log(inputValue)
    console.log(selectedValue)
  return (
    <Form.Group className='game-drop-down-menu'>
      <Typeahead
        id="autocomplete-input"
        options={filteredOptions} // Użycie przefiltrowanych opcji
        placeholder="Wpisz nazwę gry..."
        emptyLabel="Brak pasujących opcji"
        onInputChange={setInputValue} // Ustawienie stanu na podstawie wprowadzonego tekstu
      />
    </Form.Group>
  );
};

export default DropDownMenu;
