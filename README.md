##

## 環境構築

1. docker 環境構築

```
## ソースを取得してdocker build
git clone
cd pengin
yarn
docker-compose build
docker-compose up

## サーバーにログインして database 初期化
docker-compose exec app bash
yarn initPrisma
```

2. サーバー起動

```
docker-compose up
docker-compose exec app bash
yarn dev
```
