import { Player } from "../classes/player";
import { BoardGame } from "../classes/boardGame";
import { Game } from "../classes/game";
import { createEmptyGrid } from "../utils";

const gameName = "test";
const firstPlayer = new Player("Axel", new BoardGame(createEmptyGrid("-", 8)));
const secondPlayer = new Player("Claude", new BoardGame(createEmptyGrid("-", 8)));

describe("class Game initialise", () => {
    it("should initialise correctly", () => {
        const game = new Game(gameName, firstPlayer, secondPlayer);

        expect(game).toEqual({
            gameName,
            isFirstPlayerTurn: true,
            firstPlayer,
            secondPlayer,
        });
    });
});

describe("class Game play function", () => {
    it("should throw an error if the wrong player is playing", () => {
        const game = new Game(gameName, firstPlayer, secondPlayer);

        expect(() => {
            game.play(firstPlayer, { x: 2, y: 4 });
        }).toThrow(Error);
    });
    it("should change the player turn after the play", () => {
        const game = new Game(gameName, firstPlayer, secondPlayer);

        game.play(secondPlayer, { x: 2, y: 4 });

        expect(game.getIsFirstPlayerTurn()).toBeFalsy();
    });
    it("should call fire function of the current player BoardGame only", () => {
        const game = new Game(gameName, firstPlayer, secondPlayer);

        const firstPlayerFireSpy = jest.spyOn(firstPlayer.getBoardGame(), "fire");
        const secondPlayerFireSpy = jest.spyOn(secondPlayer.getBoardGame(), "fire");

        const pos = { x: 2, y: 4 };

        game.play(secondPlayer, pos);

        expect(secondPlayerFireSpy).toHaveBeenCalledWith(pos);
        expect(firstPlayerFireSpy).not.toHaveBeenCalled();
    });
    it("should return shootSuccessfull depending of the shoot success", () => {
        const game = new Game(gameName, firstPlayer, secondPlayer);

        secondPlayer.getBoardGame().getBoard()[1][2] = "3";
        secondPlayer.getBoardGame().getBoard()[1][1] = "3";

        const firstPlayResult = game.play(secondPlayer, { x: 0, y: 2 });
        expect(firstPlayResult.shootSuccessfull).toBeFalsy();

        game.play(firstPlayer, { x: 0, y: 2 });
        
        const secondPlayResult = game.play(secondPlayer, { x: 2, y: 1 });

        expect(secondPlayResult.shootSuccessfull).toBeTruthy();

    });
    it("should return gameEnd depending of the status of the game", () => {
        const game = new Game(gameName, firstPlayer, secondPlayer);

        secondPlayer.getBoardGame().getBoard()[1][2] = "3";
        secondPlayer.getBoardGame().getBoard()[1][1] = "3";

        firstPlayer.getBoardGame().getBoard()[3][2] = "3";
        firstPlayer.getBoardGame().getBoard()[3][1] = "3";

        const firstPlayResult = game.play(secondPlayer, { x: 2, y: 1 });
        expect(firstPlayResult.gameEnd).toBeFalsy();

        game.play(firstPlayer, { x: 0, y: 2 });
        
        const secondPlayResult = game.play(secondPlayer, { x: 1, y: 1 });

        expect(secondPlayResult.gameEnd).toBeTruthy();

    });
});
