import { useEffect, useRef, useState } from 'react';

import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react';

import SearchResults from './SearchResults';

const Search = ({ docs }) => {
  const inputRef = useRef(null);
  const searchConRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleChange = () => {
    const inputValue = inputRef.current.value.toLowerCase();

    setSearchValue(inputValue);
    setSearchResults(
      docs.filter(
        (doc) =>
          doc.filename.toLowerCase().includes(inputValue) ||
          doc.filetype.toLowerCase().includes(inputValue)
      )
    );
  };

  const handleClickOutside = (e) => {
    if (!searchConRef.current.contains(e.target)) {
      setSearchFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <div className="mt-6 max-w-md mx-5 sm:mx-auto" ref={searchConRef}>
      <InputGroup>
        <InputLeftAddon bg="#0B0B1F" borderColor="#0B0B1F" width="0.5">
          <SearchIcon color="#AA8BFF" opacity="0.8" />
        </InputLeftAddon>
        <Input
          placeholder="Search your files..."
          _placeholder={{ color: '#AA8BFF', opacity: '0.8' }}
          color="#AA8BFF"
          bg="#0B0B1F"
          border="none"
          boxShadow="lg"
          focusBorderColor="none"
          ref={inputRef}
          onChange={handleChange}
          onPaste={handleChange}
          onFocus={() => setSearchFocus(true)}
        />
        {searchValue && (
          <InputRightAddon
            bg="#0B0B1F"
            borderColor="#0B0B1F"
            cursor="pointer"
            onClick={() => {
              setSearchValue(true);
              setSearchValue('');
              inputRef.current.value = null;
            }}
          >
            <CloseIcon color="#AA8BFF" opacity="0.8" fontSize="sm" />
          </InputRightAddon>
        )}
      </InputGroup>
      {searchFocus && (
        <SearchResults
          results={searchResults}
          searchVal={searchValue}
          inputRef={inputRef}
          change={handleChange}
        />
      )}
    </div>
  );
};

export default Search;
