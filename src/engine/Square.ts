class Square {
    rank: string;
    file: number;

    constructor(rank: string, file: number) {
        this.rank = rank;
        this.file = file;
    }

    static fromString(squareString: string) {
        const [rank, file] = [...squareString];
        return new Square(rank.toLowerCase(), parseInt(file));
    }

    toString() {
        return `${this.rank}${this.file}`;
    }
}

export default Square;
