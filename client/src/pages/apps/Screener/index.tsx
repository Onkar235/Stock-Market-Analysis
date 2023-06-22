import React, { useEffect, useState } from 'react';
import './screener.css'; // Import the CSS file
// hooks
import { usePageTitle } from '../../../hooks';

const Screener = () => {
  // set pagetitle
  usePageTitle({
    title: 'Screener',
    breadCrumbItems: [
        {
            path: '/apps/screener',
            label: 'Screener',
            active: true,
        },
    ],
});
  const [databases, setDatabases] = useState<string[]>([]);
  const [selectedDatabase, setSelectedDatabase] = useState<string>('');
  const [collections, setCollections] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>('');
  const [documents, setDocuments] = useState<any[]>([]);
  const [showTable, setShowTable] = useState<boolean>(false); // Track whether to show the table
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  useEffect(() => {
    // Fetch the list of databases
    fetch('http://localhost:5000/api/databases')
      .then((response) => response.json())
      .then((data) => setDatabases(data))
      .catch((error) => console.error('Error fetching databases:', error));
  }, []);

  useEffect(() => {
    if (selectedDatabase) {
      // Fetch the collections for the selected database
      fetch(`http://localhost:5000/api/${selectedDatabase}/collections`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch collections');
          }
          return response.json();
        })
        .then((data) => {
          setCollections(data);
        })
        .catch((error) => console.error('Error fetching collections:', error));
    } else {
      // Reset collections if no database is selected
      setCollections([]);
    }
  }, [selectedDatabase]);

  const handleDatabaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDatabase = event.target.value;
    setSelectedDatabase(selectedDatabase);
    setSelectedCollection('');
    setShowTable(false); // Reset the showTable state when changing the database
  };

  // const handleCollectionClick = (collection: string) => {
  //   setSelectedCollection(collection);
  //   // Fetch the documents for the selected collection
  //   fetch(`http://localhost:5000/api/${selectedDatabase}/collections/${collection}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch documents');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setDocuments(data);
  //       setShowTable(true); // Set showTable to true when documents are fetched
  //     })
  //     .catch((error) => console.error('Error fetching documents:', error));
  // };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchInput(searchValue);
    if (searchValue.trim() === '') {
      setSearchResults([]);
    } else {
      // Filter the collections based on the search input
      const filteredCollections = collections.filter((collection) =>
        collection.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchResults(filteredCollections);
    }
  };

  const handleSearchResultClick = (collection: string) => {
    setSelectedCollection(collection);
    setSearchInput('');
    setSearchResults([]);
    // Fetch the documents for the selected collection
    fetch(`http://localhost:5000/api/${selectedDatabase}/collections/${collection}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }
        return response.json();
      })
      .then((data) => {
        setDocuments(data);
        setShowTable(true); // Set showTable to true when documents are fetched
      })
      .catch((error) => console.error('Error fetching documents:', error));
  };

  return (
    <div className="app">
      <div>
        <label htmlFor="database-select">Select a Stock:</label>
        <select id="database-select" value={selectedDatabase} onChange={handleDatabaseChange}>
          <option value="">-- Select a Stock --</option>
          <option value="bse_listed_stocks">bse_listed_stocks</option>
          <option value="nse_listed_stocks">nse_listed_stocks</option>
          {databases.map((database, index) => (
            <option key={index} value={database}>
              {database}
            </option>
          ))}
        </select>
      </div>
      {selectedDatabase && (
        <div>
          <h1>{selectedDatabase}</h1>
          <div>
            <label htmlFor="search-input">Search Collection:</label>
            <input
              type="text"
              id="search-input"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            {searchResults.length > 0 && (
              <ul className="search-results">
                {searchResults.map((collection, index) => (
                  <li
                    key={index}
                    onClick={() => handleSearchResultClick(collection)}
                    className={`search-result-item ${
                      selectedCollection === collection ? 'active' : ''
                    }`}
                  >
                    {collection}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      {showTable && documents.length > 0 && (
        <div className="table-responsive">
          <h1>{selectedCollection}</h1>
          <div className="table-container">
            <table className="document-table">
              <thead>
                <tr>
                  {Object.keys(documents[0])
                    .filter((key) => key !== '_id' && key !== 'Unnamed: 0')
                    .map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {documents.map((document, index) => (
                  <tr key={index}>
                    {Object.entries(document)
                      .filter(([key]) => key !== '_id' && key !== 'Unnamed: 0')
                      .map(([key, value]) => (
                        <td
                          key={key}
                          className={typeof value === 'number' && value < 0 ? 'negative' : ''}
                        >
                          {value as string}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Screener;
