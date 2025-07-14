import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid
} from '@mui/material';
import { logger } from './LoggerMiddleware';
import { generateShortcode, isValidURL } from '../utils/Helper';

export default function ShortenForm({ setUrls }) {
  const [inputs, setInputs] = useState([
    { url: '', validity: '', shortcode: '' }
  ]);

  const handleChange = (index, field, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][field] = value;
    setInputs(updatedInputs);
  };

  const addNewInputRow = () => {
    if (inputs.length < 5) {
      setInputs([
        ...inputs,
        { url: '', validity: '', shortcode: '' }
      ]);
    }
  };

  const handleSubmit = () => {
    const newEntries = [];

    for (let i = 0; i < inputs.length; i++) {
      const { url, validity, shortcode } = inputs[i];

      if (!url || !isValidURL(url)) {
        alert(`Please enter a valid URL in row ${i + 1}.`);
        return;
      }

      const id = shortcode || generateShortcode();
      const createdAt = new Date();
      const expiryTime = parseInt(validity) || 30;
      const expiresAt = new Date(
        createdAt.getTime() + expiryTime * 60000
      );

      const entry = {
        id,
        original: url,
        shortUrl: `http://localhost:3000/${id}`,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        clicks: []
      };

      logger('Short URL created', entry);
      newEntries.push(entry);
    }

    const existing = JSON.parse(localStorage.getItem('urls')) || [];
    const updatedList = [...existing, ...newEntries];

    localStorage.setItem('urls', JSON.stringify(updatedList));
    setUrls(updatedList);
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Shorten URLs
      </Typography>

      {inputs.map((input, index) => (
        <Grid container spacing={2} key={index} mt={1}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Original URL"
              value={input.url}
              onChange={e =>
                handleChange(index, 'url', e.target.value)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Validity (min)"
              type="number"
              value={input.validity}
              onChange={e =>
                handleChange(index, 'validity', e.target.value)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Custom shortcode (optional)"
              value={input.shortcode}
              onChange={e =>
                handleChange(index, 'shortcode', e.target.value)
              }
            />
          </Grid>
        </Grid>
      ))}

      <Box mt={3}>
        <Button
          onClick={addNewInputRow}
          disabled={inputs.length >= 5}
        >
          + Add URL
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ ml: 2 }}
        >
          Shorten
        </Button>
      </Box>
    </Box>
  );
}
