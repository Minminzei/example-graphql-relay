/**
 * @generated SignedSource<<0ae784b279b94037c4b09d2c34831821>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChatsScreenQuery$variables = {};
export type ChatsScreenQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Chats_list">;
};
export type ChatsScreenQuery = {
  response: ChatsScreenQuery$data;
  variables: ChatsScreenQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatsScreenQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "Chats_list"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ChatsScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Chat",
        "kind": "LinkedField",
        "name": "chats",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "image",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "division",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "63e736c1ca48b348a16fafafca2a5d7f",
    "id": null,
    "metadata": {},
    "name": "ChatsScreenQuery",
    "operationKind": "query",
    "text": "query ChatsScreenQuery {\n  ...Chats_list\n}\n\nfragment Chats_list on Query {\n  chats {\n    id\n    title\n    user {\n      id\n      name\n      image\n      division\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a2757dc83cc054102dedaf2f41f3cad7";

export default node;
