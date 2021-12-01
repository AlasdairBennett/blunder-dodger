import './App.css';
import { useEffect, useState } from "react";
// import { Chessboard } from 'react-chessboard';
// import ReactDOM from 'react-dom';

import BasicBoard from './boards/BasicBoard';
import PlayVsRandom from "./boards/PlayVsRandom";

function App() {
    const [chessboardSize, setChessboardSize] = useState('BasicBoard');
    const [selectedBoard, setSelectedBoard] = useState('BasicBoard');

    useEffect(() => {
        function handleResize() {
            const display = document.getElementsByClassName('container')[0];
            setChessboardSize(display.offsetWidth - 20);
        }

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function getSelectedBoard() {
        switch(selectedBoard) {
            case 'BasicBoard':
                return (
                    <>
                        <h2>Basic Board</h2>
                        <BasicBoard boardWidth={chessboardSize} />
                        <br />
                    </>
                );
            case 'PlayVsRandom':
                return (
                    <>
                        <h2>Play vs Random Moves</h2>
                        <PlayVsRandom boardWidth={chessboardSize} />
                        <br />
                    </>
                );
        }
    }


    return (
        <div className="container">
            <h1>Blunder Dodger</h1>

            <div className="button-container">
                <button
                    className={`rc-button ${selectedBoard === 'BasicBoard' ? 'selected' : ''}`}
                    onClick={() => {
                        setSelectedBoard(null);
                        setTimeout(() => setSelectedBoard('BasicBoard'), 10);
                    }}
                >
                    Basic Board
                </button>
                <button
                    className={`rc-button ${selectedBoard === 'PlayVsRandom' ? 'selected' : ''}`}
                    onClick={() => {
                        setSelectedBoard(null);
                        setTimeout(() => setSelectedBoard('PlayVsRandom'), 10);
                    }}
                >
                    Play Vs Random
                </button>
            </div>
            {getSelectedBoard()}
        </div>
    );
}

export default App;
