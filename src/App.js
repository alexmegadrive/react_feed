import React, { useState } from 'react';

function App() {

  const [likesCounter, setLikes] = useState(0);
  const [value, setValue] = useState('Текст в инпуте');

  function increment() {
    setLikes(likesCounter+1)
    console.log('likesCounter :', likesCounter);
  }

  function decrement() {
    setLikes(likesCounter-1)
    console.log('likesCounter :', likesCounter);
  }

  return (
    <div className="App">

  <h1>{value}</h1>
  <input 
  type="text"
   value={value}
   onChange={event => setValue(event.target.value)}
    />
  <h1>{likesCounter}</h1>
  <br />
 <button onClick={increment}>++</button>
 <button onClick={decrement}>--</button>

 
    </div>
  );
}

export default App;
