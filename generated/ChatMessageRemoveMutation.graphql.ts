/**
 * @generated SignedSource<<48a90c2ec0e3e6af92cbe674fcac0b25>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemovePostInput = {
  id: string;
  user_id: string;
};
export type ChatMessageRemoveMutation$variables = {
  input: RemovePostInput;
};
export type ChatMessageRemoveMutation$data = {
  readonly removePost: {
    readonly __typename: "Post";
    readonly deletedAt: string | null;
    readonly id: string;
  } | {
    readonly __typename: "PostRemovedError";
    readonly message: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type ChatMessageRemoveMutation = {
  response: ChatMessageRemoveMutation$data;
  variables: ChatMessageRemoveMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": null,
    "kind": "LinkedField",
    "name": "removePost",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "__typename",
        "storageKey": null
      },
      {
        "kind": "InlineFragment",
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
            "name": "deletedAt",
            "storageKey": null
          }
        ],
        "type": "Post",
        "abstractKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "message",
            "storageKey": null
          }
        ],
        "type": "PostRemovedError",
        "abstractKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatMessageRemoveMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChatMessageRemoveMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ec242c05c44b0db2bbb95cf3e29db8c6",
    "id": null,
    "metadata": {},
    "name": "ChatMessageRemoveMutation",
    "operationKind": "mutation",
    "text": "mutation ChatMessageRemoveMutation(\n  $input: RemovePostInput!\n) {\n  removePost(input: $input) {\n    __typename\n    ... on Post {\n      id\n      deletedAt\n    }\n    ... on PostRemovedError {\n      message\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ae28d21a9aeb8767c2c1990b51f504ab";

export default node;
