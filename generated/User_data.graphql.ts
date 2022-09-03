/**
 * @generated SignedSource<<90dc1555d61ecf187e4e28b464ab5f3b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type User_data$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UserProfile_user">;
  readonly " $fragmentType": "User_data";
};
export type User_data$key = {
  readonly " $data"?: User_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"User_data">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "User_data",
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

(node as any).hash = "8405f71946902e322cf5b9034e3f990e";

export default node;
