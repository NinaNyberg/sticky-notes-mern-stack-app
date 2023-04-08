import { useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import { noteSearch } from '../services/notes';

const Search = ({ notes, setNotes }) => {
  const [term, setTerm] = useState('');

  // ALTERNATIVE: searches after pressing "Enter" on keyboard, uses form tags below, that are now commented out
  //   const handleSearch = (event) => {
  //     event.preventDefault();
  //     noteSearch(term).then((data) => {
  //       console.log(data);
  //       setNotes(data.notes);
  //     });
  //   };

  useEffect(() => {
    noteSearch(term).then((data) => {
      setNotes(data.notes);
      if (!term) {
        return setNotes(data.notes);
      }
    });
  }, [term]);

  return (
    <div className="search">
      <MdSearch className="search-icon" size="1.3em" />

      {/* <form className="search-form" onSubmit={handleSearch}> */}
      <input
        id="input-search-term"
        type="text"
        placeholder="Search..."
        value={term}
        onChange={(event) => setTerm(event.target.value)}
      />
      {/* </form> */}
    </div>
  );
};

export default Search;
