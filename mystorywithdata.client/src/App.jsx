import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About';
import Blog from './pages/Blog'
import Rapports from './pages/Rapports'
import Services from './pages/Services'
import Feedback from './pages/Feedback'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/rapports" element={<Rapports />} />
                <Route path="/services" element={<Services />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App
