# 漂泊ノ夢 アーカイブサイト更新手順

この手順書は、日常的にサイト内容を更新するためのものです。

JavaScriptの詳しい仕組みを理解していなくても、どの内容をどのファイルで更新するか分かるようにまとめています。

## 主に編集するファイル

| やりたいこと | 主な対象ファイル |
| --- | --- |
| 次回開催予定を更新する | `next-event-data.js` |
| 新しい開催回をアーカイブへ追加する | `archives/event-XX.js`、`event-archives-data.js` |
| 読み手やスタッフを追加・変更する | `members-data.js` |
| 読み手ごとの個別動画を追加する | 該当する `archives/event-XX.js` |

## 1. 次回開催セクションを更新する

### 対象ファイル

```text
next-event-data.js
```

### 更新する場所

`nextEvent` の中に、表示モードと2種類の表示内容があります。

- `mode: "scheduled"`：開催日が決まっている場合
- `mode: "preparing"`：日程調整中の場合
- `scheduled`：開催日が決まっている場合に表示する内容
- `preparing`：日程調整中の場合に表示する内容

### 開催日が決まっている場合

`mode` を `"scheduled"` にして、`scheduled` の中を書き換えます。

主に更新する項目：

- `year`：年
- `day`：月日
- `weekday`：曜日
- `status`：小さく表示する状態ラベル
- `title`：開催回名
- `openTime`：開場時刻
- `startTime`：開演時刻
- `performers`：出演予定者
- `participation`：参加方法
- `participationNote`：参加方法の補足
- `note`：注意書き

### 日程調整中の場合

`mode` を `"preparing"` にして、`preparing` の中を書き換えます。

主に更新する項目：

- `dateLabel`：日付の代わりに表示する文字
- `subLabel`：補足ラベル
- `status`：小さく表示する状態ラベル
- `title`：見出し
- `message`：表示メッセージ
- `note`：注意書き

### 作業手順

1. `next-event-data.js` を開く
2. `mode` が `"scheduled"` か `"preparing"` か確認する
3. 開催日や時刻、出演予定者、参加方法などを書き換える
4. 日程調整中の場合は、`preparing` の表示メッセージを書き換える
5. 保存する
6. サイトを開き、次回開催予定の表示を確認する

### 注意

- 文字は `"` で囲んだままにしてください。
- 行末の `,` を消さないようにしてください。
- `mode` は `"scheduled"` または `"preparing"` のどちらかにしてください。

## 2. 新しい開催回をイベントアーカイブへ追加する

### 対象ファイル

```text
archives/event-XX.js
event-archives-data.js
```

### 作業手順

1. `archives/` フォルダを開く
2. 直前の開催回ファイルを複製する  
   例：第四夜を追加する場合は `archives/event-03.js` を複製する
3. 新しい開催回番号に合わせてファイル名を変更する  
   例：`archives/event-04.js`
4. ファイル内の `export const event03 = {` を新しい番号へ変更する  
   例：`export const event04 = {`
5. `id` を新しい開催回IDへ変更する  
   例：`id: "event-04"`
6. `date` を開催日に変更する  
   例：`date: "2026.07.25"`
7. `title` を開催回名へ変更する  
   例：`title: "第四夜"`
8. 開催回全体のYouTube動画IDを `youtubeId` に入力する
9. `program` に演目を登録する
10. `videoStaff` に動画撮影・動画編集担当者を入力する
11. `event-archives-data.js` を開く
12. 新しい開催回ファイルの `import` を追加する
13. `archives` 配列へ新しい開催回を追加する
14. 保存する
15. サイト上で開催回、PROGRAM、動画を確認する

### 第四夜を追加する例

新しいファイル：

```text
archives/event-04.js
```

`event-archives-data.js` に追加するimport：

```js
import { event04 } from "./archives/event-04.js";
```

`archives` 配列へ追加：

```js
export const archives = [
  event01,
  event02,
  event03,
  event04
].sort((a, b) => String(b.date ?? "").localeCompare(String(a.date ?? "")));
```

表示順は `date` によって新しい順へ自動ソートされます。

そのため、配列内の記載順を間違えても、サイト上では日付の新しい開催回から表示されます。

### programの例

```js
program: [
  {
    id: "machiru-little-prince-3",
    readerId: "machiru",
    title: "作品名",
    author: "著者名",
    readerArchive: {
      youtubeId: "個別朗読動画のYouTube ID"
    }
  }
]
```

### 注意

- `event-04` などの開催回IDは、既存回と重複させないでください。
- ファイル名、export変数名、import名をそろえてください。
- 日付は `YYYY.MM.DD` の形式にしてください。
- YouTubeはURL全体ではなく、動画IDだけを入力してください。
- 演目の `{}`、`[]`、`,` を消さないようにしてください。
- 既存開催回ファイルを上書きしないでください。
- `program` 内の演目IDは、同じ開催回内で重複させないでください。
- `readerId` は `members-data.js` の読み手IDと一致させてください。

## 3. 読み手やスタッフを追加・変更する

### 対象ファイル

```text
members-data.js
```

画像を追加する場合の保存先：

```text
assets/members/
```

### 読み手を追加する手順

