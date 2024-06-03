import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import AccountSelector from "./AccountSelect";
import MovieSearch from "./Movies/MoviesSearch";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index path="/login" element={<AccountSelector />} />
        <Route path="/movies/:id" element={<MovieSearch />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
