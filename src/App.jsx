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
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={
                        <div className="bg-gray-900 min-h-screen">
                            <Wallet />
                        </div>
                    }
                />
                <Route
                    path='/ovens'
                    element={<Ovens/>}
                />
            </Routes>
        </BrowserRouter>
    )
}


export default App;
