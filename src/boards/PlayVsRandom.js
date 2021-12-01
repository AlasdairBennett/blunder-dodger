import { useRef, useState } from 'react';
import Chess from '../../node_modules/chess.js/chess';

import { Chessboard } from 'react-chessboard';

export default function PlayVsRandom({ boardWidth }) {
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

    function makeRandomMove() {
        const possibleMoves = game.moves();

        // exit if the game is over
        if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return;

        // TODO this is where the computer chooses a move
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        safeGameMutate((game) => {
            game.move(possibleMoves[randomIndex]);
        });
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

        setTimeout(makeRandomMove, 200); // TODO ensure this timeout isn't fucking me
        return true;
    }

    return (
        <div>
            <Chessboard
                id="PlayVsRandom"
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
