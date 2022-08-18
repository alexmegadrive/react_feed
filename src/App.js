import React, { useState, useRef, useMemo } from 'react';
import Counter from './components/Counter.jsx';
import PostForm from './components/PostForm.jsx';
import PostFilter from './components/PostFilter.jsx';
import PostItem from './components/PostItem.jsx';
import PostList from './components/PostList.jsx';
import MySelect from './components/UI/select/MySelect.jsx';
import MyInput from './components/UI/input/MyInput.jsx';
import './styles/app.css'
import MyModal from './components/UI/MyModal/MyModal.jsx';
import MyButton from './components/UI/button/MyButton.jsx';
function App() {

const [posts, setPosts] = useState([
  {id: 1, title: '1JavaScript', body: '3Description'},
  {id: 2, title: '2JavaScript22', body: '2Description'},
  {id: 3, title: '3JavaScript33', body: '1Description'}
]); 


// объединяем в стейте метод сортировки и поисковый запрос
const [filter, setFilter] = useState({sort: '', query: ''})

//стейт видимости модального окна
const [modalState, setModalState] = useState(false)

// const sortedPosts = getSortedPosts()
const sortedPosts = useMemo(() => {
  console.log('отработала сортировка getSortedPosts')
  // console.log('selectedSort :', selectedSort);

  if (filter.sort) {
    return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]) )
  }
  return posts;
}, [filter.sort, posts])

const sortedFilteredPosts = useMemo(() => {
  return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
}, [filter.query, sortedPosts])


const createPost = (newPost) => {
  setPosts([...posts, newPost])
  setModalState(false)
}

// получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

 

  return (
    <div className="App">

      <MyButton style={{marginTop: '30px'}} onClick={() => setModalState(true)}>
        Создать пост
      </MyButton>

      <MyModal visible={modalState} setVisible={setModalState}>
        <PostForm create={createPost}/>
      </MyModal>

      <hr style={{margin: '15px 5px'}}/>
      <PostFilter
       filter={filter} 
       setFilter={setFilter}
       />
      
      <PostList 
       remove={removePost}
       posts={sortedFilteredPosts} 
       title="Список постов про JS"
       />
      

    </div>
  );
}

export default App;
