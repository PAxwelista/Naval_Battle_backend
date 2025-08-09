import { BoardGame } from "../classes/boardGame";
import { createEmptyGrid } from "../utils";

describe("class BoardGame initialisation", () => {
    it("should initialise the board", () => {
        const board = createEmptyGrid("-", 8);

        const boardGame = new BoardGame();
        boardGame.setBoard(board)
        expect(boardGame).toEqual({ board });
    });
});

describe("class BoardGame fire function", () => {
    it("should change the char to X if the shoot failed and return false", () => {
        const board = createEmptyGrid("-", 8);

        const boardGame = new BoardGame();
        boardGame.setBoard(board)

        const isShootSuccessful = boardGame.fire({ x: 2, y: 7 });

        const expected = createEmptyGrid("-", 8);

        expected[7][2] = "X";

        expect(boardGame.getBoard()).toEqual(expected);

        expect(isShootSuccessful).toBeFalsy();
    });

    it("should change the char to F if the shoot succeed and return true", () => {
        const board = createEmptyGrid("3", 8);

        const boardGame = new BoardGame();
        boardGame.setBoard(board)

        const isShootSuccessful = boardGame.fire({ x: 2, y: 7 });

        const expected = createEmptyGrid("3", 8);

        expected[7][2] = "F";

        expect(boardGame.getBoard()).toEqual(expected);

        expect(isShootSuccessful).toBeTruthy();
    });

    it("should not change if there is already a F or a X at the position", () => {
        const board = createEmptyGrid("-", 8);

        board[2][3] = "X"
        board[5][3] = "F"

        const boardGame = new BoardGame();
        boardGame.setBoard(board)

        const isShootSuccessful = boardGame.fire({ x: 3, y: 2 });

        const isSecondShootSuccessful = boardGame.fire({ x: 3, y: 5 });

        const expected = createEmptyGrid("-", 8);

        expected[2][3] = "X"
        expected[5][3] = "F"

        expect(boardGame.getBoard()).toEqual(expected);
        expect(isShootSuccessful).toBeFalsy()
        expect(isSecondShootSuccessful).toBeFalsy()

    });

});
describe("class BoardGame areAllSubmarineShoot function" ,()=>{
    it("should return true if there is not any number into the tab",()=>{
        const board = createEmptyGrid("-", 8);

        const boardGame = new BoardGame();
        boardGame.setBoard(board)

        expect (boardGame.areAllSubmarineShoot()).toBeTruthy()
    })
    it("should return false if there is a number into the tab",()=>{
        const board = createEmptyGrid("-", 8);

        board[2][3] = "1"
        board[4][2] = "4"

        const boardGame = new BoardGame();
        boardGame.setBoard(board)

        expect (boardGame.areAllSubmarineShoot()).toBeFalsy()
    })
})