/* useEffect について */
useEffect(() => {
  doSomething();
  return clearSomething();
}, [watchVar]);

// doSomething() がコンポーネントのレンダリングの直前に実行される
// clearSomething()はコンポーネントのアンマウント直前に実行される（なくても良い）
//第二引数は配列で指定する必要がある。(省略可能)
//その配列の中に任意の変数を入れておくと、その値が前回のレンダリング時と変わらなければ第一引数で渡された
//関数の中身の副作用処理実行がキャンセルされることになるの」
//
//文が記述されたコンポーネントでは、初回のレンダリン グの直後にdoSomething()
//が実行され、再レンダリング時にはwatchVarという変数の中身が変更され
//ていればdoSomething()
//が実行されるけど、watchVarが変わっていなければdoSomething() は実行さ れない。