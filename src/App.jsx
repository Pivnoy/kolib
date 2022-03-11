import React from 'react';
import Loader from './components/Loader/Loader';
import Wallet from './components/Wallet/Wallet';

function App() {
    return (
        <body className="bg-gradient-to-r from-dark-blue via-not-dark-blue to-dark-blue min-h-screen">
            {/* <Wallet /> */}
            <Loader/>
        </body>
    )
}


export default App;
