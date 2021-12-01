import './App.css';
import { useEffect, useState } from "react";
// import { Chessboard } from 'react-chessboard';
// import ReactDOM from 'react-dom';

import BasicBoard from './BasicBoard.js';

function App() {
    const [chessboardSize, setChessboardSize] = useState('BasicBoard');
    // const [selectedBoard, setSelectedBoard] = useState('BasicBoard');

    useEffect(() => {
        function handleResize() {
            const display = document.getElementsByClassName('container')[0];
            setChessboardSize(display.offsetWidth - 20);
        }

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className="container">
            <h1>Basic Board ex</h1>
            <>
                <h2>Basic Board</h2>
                <BasicBoard boardWidth={chessboardSize} />
                <br />
            </>
        </div>
    );
}

export default App;
