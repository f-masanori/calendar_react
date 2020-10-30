## このアプリについて

これはReactとTypescriptの勉強のために開発したカレンダーアプリです。

現在サマーインターンの経験を経て、コードを新しく作り直しています。(https://github.com/f-masanori/calendar_react_replace)

サーバーレスにするか迷ったのですが、以前インターン先で自分が開発していたgolangのアプリ[途中で開発中止になって自分のものになりました]があったので勉強のためそれを[サーバーサイド](https://github.com/f-masanori/calendar_app)にする事にしました。

[[]]画像

### 使用技術

- 言語 : Typescript,HTML, CSS, JavaScript,
- フレームワーク、ライブラリ : React, Bootstrap, FullCalendar
- ツール : Git, Firebase Authentication
- 開発環境 
  - mac mojave :  10.14.6
  - node : v12.11.1
  - npm : 6.14.2

### 実行方法
1. clone
2. /.env を作成しそこに、firebase Authenticationに必要な情報を記載(認証にfirebase authenticationを使用しているため、自身のプロジェクトを作成する必要あり。)
```.env
REACT_APP_FIREBASE_KEY="xxxxxxxxxxxxxxxxxxx"
REACT_APP_FIREBASE_DOMAIN="xxxxxxxxxxxxxxxxxx"
REACT_APP_FIREBASE_DATABASE="xxxxxxxxxxxxxxxxxxx"
REACT_APP_FIREBASE_PROJECT_ID="xxxxxxxxxxxxxxxxxxx"
REACT_APP_FIREBASE_STORAGE_BUCKET="xxxxxxxxxxxxxxxxxxx"
REACT_APP_FIREBASE_SENDER_ID="xxxxxxxxxxxxxxxxxxx"
```
3. ビルド(npm run buildコマンド) 
4. 3の場合,簡易サーバーを立てる(http-serverなど)

### 現在のデプロイ先

- conohaのVPS

http://118.27.26.186:9000/

- メモ
  - ` $ hs -p 9000 &`でサーバー立ち上げ(./build内・`&`でバックグラウンドで起動)
  - 現在のターミナルで動いているプロセス `$ ps`
  - 動いているプロセス(全て) `$ ps alx`
  - プロセスの終了 `$ kill PID `

### 構成

<img width="712" alt="スクリーンショット 2020-05-11 14 14 28" src="https://user-images.githubusercontent.com/46617611/81526213-f77e1e00-9391-11ea-9bc6-b7d18c416456.png">

###  認証の実装について

- *Firebase Authentication(メールアドレス認証)*を使用
  - 認証周りの勉強のため
- サーバとの通信にはjwt認証を使用
- サインイン・ログイン時にlocalstrageにuidを保存し、サインアウト時に削除
  - それによって一度ログインしてしまえば、ログイン画面がスキップされる(local strageに保存するのがセキュリティ的に危険なのか不明)

### React の実装について

- 全て関数コンポーネントを使用
- Hooksを使用

### 改善したい点

- ~~イベントを削除する機能追加~~
- ~~ログイン済みの際にログイン画面をスキップしてカレンダー表示~~
  - localstrageでログイン状況を管理
- ~~イベントの表示の色を好みで変えれるようにしたい~~
- デザインを工夫したい
  - Bootstrapそのままになってる
- 安全なサイト(ssl)[デプロイ時]
- コンテナとコンポーネントを意識したファイル構成にしたい
- 外部APIの記述ファイルをinterfaceを使って、より見やすくしたい
- ~~外部APIを叩く関数は全てAPIにまとめたい~~
- ~~デプロイしてサーバーのプロセスがなぜが止まっている[バックグラウンドにはしている]~~
  - ~~nodeのhttp-serverを使っているが、その原因解明~~
  - ローカルでテストするときにfirebaseauthで同じアカウントを使用しているから？
- パスワードのバリデーション機能
- ヘッダにログインユーザー表示

### なぜ

- なぜReactか
  - Reactはコンポーネント指向なので、再利用性が高い・保守性が高い
  - 仮装DOMを使用しており、ページの一部を更新するのが速いから
  - SPAを開発してみたかった
- なぜTypeScriptか
  - 型チェックがあり、ミスが減る
- なぜ関数コンポーネントを使うのか
  - 公式も新規開発時には関数コンポーネントを推奨

### バグ

- ~~loginの時signinのボタンが表示されない時がある~~
  - ~~login時のヘッダの分岐の仕組みを見直す~~
  - →3/25 login済みの時はログイン画面スキップで対応
- iPad, iPhoneではdialogを使用したモーダルが正しく機能しない

### 勉強すべき点

- 同期/非同期を詳しく勉強
- CSSの基礎
- ~~reactのres~~
  - refを使って内部DOMにアクセスできる→若干reactの流儀に反している
- jwt認証について
- nodeの.envの詳しい仕組み
- web(ブラウザ) のlocalstrage
- reactにおけるファイル構成・設計
- custom hooks

### メモ・キーワード

- useContext - Redux

### 学べた事

- TypeScriptの基本的な文法
- Reactの知識(コンポーネント指向、JSX、Hooks[useState, useEffect, useContext, useRef])
- React-routerの使い方
- Firebase Authenticationを用いた認証・jwtも
- axiosを用いた非同期HTTP通信
- fullcalendarの使い方
- HTML5のdialog
- 若干のCSS,htmlの知識

_____
## 詰まった点・問題点とその解決策

- FullCalenadarのdateClick(info)を発火とした関数内ではstateを変更できない（dateClick()がcallback関数でありその中でのstate変更はアウト？単純にfullcalendarとreactの相性？）
  - dateClick(info)をトリガーとしたmodalを作成したかったが、Bootstrapmodalはstateを使うため不可
  - Bootstrapmodalにrefをつけてやろうと色々いじってみたが、できない,,
  - そこでCSS onlyのmodalを作成したが、そのmodalではformが正しく機能しなかった(やり方が悪かったのか？)
  - 調べているとHTML5からのdialogという機能をできるかもと思ってdialogとCSSを使った自作modal実装(Ref使用)→できた！
- 外部APIを叩く実装にて、thenの中で処理の続きを書くと少し冗長
  - 外部APIを叩く関数は１まとめにしようと試みたが、非同期処理の勉強不足で失敗
  - async/awaitについて勉強したらできそうな気がしている
- ~~自作modalにて、modal外をクリックでCLOSEにしたい~~
  - ~~→e.stopPropagation()使用で可能~~
- Event追加はdateClick(info)をトリガーとして発火する関数内で実装→state使用できない→順に振られるeventIDの管理どうしよう→html inputのvalueにrefを使って管理
- FullCalendarの描画途中にクリックするとエラー
  - →描画中はクリックできないようにする
  -  pointer-events: none;とz-index を使用（css）
- Reduxを使って書き直ししたい！
  - 現在やっている

______

## HTML関連メモ

### Formデーター送信する流れ
https://qiita.com/lioneo/items/491984392220c0f24ad0
- FormのHTML作成して送信先と送信メソッドを定義する
- サーバーの処理を定義する
- JavaScriptで以下の操作を定義する。
  - 通常にSubmitボタンのアクションをキャンセルする
  - 複数のsubmitが起きないように送信ボタンを無効にする
  - jQuery.ajax()という関数のパラメーターとを正しく指定する
  - 送信した後に後処理が必要であれば定義する　（せめてsubmitボタンを有効にしなければならない）
  - ajaxを動かしてデータ送信する 詳細は以下の例で徐々に説明させていただきます。

______

###  htmlFor

https://qiita.com/nogizaka46/items/612ba6522d546f5f954f#htmlfor

- htmlタグの属性forのこと

```
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>
```

_________

- 

### ~~docker 上でのReact環境構築方法~~

<u>グローバル環境を汚したくなかったため、Docker上で開発を試みたが、npm startからの立ち上げが遅かったため中止</u>

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



### npm インストール時
CXX=clang++ npm install　　
オプションつける
