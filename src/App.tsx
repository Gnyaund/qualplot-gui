import React from 'react';
import './App.css';
import Uploader from './components/Uploader';
import VariableList from './components/VariableList';
import TestList from './components/TestList';
import BasedTable from './components/BasedTable';

function App() {
  return (
    <div className="App">
      <header>
        <BasedTable />
      </header>
    </div>
  );
}

export default App;
