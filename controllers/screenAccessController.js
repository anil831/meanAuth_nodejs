const ScreenAccess = require('../models/screenAccess');
const Role = require('../models/Role');
const Screen = require('../models/screen');

// Create ScreenAccess
exports.createOrUpdateScreenAccess = async (req, res) => {
  try {
    const { roleId, access } = req.body;

    // Extract the screen IDs from the access array
    const screens = access.map(item => item.screenId);

    // Find an existing ScreenAccess document by roleId
    let roleAccess = await ScreenAccess.findOne({ role: roleId });

    if (roleAccess) {
      // If ScreenAccess exists, update the screens
      roleAccess.screen = screens;
      await roleAccess.save();
      res.status(200).json(roleAccess);
    } else {
      // If ScreenAccess does not exist, create a new document
      roleAccess = new ScreenAccess({ role: roleId, screen: screens });
      await roleAccess.save();
      res.status(201).json(roleAccess);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all ScreenAccess entries
exports.getAllScreenAccess = async (req, res) => {
  try {
    const roleAccessList = await ScreenAccess.find().populate('role').populate('screen');
    res.status(200).json(roleAccessList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific ScreenAccess entry by ID
exports.getScreenAccessById = async (req, res) => {
  try {
    const roleAccess = await ScreenAccess.findById(req.params.id).populate('role').populate('screen');
    if (!roleAccess) {
      return res.status(404).json({ message: 'ScreenAccess not found' });
    }
    res.status(200).json(roleAccess);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific ScreenAccess entry by ID
exports.getScreenAccessByRole = async (req, res) => {
  try {
    const screenAccess = await ScreenAccess.findOne({role:req.params.id}).populate('role').populate('screen');
    if (!screenAccess) {
      return res.status(404).json({ message: 'ScreenAccess not found' });
    }
    res.status(200).json(screenAccess);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update ScreenAccess
exports.updateScreenAccess = async (req, res) => {
  try {
    const { roleId, screenId, accessLevel } = req.body;

    // Validate role and screen
    const role = await Role.findById(roleId);
    const screen = await Screen.findById(screenId);
    if (!role || !screen) {
      return res.status(400).json({ message: 'Invalid role or screen ID' });
    }

    const roleAccess = await ScreenAccess.findByIdAndUpdate(
      req.params.id,
      { role: roleId, screen: screenId, accessLevel },
      { new: true, runValidators: true }
    ).populate('role').populate('screen');

    if (!roleAccess) {
      return res.status(404).json({ message: 'ScreenAccess not found' });
    }
    res.status(200).json(roleAccess);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateScreenAccessByRole = async (req, res) => {
  try {
    const { roleId, screenId, accessLevel } = req.body;

    // Validate role and screen
    // const role = await Role.findById(roleId);
    // const screen = await Screen.findById(screenId);
    // if (!role || !screen) {
    //   return res.status(400).json({ message: 'Invalid role or screen ID' });
    // }

    const roleAccess = await ScreenAccess.findOneAndUpdate(
      req.params.id,
      { role: roleId, screen: screenId, accessLevel },
      { new: true, runValidators: true }
    ).populate('role').populate('screen');

    if (!roleAccess) {
      return res.status(404).json({ message: 'ScreenAccess not found' });
    }
    res.status(200).json(roleAccess);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete ScreenAccess
exports.deleteScreenAccess = async (req, res) => {
  try {
    const roleAccess = await ScreenAccess.findByIdAndDelete(req.params.id);
    if (!roleAccess) {
      return res.status(404).json({ message: 'ScreenAccess not found' });
    }
    res.status(200).json({ message: 'ScreenAccess deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
