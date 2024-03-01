import './App.css';
import {Route, Routes} from 'react-router-dom';
import AppToolbar from './components/UI/AppToolbar.tsx';
import Login from './features/Users/Login.tsx';
import Register from './features/Users/Register.tsx';
import Posts from './features/Posts/Posts.tsx';
import PostsForm from './features/Posts/PostsForm.tsx';

function App() {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new" element={<PostsForm />} />
      </Routes>
    </>
  )
}

export default App;
