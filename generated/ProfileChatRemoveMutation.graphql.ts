/**
 * @generated SignedSource<<c7c7e194aa3da2961d84571c5d8620a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveChatInput = {
  id: string;
  user_id: string;
};
export type ProfileChatRemoveMutation$variables = {
  input: RemoveChatInput;
};
export type ProfileChatRemoveMutation$data = {
  readonly removeChat: {
    readonly __typename: "ChatRemovedError";
    readonly message: string;
  } | {
    readonly __typename: "ChatRemovedSuccess";
    readonly id: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type ProfileChatRemoveMutation = {
  response: ProfileChatRemoveMutation$data;
  variables: ProfileChatRemoveMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
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
  "type": "ChatRemovedError",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProfileChatRemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "removeChat",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/)
            ],
            "type": "ChatRemovedSuccess",
            "abstractKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileChatRemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "removeChat",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "deleteRecord",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id"
              }
            ],
            "type": "ChatRemovedSuccess",
            "abstractKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "474b5b7fc51dcff958f97715124e6631",
    "id": null,
    "metadata": {},
    "name": "ProfileChatRemoveMutation",
    "operationKind": "mutation",
    "text": "mutation ProfileChatRemoveMutation(\n  $input: RemoveChatInput!\n) {\n  removeChat(input: $input) {\n    __typename\n    ... on ChatRemovedSuccess {\n      id\n    }\n    ... on ChatRemovedError {\n      message\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "044fd03a0494d6f032a7281c389a6a2b";

export default node;
