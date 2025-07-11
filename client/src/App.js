import logo from './logo.svg';
import './App.css';
import ReturnProduct from './ReturnProduct';
import OwnershipStatus from './OwnershipStatus'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main style={{ padding: '2rem' }}>
        <ReturnProduct />
        <OwnershipStatus />
      </main>
    </div>
  );
}

export default App;
