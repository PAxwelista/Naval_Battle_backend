var express = require("express");
var router = express.Router();
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
});

router.get("/channels", async (req, res, next) => {
    const response = await pusher.get({ path: "/channels" });
    if (response.status != 200) {
        return res.status(res.status).json({ result: false, message: "Pusher response status not 200" });
    }
    const channels = await response.json();
    res.status(200).json(channels);
});



router.post("/newMess", (req, res) => {
    pusher.trigger(`presence-cache-${req.body.channel}`, "mess", "test des messages pour voir si tout est OK");
    res.status(200).send("test");
});

router.post("/nbPlayers", async (req, res) => {
    if (req.body.channel === null || req.body.channel === "")
        return res.status(404).json({ error: "Channel is not in body" });
    const response = await pusher.get({
        path: `/channels/presence-cache-${req.body.channel}`,
        params: { info: "cache" },
    });
    const channels = await response.json();

    res.status(200).json({ nbPlayers: channels });
});

router.post("/newGame", async (req, res) => {
    console.log(req.body.channel)
    if (!req.body.map  || req.body.map === "" || !req.body.channel  || req.body.channel === "")
        return res.status(404).json({ error: "Body not completely given" });
    pusher.trigger(`presence-cache-${req.body.channel}`, "maps", `${req.body.map}`);

    res.status(200).json({ state: "work" });
});

router.post("/shoot", async (req, res) => {
    if (!req.body.shootInfos || req.body.shootInfos === "" || !req.body.channel || req.body.channel === "")
        return res.status(404).json({ error: "Body not completely given" });
    pusher.trigger(`presence-cache-${req.body.channel}`, "maps", `${req.body.shootInfos}`)
    const channels = await response.json();

    res.status(200).json({ nbPlayers: channels.user_count });
});

router.post("/auth", (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const presenceData = {
        user_id: "unique_user_" + Math.floor(Math.random() * 1000),
        user_info: { name: "Mr Channels", twitter_id: "@pusher" },
    };
    // This authenticates every user. Don't do this in production!
    const authResponse = pusher.authorizeChannel(socketId, channel, presenceData);
    res.send(authResponse);
});

module.exports = router;
