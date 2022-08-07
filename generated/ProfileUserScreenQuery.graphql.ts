/**
 * @generated SignedSource<<40a46d20786105312ddc0063140cbdee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileUserScreenQuery$variables = {};
export type ProfileUserScreenQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ProfileUser_data">;
  };
};
export type ProfileUserScreenQuery = {
  response: ProfileUserScreenQuery$data;
  variables: ProfileUserScreenQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProfileUserScreenQuery",
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
            "name": "ProfileUser_data"
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
    "name": "ProfileUserScreenQuery",
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
          },
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
            "name": "email",
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
    ]
  },
  "params": {
    "cacheID": "5fbcd01c63a7ba00ee29ea7f5231b202",
    "id": null,
    "metadata": {},
    "name": "ProfileUserScreenQuery",
    "operationKind": "query",
    "text": "query ProfileUserScreenQuery {\n  viewer {\n    ...ProfileUser_data\n    id\n  }\n}\n\nfragment ProfileUser_data on User {\n  id\n  name\n  image\n  email\n  division\n}\n"
  }
};

(node as any).hash = "016fc3522f50d4b4d3083a2afc7bb8bc";

export default node;
