/**
 * @generated SignedSource<<bfb863c3fad405f25f22cb74b5ed2e85>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type User_list$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UserProfile_user">;
  readonly " $fragmentType": "User_list";
};
export type User_list$key = {
  readonly " $data"?: User_list$data;
  readonly " $fragmentSpreads": FragmentRefs<"User_list">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "User_list",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserProfile_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "73697228111e17b07c6bf57dea0edecb";

export default node;
