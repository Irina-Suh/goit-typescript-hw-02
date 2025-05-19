import React, { useState } from 'react'
import toast from 'react-hot-toast';
import s from './SearchBar.module.css'

interface SearchBarProps {
  onSubmit: (searchStr: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSubmit }) => {
  const [query,setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setQuery(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=> {
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