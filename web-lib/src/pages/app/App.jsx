import {Routes, Route} from "react-router-dom";
import {useState} from 'react';

import Header from "../../components/header/Header.jsx";
import Home from "../../pages/home/Home.jsx";
import Library from "../../pages/library/Library.jsx";
import Feedback from "../../pages/feedback/Feedback.jsx";
import Auth from "../../pages/auth/Auth.jsx";
import About from "../../pages/about/About.jsx";
import NotFound from "../../pages/404/Page404.jsx";

const App = () => {
    const [userName, setUserName] = useState('');

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/library" element={<Library />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App
