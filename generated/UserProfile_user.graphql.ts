/**
 * @generated SignedSource<<f7da94232fb7b2696c64e3ade340657c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserProfile_user$data = {
  readonly division: string;
  readonly email: string;
  readonly image: string;
  readonly name: string;
  readonly " $fragmentType": "UserProfile_user";
};
export type UserProfile_user$key = {
  readonly " $data"?: UserProfile_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserProfile_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserProfile_user",
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
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "9809c012fe459130454ff8d635242531";

export default node;
