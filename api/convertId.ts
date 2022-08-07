import * as _ from "lodash";

const separator = ":";

export function encode(id: number, model: string): string {
  return Buffer.from(`${model}${separator}${id}`).toString("base64");
}

export function decode(globalId: string): number {
  const id = Number(
    _.last(Buffer.from(globalId, "base64").toString().split(separator))
  );
  if (isNaN(id)) {
    throw new Error("invalid id");
  }
  return id;
}
