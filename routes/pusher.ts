import { withErrorHandling } from "../middleware";
import { Player } from "../classes";
import { gameMng } from "../gameMng";
import express from "express";
import { checkBody, createEmptyGrid, isPosType } from "../utils";
import { pusher, pusherTrigger } from "../services/pusher";

//for test

//const player1 = new Player("Axel");
// const player2 = new Player("A")
// const board1 = createEmptyGrid("-", 8);
// const board2 = createEmptyGrid("-", 8);

// board1[1][2] = "1";
// board2[3][3] = "1";

// gameMng.createGame("test", player1);
// gameMng.joinGame("test",player2)
// gameMng.initialiseBoard("test", player1.getId(), board1);
// gameMng.initialiseBoard("test",player2.getId(),board2)
//{"shootPos":{"x":1,"y":3} ,"gameName":"test" ,"playerId":"1LIQZdp46M"}
//BlefsEZkvW

//for test

var router = express.Router();

router.get("/channels", async (req, res) => {
    try {
        const response = await pusher.get({ path: "/channels" });
        if (response.status != 200) {
            return res.status(200).json({ result: false, message: "Pusher response status not 200" });
        }
        const channels = await response.json();
        res.status(200).json(channels);
    } catch (error) {
        console.error(error);
    }
});

router.post(
    "/newGame",
    withErrorHandling((req, res) => {
        if (!checkBody(req.body, ["gameName", "playerName"]))
            return res.status(404).json({ result: false, error: "Missing or empty field" });
        const { gameName, playerName } = req.body;

        if (typeof gameName != "string" || typeof playerName != "string") {
            return res.status(400).json({ result: false, error: "gameName or playerName not in string type" });
        }
        const player = new Player(playerName);
        gameMng.createGame(gameName, player);

        res.status(200).json({ result: true, playerId: player.getId() });
    })
);

router.post(
    "/joinGame",
    withErrorHandling(async (req, res) => {
        if (!checkBody(req.body, ["gameName", "playerName"]))
            return res.status(404).json({ result: false, error: "Missing or empty field" });
        const { gameName, playerName } = req.body;

        if (typeof gameName != "string" || typeof playerName != "string") {
            return res.status(400).json({ result: false, error: "gameName or playerName not in string type" });
        }
        const player = new Player(playerName);
        gameMng.joinGame(gameName, player);
        await pusherTrigger(gameName, "joinGame", { info: "A new player has join the game" });
        res.status(200).json({ result: true, playerId: player.getId() });
    })
);

router.post(
    "/initialiseBoard",
    withErrorHandling(async (req, res) => {
        if (!checkBody(req.body, ["gameName", "playerId", "board"]))
            return res.status(404).json({ error: "Missing or empty field" });
        const { gameName, playerId, board } = req.body;

        gameMng.initialiseBoard(gameName, playerId, board);
        await pusherTrigger(gameName, "initialiseBoard", { playerId });
        res.status(200).json({ result: true });
    })
);

router.post(
    "/shoot",
    withErrorHandling(async (req, res) => {
        if (!checkBody(req.body, ["gameName", "playerId", "shootPos"]))
            return res.status(404).json({ error: "Missing or empty field" });
        const { gameName, playerId, shootPos } = req.body;

        if (typeof gameName != "string" || typeof playerId != "string" || !isPosType(shootPos))
            return res.status(400).json({ error: "One of the fields doesn't have the correct type" });

        const shootInfos = gameMng.play(gameName, playerId, shootPos);
        await pusherTrigger(gameName, "shoot", {
            playerId,
            shootPosX:shootPos.x,
            shootPosY:shootPos.y,
            shootSuccessfull: shootInfos.shootSuccessfull,
            gameEnd: shootInfos.gameEnd,
        });
        res.status(200).json({ result: true, shootInfos });
    })
);

router.post("/", (req, res) => {
    res.json({ gameMng });
});

router.delete("/endGame", (req, res) => {
    if (!checkBody(req.body, ["gameName"])) return res.status(404).json({ error: "Missing or empty field" });

    const { gameName } = req.body;

    if (typeof gameName != "string") {
        return res.status(400).json({ result: false, error: "gameName not in string type" });
    }

    console.log(gameMng)

    gameMng.removeGame(gameName);

    console.log(gameMng)

    res.status(200).json({ result: true });
});

export { router };
