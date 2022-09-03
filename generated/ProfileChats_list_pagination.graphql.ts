/**
 * @generated SignedSource<<d1a1b790c1da6eb98b8cd374f8758e42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileChats_list_pagination$variables = {
  after?: string | null;
  first: number;
};
export type ProfileChats_list_pagination$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ProfileChats_list">;
};
export type ProfileChats_list_pagination = {
  response: ProfileChats_list_pagination$data;
  variables: ProfileChats_list_pagination$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProfileChats_list_pagination",
    "selections": [
      {
        "args": (v1/*: any*/),
        "kind": "FragmentSpread",
        "name": "ProfileChats_list"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileChats_list_pagination",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChatConnectionConnection",
        "kind": "LinkedField",
        "name": "viewerChats",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ChatConnectionEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Chat",
                "kind": "LinkedField",
                "name": "node",
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
                    "name": "title",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "ProfileChats__viewerChats",
        "kind": "LinkedHandle",
        "name": "viewerChats"
      }
    ]
  },
  "params": {
    "cacheID": "8130944a717e3fd1e8563d9b6b962d8d",
    "id": null,
    "metadata": {},
    "name": "ProfileChats_list_pagination",
    "operationKind": "query",
    "text": "query ProfileChats_list_pagination(\n  $after: String\n  $first: Int!\n) {\n  ...ProfileChats_list_2HEEH6\n}\n\nfragment ProfileChatItem_chat on Chat {\n  id\n  title\n}\n\nfragment ProfileChats_list_2HEEH6 on Query {\n  viewerChats(first: $first, after: $after) {\n    edges {\n      node {\n        id\n        ...ProfileChatItem_chat\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "015aafad2c1581e2b900f16b0e7de608";

export default node;
