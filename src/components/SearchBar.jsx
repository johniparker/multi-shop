import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const SearchBar = ({ setSearchTerm }) => {
  const [tempSearchTerm, setTempSearchTerm] = useState(""); // Temporary search term

  // Handle when the user presses Enter in the input field
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(tempSearchTerm); // Set the search term when Enter is pressed
    }
  };

  // Handle when the user clicks the search button
  const handleSearchClick = () => {
    setSearchTerm(tempSearchTerm); // Set the search term when the button is clicked
  };

  // Handle when the user clicks the clear button
  const handleClearClick = () => {
    setTempSearchTerm(""); // Clear the temporary search term
    setSearchTerm(""); // Clear the search term in the parent component
  };

  return (
    <div>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={tempSearchTerm}
        onChange={(e) => setTempSearchTerm(e.target.value)} // Update temporary search term
        onKeyDown={handleKeyDown} // Trigger on Enter key press
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearchClick} // Trigger search on button click
        sx={{ mr: 1 }}
      >
        Search
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClearClick} // Trigger clear on button click
      >
        Clear
      </Button>
    </div>
  );
};

export default SearchBar;
