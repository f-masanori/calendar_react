## このアプリについて

これはReactとTypescriptの勉強のために開発したカレンダーアプリです。

サーバーレスにするか迷ったのですが、以前インターン先で自分が開発していたgolangのアプリ[途中で開発中止になって自分のものになりました]があったので勉強のためそれを[サーバーサイド](https://github.com/f-masanori/calendar_app)にする事にしました。

[[]]画像

### 使用技術

- 言語 : Typescript,HTML, CSS, JavaScript,
- フレームワーク、ライブラリ : React, Bootstrap, FullCalendar
- ツール : Git, Firebase Authentication
- 開発環境 : mac mojave 10.14.6

### 実行方法

1. clone
2. /.env を作成しそこに、firebase Authenticationに必要な情報を記載
3. ビルド(npm run buildコマンド) もしくは npm start 
4. 3の場合,簡易サーバーを立てる(http-serverなど)

### デプロイ先

- conohaのVPS

http://118.27.26.186:9000/#/

###  認証の実装について

- *Firebase Authentication(メールアドレス認証)*を使用
  - 認証周りの勉強のため
- サーバとの通信にはjwt認証を使用
- サインイン・ログイン時にlocalstrageにuidを保存し、サインアウト時に削除
  - それによって一度ログインしてしまえば、ログイン画面がスキップされる(local strageに保存するのがセキュリティ的に危険なのか不明)

### React の実装について

- 全て関数コンポーネントを使用

### 改善したい点

- イベントを削除する機能追加
- イベントの表示の色を好みで変えれるようにしたい
- UI/UXを考えたデザインにしたい
- 安全なサイト(ssl)
- コンテナとコンポーネントを意識したファイル構成にしたい

### なぜ

- なぜReactか
  - Reactはコンポーネント指向なので、再利用性が高い・保守性が高い
- なぜTypeScriptか
  - 型チェックがあり、ミスが減る
- なぜ関数コンポーネントを使うのか

### 勉強すべき点

- 同期/非同期
- reactのref
- jwt認証について
- nodeの.envの仕組み
- web(ブラウザ) のlocalstrage
- reactにおけるファイル構成

### メモ・キーワード

- useContext - Redux

### 学べた事

- TypeScriptの基本的な文法
- Reactの知識(コンポーネント指向、JSX、Hooks[useState, useEffect],context)
- React-routerの使い方
- Firebase Authenticationを用いた認証・jwtも
- axiosを用いた非同期HTTP通信
- fullcalendarの使い方





______

グローバル環境を汚したくなかったため、Docker上で開発を試みたが、npm startからの立ち上げが遅かったため中止

### docker 上でのReact環境構築方法

Dockerfile

```dockerfile
FROM node:8.16.0-alpine  
WORKDIR /usr/src/app

```

docker-compose.yml

```docker-compose.yml
version: '3.3'

services: 
    node:
        build: .
        volumes:
        - ./:/usr/src/app
        ports:
        - "3000:3000"
        command: sh -c "cd calender_react && yarn start"
```

これで

``docker-compose run --rm node sh -c "npx create-react-app アプリ名 --typescript"``

### Dockerコンテナへの入り方

### npm インストール時
CXX=clang++ npm install　　
オプションつける
