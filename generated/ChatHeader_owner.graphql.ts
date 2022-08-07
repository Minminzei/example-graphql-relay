/**
 * @generated SignedSource<<cd57447fc7a5d526416f79aa76962bb7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChatHeader_owner$data = {
  readonly title: string;
  readonly " $fragmentType": "ChatHeader_owner";
};
export type ChatHeader_owner$key = {
  readonly " $data"?: ChatHeader_owner$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChatHeader_owner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChatHeader_owner",
  "selections": [
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

(node as any).hash = "53490c6f2c5eb09509d27678fa3e24f5";

export default node;
