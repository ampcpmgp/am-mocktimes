[![am-mocktimes Dev Token](https://badge.devtoken.rocks/am-mocktimes)](https://devtoken.rocks/package/am-mocktimes)

# Appearance

| モック一覧 | Webアプリのモック |
| --- | --- |
| ![pattern](https://ampcpmgp.github.io/am-mocktimes/images/am-mocktimes-pattern.gif) | ![mock](https://ampcpmgp.github.io/am-mocktimes/images/am-mocktimes-mock.gif) |

# Sample Page
* [上記アニメーションのサンプルページ](https://ampcpmgp.github.io/am-mocktimes/docs/mock.html?__amMocktimes__=%255B%255B%2522setFullSettings%2522%255D%255D)
* [ライツアウトのサンプルページ](https://ampcpmgp.gitlab.io/plane-puzzle/pattern.html)
  * [ソースコード](https://gitlab.com/ampcpmgp/plane-puzzle)

# Recommended environment

| Node.js | npx | npm |
| --- | --- | --- |
| >= 10.15.3 | >= 6.4.1 | >= 6.4.1 |

※モック一覧ページはIE11非対応なので、
直接Webアプリのモックページでご確認ください。

# start with parcel
以下をインストール。

```
npm i am-mocktimes parcel-plugin-tag less parcel-bundler -D
```

以下のファイル構造で用意します。
 ( `npx am-mocktimes generate-template` でも作成可能です。)

```shell
# モック
mock/
  pattern.yml # モックパターン設定用
  config.js # Webアプリのモック設定用

# アプリケーション本体
src/
  index.html
  app.js
```

作成後、以下のコマンドでparcelサーバーが立ち上がり
http://localhost:1234/pattern.html からアクセスできます。

```shell
npx am-mocktimes watch
# 出力パスは、デフォルトで `.am-mocktimes`に設定されていて、`.gitignore` に追加することを推奨します
```

*※ --sub-modules を指定した場合は、ディレクトリ構造が変わるため http://localhost:1234/.am-mocktimes/pattern.html からアクセスできます*


また、ビルドのみの実行も可能です。
```shell
npx am-mocktimes build
```

オプションの詳しい内容は `npx am-mocktimes help` でご覧くださいm(__)m

## config mock/pattern.yml
モック一覧の表示・設定に利用します。

以下が設定例です。
```yaml
No Plan: []
Plan A: [setPlan, plan/a.json]
  switch:
    Earth: [goLocation, earth]
    Mars: [goLocation, mars]
    Sun: [goLocation, sun]
Plan B:
  func: [setPlan, plan/b.json]
plan Z:
  funcs:
    - [setPlan, plan/z.json, DragonBall]
    - [dbz.open]
```

### reserved property

#### func: Array
配列の先頭に関数名、２つ目以降は、引数として扱われるものになります。
これを指定することで、固有のURLが作られ、後述する[action](#config-mockconfigjs)を呼び出すトリガーになります。
関数名は ドット `.` を繋げることで、object 階層を表すことが出来ます。
[action property](#action-property)に直接この値を定義することで、 `func` propertyを省略できます。


#### funcs: Array[func, func, ...]
`func` を複数定義できます。
funcと同様、省略可能です。

#### switch: Object
スイッチボタンによる、モック切り替えが可能です。
switch配下の設定も他と同様で、新しく何かを覚える必要がありません。

#### description: String
モック一覧の、横に表示するもの。改行ありです。yaml改行を使うと綺麗に書けます。

#### url: String
別URLに切り替えたいときは、このpropertyを設定します。
設定したobject配下に、適用されます。


### action property
reserved property以外は全てaction propertyとなり、pattern list表示用に利用されます。

## config mock/config.js
モックページで呼び出される、アクションを定義します。

以下が設定例です。
```js
import mock from 'am-mocktimes'

const action = {
  setPlan (planFile, world = null) { // multiple arguments can be received
    // setPlan
  },
  async goLocation (location) {
    // await go location
  },
  dbz: {
    start () {
      // DragonBall open
    },
    close () {
      // DragonBall close
    }
  }
}

mock(action)
```

後述の `src/app.js` と `import` のスコープを一緒にしているため、
各moduleの設定や、呼出が可能です。(`watch`時に、 `.am-mocktimes/mock.js` にて確認可能です)

### mock(action: MockAction)
この関数を呼び出すことで、モック状態を生成します。

#### MockAction
`func`で定義した関数名を、keyで持つobjectとなります。
objectは階層を持つことが出来ます。その場合の `func` の指定は、 `func: [modal.open]` のように、 `.` でつなぎます。


## config src/index.html
こちらは、アプリケーション本体を配置します。
[parcel/Getting Started](https://parceljs.org/getting_started.html)を参考に出来ます。



## config src/app.js
上記ファイルから利用される、アプリケーション本体のjsとなります。


# addons

* [screenshot](./addons/screenshot/#readme) - 各モックページのスクリーンショットを保存します。


# start with parcel (only pattern file)

以下のコマンドで、パターンファイルのみのビルドも可能です。

```shell
npx am-mocktimes watch --only-pattern
```

その場合、mock用のhtmlとjsを用意し、別途サーバーを用意します。

```html
<!-- mock/index.html -->
<app></app>
<script src="index.js">
```

js側では以下のように、設定ファイルとアプリファイルの両方読み込むことで、指定されたパターンが動くようになります。

```javascript
// mock/index.js
import './config.js' // config mock/config.js と同様の内容
import '../src/app.js' // アプリケーション本体のjs
```

そして、上記htmlを返すサーバーURLをymlに設定することで、アクセス出来るようになります。

```yaml
// mock/pattern.yml
url: 外部で起動したURLを設定(例: http://localhost:3000/mock.html)
```



# start with others
以下のオプションを使うことで、parcelの起動を止め、出力されたファイルに対し、お好きなビルドを行うことが出来ます。
```shell
npx am-mocktimes watch --no-use-parcel
# `.am-mocktimes/` (出力パス) に、
# `pattern.html / pattern.js` (モック一覧ページ) と
# `mock.html / mock.js` (Webアプリのモックページ) が生成されます。
```
