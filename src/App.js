import './App.css';
import { useEffect, useState } from "react";

import PlayVsRandom from './boards/PlayVsRandom';
import BlunderDodger from './boards/BlunderDodger';
import BlunderDodgerVsRandom from './boards/BlunderDodgerVsRandom';

function App() {
    const [chessboardSize, setChessboardSize] = useState('BlunderDodger');
    const [selectedBoard, setSelectedBoard] = useState('BlunderDodger');

    // handle resizing the app window
    useEffect(() => {
        function handleResize() {
            const display = document.getElementsByClassName('container')[0];
            setChessboardSize(display.offsetWidth - 20);
        }

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // enables switching between boards using the buttons defined later
    function getSelectedBoard() {
        switch(selectedBoard) {
            case 'PlayVsRandom':
                return (
                    <>
                        <h2>Play vs Random Moves</h2>
                        <PlayVsRandom boardWidth={chessboardSize} />
                        <br />
                    </>
                );
            case 'BlunderDodger':
                return (
                    <>
                        <h2>Blunder Dodger</h2>
                        <BlunderDodger boardWidth={chessboardSize} />
                        <br />
                    </>
                );
            case 'BlunderDodgerVsRandom':
                return (
                    <>
                        <h2>Blunder Dodger vs Random</h2>
                        <BlunderDodgerVsRandom boardWidth={chessboardSize} />
                        <br />
                    </>
                );
        }
    }

    // provides the html for the page, displays a board depending on the selected button
    return (
        <div className="container">
            <h1>Blunder Dodger</h1>

            <div className="button-container">
                <button
                    className={`rc-button ${selectedBoard === 'BlunderDodger' ? 'selected' : ''}`}
                    onClick={() => {
                        setSelectedBoard(null);
                        setTimeout(() => setSelectedBoard('BlunderDodger'), 10);
                    }}
                >
                    Blunder Dodger
                </button>
                <button
                    className={`rc-button ${selectedBoard === 'BlunderDodgerVsRandom' ? 'selected' : ''}`}
                    onClick={() => {
                        setSelectedBoard(null);
                        setTimeout(() => setSelectedBoard('BlunderDodgerVsRandom'), 10);
                    }}
                >
                    Blunder Dodger Vs Random
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
