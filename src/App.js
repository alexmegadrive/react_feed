import React, { useState, useRef } from 'react';
import Counter from './components/Counter.jsx';
import PostItem from './components/PostItem.jsx';
import PostList from './components/PostList.jsx';
import MyButton from './components/UI/button/MyButton.jsx';
import MyInput from './components/UI/input/MyInput.jsx';
import './styles/app.css'
function App() {

const [posts, setPosts] = useState([
  {id: 1, title: 'JavaScript', body: 'Description'},
  {id: 2, title: 'JavaScript', body: 'Description'},
  {id: 3, title: 'JavaScript', body: 'Description'}
]); 

// const [title, setTitle] = useState('')
// const [body, setBody] = useState('')
const [post, setPost] = useState({title:'', body:''})



const addNewPost = (e) => {
e.preventDefault()

setPosts([...posts, {...post, id: Date.now(), title:post.title, body:post.body}])
setPost({title:'', body:''})
// setTitle('')
// setBody('')


}

  return (
    <div className="App">
      <form action="">
      {/* управляемый инпут */}
        <MyInput
        value={post.title}
        onChange={e => setPost({...post, title:e.target.value})}
         type="text" 
         placeholder='Название поста'
          />
        {/*  неуправляемый компонент */}
          {/* <input ref={bodyInputRef} type="text" /> */}
        <MyInput 
        // ref={bodyInputRef}
        value={post.body}
        onChange={e => setPost({...post, body:e.target.value})}
        type="text"
        placeholder='Описание поста'
        />
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
<PostList posts={posts} title="Список постов про JS"/>
</div>
  );
}

export default App;
