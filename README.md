## GraphQL / Relay サンプル

このレポジトリは GraphQL, React Relay を使ったサンプルです。このサンプルシステムでは次のことをカバーしています。

- Query/ Mutation の基本的な使い方
- Fragment Colocation
- Connection の使い方
- Relay-style に基づいたページネーション
- ユーザーフレンドリーなエラー UX
- Recoil を使った画面をまたがったメッセージ処理

https://user-images.githubusercontent.com/3320542/188304766-811d7d6c-4200-4342-93d8-7a021dfbfa7c.mov

#### 目次

1. [環境構築](#build)
1. [Relay の特徴](#relay)
1. [宣言的なデータ通信](#data-fetching)
1. [Relay のキャッシュ管理](#cache)
1. [Fragment Colocation](#fragment-colocation)
1. [エラー UX の設計](#error-ux)

<a id="build"></a>

## 1. 環境構築

1. docker 環境構築

```
## ソースを取得してdocker build
git clone
cd pengin
yarn
docker-compose up -d

## サーバーにログインして database 初期化
docker-compose exec app bash
yarn initPrisma
```

2. サーバー起動

```
docker-compose exec app bash
yarn server
```

3. アプリ起動

```
cd pengin
yarn ios
```

<a id="relay"></a>

## 2. Relay の特徴

Relay は高いパフォーマンスと、バグが生じない堅牢なシステム開発を目的としたライブラリです。この特徴のため、レギュレーションが厳しく、初期学習が非常に大変です。しかし非常に良くできたライブラリなので、自社サービスの開発など堅牢性とメンテナンス性が重要なシーンではオススメです。

| 項目             | Apollo | Relay    |
| ---------------- | ------ | -------- |
| レギュレーション | 柔軟   | ガチガチ |
| 初期学習         | 優しい | 難しい   |
| 堅牢性           | ○      | ◎        |
| パフォーマンス   | ○      | ◎        |

<a id="data-fetchin"></a>

## 3. 宣言的なデータ通信

GraphQL の最大の特徴はリクエストとレスポンスを静的に宣言する`Declarative Data-fetching`です。こうすることでサーバーサイドとクライアントサイドの開発を分離でき、データの`under-fetch`やサーバー/クライアント間の型の不整合によるバグの発生を防ぐことができます。

<a id="cache"></a>

## 4. Relay のキャッシュ管理

どうやってキャッシュを効率的かつ安全に管理するか？Relay はこのキャッシュ戦略上の課題に`Normalized Cache` というコンセプトでアプローチします。JSON のようなドキュメント型データには関連テーブルを階層的に埋め込む`embeded`型のデータ設計と、参照キーで関連付ける`referenced`型のデータ設計があります。GraphQL スキーマ上のデータ構造は`embeded`型で構成されていますが、`embeded`型データのキャッシュ管理は非効率で堅牢でもないため、Relay はキャッシュ管理において`embeded`型データを`referenced`型データに変換します。この操作を`Normalized Cache`と呼びます。

```
## GraphQL query
query {
  users {
    id
    name
    photo
    club {
      id
      name
    }
    friends {
      id
      name
      photo
    }
  }
}

## Embed型データオブジェクト = GraphQL通信で取得したデータ
{
  "user:1": {
    id: "user:1",
    name: "田中",
    photo: "photo1.jpg",
    club: {
      id: "club:1",
      name: "サッカー部",
    },
    friends: [
      {
        id: "user:2",
        name: "佐藤",
        photo: "photo2.jpg",
      }
    ],
  },
  "user:2": {
    id: "user:2",
    name: "佐藤",
    photo: "photo2.jpg",
    club: {
      id: "club:1",
      name: "サッカー部",
    },
    friends: [
      {
        id: "user:1",
        name: "田中",
        photo: "photo1.jpg",
      }
    ],
  }
}

## Reference型データオブジェクト = Relayのキャッシュ管理のためにNormalizeされたデータ
{
  "user:1": Map {
    name: "田中",
    photo: "photo1.jpg",
    club: Link("club:1"),
    friends: [Link("user:2")],
  },
  "club:1": Map {
    id: "club:1",
    name: "サッカー部",
  }
  "user:2": Map {
    name: "佐藤",
    photo: "photo2.jpg",
    club: Link("club:1"),
    friends: [Link("user:1")],
  },
}
```

例えば`user:2`が`photo`を変更すると `embeded` 型の場合、`"user:1".friends."users:2"` と `"user:2"` の 2 箇所を更新しないといけませんが、`reference`型の場合は`"user:2"`だけを更新すれば影響するデータ全てが最新状態に同期されます。このようにデータの更新回数を最小限にすることでキャッシュ管理を効率的で安全なものにしてデータの完全性を担保します。ちなみに Relay は ID をキーとしたデータに Normalize するために Relay における GlobalId はシステム全体でユニークにしないといけません[(Inconsistent \_\_typename error)](https://relay.dev/docs/debugging/inconsistent-typename-error/)。

<a id="fragment-colocation"></a>

## 5. Fragment Colocation

前章の`Normalized Cache` によってキャッシュデータの一貫性を担保していると説明しましたが、React におけるキャッシュデータと View の一貫性をどう保つかが次の論点になります(Data Binding)。この論点をもう少し掘り下げると、① どうやって View で使用するデータと取得データの不整合を防ぐか？(`under-fetch`及び型エラーの問題)と、② キャッシュが更新されたとき、どうやって関連する View を再レンダリングするか？という２つに分解できます。この課題に対して Relay は`Fragment Colocation`というコンセプトで効率的なパフォーマンスと堅牢性を実現します。

Co-location とは 2 対の対象物を関連付けて配置することで、Relay においてはデータと View Component を関連付けて実装することを意味しています。`Fragment Colocation`という概念は、 View Component が自身が使いたいデータを Fragment として宣言することで、View が過不足なく使用するデータを受け取ることができ(① の論点)、受け取ったデータが更新された場合、View 自身を再レンダリングすることができるようになる(② の論点)、ということを意味しています。早速`UserScreens.tsx`をサンプルに`Fragment Colocation`を理解していきましょう。

```
[components/organisms/User/UserProfile.tsx]
fragment UserProfile_user on User {
  name
  image
  email
  division
}

[components/templates/ChatCreate.tsx]
fragment User_data on User {
  ...UserProfile_user
}

[screens/UserScreens.tsx]
query UserScreenQuery($id: ID!) {
  user(id: $id) {
    ...User_data
  }
}
```

`Fragment Colocation`では各 Component が使いたいデータを宣言し、親のコンポーネントがそれらを集約してクエリを投げます。`components/organisms/User/UserProfile.tsx`では`schema.grapql`に記載された`type User`のうち`name/ image/ email/ division`を使いたいということを Fragment`UserProfile_user`で宣言します。`components/templates/ChatCreate.tsx`は受け取った Fragment`UserProfile_user` を`User_data`というフラグメント名で宣言し、親の`screens/UserScreens.tsx`が`query user`に対して、`User_data`を使いたいと宣言しています。

このように Component が実際に使用するデータを宣言することでデータの`under-fetch`や型エラーを回避し、親子間のデータのやり取りを Fragment で行うことで親子間の依存関係を最小にします。例えば`components/organisms/User/UserProfile.tsx`で新たに`gender`を使いたくなったときは`fragment UserProfile_user`に`gender`を追記するだけで良く、親の`components/templates/ChatCreate.tsx`は子の変更について知る必要がありません。

次に View の再レンダリングについて。各コンポーネントが宣言したデータに変更があった場合、そのコンポーネントに再レンダリングが発火します。例えば`users.name`に変更があった場合、`components/organisms/User/UserProfile.tsx`のみに再レンダリングが走り、`users.name`を使うと宣言していない親の`components/templates/ChatCreate.tsx`や`screens/UserScreens.tsx`には発火しません。このように最小限の再レンダリングに抑えることで効率的なデータバインディングを実現しています。

<a id="error-ux"></a>

## 6. エラー UX の設計

GraphQL のレスポンスはスキーマに定義されたデータを格納する`data`と、エラー情報を格納する`errors`から構成されていますが、`errors`を使ったエラー運用にはいくつか課題が残ります。

```
## GraphQLのレスポンス フォーマット
{
  "data": {
    スキーマに定義されたデータ
  },
  "errors": [
    {
      "message": "情報の取得に失敗しました",
      "locations": [{ "line": 6, "column": 7 }],
      "path": ["hero", "heroFriends", 1, "name"],
      "extensions": {
        "code": "NOT_FOUND",
      }
    }
  ],
}
```

一つ目は`errors`はスキーマの定義外になってしまうため、GraphQL の宣言的データ通信の利点が消えてしまうこと、二つ目はエラーの帰属先が曖昧になり、抽象的なエラー UX になってしまうことです。
本来エラーの多くは具体的な Component 内の操作に帰属するが、`errors`を使うとエラーがリクエストに帰属してしまい、エラーメッセージと UIUX が乖離しやすくなってしまいます。例えば CTA は「資料を請求する」なのにエラーメッセージが「送信できませんでした」や「システムエラーが発生しました」では適切なエラー UX になっていません。エラー情報を静的に宣言し、具体的な Component と関連付ける(colocate)ことで、実際のユーザーの利用シーンを意識付け、役に立つエラー UX をユーザーに提供しやすくなります。[Accessing errors in GraphQL Responses](https://relay.dev/docs/guided-tour/rendering/error-states/#accessing-errors-in-graphql-responses)

このことを踏まえて`components/templates/ChatCreate.tsx`の`createChat`ではチャット作成時のエラー UX を設計しています。

```
[schema.graphql]
type ChatDuplicateNameError {
  message: String!
}

type ChatCreatedError {
  message: String!
}

union ChatCreatedResult = ChatEdges | ChatDuplicateNameError | ChatCreatedError

type Mutation {
  createChat(input: CreateChatInput!): ChatCreatedResult!
}

----
[components/templates/ChatCreate.tsx]
mutation ChatCreateMutation($input: CreateChatInput!, $connections: [ID!]!) {
  createChat(input: $input) {
    __typename
    ... on ChatEdges {
      chatEdges @appendEdge(connections: $connections) {
        node {
          id
          title
        }
      }
    }
    ... on ChatDuplicateNameError {
      message
    }
    ... on ChatCreatedError {
      message
    }
  }
}
```

まず`schema.graphql`で createChat のレスポンスとして、作成成功時の`ChatEdges`、エラー発生時の`ChatDuplicateNameError`, `ChatCreatedError`をスキーまで定義し、これら 3 つのいずれかを返すということを union 型で宣言しています。重要な論点として、`ChatDuplicateNameError`というエラー型を宣言することで、エラーの内容を予想できるようになりコードレビュー時に適切性を判断できるようになります。例えば`ChatDuplicateNameError`のメッセージが「チャットを作成できませんでした」では不適切であるということがレビューしやすくなります。他にも UI 上に「一度作成したチャット名は利用できません」などを表示するとより分かりやすくなると判断できるようになり、実装レベルで UIUX の質を改善できます。

<a id="muation-connection"></a>

## 7. mutation と connection の更新

mutation の基本的な使い方は`components/organisms/Chat/ChatPost.tsx`の createPost を参照にします。ここではチャットのタイムラインにメッセージを投稿しています。

```
[components/organisms/Chat/ChatPost.tsx]
mutation ChatPostMutation($input: CreatePostInput!, $connections: [ID!]!) {
  createPost(input: $input) {
    __typename
    ... on PostEdges {
      postEdges @prependEdge(connections: $connections) {
        cursor
        node {
          id
          content
          user {
            name
            image
          }
        }
      }
    }
    ... on CreatePostError {
      message
    }
  }
}
```

createPost のレスポンスは、投稿が成功した場合は投稿メッセージである`PostEdges`を、失敗した場合は`CreatePostError`を union 型で受け取ります。特筆点はメッセージが新規投稿された場合、既存のタイムラインに追加される点です。これは`@prependEdge`によって新規メッセージを対象のタイムライン(`$connections`)に追加すると宣言することで実現されます。connection の更新は[updater を使っても実現できますが](https://relay.dev/docs/guided-tour/updating-data/imperatively-modifying-store-data-unsafe/#example)、経験上`@appendEdge / @prependEdge / @deleteEdge`を使った宣言でほとんどの機能は実装できるため、updater を使う場合は本当に必要なのかを一度立ち止まると良いです。
`@deleteEdge`を使ったサンプルは`components/organisms/Chat/ChatMessage.tsx`の removePost を参考にしてください。

<a id="pagination"></a>

## 8. relay-style による pagination の実装

relay-style pagination 自体は多くの記事があるので、そちらを参照してください。このレポジトリでは`components/templates/Chats.tsx`でのチャット一覧の取得や`components/templates/Chat.tsx`でのチャットに紐づくメッセージの一覧取得など複数箇所で pagination を使用しています。前者は`Pagination on Query`、後者は`Pagination on Type`と違った処理を実装しているので、詳しく知りたい方はソースをおってください。

```
[schema.graphql]
type Query {
  chats(
    after: String
    first: Int
    before: String
    last: Int
    user_id: ID
  ): ChatConnection!
}

----
[components/templates/Chats.tsx]
fragment Chats_list on Query
@refetchable(queryName: "Chats_list_pagination")
@argumentDefinitions(after: { type: "String" }, first: { type: "Int!" }) {
  chats(first: $first, after: $after) @connection(key: "Chats_chats") {
    edges {
      node {
        id
        title
        user {
          id
          name
          image
          division
        }
      }
    }
  }
}
~~ 略 ~~
const { data, loadNext, hasNext, refetch } = usePaginationFragment(
  chatsQuery,
  chatsFragment
);

```

まず`schema.graphql`を見ると、`chats`というチャットコネクションを取得するための`query`を確認できます。パラメーターとして記載された`after/ first/ befrore/ last`は`relay-style`に準拠したもので、取得位置や件数などを指定するものです。このスキーマに従って、`components/templates/Chats.tsx`ではページネーションを fragment として宣言し、`usePaginationFragment`で実体化してます。その結果、取得した`data`や追加取得用の`loadNext`、レフレッシュ用の`refetch`を利用できるようになります。
