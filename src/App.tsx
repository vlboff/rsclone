import React from 'react';
import './styles/main.scss';
import SearchPage from './pages/SearchPage/SearchPage';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
        <Header/>
        <SearchPage/>
    </div>
  );
}

export default App;
