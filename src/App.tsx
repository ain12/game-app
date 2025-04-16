import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/contactPage" element={<ContactPage />} />
      </Routes>
    </Router>
  )
}

export default App
