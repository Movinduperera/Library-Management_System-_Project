import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ViewBooks from './components/viewbooks';
import CreateBooks from './components/createbooks';
import UpdateBooks from './components/updatebooks';
import DeleteBooks from './components/deletebooks';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/view" element={<ViewBooks />} />
                <Route path="/create" element={<CreateBooks />} />
                <Route path="/update/:id" element={<UpdateBooks />} />
                <Route path="/delete/:id" element={<DeleteBooks />} />
            </Routes>
        </Router>
    );
}

export default App;