1. `members-data.js` を開く
2. `casts` 配列を探す
3. 既存の読み手データを参考に、新しい読み手を追加する
4. 重複しない `id` を設定する
5. `name` に表示名を入力する
6. `comment` に紹介文を入力する
7. `image` に画像パスを入力する
8. `links` に外部リンクを入力する
9. 保存する
10. サイトの「読み手紹介」で表示を確認する

### 読み手データの例

```js
{
  id: "sample-reader",
  name: "読み手名",
  comment: "紹介文",
  image: "assets/members/sample-reader.png",
  links: [
    {
      label: "X",
      url: "https://x.com/example"
    }
  ]
}
```

### 読み手IDについて

`id` は、開催回データ内の `readerId` と結び付く重要な値です。

例：

```js
id: "machiru"
```

開催回ファイルでは、以下のように使います。

```js
readerId: "machiru"
```

一度使用した読み手IDは、表示名を変更した場合でも安易に変更しないでください。

IDを変えると、過去の開催回データとの紐付けが外れることがあります。

### スタッフを追加する手順

1. `members-data.js` を開く
2. `staffs` 配列を探す
3. 既存のスタッフデータを参考に、新しいスタッフを追加する
4. `name` に表示名を入力する
5. `favorite` に担当内容を入力する
6. `comment` に紹介文を入力する
7. `image` に画像パスを入力する
8. `links` に外部リンクを入力する
9. 保存する
10. サイトの「スタッフ紹介」で表示を確認する

### スタッフデータの例

```js
{
  name: "スタッフ名",
  favorite: "担当内容",
  comment: "紹介文",
  image: "assets/members/sample-staff.png",
  links: [
    {
      label: "X",
      url: "https://x.com/example"
    }
  ]
}
```

### 注意

- 読み手とスタッフの両方を担当する人物は、`casts` と `staffs` の両方へ登録してください。
- 画像ファイル名の大文字・小文字は、入力したパスと完全に一致させてください。
- リンクがない場合は `links: []` のように空の配列にしてください。

## 4. 読み手ごとの個別アーカイブ動画を追加する

### 対象ファイル

```text
archives/event-XX.js
```

該当する作品が朗読された開催回のファイルを編集します。

独立した `reader-archives-data.js` は使用しません。

### 個別アーカイブを公開する

対象演目の中に、以下を追加または更新します。

```js
readerArchive: {
  youtubeId: "XXXXXXXXXXX"
}
```

この状態では、読み手別アーカイブへ表示され、動画を再生できます。

### 項目は表示するが、動画は準備中にする

```js
readerArchive: {
  youtubeId: ""
}
```

この状態では、読み手別アーカイブへ表示されますが、動画部分には「動画準備中」と表示されます。

### 読み手別アーカイブへまだ表示しない

```js
// readerArchive自体を記載しない
```

この状態では、読み手別アーカイブの一覧には表示されません。

### 独自サムネイルを使う場合

通常は `youtubeId` からサムネイルが自動生成されるため、`thumbnail` は入力不要です。

独自画像を使う場合だけ、以下のように `thumbnail` を追加できます。

```js
readerArchive: {
  youtubeId: "XXXXXXXXXXX",
  thumbnail: "assets/example.jpg"
}
```

### 作業手順

1. 対象となる開催回の `archives/event-XX.js` を開く
2. `program` から対象作品を探す
3. `readerArchive` に個別動画のYouTube IDを入力する
4. 保存する
5. サイトを開く
6. 対象読み手の画像をクリックする
7. 読み手別アーカイブへ作品が表示されることを確認する
8. 動画が再生できることを確認する

### 注意

- 個別動画を追加する場所は、作品が朗読された開催回ファイルです。
- `readerId` と `members-data.js` の読み手IDが一致しているか確認してください。
- YouTubeのURL全体ではなく、動画IDだけを入力してください。

## 更新後の共通確認事項

どの作業でも、最後に以下を確認してください。

- ブラウザを再読み込みする
- PC表示を確認する
- スマートフォン幅の表示を確認する
- ブラウザの開発者ツールでエラーが出ていないか確認する
- 開催回全体の動画を再生できるか確認する
- 読み手別動画を追加した場合は、読み手カードから動画を確認する
- 作品名、著者名、読み手名に誤字がないか確認する
- YouTube動画IDへURL全体を入力していないか確認する

## YouTube動画IDについて

YouTube動画IDは、YouTube動画を識別するための短い文字列です。

通常のURLが以下の場合：

```text
https://www.youtube.com/watch?v=XWj7ig7OJ9U
```

入力するのは以下の部分だけです。

```text
XWj7ig7OJ9U
```

`https://www.youtube.com/watch?v=` を含むURL全体は入力しないでください。

短縮URLの場合：

```text
https://youtu.be/XWj7ig7OJ9U
```

この場合も、入力するのは以下だけです。

```text
XWj7ig7OJ9U
```

## 書き換え時の基本ルール

- 文字列の `"` を消さない
- 行末の `,` を消さない
- `{}` や `[]` の対応を崩さない
- 既存データを上書きする前に、編集対象の開催回や人物が正しいか確認する
- 不安な場合は、変更前の内容を控えてから編集する
