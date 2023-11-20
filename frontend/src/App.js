import React from 'react';
import TodoList from './TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React TodoList</h1>
      </header>
      <main className="App-main">
        <TodoList />
      </main>
    </div>
  );
}

export default App;
