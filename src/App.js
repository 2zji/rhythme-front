import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';

function App() {
    const [hello, setHello] = useState('');

    useEffect(() => {
        axios.get('/api/test')
            .then((res) => {
                setHello(res.data);
            });
    }, []);

    return (
        <div className="App">
            <Header />
            <div>
                백엔드 데이터 : {hello}
            </div>
        </div>
    );
}

export default App;
