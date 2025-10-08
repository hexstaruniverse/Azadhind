import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookLaunch from './pages/bookLaunch';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<h1>About Page</h1>} />
      <Route path="/contact-us" element={<h1>Contact Page</h1>} />
      <Route path="/book-launch" element={<BookLaunch />} />
      <Route path="*" element={<h1>404 Not Found!</h1>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
