import { useState } from 'react';
import './App.css';
import { Header } from './Header/Header';
import { Body } from './Body/Body';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="App">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Body searchQuery={searchQuery} />
    </div>
  );
}
