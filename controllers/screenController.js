const Screen = require('../models/screen');

exports.createScreen = async (req, res) => {
  const { name } = req.body;
  const screen = new Screen({ name });
  await screen.save();
  res.status(201).json(screen);
};

exports.updateScreen = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const screen = await Screen.findByIdAndUpdate(id, { name }, { new: true });
  res.json(screen);
};

exports.getScreens = async (req, res) => {
  const screens = await Screen.find();
  res.json(screens);
};

exports.getScreen = async (req, res) => {
  const { id } = req.params;
  const screen = await Screen.findById(id);
  res.json(screen);
};

exports.deleteScreen = async (req, res) => {
  const { id } = req.params;
  await Screen.findByIdAndDelete(id);
  res.status(204).end();
};
