import { printSchema } from "graphql";
import fs from "fs/promises";
import schema from "./api/schema";

async function dump() {
  await fs.writeFile("./schema.graphql", printSchema(schema));
  console.log("complete to update schema.graphql🤣");
  process.exit();
}

dump();
