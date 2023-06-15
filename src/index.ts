import "reflect-metadata";
import dotenv from "dotenv";
import Server from "./server/server";
import { AppDataSource } from "./data-source";

dotenv.config();

const server = new Server();
server.listen();

AppDataSource.initialize()
  .then(async (connection) => {
    if (connection) {
      console.log("===> Connected to the database successfully <===");
    }
  })
  .catch((error) =>
    console.log(
      error,
      "<=== There was an error trying to connect to the database! ===>" + error
    )
  );
