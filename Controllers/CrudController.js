const crudModel = require("../Models/crudModel");
const jwt = require("jsonwebtoken");

exports.createItem = async (req, res) => {
  const { name, description } = req.body;
console.log(req.user.id);
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required" });
    }
    const newItem = new crudModel({
      name,
      description,
      user: req.user.id,
    });

    await newItem.save();

    res
      .status(201)
      .json({ message: "Item created successfully", item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.getItems = async (req, res) => {
  const items = await crudModel.find({ user: req.user.id }); // Get items for the authenticated user
//   console.log(items);
  try {
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const item = await crudModel.findOne({ _id: id, user: req.user.id });
//   console.log(item);
  try {
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    item.name = name || item.name;
    item.description = description || item.description;
    await item.save();
    res.status(200).json({ message: "Item updated successfully", item });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  const item = await crudModel.findOneAndDelete({ _id: id, user: req.user.id });
// console.log(item)
  try {
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
