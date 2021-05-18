const uses = require("../data/uses-data");

/*  uses-data looks like:
{
    id: 1,
    urlId: 1,
    time: 1599161139283,
  },
*/

function list(req, res, next) {
  return res.json(uses);
}

module.exports = {
  list,
};
