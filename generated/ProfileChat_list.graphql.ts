/**
 * @generated SignedSource<<c21a67a298917637c6530ccd0ac568fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileChat_list$data = {
  readonly myChats: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
  }>;
  readonly " $fragmentType": "ProfileChat_list";
};
export type ProfileChat_list$key = {
  readonly " $data"?: ProfileChat_list$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileChat_list">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileChat_list",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Chat",
      "kind": "LinkedField",
      "name": "myChats",
      "plural": true,
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
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "1bf185f71b1b65310de84e444fec1a5d";

export default node;
