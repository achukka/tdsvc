import express from "express";
import { router as item_router } from "./items";
import { router as user_router } from "./users";

const app = express();
const port = 3000;

// middleware
app.use(express.json()); // Process json body from requests
app.use(express.urlencoded({ extended: true })); // Process urlencoded payloads

app.use("/tdsvc/item", item_router);
app.use("/tdsvc/user", user_router);

app.listen(port, (err?) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on port: ${port}`);
});
