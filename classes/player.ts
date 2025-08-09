import { BoardGame } from "./boardGame";

export class Player {
    constructor(private name: string, private boardGame: BoardGame) {}

    getName(): string {
        return this.name;
    }

    getBoardGame(): BoardGame {
        return this.boardGame;
    }
}
