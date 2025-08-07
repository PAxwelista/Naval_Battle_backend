import { isNumeric } from "../utils";

type BoardType = string[][];
type Pos = { x: number; y: number };

export class BoardGame {
    constructor(private board: BoardType) {}

    getBoard() : BoardType{
        return this.board
    }

    fire(pos:Pos) : boolean {

        const shootValue = this.board[pos.y][pos.x]

        if ( shootValue ==="F" ||  shootValue==="X") return false

        const successfulShoot = isNumeric(this.board[pos.y][pos.x])
        
        this.board[pos.y][pos.x] = successfulShoot  ? "F" : "X"

        return successfulShoot

    }

    areAllSubmarineShoot () : boolean{
        return this.board.every(line=>line.every(val=>!isNumeric(val)))
    }
}
