import pg from "pg";

import { item, user } from "./models";
import { CONFIG } from "./pgenv";

const to_item = (itemRow: pg.QueryResult<any>): item => {
  return {
    id: parseInt(itemRow["id"]),
    task: itemRow["task"],
    priority: parseInt(itemRow["priority"]),
    date: new Date(itemRow["date"]),
  };
};

const to_user = (userRow: pg.QueryResult<any>): user => {
  return {
    id: parseInt(userRow["id"]),
    first_name: userRow["first_name"],
    last_name: userRow["last_name"],
  };
};

const execute = async (query: string): Promise<pg.QueryResult> => {
  const client = new pg.Client(CONFIG);
  await client.connect();

  const result = await client.query(query);
  await client.end;
  return result;
};

export const get_item = async (id: number): Promise<item> => {
  const query = `SELECT * from item where id=${id}`;
  return execute(query).then((res) => {
    if (res.rowCount == 0) {
      throw new Error(`No item was found with id: ${id}`);
    }
    const itemRow = res.rows[0];
    return to_item(itemRow);
  });
};

export const get_user = async (id: number): Promise<user> => {
  const query = `SELECT * FROM "user" where id=${id}`;
  return execute(query).then((res) => {
    if (res.rowCount == 0) {
      throw new Error(`No user was found with id: ${id}`);
    }
    const userRow = res.rows[0];
    return to_user(userRow);
  });
};

export const add_item = (item: item): Promise<number> => {
  const query = `INSERT INTO item (task, priority, date) VALUES ('${item.task}', ${item.priority}, '${item.date}') RETURNING id`;
  return execute(query).then((res) => {
    if (res.rowCount == 0) {
      throw new Error(`Cannot add item ${item}`);
    }
    return res.rows[0]["id"];
  });
};

export const add_user = (user: user): Promise<number> => {
  const query = `INSERT INTO "user" (first_name, last_name) VALUES ('${user.first_name}', '${user.last_name}') RETURNING id`;
  return execute(query).then((res) => {
    if (res.rowCount == 0) {
      throw new Error(`Cannot add user ${user}`);
    }
    return res.rows[0]["id"];
  });
};

export const update_item = (item: item, id: number): Promise<void> => {
  const query = `UPDATE item SET task='${item.task}', priority=${item.priority}, date ='${item.date}' WHERE id=${id}`;
  return execute(query).then((res) => {
    if (res.rowCount == 0) {
      throw new Error(`Cannot update item ${item}`);
    }
  });
};

export const update_user = (user: user, id: number): Promise<void> => {
  const query = `UPDATE "user" SET first_name='${user.first_name}', last_name='${user.last_name}' WHERE id=${id}`;
  return execute(query).then((res) => {
    if (res.rowCount == 0) {
      throw new Error(`Cannot update user ${user}`);
    }
  });
};
