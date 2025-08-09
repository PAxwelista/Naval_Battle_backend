
import { PosType, shootResult } from "../types";
import { HttpError } from "./httpError";
import { Player } from "./player";

export class Game {
    private isFirstPlayerTurn: boolean;
    private secondPlayer: Player | undefined = undefined;

    constructor(private gameName: string, private firstPlayer: Player) {
        this.isFirstPlayerTurn = true;
    }

    getPlayer(id: string): Player | undefined {
        if (id === this.firstPlayer.getId()) return this.firstPlayer;
        else if (id === this.secondPlayer?.getId()) return this.secondPlayer;
        return undefined;
    }

    hasSecondPlayer(): boolean {
        return !!this.secondPlayer;
    }

    addSecondPlayer(player: Player): void {
        this.secondPlayer = player;
    }

    getGameName(): string {
        return this.gameName;
    }

    getIsFirstPlayerTurn(): boolean {
        return this.isFirstPlayerTurn;
    }

    play(player: Player, pos: PosType): shootResult {
        if (!this.isPlayerTurn(player)) {
            throw new HttpError(401, "Wrong player is playing");
        }
        if (!this.secondPlayer) {
            throw new HttpError(401, "Only one player in game");
        }

        this.isFirstPlayerTurn = !this.isFirstPlayerTurn;

        const targetPlayer = player === this.firstPlayer ? this.secondPlayer : this.firstPlayer;

        const shootSuccessfull = targetPlayer.getBoardGame().fire(pos);

        const gameEnd = targetPlayer.getBoardGame().areAllSubmarineShoot();

        return { shootSuccessfull, gameEnd };
    }

    private isPlayerTurn(player: Player): boolean {
        return this.isFirstPlayerTurn ? player === this.firstPlayer : player === this.secondPlayer;
    }
}
