// mergeParams: true  preserves the req.params values from the parent router (urls.router.js). Needed because this router is nested at the top of urls.router.js to handle /urls/:urlId/uses
const router = require("express").Router({ mergeParams: true });
const controller = require("./uses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:useId")
  .get(controller.read)
  .delete(controller.delete)
  .all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
