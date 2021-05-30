import express from "express";
import { add_user, get_user, update_user } from "./datasource";
export const router = express.Router();

// GET Method
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const item = await get_user(id);
    if (!item) {
      res.send(`Cannot find user with id: ${id}`);
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
    const user = req.body;
    const id = await add_user(user);
    res.send(`Added user with id: ${id}`);
  } catch (error) {
    res.send(error.message);
  }
});

// PUT Method
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = req.body;
    await update_user(user, id);
    res.send(`Updated user with id: ${id}`);
  } catch (error) {
    res.send(error.message);
  }
});
