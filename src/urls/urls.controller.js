const urls = require("../data/urls-data");

/*  urls-data looks like:
[
  {
    href: "http://www.google.com",
    id: 1,
  },
  {
    ...
  },
]
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

function bodyHasHref(req, res, next) {
  const bodyHref = req.body.data.href;
  if (!bodyHref) {
    return next({
      status: 400,
      message: "href property in body is missing or invalid",
    });
  }
  res.locals.newHref = bodyHref;
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

function create(req, res) {
  // curriculum suggested using  const { data: { href } = {} } = req.body;
  const newUrl = res.locals.newHref;
  let lastUrlId = urls.reduce((maxId, url) => Math.max(maxId, url.id), 0);
  const newEntry = { href: newUrl, id: lastUrlId + 1 };

  urls.push(newEntry);
  res.status(201).json({ data: newEntry });
}

function update(req, res) {
  const existingEntry = res.locals.url;
  const newUrl = res.locals.newHref;
  const updatedEntry = { ...existingEntry, href: newUrl };

  existingEntry.href = newUrl;
  res.json({ data: updatedEntry });
}

module.exports = {
  list,
  create: [bodyHasHref, create],
  read: [urlExists, read],
  update: [urlExists, bodyHasHref, update],
  urlExists,
};
