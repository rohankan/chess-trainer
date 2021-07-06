import GamePiece from "./GamePiece";
import {Side} from "./enums";
import Square from "./Square";
import {isSingleDigit} from "../utils/math";

type Rank = Array<GamePiece | null>;

class GameState {
    board: Array<Rank>;
    activeColor: Side;
    // castlingAvailabilities: number;
    enPassantTargetSquare: Square;
    halfMoveClock: number;
    fullMoveClock: number;

    /**
     * Accepts a string in Forsyth–Edwards Notation (FEN) and converts it to a
     * game state.
     * @param fen String in Forsyth–Edwards Notation (FEN)
     */
    constructor(fen: string) {
        const [
            piecePlacements,
            activeColor,
            castlingAvailabilities,
            enPassantTargetSquare,
            halfMoveClock,
            fullMoveCount,
        ] = fen.split(" ");

        this.board = [];
        // Reverse array to place first rank at zero index
        piecePlacements.split('/').reverse().forEach((pieceData: string) => {
            const rank: Rank = [];
            [...pieceData].forEach((character: string) => {
                if (isSingleDigit(character)) {
                    const numEmptySpaces = parseInt(character);
                    rank.push(...Array(numEmptySpaces).fill(null));
                } else {
                    rank.push(GamePiece.fromCharacter(character));
                }
            });
            this.board.push(rank);
        });

        this.activeColor = activeColor === 'w' ? Side.WHITE : Side.BLACK;
        this.enPassantTargetSquare = Square.fromString(enPassantTargetSquare);
        this.halfMoveClock = parseInt(halfMoveClock);
        this.fullMoveClock = parseInt(fullMoveCount);
    }

    static startingPosition() {
        const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        return new GameState(fen);
    }

    toString() {
        return this.board.reverse().map(rank => (
            rank.map(value => (
                value === null ? ' ' : value.toString()
            )).join('\t')
        )).join('\n');
    }
}

export default GameState;
