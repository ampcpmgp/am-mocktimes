import start from './main'

// TODO: gh-page用patternを作る(index.html, app.js ごと gh-pages directoryに移動しても良いかも)
// そのパターンに紐づくhtmlファイルを作る -> docsに直で置く
// docs/イメージ
// docs/index.html (js redirect)
// docs/app.html (簡単なアプリ―ケーションページ)
// docs/list/index.html (ここにgh-page用ファイルをdistする)
//
// docs/ イメージ2
// src/gh-page を作り、コンパイル用、コンパイルしない用の両方のファイルを置く
// parcel -> docs/ && コンパイルしない用ファイルの移動
start()
