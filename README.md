# 寝落ち歓迎型朗読会「漂泊ノ夢」Webサイト

https://rinsan1120.github.io/WanderingDreams/

VRChatワールド「漂泊ノ海-Wandering Sea-」で開催する、寝落ち歓迎型朗読会「漂泊ノ夢」の公式Webサイトです。

HTML / CSS / JavaScriptのみで構成された、GitHub Pages向けの静的な1ページサイトです。

## ファイル構成

- `index.html`：サイト本体のHTML構造、各セクション、モーダル要素
- `styles.css`：PC・スマートフォン対応デザイン、アニメーション、モーダル表示
- `script.js`：表示生成、アーカイブ切替、各種モーダル、メニュー制御
- `next-event-data.js`：次回開催情報
- `event-archives-data.js`：開催回全体のアーカイブ情報
- `reader-archives-data.js`：読み手ごとの個別朗読アーカイブ情報
- `members-data.js`：読み手・スタッフ情報
- `content/participation-rules.html`：参加ルールモーダルに読み込む本文
- `assets/`：トップ写真、読み手・スタッフ画像、ロゴなどの画像

## 日常更新する主なデータ

### 次回イベント

次回開催情報は `next-event-data.js` の `nextEvent` を編集します。

`mode` で表示状態を切り替えます。

- `scheduled`：次回イベント情報を表示
- `preparing`：次回準備中の表示

`scheduled` には、開催日、曜日、タイトル、開場・開演時間、出演者、参加方法、注意書きなどを設定します。

### 開催回全体のアーカイブ

開催回全体のアーカイブは `event-archives-data.js` の `archives` 配列で管理します。

各開催回は主に以下の情報を持ちます。

- `id`：開催回ID
- `date`：開催日
- `title`：開催回タイトル
- `youtubeId`：開催回全体のYouTube動画ID
- `thumbnail`：開催回全体のサムネイルURL
- `program`：朗読作品一覧
- `videoStaff.camera`：動画撮影担当
- `videoStaff.editor`：動画編集担当

`youtubeId` を設定すると、開催回別アーカイブの動画モーダルで再生されます。

### 読み手ごとの個別朗読アーカイブ

読み手別の個別朗読動画は `reader-archives-data.js` の `readerArchives` 配列で管理します。

各個別アーカイブは主に以下の情報を持ちます。

- `id`：個別朗読動画ごとのID
- `readerId`：読み手ID
- `eventId`：開催回ID
- `title`：作品名
- `author`：著者名
- `youtubeId`：個別朗読動画のYouTube動画ID
- `thumbnail`：個別サムネイルURL

`readerId` は `members-data.js` の読み手IDと紐付きます。

`eventId` は `event-archives-data.js` の開催回IDと紐付きます。開催回タイトルや開催日は、`eventId` から自動で取得されます。

`thumbnail` が空で `youtubeId` がある場合は、YouTubeのサムネイルURLを自動生成します。

### 読み手・スタッフ

読み手とスタッフは `members-data.js` で管理します。

- `casts`：読み手情報
- `staffs`：スタッフ情報

読み手は `id` を持ちます。読み手別アーカイブとの紐付けには、表示名ではなくこの `id` を使用します。

外部リンクは `links` 配列に追加すると、カード内のリンクボタンとして自動生成されます。

## 主な機能

- 1ページ型サイト
- 固定ナビゲーション
- スマートフォン用ハンバーガーメニュー
- トップ画像スライドショー
- 次回イベント情報のデータ管理
- 開催回別アーカイブ切替
- 開催回全体のYouTube動画モーダル
- PROGRAM一覧と動画撮影・動画編集担当の表示
- 読み手紹介カードの自動生成
- 読み手写真から開く個別朗読アーカイブモーダル
- 読み手別アーカイブ内の作品選択
- スタッフ紹介カードの自動生成
- 参加ルールモーダル
- スクロール連動アニメーション
- `prefers-reduced-motion` 対応
- キーボード操作・スクリーンリーダーへの基本対応

## YouTube動画ID

YouTube URLが以下の場合：

```text
https://www.youtube.com/watch?v=abcdefghijk
```

動画IDは `abcdefghijk` です。

## 画像

サイト内画像は `assets/` に配置します。

主な画像例：

- `assets/photo1.jpg` から `assets/photo5.jpg`：トップのスライドショー用写真
- `assets/logo.png`：ロゴ
- `assets/members/`：読み手・スタッフ画像

画像パスは、実際のファイル名の大文字・小文字まで一致させてください。

## 公開方法

ビルド処理はありません。

リポジトリ直下にファイル一式を置き、GitHub Pagesの公開元を対象ブランチのルートに設定してください。

## 配色

漂泊ノ海の関連サイトとして、以下の色を基本にしています。

- 背景：`#0b1325`
- メイン文字：`#e2e8f0`
- 補助文字：`#94a3b8`
- アクセント：`#60a5fa`
- カード：`rgba(255, 255, 255, 0.05)`
