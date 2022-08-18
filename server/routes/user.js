const express = require("express");
const router = express.Router();

const {
  newUser,
  allUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/user").post(newUser);
router.route("/users").get(allUsers);

router
  .route("/user/:id")
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
