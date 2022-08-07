/**
 * @generated SignedSource<<0175029cd7ecb80330608d1e066c9e33>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ProfileInput = {
  division: string;
  email: string;
  image: string;
  name: string;
};
export type ProfileUserMutation$variables = {
  input: ProfileInput;
};
export type ProfileUserMutation$data = {
  readonly updateProfile: {
    readonly __typename: "ProfileUpdatedError";
    readonly message: string;
  } | {
    readonly __typename: "User";
    readonly division: string;
    readonly email: string;
    readonly id: string;
    readonly image: string;
    readonly name: string;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type ProfileUserMutation = {
  response: ProfileUserMutation$data;
  variables: ProfileUserMutation$variables;
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
    "name": "updateProfile",
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
        "type": "User",
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
        "type": "ProfileUpdatedError",
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
    "name": "ProfileUserMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileUserMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f6f5e580355d9b3713eb1a59511f36ae",
    "id": null,
    "metadata": {},
    "name": "ProfileUserMutation",
    "operationKind": "mutation",
    "text": "mutation ProfileUserMutation(\n  $input: ProfileInput!\n) {\n  updateProfile(input: $input) {\n    __typename\n    ... on User {\n      id\n      name\n      image\n      email\n      division\n    }\n    ... on ProfileUpdatedError {\n      message\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "63a82b050a4f15c40831ed67b9c5ccf1";

export default node;
