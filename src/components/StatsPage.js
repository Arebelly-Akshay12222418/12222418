import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

export default function StatsPage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('urls');
    if (storedData) {
      setUrls(JSON.parse(storedData));
    }
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Shortened URLs Stats
      </Typography>

      <List>
        {urls.map((url, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={url.shortUrl}
              secondary={
                `Original: ${url.original}\n` +
                `Created: ${new Date(url.createdAt).toLocaleString()}\n` +
                `Expires: ${new Date(url.expiresAt).toLocaleString()}\n` +
                `Clicks: ${url.clicks.length}`
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
