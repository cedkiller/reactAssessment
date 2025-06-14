import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Auth from './pages/Auth';
import Blog from './pages/Blog';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/Blog' element={<Blog/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
