import React from 'react';
import Transaction from './components/Transaction/Transaction';
import Wallet from './components/Wallet/Wallet';

function App() {
    return (
        <body class="bg-gradient-to-r from-dark-blue via-not-dark-blue to-dark-blue min-h-screen">
            <Wallet />
            <Transaction/>
        </body>
    )
}


export default App;
