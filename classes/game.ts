import { PosType } from "../types";
import { Player } from "./player";

export class Game {
    private isFirstPlayerTurn: boolean;

    constructor(private gameName: string, private firstPlayer: Player, private secondPlayer: Player) {
        this.isFirstPlayerTurn = true;
    }

    getGameName(): string {
        return this.gameName;
    }

    getIsFirstPlayerTurn(): boolean {
        return this.isFirstPlayerTurn;
    }

    play(targetPlayer: Player, pos: PosType): { shootSuccessfull: boolean; gameEnd: boolean } {
        if (this.isPlayerTurn(targetPlayer)) {
            throw new Error("Wrong player is playing");
        }

        this.isFirstPlayerTurn = !this.isFirstPlayerTurn;

        const shootSuccessfull = targetPlayer.getBoardGame().fire(pos);

        const gameEnd = targetPlayer.getBoardGame().areAllSubmarineShoot();

        return { shootSuccessfull, gameEnd };
    }

    private isPlayerTurn(player: Player): boolean {
        return this.isFirstPlayerTurn ? player === this.firstPlayer : player === this.secondPlayer;
    }
}
