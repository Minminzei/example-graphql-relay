/**
 * @generated SignedSource<<25e71f10a895c3094e5a5c23932ff006>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileChatItem_chat$data = {
  readonly id: string;
  readonly title: string;
  readonly " $fragmentType": "ProfileChatItem_chat";
};
export type ProfileChatItem_chat$key = {
  readonly " $data"?: ProfileChatItem_chat$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileChatItem_chat">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileChatItem_chat",
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
    }
  ],
  "type": "Chat",
  "abstractKey": null
};

(node as any).hash = "a1ffee8d8558d9a8bce649e0222560c2";

export default node;
