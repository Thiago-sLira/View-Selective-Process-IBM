// import { useState } from 'react';
import './App.css';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  // const [count, setCount] = useState(0);

  return (
    <body className="root">
      <Header />
      <Body />
      <Footer />
    </body>
  );
}

export default App;
