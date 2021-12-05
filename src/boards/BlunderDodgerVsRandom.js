import { useRef, useState, useEffect } from 'react';
import Chess from '../../node_modules/chess.js/chess';
import axios from 'axios';

import { Chessboard } from 'react-chessboard';

export default function BlunderDodgerVsRandom({ boardWidth }) {
    const chessboardRef = useRef();
    const [game, setGame] = useState(new Chess());
    const [latestTimeout, setLatestTimeout] = useState();
    const [arrows, setArrows] = useState([]);
    const [boardOrientation, setBoardOrientation] = useState('white');

    function safeGameMutate(modify) {
        setGame((g) => {
            const update = { ...g };
            modify(update);
            return update;
        });
    }

    // makes a move as random
    function makeRandomMove() {
        const possibleMoves = game.moves();

        // exit if the game is over
        if (game.game_over() === true || game.in_draw() === true || possibleMoves.length === 0) {
            return;
        }

        console.log("making random move... ")
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        safeGameMutate((game) => {
            game.move(possibleMoves[randomIndex]);
        });

        const timeout = setTimeout(makeBDMove, 300);
        setLatestTimeout(timeout);
    }

    // makes a move as blunder dodger
    function makeBDMove() {
        const possibleMoves = game.moves();

        // exit if the game is over
        if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return;

        console.log("making move... ")
        axios.post('http://127.0.0.1:5000/blunder_dodger_move', { fen: game.fen() }).then(
            (response) => {
                const dt = response.data
                console.log("test")
                console.log(dt.valueOf().Result)
                safeGameMutate((game) => {
                    game.move(dt.valueOf().Result, { sloppy: true });
                });
                const timeout = setTimeout(makeRandomMove(), 300)
                setLatestTimeout(timeout)
            },
            (error) => {
                console.log(error);
            }
        );
    }

    return (
        <div>
            <Chessboard
                id="BlunderDodgerVsRandom"
                arePiecesDraggable={false}
                boardWidth={boardWidth}
                position={game.fen()}
                animationDuration={200}
                customBoardStyle={{
                    borderRadius: '4px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
                }}
                ref={chessboardRef}
            />
            <>
                {game.fen()}
            </>
            <button
                className="rc-button"
                onClick={() => {
                    clearTimeout(latestTimeout);
                    safeGameMutate((game) => {
                        game.reset();
                    });
                    chessboardRef.current.clearPremoves();
                    const timeout = setTimeout(makeBDMove(), 1000);
                    setLatestTimeout(timeout);
                }}
            >
                reset
            </button>
        </div>
    );
}
