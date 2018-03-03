# am-coffee-time
モック生成・UI操作のパターンを楽に作成し、コーヒー休憩時間を増やそう☕

# repository
https://github.com/ampcpmgp/am-coffee-time

# sample page
TODO:

# start
パターン表示用のサーバーと、モック実行用サーバーの２種類を用意する必要がありますが、
[parcel](https://github.com/parcel-bundler/parcel) を利用すると楽に構築が出来ます。

以下 starter-kit が参考になります。
https://github.com/ampcpmgp/parcel-riot-coffee-time-starter

※version 1.0 に向けて、コマンドから一発で起動出来るよう調整中。


# config pattern list
モックパターン一覧の表示に利用し、yamlとjsonに対応しています。  

以下が設定例です。
```yaml
url: './accout'
Plan A:
  func: [setPlan, plan/a.json]
  view statistics:
    func: [click, statistics]
Plan B: [setPlan, plan/b.json]
plan C:
  funcs:
    - [setPlan, plan/c.json]
    - [waitForElement, error-modal]
    - [modal.close]
```

## reserved property
### url
実際に動作するモックURLを指定します。  
設定されたobject配下に対して、リンク先のURLを設定できます。
default値は、 `/` になります。
他ドメインURLの設定も可能です。

### func
配列の先頭に関数名、２つ目以降は、引数として扱われるものになります。
後述するactionを呼び出すトリガーになります。  
action propertyに直接、値を定義することで、省略できます。


### funcs
`func` を複数定義できます。  
funcと同様、省略可能です。

### switch
スイッチボタンによる、モック切り替えが可能です。  
switch配下の設定も他と同様で、新しく何かを覚える必要がありません。

### description
モック一覧の、横に表示するもの。改行ありです。yaml改行を使うと綺麗に書けます。  

## action property
reserved property以外は全てaction propertyとなり、pattern list表示用に利用されます。

# config action js
モックで呼び出される、アクション定義を設定します。

以下が設定例です。
```js
import { mock } from 'am-coffee-time'
import { start } from 'app-src' // your web application entry file

const action = {
  click (selector) {
    // click selector, and assert
  },
  setPlan (planFile) {
    // set api callback to planFile object
  },
  waitForElement: async (selector) {
    // await for specified selector
  },
  modal: {
    open () {
      // open modal action
    },
    close () {
      // close modal action
    }
  }
}

mock(action)
start()
```

## mock(action: MockAction)
この関数を呼び出すことで、モック状態を生成します。

### MockAction
`func`で定義した関数名を、keyで持つobjectとなります。  
objectは階層を持つことが出来ます。その場合の `func` の指定は、 `func: [modal.open]` のように、 `.` でつなぎます。
