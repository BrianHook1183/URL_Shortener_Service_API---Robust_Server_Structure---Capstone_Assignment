const urls = require("../data/urls-data");

/*  urls-data looks like:
{
    href: "http://www.google.com",
    id: 1,
  },
*/

function list(req, res, next) {
  return res.json(urls);
}

module.exports = {
  list,
};
