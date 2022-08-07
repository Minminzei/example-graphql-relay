/**
 * @generated SignedSource<<08ae07bfb69bdcece935df003c0cd02a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Chat_detail$data = {
  readonly id: string;
  readonly posts: ReadonlyArray<{
    readonly deletedAt: string | null;
    readonly id: string;
    readonly user: {
      readonly id: string;
    };
    readonly " $fragmentSpreads": FragmentRefs<"ChatMessage_post">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ChatHeader_owner" | "ChatPost_chat">;
  readonly " $fragmentType": "Chat_detail";
};
export type Chat_detail$key = {
  readonly " $data"?: Chat_detail$data;
  readonly " $fragmentSpreads": FragmentRefs<"Chat_detail">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Chat_detail",
  "selections": [
    (v0/*: any*/),
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChatHeader_owner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChatPost_chat"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "posts",
      "plural": true,
      "selections": [
        (v0/*: any*/),
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
            (v0/*: any*/)
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChatMessage_post"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Chat",
  "abstractKey": null
};
})();

(node as any).hash = "4384add8bd0aa1f481fea83ece5eecb3";

export default node;
