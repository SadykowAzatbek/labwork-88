import './App.css';
import {Route, Routes} from 'react-router-dom';
import AppToolbar from './components/UI/AppToolbar.tsx';
import Login from './features/Users/Login.tsx';
import Register from './features/Users/Register.tsx';

function App() {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App;
