import {Piece, Side} from "./enums";

function characterToPiece(character: string): Piece {
    switch (character.toUpperCase()) {
        case 'K':
            return Piece.KING;
        case 'Q':
            return Piece.QUEEN;
        case 'R':
            return Piece.ROOK;
        case 'B':
            return Piece.BISHOP;
        case 'N':
            return Piece.KNIGHT;
        case 'P':
            return Piece.PAWN;
        default:
            throw Error("Piece character not supported by FEN.");
    }
}

function pieceToCharacter(piece: Piece): string {
    switch (piece) {
        case Piece.KING:
            return 'K';
        case Piece.QUEEN:
            return 'Q';
        case Piece.ROOK:
            return 'R';
        case Piece.BISHOP:
            return 'B';
        case Piece.KNIGHT:
            return 'N';
        case Piece.PAWN:
            return 'P';
        case Piece.DUMMY:
            return 'D';
        default:
            throw Error("Piece character not supported by FEN.");
    }
}

class GamePiece {
    side: Side;
    piece: Piece;

    constructor(side: Side, piece: Piece) {
        this.side = side;
        this.piece = piece;
    }

    static fromCharacter(pieceCharacter: string) {
        // Determine the side based on the capitalization
        const isUpperCase = pieceCharacter.toUpperCase() === pieceCharacter;
        const side = isUpperCase ? Side.WHITE : Side.BLACK;

        // Determine the piece based on the character
        const piece = characterToPiece(pieceCharacter);

        return new GamePiece(side, piece);
    }

    toString() {
        const character = pieceToCharacter(this.piece);
        return this.side === Side.WHITE ?
            character.toUpperCase() :
            character.toLowerCase();
    }
}

export default GamePiece;
