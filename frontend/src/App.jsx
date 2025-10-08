import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookLaunch from './pages/bookLaunch.jsx';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1 className="font-poppins">Home Page!</h1>} />
      <Route path="/about-us" element={<h1>About Page</h1>} />
      <Route path="/contact-us" element={<h1>Contact Page</h1>} />
      <Route path="/book-launch" element={<BookLaunch />} />
      <Route path="*" element={<h1>404 Not Found!</h1>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
