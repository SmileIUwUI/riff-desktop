import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import LoadingPage from "./pages/LoadingPage/LoadingPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import "./assets/css/styles.css"

function App() {
    return (
        <main className='main'>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Navigate to="/loading" replace />
                        }
                    />
                    <Route
                        path="/loading"
                        element={<LoadingPage />}
                    />
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />
                </Routes>
            </Router>
        </main>
    );
}

export default App;
