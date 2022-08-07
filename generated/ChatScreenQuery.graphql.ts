/**
 * @generated SignedSource<<200fc0b5e16baf2723fad81367837bac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChatScreenQuery$variables = {
  id: string;
};
export type ChatScreenQuery$data = {
  readonly chat: {
    readonly " $fragmentSpreads": FragmentRefs<"Chat_detail">;
  };
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"Chat_viewer">;
  };
};
export type ChatScreenQuery = {
  response: ChatScreenQuery$data;
  variables: ChatScreenQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Chat",
        "kind": "LinkedField",
        "name": "chat",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Chat_detail"
          }
        ],
        "storageKey": null
      },
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
            "name": "Chat_viewer"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChatScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Chat",
        "kind": "LinkedField",
        "name": "chat",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "posts",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "deletedAt",
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
                  (v2/*: any*/),
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
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "content",
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
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7ab6199e238e442fa835138cec40113d",
    "id": null,
    "metadata": {},
    "name": "ChatScreenQuery",
    "operationKind": "query",
    "text": "query ChatScreenQuery(\n  $id: ID!\n) {\n  chat(id: $id) {\n    ...Chat_detail\n    id\n  }\n  viewer {\n    ...Chat_viewer\n    id\n  }\n}\n\nfragment ChatHeader_owner on Chat {\n  title\n}\n\nfragment ChatMessage_post on Post {\n  id\n  content\n  deletedAt\n  user {\n    id\n    name\n    image\n  }\n}\n\nfragment ChatMessage_viewer on User {\n  id\n}\n\nfragment ChatPost_chat on Chat {\n  id\n}\n\nfragment ChatPost_viewer on User {\n  id\n}\n\nfragment Chat_detail on Chat {\n  id\n  ...ChatHeader_owner\n  ...ChatPost_chat\n  posts {\n    id\n    deletedAt\n    user {\n      id\n    }\n    ...ChatMessage_post\n  }\n}\n\nfragment Chat_viewer on User {\n  ...ChatMessage_viewer\n  ...ChatPost_viewer\n}\n"
  }
};
})();

(node as any).hash = "b7943e118fd44f829815fa497ed8c3c3";

export default node;
