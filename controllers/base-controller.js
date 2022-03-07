module.exports = {
  getAll: (req, res) => {
    res.send(req.params);
  },
  getById: (req, res) => {
    res.send(req.params.id);
  },
  create: (req, res) => {
    res.send(req.body);
  },
  updateById: (req, res) => {
    res.send(req.params.id);
  }
};