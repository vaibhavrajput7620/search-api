import  { useState, useEffect } from 'react';
import axios from 'axios';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0); 

  useEffect(() => {
    if (query.length > 0) {
      axios.get(`http://localhost:3000/search?q=${query}`)
        .then(res => setResults(res.data))
        .catch(err => console.error(err));
    } else {
      setResults([]);
    }
  }, [query]);



  const handleMouseClick = (index) => {
    handleSelection(results[index]);
  };

  const handleSelection = (selectedUser) => {
    alert(`Selected: ${selectedUser.name}`);
    setQuery(selectedUser.name);
    setResults([]);
    setHighlightedIndex(0);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users by ID, address, name..."
        className="search-input"
      />
      <ul className="search-results">
        {results.length > 0 ? (
          results.map((user, index) => (
            <li
              key={`${user.id}-${index}`}
              className={`search-result ${highlightedIndex === index ? 'highlighted' : ''}`}
              onClick={() => handleMouseClick(index)}
            >
              <div className="user-id">{user.id}</div>
              <div className="user-name">{user.name}</div>
              <div className="user-address">{user.address}</div>
              <div className="user-pincode">{user.pincode}</div>
            </li>
          ))
        ) : (
          query.length > 0 && (
            <li className="search-result empty">
              <div>No results found</div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Search;
