import { withErrorHandling } from "../middleware";
import { Player } from "../classes";
import { gameMng } from "../gameMng";
import express from "express";


import  { checkBody, createEmptyGrid, isPosType } from "../utils"

//for test

const player1 = new Player("Axel")
const player2 = new Player("A")
const board1 = createEmptyGrid("-",8)
const board2 = createEmptyGrid("-",8)

board1[1][2] = "1"
board2[3][3] = "1"

gameMng.createGame("test" ,player1 )
gameMng.joinGame("test",player2)
gameMng.initialiseBoard("test",player1.getId(),board1)
gameMng.initialiseBoard("test",player2.getId(),board2)
//{"shootPos":{"x":1,"y":3} ,"gameName":"test" ,"playerId":"1LIQZdp46M"}
//BlefsEZkvW

//for test

var router = express.Router();

// router.get("/channels", async (req, res) => {
//     console.log("test");
//     const response = await pusher.get({ path: "/channels" });
//     if (response.status != 200) {
//         return res.status(200).json({ result: false, message: "Pusher response status not 200" });
//     }
//     const channels = await response.json();
//     res.status(200).json(channels);
// });

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
    withErrorHandling((req, res) => {
        if (!checkBody(req.body, ["gameName", "playerName"]))
            return res.status(404).json({ result: false, error: "Missing or empty field" });
        const { gameName, playerName } = req.body;

        if (typeof gameName != "string" || typeof playerName != "string") {
            return res.status(400).json({ result: false, error: "gameName or playerName not in string type" });
        }
        const player = new Player(playerName);
        gameMng.joinGame(gameName, player);
        res.status(200).json({ result: true, playerId: player.getId() });
    })
);

router.post(
    "/initialiseBoard",
    withErrorHandling((req, res) => {
        if (!checkBody(req.body, ["gameName", "playerId", "board"]))
            return res.status(404).json({ error: "Missing or empty field" });
        const { gameName, playerId, board } = req.body;

        gameMng.initialiseBoard(gameName, playerId, board);
        res.status(200).json({ result: true });
    })
);

router.post(
    "/shoot",
    withErrorHandling((req, res) => {
        if (!checkBody(req.body, ["gameName", "playerId", "shootPos"]))
            return res.status(404).json({ error: "Missing or empty field" });
        const { gameName, playerId, shootPos } = req.body;

        if (typeof gameName  !="string" ||typeof playerId  !="string" || !isPosType(shootPos) )return res.status(400).json({ error: "One of the fields doesn't have the correct type" });

        const shootInfos = gameMng.play(gameName, playerId, shootPos);
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

    gameMng.removeGame(gameName);

    res.status(200).json({ result: true });
});

export { router };
