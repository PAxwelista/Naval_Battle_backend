import { BoardType, PosType } from "../types";
import { isNumeric } from "../utils";


export class BoardGame {
    constructor(private board: BoardType) {}

    getBoard() : BoardType{
        return this.board
    }

    fire(pos:PosType) : boolean {

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
