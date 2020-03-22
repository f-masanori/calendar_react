### 開発

開発時にはNode.jsの環境が必要

ビルド後のファイルはブラウザ上で動くJavaScript

https://qiita.com/uhyo/items/e4f54ef3b87afdd65546#2-5-usestate

```
// 型引数を明示することも可能
const [anotherState, setAnotherState] = useState<number | null>(null);
```