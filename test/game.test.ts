import { Player } from "../classes/player";
import { BoardGame } from "../classes/boardGame";
import { Game } from "../classes/game";
import { createEmptyGrid } from "../utils";

const gameName = "test";
const firstPlayer = new Player("Axel");
firstPlayer.getBoardGame().setBoard(createEmptyGrid("-", 8))
const secondPlayer = new Player("Claude");
secondPlayer.getBoardGame().setBoard(createEmptyGrid("-", 8))

describe("class Game initialise", () => {
    it("should initialise correctly", () => {
        const game = new Game(gameName, firstPlayer);
        game.addSecondPlayer(secondPlayer)

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
        const game = new Game(gameName, firstPlayer);
        game.addSecondPlayer(secondPlayer)

        expect(() => {
            game.play(secondPlayer, { x: 2, y: 4 });
        }).toThrow(Error);
    });
    it("should change the player turn after the play", () => {
        const game = new Game(gameName, firstPlayer);
        game.addSecondPlayer(secondPlayer)

        game.play(firstPlayer, { x: 2, y: 4 });

        expect(game.getIsFirstPlayerTurn()).toBeFalsy();
    });
    it("should call fire function of the current player BoardGame only", () => {
        const game = new Game(gameName, firstPlayer);
        game.addSecondPlayer(secondPlayer)

        const firstPlayerFireSpy = jest.spyOn(firstPlayer.getBoardGame(), "fire");
        const secondPlayerFireSpy = jest.spyOn(secondPlayer.getBoardGame(), "fire");

        const pos = { x: 2, y: 4 };

        game.play(firstPlayer, pos);

        expect(secondPlayerFireSpy).toHaveBeenCalledWith(pos);
        expect(firstPlayerFireSpy).not.toHaveBeenCalled();
    });
    it("should return shootSuccessfull depending of the shoot success", () => {
        const game = new Game(gameName, firstPlayer);
        game.addSecondPlayer(secondPlayer)
        const board = createEmptyGrid("-",8)
        
        board[1][2] = "3";
        board[1][1] = "3";

        secondPlayer.getBoardGame().setBoard(board)

        const firstPlayResult = game.play(firstPlayer, { x: 0, y: 2 });
        expect(firstPlayResult.shootSuccessfull).toBeFalsy();

        game.play(secondPlayer, { x: 0, y: 2 });
        
        const secondPlayResult = game.play(firstPlayer, { x: 2, y: 1 });

        expect(secondPlayResult.shootSuccessfull).toBeTruthy();

    });
    it("should return gameEnd depending of the status of the game", () => {
        const game = new Game(gameName, firstPlayer);
        game.addSecondPlayer(secondPlayer)
        const firstBoard = createEmptyGrid("-",8)
        const secondBoard = createEmptyGrid("-",8)

        firstBoard[1][2] = "3";
        firstBoard[1][1] = "3";

        secondPlayer.getBoardGame().setBoard(firstBoard)

        secondBoard[3][2] = "3";
        secondBoard[3][1] = "3";

        firstPlayer.getBoardGame().setBoard(secondBoard)

        const firstPlayResult = game.play(firstPlayer, { x: 2, y: 1 });
        expect(firstPlayResult.gameEnd).toBeFalsy();

        game.play(secondPlayer, { x: 0, y: 2 });
        
        const secondPlayResult = game.play(firstPlayer, { x: 1, y: 1 });

        expect(secondPlayResult.gameEnd).toBeTruthy();

    });
});
