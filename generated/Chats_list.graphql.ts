/**
 * @generated SignedSource<<b485d4d9cce42d28f7dda0e444f776a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Chats_list$data = {
  readonly chats: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
    readonly user: {
      readonly division: string;
      readonly id: string;
      readonly image: string;
      readonly name: string;
    };
  }>;
  readonly " $fragmentType": "Chats_list";
};
export type Chats_list$key = {
  readonly " $data"?: Chats_list$data;
  readonly " $fragmentSpreads": FragmentRefs<"Chats_list">;
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
  "name": "Chats_list",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Chat",
      "kind": "LinkedField",
      "name": "chats",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
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
            (v0/*: any*/),
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
              "name": "division",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "7e6937344e6941e54fce3a7ba3d61284";

export default node;
