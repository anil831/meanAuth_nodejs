const express = require("express");
const router = express.Router();


router.use("/auth",require("./authRouter"));
router.use("/role",require("./roleRoutes"));
router.use("/screen",require("./screenRoutes"));
router.use("/screenAccess",require("./screenAccessRoutes"));
router.use("/user",require("./userRoutes"));


module.exports = router;