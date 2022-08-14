import { fromGlobalId } from "graphql-relay";

export default function decodeId(globalId: string): number {
  const { id } = fromGlobalId(globalId);
  const typeId = Number(id);
  if (isNaN(typeId)) {
    throw new Error("invalid id");
  }
  return typeId;
}
