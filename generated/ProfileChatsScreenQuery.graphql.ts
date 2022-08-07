/**
 * @generated SignedSource<<8c8c1a358f44e964e4aa3a3b3496a289>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileChatsScreenQuery$variables = {};
export type ProfileChatsScreenQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ProfileChat_viewer">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ProfileChat_list">;
};
export type ProfileChatsScreenQuery = {
  response: ProfileChatsScreenQuery$data;
  variables: ProfileChatsScreenQuery$variables;
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
    "name": "ProfileChatsScreenQuery",
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
            "name": "ProfileChat_viewer"
          }
        ],
        "storageKey": null
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ProfileChat_list"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ProfileChatsScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Chat",
        "kind": "LinkedField",
        "name": "myChats",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "25297c1109b070b913d3563da67f9edd",
    "id": null,
    "metadata": {},
    "name": "ProfileChatsScreenQuery",
    "operationKind": "query",
    "text": "query ProfileChatsScreenQuery {\n  viewer {\n    ...ProfileChat_viewer\n    id\n  }\n  ...ProfileChat_list\n}\n\nfragment ProfileChat_list on Query {\n  myChats {\n    id\n    title\n  }\n}\n\nfragment ProfileChat_viewer on User {\n  id\n}\n"
  }
};
})();

(node as any).hash = "4ccbf9164b68e7e823d2e54bf1658d96";

export default node;
