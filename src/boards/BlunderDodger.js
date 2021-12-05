import { useRef, useState } from 'react';
import Chess from '../../node_modules/chess.js/chess';
import axios from 'axios';

import { Chessboard } from 'react-chessboard';

export default function BlunderDodger({ boardWidth }) {
    const chessboardRef = useRef();
    const [game, setGame] = useState(new Chess());
    const [arrows, setArrows] = useState([]);
    const [boardOrientation, setBoardOrientation] = useState('white');

    function safeGameMutate(modify) {
        setGame((g) => {
            const update = { ...g };
            modify(update);
            return update;
        });
    }

    // Makes a move as the engine
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
            },
            (error) => {
                console.log(error);
            }
        );
    }

    function onDrop(sourceSquare, targetSquare) {
        const gameCopy = { ...game };
        const move = gameCopy.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q' // TODO add promotion option here
        });
        setGame(gameCopy);

        // illegal move
        if (move === null) return false;

        setTimeout(makeBDMove, 200);
        return true;
    }

    return (
        <div>
            <Chessboard
                id="BlunderDodger"
                arePremovesAllowed={true}
                animationDuration={200}
                boardOrientation={boardOrientation}
                boardWidth={boardWidth}
                customArrows={arrows}
                position={game.fen()}
                onPieceDrop={onDrop}
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
                    safeGameMutate((game) => {
                        game.reset();
                    });
                    chessboardRef.current.clearPremoves();
                }}
            >
                reset
            </button>
        </div>
    );
}
