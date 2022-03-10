import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Wallet from './components/Wallet/Wallet';

function App() {
    return (
        <body class="bg-gradient-to-r from-dark-blue via-not-dark-blue to-dark-blue min-h-screen">
            <Wallet />
        </body>
    )
}


export default App;
