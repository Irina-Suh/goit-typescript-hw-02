import React, { useState } from 'react'
import toast from 'react-hot-toast';
import s from './SearchBar.module.css'

const SearchBar = ({onSubmit }) => {
  const [query,setQuery] = useState('');
  const handleChange = e => {
    setQuery(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim()) {
        return toast.error('Enter your text...');
    }
 
    onSubmit(query);

    setQuery('');
  }
 
  return (
    <header>
      <form onSubmit={handleSubmit}>
        <div className={s.container}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder ="Search images and photos"
            value={query}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </div>
      </form>
    </header>
  );
}

export default SearchBar