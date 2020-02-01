// Packages
import React from 'react';
import PropTypes from 'prop-types';

// Icon
import SearchIcon from './icons/search';

const Search = ({ value, onChange, onClick }) => {
  return (
    <>
      <style jsx>{`
        .search_input {
          transition: all 0.5s ease-out;
          font-size: 14px;
          height: 32px;
          max-width: 60vw;
          width: 278px;
          outline: none;
          padding: 0 12px;
          border: 0.5px solid #eaeaea;
          border-radius: 5px;
        }
        .search_input:focus {
          border-color: #000;
        }
        .search_container {
          margin-top: 12px;
          margin-left: 12px;
        }
        .bt_search {
          transition: all 0.5s ease-out;
          margin-left: 10px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 0.5px solid #eaeaea;
          cursor: pointer;
        }
        .bt_search:hover {
          border-color: #000;
        }
      `}</style>
      <input
        value={value}
        className="search_input"
        placeholder="Search your name...."
        onChange={onChange}
      />
      <div className="bt_search" onClick={onClick}>
        <div className="search_container">
          <SearchIcon />
        </div>
      </div>
    </>
  );
};

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export { Search };
