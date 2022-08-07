/**
 * @generated SignedSource<<a0de85c9cc295b671bbe6ba8d9224602>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChatCreateScreenQuery$variables = {};
export type ChatCreateScreenQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ChatCreate_viewer">;
  };
};
export type ChatCreateScreenQuery = {
  response: ChatCreateScreenQuery$data;
  variables: ChatCreateScreenQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatCreateScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChatCreate_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ChatCreateScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1b0d80648193fb83fc940401dc53a4b4",
    "id": null,
    "metadata": {},
    "name": "ChatCreateScreenQuery",
    "operationKind": "query",
    "text": "query ChatCreateScreenQuery {\n  viewer {\n    ...ChatCreate_viewer\n    id\n  }\n}\n\nfragment ChatCreate_viewer on User {\n  id\n}\n"
  }
};

(node as any).hash = "10995becf6213070f2bb59101ea57418";

export default node;
