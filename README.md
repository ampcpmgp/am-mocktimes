# am-coffee-time
モック生成・UI操作のパターンを楽に作成し、コーヒー休憩時間を増やそう☕

# repository
https://github.com/ampcpmgp/am-coffee-time

# sample page (Japanese)
TODO:

# Overview
TODO:

# pattern js object

## sample code
```js
{
  url: '/test-page.html',
  'full settings': {
    action () {
      // set full settings
    },
    'login': async () {
      // click login button
      // and wait api callback
    }
  },
  'min settings': {
    action () {
      // set minimum settings
    }
  },
  'forbidden': {
    url: '/403.html'
  }
}
```

## reserved property

### url
設定したobject配下に適用されるリンク先URL

### action
定義した親propertyの紐づく実行処理  
property に直接 function を設定することでも設定可能
