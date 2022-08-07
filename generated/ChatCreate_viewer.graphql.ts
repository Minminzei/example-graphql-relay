/**
 * @generated SignedSource<<009168cb232ee41111d25c1a75533b2e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChatCreate_viewer$data = {
  readonly id: string;
  readonly " $fragmentType": "ChatCreate_viewer";
};
export type ChatCreate_viewer$key = {
  readonly " $data"?: ChatCreate_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChatCreate_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChatCreate_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "be2adc2d1e9b5f3c8495c0acacc50161";

export default node;
