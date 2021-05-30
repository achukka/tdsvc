import express from "express";
export const router = express.Router();

// GET Method
router.get("/:id", (req, res) => {
  res.send(`You are requesting an user with id: ${req.params["id"]}`);
});

// POST Method
router.post("/", (req, res) => {
  res.send(`You are posting an user with body: ${req.body}`);
});

// PUT Method
router.put("/:id", (req, res) => {
  console.log(req);
  res.send(`You are updating an user with id: ${req.params["id"]}`);
});
