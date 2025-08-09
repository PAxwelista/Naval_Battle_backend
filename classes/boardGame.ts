import { BoardType, PosType } from "../types";
import { isNumeric } from "../utils";
import { HttpError } from "./httpError";

export class BoardGame {
    private board: BoardType | undefined;

    getBoard(): BoardType | undefined {
        return this.board;
    }

    setBoard(board: BoardType): void {
        this.board = board;
    }

    fire(pos: PosType): boolean {
        if (!this.board) throw new HttpError(401,"Board not initialise");

        const shootValue = this.board[pos.y][pos.x];

        if (shootValue === "F" || shootValue === "X") return false;

        const successfulShoot = isNumeric(this.board[pos.y][pos.x]);

        this.board[pos.y][pos.x] = successfulShoot ? "F" : "X";

        return successfulShoot;
    }

    areAllSubmarineShoot(): boolean {
        if (!this.board) throw new HttpError(401,"Board not initialise");
        
        return !!this.board.every(line => line.every(val => !isNumeric(val)));
    }
}
