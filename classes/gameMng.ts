import { BoardType, PosType, shootResult } from "../types";
import { Game } from "./game";
import { HttpError } from "./httpError";
import { Player } from "./player";

export class GameMng {
    private games: Game[];

    constructor() {
        this.games = [];
    }

    createGame(gameName: string, player: Player): void {
        const game = this.getGame(gameName);
        if (game) throw new HttpError(401, "This game name already exist");

        this.games.push(new Game(gameName, player));
    }

    joinGame(gameName: string, player: Player): void {
        const game = this.getGame(gameName);
        if (!game) throw new HttpError(404, "This game doesn't exist");
        if (game.hasSecondPlayer()) throw new HttpError(403, "The game session is full");
        game.addSecondPlayer(player);
    }

    getGame(gameName: string): Game | undefined {
        return this.games.find(game => game.getGameName() === gameName);
    }

    removeGame(gameName: string): void {
        this.games = this.games.filter(game => game.getGameName() != gameName);
    }

    initialiseBoard(gameName: string, playerId: string, board: BoardType): void {
        const game = this.getGame(gameName);
        if (!game) throw new HttpError(404, "This game doesn't exist");
        const player = game.getPlayer(playerId);
        if (!player) throw new HttpError(401, "This player Id doesn't correspond to any player in this game");
        player.getBoardGame().setBoard(board);
    }

    play(gameName: string, playerId: string, shootPos: PosType): shootResult {
        const game = this.getGame(gameName);
        if (!game) throw new HttpError(404, "This game doesn't exist");
        const player = game.getPlayer(playerId);
        if (!game.hasSecondPlayer()) throw new HttpError(401, "There is only one player in the game");
        if (!player) throw new HttpError(401, "This player Id doesn't correspond to any player in this game");
        const shootInfos = game.play(player, shootPos);

        return shootInfos;
    }
}
