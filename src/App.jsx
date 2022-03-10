import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Ovens from './components/Ovens/Ovens';
import Wallet from './components/Wallet/Wallet';

function App() {
    return (
        <div className="bg-gray-900 min-h-screen">
            <Wallet />
        </div>
    )
}


export default App;
