import React, { useState } from 'react';

function HeaderSearch() {
  const [query, setQuery] = useState('');

  return (
    <div className="header-search">
      <input
        className="header-search-input"
        type="search"
        placeholder="Search CloudPilot..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Search CloudPilot"
      />
    </div>
  );
}

export default HeaderSearch;
