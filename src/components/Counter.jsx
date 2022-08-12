import React, {useState} from 'react';

const Counter = () => {
    const [likesCounter, setLikes] = useState(0);

    function increment() {
        setLikes(likesCounter+1)
        console.log('likesCounter :', likesCounter);
      }
    
      function decrement() {
        setLikes(likesCounter-1)
        console.log('likesCounter :', likesCounter);
      }
    
    return (
        <div>
              <h1>{likesCounter}</h1>
  <br />
 <button onClick={increment}>++</button>
 <button onClick={decrement}>--</button>

 
        </div>
    );
};

export default Counter;