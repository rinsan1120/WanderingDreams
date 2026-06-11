# 寝落ち歓迎型朗読会「漂泊ノ夢」Webサイト

## ファイル構成

- `index.html`：1ページ完結型のサイト本体
- `styles.css`：PC・スマートフォン対応デザイン
- `script.js`：アーカイブ切替、動画モーダル、キャスト表示、メニュー制御
- `assets/`：背景画像・キャスト画像・OG画像を置く場所

## 最初に差し替える箇所

### 1. 次回イベント
`index.html` 内の `event-card` を編集します。

- 開催日
- 開場／開演時間
- 会場
- 参加方法
- Xリンク

### 2. 過去イベント
`script.js` 冒頭の `archives` 配列を編集します。

```js
{
  id: "event-03",
  date: "2026.06.20",
  title: "第3回　漂泊ノ夢",
  description: "説明",
  youtubeId: "YouTube動画ID",
  thumbnail: "https://img.youtube.com/vi/YouTube動画ID/maxresdefault.jpg",
  program: ["作品名1", "作品名2"]
}
```

YouTube URLが以下の場合：

`https://www.youtube.com/watch?v=abcdefghijk`

動画IDは `abcdefghijk` です。

### 3. キャスト
`script.js` の `casts` 配列を編集します。

- 名前
- 担当
- 朗読作品
- 紹介文
- 画像
- Xリンク

### 4. 画像
`assets` フォルダ内に以下の名前で画像を配置します。

- `hero-placeholder.jpg`
- `cast-placeholder-a.jpg`
- `cast-placeholder-b.jpg`
- `cast-placeholder-c.jpg`
- `cast-placeholder-d.jpg`
- `og-image.jpg`

画像が未配置でも、背景色やグラデーションで表示されます。

## GitHub Pagesで公開する場合

リポジトリ直下にファイル一式を置き、GitHub Pagesの公開元を対象ブランチのルートに設定してください。

## 主な仕様

- 1ページ型・固定ナビゲーション
- スマートフォン用ハンバーガーメニュー
- 開催日の選択によるアーカイブ切替
- YouTubeプライバシー強化モード埋め込み
- 動画モーダル表示
- キャストカード
- スクロール連動アニメーション
- `prefers-reduced-motion` 対応
- キーボード操作・スクリーンリーダーへの基本対応


## 配色

漂泊ノ海の既存サイトと合わせ、以下を基本色として使用しています。

- 背景：`#0b1325`
- メイン文字：`#e2e8f0`
- 補助文字：`#94a3b8`
- アクセント：`#60a5fa`
- カード：`rgba(255,255,255,0.05)`
