import React, { useState, useRef, useMemo, useEffect } from 'react';
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
import { usePosts } from './components/hooks/usePosts.js';
import axios from 'axios';
import PostService from './API/PostService.js';
import Loader from './components/UI/Loader/Loader.jsx';
import { useFetching } from './components/hooks/useFetching.js';
import { getPagesArray, getPagesCount } from './utils/pages.js';
function App() {

const [posts, setPosts] = useState([
  // {id: 1, title: '1JavaScript', body: '3Description'},
  // {id: 2, title: '2JavaScript22', body: '2Description'},
  // {id: 3, title: '3JavaScript33', body: '1Description'}
]); 

// объединяем в стейте метод сортировки и поисковый запрос
const [filter, setFilter] = useState({sort: '', query: ''})

//стейт видимости модального окна
const [modalState, setModalState] = useState(false)
const [totalPages, setTotalPages] = useState(0)
const [limit, setLimit] = useState(10)
const [page, setPage] = useState(1)
const sortedFilteredPosts = usePosts(posts, filter.sort, filter.query)
let pagesArray = getPagesArray(totalPages)
// console.log('pagesArray :', pagesArray);

const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
  const response = await PostService.getAll(limit, page);
  setPosts(response.data); 
  const totalCount = response.headers['x-total-count']
  setTotalPages(getPagesCount(totalCount, limit))
})

useEffect(() => {
fetchPosts()
}, [])

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
      {postError && <h1>Произошла ошибка загрузки {postError}</h1>}
      {isPostsLoading
      ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div> 
        : <PostList 
        remove={removePost}
        posts={sortedFilteredPosts} 
        title="Список постов про JS"
        />
      }
      <div style={{marginTop: '5px', marginBottom: '5px'}}>
      {pagesArray.map (p => 
        <button className={page === p ? 'page page__current' : 'page'} style={{marginRight: '5px'}}>
          {p}
          </button>
      )}
      </div>
     
      
      

    </div>
  );
}

export default App;
