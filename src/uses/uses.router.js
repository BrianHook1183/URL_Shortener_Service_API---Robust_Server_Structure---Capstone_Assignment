const router = require("express").Router();
const controller = require("./uses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);

router
  .route("/:useId")
  .get(controller.list)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;
