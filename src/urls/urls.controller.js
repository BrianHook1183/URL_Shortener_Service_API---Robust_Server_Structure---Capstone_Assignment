const urls = require("../data/urls-data");

/*  urls-data looks like:
{
    href: "http://www.google.com",
    id: 1,
  },
*/

function urlExists(req, res, next) {
  const urlId = Number(req.params.urlId);
  const foundUrl = urls.find((url) => url.id == urlId);

  if (foundUrl === undefined) {
    return next({
      status: 404,
      message: `Url id not found: ${urlId}`,
    });
  }
  res.locals.url = foundUrl;
  next();
}

function list(req, res) {
  res.json({ data: urls });
}

function read(req, res) {
  res.json({
    data: res.locals.url,
  });
}

module.exports = {
  list,
  read: [urlExists, read],
  urlExists,
};
