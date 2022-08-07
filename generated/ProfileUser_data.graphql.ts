/**
 * @generated SignedSource<<64d90e7b0a5c574454d8094eaeda8cba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileUser_data$data = {
  readonly division: string;
  readonly email: string;
  readonly id: string;
  readonly image: string;
  readonly name: string;
  readonly " $fragmentType": "ProfileUser_data";
};
export type ProfileUser_data$key = {
  readonly " $data"?: ProfileUser_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileUser_data">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileUser_data",
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
};

(node as any).hash = "42437ec8e1435d5e843649d46e876084";

export default node;
