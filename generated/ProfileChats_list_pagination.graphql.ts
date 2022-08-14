/**
 * @generated SignedSource<<064bf6d546f4dae6c9fd33b8b88746d4>>
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
  user_id: string;
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "user_id"
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
  },
  {
    "kind": "Variable",
    "name": "user_id",
    "variableName": "user_id"
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
        "name": "chats",
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
        "filters": [
          "user_id"
        ],
        "handle": "connection",
        "key": "ProfileChats_chats",
        "kind": "LinkedHandle",
        "name": "chats"
      }
    ]
  },
  "params": {
    "cacheID": "72c7c17d99bc9a791a063c907bfd7b7e",
    "id": null,
    "metadata": {},
    "name": "ProfileChats_list_pagination",
    "operationKind": "query",
    "text": "query ProfileChats_list_pagination(\n  $after: String\n  $first: Int!\n  $user_id: ID!\n) {\n  ...ProfileChats_list_4n34ss\n}\n\nfragment ProfileChatItem_chat on Chat {\n  id\n  title\n}\n\nfragment ProfileChats_list_4n34ss on Query {\n  chats(first: $first, after: $after, user_id: $user_id) {\n    edges {\n      node {\n        id\n        ...ProfileChatItem_chat\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "639acb7cbf8fb47f1b589b3c79ad5b85";

export default node;
