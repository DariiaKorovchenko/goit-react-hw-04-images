import { useState, useEffect } from 'react';
import css from './App.module.css';
import { fetchService } from './services/search-api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [materials, setMaterials] = useState([]);
  let [pageCounter, setPageCounter] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const handleFormSubmit = search => {
    setSearchQuery(search);
    setMaterials([]);
    setPageCounter(1);
    setError(null);
  };

  const handleCounterPage = () => {
    setPageCounter((pageCounter += 1));
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setStatus('pending');

    fetchService(searchQuery, pageCounter)
      .then(data => {
        if (pageCounter === 1) {
          setMaterials(data.hits);
          setStatus('resolved');
          return;
        }
        if (data.hits.length === 0) {
          setStatus('rejected');
          return Promise.reject(new Error('Not found'));
        }
        if (pageCounter > 1) {
          setMaterials(prevMaterials => [...prevMaterials, ...data.hits]);
          setStatus('resolved');
        } else {
          return Promise.reject(new Error('Not found'));
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [pageCounter, searchQuery]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'rejected' && <h1>{error.message}</h1>}
      {materials.length !== 0 && <ImageGallery items={materials} />}
      {status === 'resolved' && <Button loadMore={handleCounterPage} />}
      {status === 'pending' && <Loader />}
    </div>
  );
}
