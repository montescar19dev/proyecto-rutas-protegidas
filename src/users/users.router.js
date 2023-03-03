const router = require("express").Router();
const passportJwt = require("../middlewares/auth.middleware");
const userServices = require("./users.services");

router.get("/", userServices.getAllUsers);
router.post("/", userServices.postNewUser);

router.get("/:id", passportJwt, userServices.getUserById);
router.patch("/:id", passportJwt, userServices.patchUser);
router.delete("/:id", passportJwt, userServices.deleteUser);

router.get("/me", passportJwt, userServices.getMyUser);
router.patch("/me", passportJwt, userServices.patchMyUser);
router.delete("/me", passportJwt, userServices.deleteMyUser);

module.exports = router;