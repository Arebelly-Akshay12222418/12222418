import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams
} from 'react-router-dom';

import ShortenForm from './components/ShortenForm';
import StatsPage from './components/StatsPage';
import { logger } from './components/LoggerMiddleware';

function RedirectToOriginal() {
  const { code } = useParams();
  const storedLinks = JSON.parse(localStorage.getItem('urls')) || [];

  const index = storedLinks.findIndex(item => item.id === code);

  if (index !== -1) {
    const matchedEntry = storedLinks[index];

    const newClick = {
      time: new Date().toISOString(),
      source: 'React App',
      location: 'India (simulated)'
    };

    matchedEntry.clicks.push(newClick);
    logger('Short URL clicked', newClick);

    storedLinks[index] = matchedEntry;
    localStorage.setItem('urls', JSON.stringify(storedLinks));

    window.location.href = matchedEntry.original;
  }

  return <Navigate to="/" />;
}

function App() {
  // We just use this to trigger a re-render after storing new links
  const [, setUrls] = useState(JSON.parse(localStorage.getItem('urls')) || []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShortenForm setUrls={setUrls} />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:code" element={<RedirectToOriginal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
