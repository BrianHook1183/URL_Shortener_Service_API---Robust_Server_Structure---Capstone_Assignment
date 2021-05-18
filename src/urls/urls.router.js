const router = require("express").Router();
const controller = require("./urls.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route("/:urlId")
  .get(controller.list)
  .put(controller.update)
  .all(methodNotAllowed);

module.exports = router;
