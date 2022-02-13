import React, {useEffect, useState} from 'react';
import './hello.css';

function Hello() {

    const [count, setCount] = useState(0);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        </div>
    )
}

export default Hello;
