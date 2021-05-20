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

function list(req, res, next) {
  res.json({ data: uses });
}

function read(req, res, next) {
  res.json({
    data: res.locals.use,
  });
}

module.exports = {
  list,
  read: [useExists, read],
};
