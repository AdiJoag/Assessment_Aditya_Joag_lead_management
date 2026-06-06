const router = require("express").Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/test", (req, res) => {
    res.json({
        message: "Auth Route Working"
    });
});

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get(
    "/agents",
    authMiddleware,
    authController.getAgents
);

router.put(
    "/agents/:id",
    authMiddleware,
    roleMiddleware("ADMIN", "MANAGER"),
    authController.updateAgent
);

router.get("/profile", authMiddleware, (req, res) => {

    res.json({
        message: "Protected Route Accessed",
        user: req.user
    });

});

router.get(
    "/admin",
    authMiddleware,
    roleMiddleware("ADMIN"),
    (req, res) => {

        res.json({
            message: "Welcome Admin"
        });

    }
);

module.exports = router;
