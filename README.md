# am-mocktimes

[![am-mocktimes Dev Token](https://badge.devtoken.rocks/am-mocktimes)](https://devtoken.rocks/package/am-mocktimes)

モック生成・パターン管理ツールです。

## Sample Page

* [サンプルページ](https://ampcpmgp.github.io/am-mocktimes/docs/mock/testbed/index.html)
* [ライツアウトのサンプルページ](https://ampcpmgp.gitlab.io/plane-puzzle/pattern.html)

## Recommended environment

| Node.js | npx | npm |
| --- | --- | --- |
| >= 10.15.3 | >= 6.4.1 | >= 6.4.1 |

## start with Vite

TODO

## How to use

テンプレートファイル生成後、以下のファイルが出来上がります。

```shell
# モック
mock/
  mock-config.js # モック画面 - 設定ファイル
  patterns.yml # パターン一覧画面 - 設定ファイル

  testbed/
    index.html # パターン一覧画面
    index.js # パターン一覧画面js
    mock.html # モック画面
    mock.js # モック画面js

# アプリケーション本体
index.html
src/
  main.js
```

### config mock/patterns.yml

モック一覧の表示・設定に利用します。

以下が設定例です。

```yaml
settings:
  url: mock.html
No Plan: []
Plan A:
  func: [setPlan, A]
  switch:
    Earth: [goLocation, Earth]
    Mars: [goLocation, Mars]
    Sun: [goLocation, Sun]
Plan B: [setPlan, B]
plan Z:
  funcs:
    - [setPlan, Z, DragonBall]
    - [dbz.open]
```

#### settings.url: String

別URLに切り替えたいときは、このpropertyを設定します。
設定したobject配下に適用されます。

#### settings.target: String

デフォルトは `browser` になります。この設定により、パターン一覧画面からモックを表示する際に iframe が使われるようになります。 `electron` に指定すると、モック表示に webview が使われ Node.js を実行出来るようになります。

#### func: Array

配列の先頭に関数名、2つ目以降は、引数として扱われるものになります。
これを指定することで、固有のURLが作られ、後述する[action](#config-mockmock-configjs)を呼び出すトリガーになります。
関数名は ドット `.` を繋げることで、object 階層を表すことが出来ます。
[action property](#action-property)に直接この値を定義することで、 `func` propertyを省略できます。

※ ここの値に `#` は利用できません。

#### funcs: Array[func, func, ...]

`func` を複数定義できます。funcと同様、省略可能です。

#### switch: Object

スイッチボタンによる、モック切り替えが可能です。
switch配下の設定も、他と同様に　reserved propert を使えます。

#### description: String

モック一覧の横に説明書きとして表示されます。改行可能。

#### noLink: Boolean

リンク機能をオフにします。子ページだけがアクションを持つときに利用します。

#### action property

reserved property 以外は全て action property となり、pattern list 表示用に利用されます。

### config mock/mock-config.js

モックページで呼び出される、アクションを定義します。

以下が設定例です。

```js
import mock from 'am-mocktimes'

const action = {
  setPlan (name, world = null) { // multiple arguments can be received
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

### mock(action: MockAction)

この関数を呼び出すことで、モック状態を生成します。

`func` で定義した関数名を、keyで持つobjectとなります。
objectは階層を持つことが出来ます。その場合の `func` の指定は、 `func: [dbz.start]` のように、 `.` でつなぎます。

## addons

* [screenshot](./addons/screenshot/#readme) - 各モックページのスクリーンショットを保存します。

## Development

start

```shell
npm start
```

publish

```shell
npm run build
npm version <patch|minor|major|prerelease>
npm publish
```
