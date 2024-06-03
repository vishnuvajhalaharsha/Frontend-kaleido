import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, CardMedia } from '@mui/material';
import MovieReview from './MovieReview';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchBalance, submitReview } from '../api';
import { convertToReadable } from '../utils';

const MovieSearch = ({  }) => {
  const {id} =useParams()
  const navigate=useNavigate()
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [tokens, setTokens]=useState("0")

  //fetch bal
  const  fetchAsyncBalance=async()=>{
   const bal= await fetchBalance(id)
   
   setTokens(bal.balance.output)
  }
  
  useEffect(()=>{
   fetchAsyncBalance()
   
  },[])

//serach query to find movies
  const handleSearch = async () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 3) return;
    const response = await fetch(`http://www.omdbapi.com/?s=${trimmedQuery}&apikey=cd0b0cb1`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length >= 3) {
      handleSearch();
    }
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };
// submit review api call
  const handleReviewSubmit = async(reviewData) => {
  let requestObj={
    ethId: id,
    movieId: reviewData.movie.imdbID,
    rating: reviewData.rating,
    review: reviewData.review
  }
    await submitReview(requestObj)
    console.log('Review submitted:', requestObj);
    fetchAsyncBalance()
    setSelectedMovie(null); 
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
      Movie Search Dashboard
      </Typography>
      <Typography variant="h4" gutterBottom>
        {`${convertToReadable(tokens)} RTK`}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Logged in as: {id}
      </Typography>
      <Button variant="outlined" color="secondary" onClick={()=>navigate('/login')}>
        Logout
      </Button>
      <Box sx={{ mt: 3 }}>
        {!selectedMovie && (
          <>
            <TextField
              label="Search for a movie..."
              variant="outlined"
              fullWidth
              value={query}
              onChange={handleInputChange}
            />
            {query.length > 3 &&(    <Box sx={{ mt: 2 }}>
              {movies.map((movie) => (
              
                <Card
                  key={movie.imdbID}
                  sx={{ mb: 2, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => handleSelectMovie(movie)}
                >
                  <CardMedia
                    component="img"
                    image={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/100x150"}
                    alt={movie.Title}
                    sx={{ width: 100, height: 150 }}
                  />
                  <CardContent>
                    <Typography variant="body1">
                      {movie.Title} ({movie.Year})
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>) }

          </>
        )}
        {selectedMovie && (
          <MovieReview movie={selectedMovie} onSubmitReview={handleReviewSubmit} />
        )}
      </Box>
    </Box>
  );
};

export default MovieSearch;
