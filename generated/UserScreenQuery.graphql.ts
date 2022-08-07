/**
 * @generated SignedSource<<65e95e96c245b6d61d6eaab58366cb55>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserScreenQuery$variables = {
  id: string;
};
export type UserScreenQuery$data = {
  readonly user: {
    readonly " $fragmentSpreads": FragmentRefs<"User_list">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"User_chats">;
};
export type UserScreenQuery = {
  response: UserScreenQuery$data;
  variables: UserScreenQuery$variables;
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
v2 = [
  {
    "kind": "Variable",
    "name": "user_id",
    "variableName": "id"
  }
],
v3 = {
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
    "name": "UserScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "User_list"
          }
        ],
        "storageKey": null
      },
      {
        "args": (v2/*: any*/),
        "kind": "FragmentSpread",
        "name": "User_chats"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserScreenQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
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
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "Chat",
        "kind": "LinkedField",
        "name": "chats",
        "plural": true,
        "selections": [
          (v3/*: any*/),
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
    "cacheID": "fe16ff2ad26ace95e2b9a42b82a537ae",
    "id": null,
    "metadata": {},
    "name": "UserScreenQuery",
    "operationKind": "query",
    "text": "query UserScreenQuery(\n  $id: ID!\n) {\n  user(id: $id) {\n    ...User_list\n    id\n  }\n  ...User_chats_3UvyJX\n}\n\nfragment UserChat_data on Chat {\n  id\n  title\n}\n\nfragment UserProfile_user on User {\n  name\n  image\n  email\n  division\n}\n\nfragment User_chats_3UvyJX on Query {\n  chats(user_id: $id) {\n    id\n    ...UserChat_data\n  }\n}\n\nfragment User_list on User {\n  ...UserProfile_user\n}\n"
  }
};
})();

(node as any).hash = "6d680413f776fd7950ebe928bd6b8af9";

export default node;
