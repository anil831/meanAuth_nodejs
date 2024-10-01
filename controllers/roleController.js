const Role = require('../models/Role');

exports.createRole = async (req, res) => {
  const { name } = req.body;
  try {
    const role = new Role({ name });
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findById(id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const role = await Role.findByIdAndUpdate(id, { name }, { new: true });
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await Role.findByIdAndDelete(id);
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
