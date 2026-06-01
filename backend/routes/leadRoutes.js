const router = require("express").Router();

const leadController =
    require("../controllers/leadController");

const authMiddleware =
    require("../middleware/authMiddleware");

const roleMiddleware =
    require("../middleware/roleMiddleware");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN", "MANAGER"),
    leadController.createLead
);

router.get(
    "/",
    authMiddleware,
    leadController.getLeads
);

router.get(
    "/stats",
    authMiddleware,
    leadController.getStats
);

router.get(
    "/:id",
    authMiddleware,
    leadController.getLeadById
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN", "MANAGER"),
    leadController.updateLead
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN"),
    leadController.deleteLead
);

module.exports = router;
