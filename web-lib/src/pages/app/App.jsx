import {Routes, Route} from "react-router-dom";
import {useState} from 'react';

import Header from "../../components/header/Header.jsx";
import Home from "../../pages/home/Home.jsx";
import Library from "../../pages/library/Library.jsx";
import Feedback from "../../pages/feedback/Feedback.jsx";
import Auth from "../../pages/auth/Auth.jsx";
import About from "../../pages/about/About.jsx";
import AdminPanel from "../../pages/adminPanel/AdminPanel.jsx";
import NotFound from "../../pages/404/Page404.jsx";

const App = () => {
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('user');

    return (
        <>
            <Header
                userName={userName}
                userRole={userRole}
                OnLogout={() => {
                    setUserName('');
                    setUserRole('user');
                }}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/library" element={<Library userRole={userRole} />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth"
                   element={
                        <Auth
                            onLogin={(name, role) => {
                                setUserName(name);
                                setUserRole(role);
                            }}
                        />
                    }
                />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App
