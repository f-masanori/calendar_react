//オブジェクトの型をinterfaceで定義する
interface AppState {
    count: number;
    name?: string;//?がつくと省略可能な値になる
}
const mano: AppState = { count: 22, name: "mam" }
/* typeはinterface型を代入するもの(interfaceの合成時などに使われる) */
type User = AppState;
const nakano: User = { count: 12, name: "ffm" }

interface HogeInter{
    age: number
}
type intermun = AppState & HogeInter //{合成したものになる}

//配列
const arr = number[] = [1, 2, 3];
const arr2 = Array < number >= [1, 2, 3];

//関数
const add = (n: number, m: number): number => n + m;
/*アロー関数ではreturn文のみの時returnを省略可能*/

//Reactメモ
/* 
コンポーネントが再レンダリングされるのは基本的に2つの場合
1. そのコンポーネントに渡されているPropsか自身のlocal stateに変更があった時(再レンダリングしない設定もできる)
2. 

コンテキストの利用に必要なステップは

Contextを作成する
Providerに受け渡したい値をセットして定義する
Consumerを定義して値を受け取り処理をする
*/