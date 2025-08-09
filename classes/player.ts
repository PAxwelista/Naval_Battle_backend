import { BoardGame } from "./boardGame";
import uid2 from "uid2";

export class Player {
    private id: string;
    private boardGame :BoardGame
    constructor(private name: string) {
        this.boardGame = new BoardGame
        this.id = uid2(10);
    }

    getId():string{
        return this.id
    }

    getName(): string {
        return this.name;
    }

    getBoardGame(): BoardGame {
        return this.boardGame;
    }
}
