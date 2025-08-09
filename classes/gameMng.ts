import { Game } from "./game";

export class gameMng {
    private games: Game[];

    createGame(game: Game): void {
        this.games.push(game);
    }

    getGame(gameName: string): Game | undefined {
        return this.games.find(game => game.getGameName() === gameName);
    }

    removeGame(game: Game): void {
        this.games.filter(v => v.getGameName() != game.getGameName());
    }
}
