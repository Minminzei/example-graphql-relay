/**
 * @generated SignedSource<<d85075c86fc2a0adcd392a31a138e279>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type User_chats$data = {
  readonly chats: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"UserChat_data">;
  }>;
  readonly " $fragmentType": "User_chats";
};
export type User_chats$key = {
  readonly " $data"?: User_chats$data;
  readonly " $fragmentSpreads": FragmentRefs<"User_chats">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "user_id"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "User_chats",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "user_id",
          "variableName": "user_id"
        }
      ],
      "concreteType": "Chat",
      "kind": "LinkedField",
      "name": "chats",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "UserChat_data"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "1e76fca1d0a112ca3771c741c4934d90";

export default node;
