const uses = require("../data/uses-data");

/*  uses-data looks like:
{
    id: 1,
    urlId: 1,
    time: 1599161139283,
  },
*/

function useExists(req, res, next) {
  const useId = Number(req.params.useId);
  const foundUse = uses.find((use) => use.id == useId);

  if (foundUse === undefined) {
    return next({
      status: 404,
      message: `Use id not found: ${useId}`,
    });
  }
  res.locals.use = foundUse;
  next();
}

function read(req, res) {
  res.json({
    data: res.locals.use,
  });
}

function list(req, res) {
  // need to check for urlId in case the nested route at /urls/:urlId/uses is accessed instead of /uses which doesn't need any filtering
  const { urlId } = req.params;
  const byResult = urlId ? (use) => use.urlId == urlId : () => true;
  res.json({ data: uses.filter(byResult) });
}

module.exports = {
  list,
  read: [useExists, read],
};
