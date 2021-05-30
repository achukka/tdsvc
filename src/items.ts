import express from "express";
import { add_item, get_item, update_item } from "./datasource";

export const router = express.Router();

// GET Method
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const item = await get_item(id);
    if (!item) {
      res.send(`Cannot find item with id: ${id}`);
    } else {
      res.send(item);
    }
  } catch (error) {
    res.send(error.message);
  }
});

// POST Method
router.post("/", async (req, res) => {
  try {
    const item = req.body;
    const id = await add_item(item);
    res.send(`Added item with id: ${id}`);
  } catch (error) {
    res.send(error.messsage);
  }
});

// PUT Method
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const item = req.body;
    await update_item(item, id);
    res.send(`Updated item with id: ${id}`);
  } catch (error) {
    res.send(error.message);
  }
});
