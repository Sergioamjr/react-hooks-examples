import React, { useState, useEffect } from "react";
import { fetchPhotos } from "./services";
import { Browser } from "react-kawaii";

let debounce;
function App() {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [hasError, setErrors] = useState(false);

  useEffect(
    async () => {
      try {
        setLoading(true);
        const { photos } = await fetchPhotos(search);
        setPhotos(photos);
        setLoading(false);
        setErrors(false);
      } catch (error) {
        setErrors(true);
        setLoading(false);
      }
    },
    [search]
  );

  const updateSearchHandler = ({ target: { value } }) => {
    clearInterval(debounce);
    debounce = setTimeout(() => {
      setPhotos([]);
      setSearch(value);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="max-width-container">
        <h1 className="p-center m-bottom-40 color-theme fs-1 ">
          React Hooks Example
        </h1>
        <input
          type="text"
          onChange={updateSearchHandler}
          placeholder="Ex. cats"
        />
      </div>
      {!hasError && !isLoading && !search && (
        <div className="p-center">
          <p className="alert m-bottom-40">Search by category</p>
          <Browser size={200} mood="happy" color="#e0e4e8" />
        </div>
      )}
      {hasError && !isLoading && (
        <div className="p-center">
          <p className="alert alert-error m-bottom-40">
            Opss, an error has occurred
          </p>
          <Browser size={200} mood="ko" color="#e0e4e8" />
        </div>
      )}
      {isLoading && search && (
        <div className="p-center">
          <p className="alert m-bottom-40">Searching</p>
          <Browser size={200} mood="blissful" color="#e0e4e8" />
        </div>
      )}
      {!hasError && !isLoading && search && photos && photos.length === 0 && (
        <div className="p-center">
          <p className="alert m-bottom-40">No content found</p>
          <Browser size={200} mood="sad" color="#e0e4e8" />
        </div>
      )}
      <div className="sm-column-counter-2 md-column-counter-3">
        {photos &&
          photos.length > 0 &&
          photos.map(photo => {
            return (
              <div key={photo.id} className="m-bottom-15">
                <img alt="" src={photo.src.medium} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
