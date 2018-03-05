# am-coffee-time
モック生成・UI操作のパターンを楽に作成し、コーヒー休憩時間を増やそう☕

# repository
https://github.com/ampcpmgp/am-coffee-time

# sample page
TODO:

# start with parcel
以下をインストール。  

```
npm i am-coffee-time parcel -D
```

サンプルでは以下の形式で用意します。  
(一旦は全て空ファイルも問題有りません)

```shell
# モック
mock/
  pattern.yml # パターンリスト表示用
  config.js # アプリケーションモック設定用

# アプリケーション本体
src/
  index.html
  app.js
```

以下の初期化コマンドで、 `.am-coffee-time/` にモック用ファイルを生成します。
```shell
am-coffee-time init
```

最後にparcelを起動すれば開発可能になります。
```shell
parcel .am-coffee-time/index.html
```

# config mock/pattern.yml
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
後述するactionを呼び出すトリガーになり、関数名は ドット `.` を繋げることで、object 階層を表すことが出来ます。  
[action property](#action-property)に直接この値を定義することで、 `func` propertyを省略できます。


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

# config mock/config.js
モックで呼び出される、アクション定義を設定します。

以下が設定例です。
```js
import { mock } from 'am-coffee-time'

const action = {
  async click (selector) {
    // wait selector
    // click selector
  },
  setPlan (planFile) {
    // set api callback to planFile object
  },
  async waitForElement (selector) {
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
```

## mock(action: MockAction)
この関数を呼び出すことで、モック状態を生成します。

### MockAction
`func`で定義した関数名を、keyで持つobjectとなります。  
objectは階層を持つことが出来ます。その場合の `func` の指定は、 `func: [modal.open]` のように、 `.` でつなぎます。

# config src/index.html
こちらは、アプリケーション本体を配置します。  
実プロダクトで動くSPAにしてください。  
parcelを利用する場合は、[parcel/Getting Started](https://parceljs.org/getting_started.html)を参考にどうぞ。


# config src/index.js
こちらも上記同様に、実プロダクトで動くコードにしてください。  
am-coffee-timeでは、このjsに、モックアクションをinjectします。  
