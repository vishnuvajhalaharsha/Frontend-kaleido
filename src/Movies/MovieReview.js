import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Rating } from '@mui/material';

const MovieReview = ({ movie, onSubmitReview }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    if (rating <= 0 || review.trim() === '') {
      alert('Please provide a rating and a review.');
      return;
    }
    onSubmitReview({ movie, rating, review });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {movie.Title} ({movie.Year})
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Rating:
        </Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Write your review here..."
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Review
      </Button>
    </Box>
  );
};

export default MovieReview;
