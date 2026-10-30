// このファイルは「第三夜」1回分の開催回データを管理します。
// 新しい開催回を追加する場合は、このファイルを複製し、
// ファイル名、export名、id、date、title、programなどを新しい開催回用に書き換えてください。
//
// id:
// - 開催回を識別する固定IDです。
// - 命名は "event-01", "event-02" のように event-番号 でそろえてください。
//
// date:
// - 開催日の表示と並び替えに使います。
// - "YYYY.MM.DD" の形式で入力してください。例: "2026.06.27"
//
// youtubeId:
// - 開催回全体のアーカイブ動画のYouTube動画IDです。
// - YouTubeのURL全体ではなく、watch?v= の後ろにある動画IDだけを入力してください。
// - 独自サムネイルを使いたい場合だけ thumbnail を追加できます。
//
// program:
// - その開催回で朗読された演目一覧です。
// - titleKana は五十音順に使用する必須の読み仮名です。ひらがなで手入力してください。
// - 作品名の読みをそのまま記載し、装飾の括弧・記号や不要な空白は含めません。
// - 演目ごとの id は同じ開催回内で重複しないようにしてください。
// - readerId は members-data.js の casts に登録されている id と一致させてください。
// - ゲストなど members-data.js にいない読み手だけ、例外として readerName を追加できます。
// - readerArchive.youtubeId は読み手別モーダルで再生する個別朗読動画のYouTube動画IDです。
// - readerArchive を省略すると、読み手別アーカイブにはその演目を表示しません。
// - readerArchive があり youtubeId が空の場合は、読み手別アーカイブに「動画準備中」と表示します。
// - readerArchive.thumbnail は通常不要です。独自画像を使いたい場合だけ指定してください。
//
// videoStaff:
// - 開催回全体の動画撮影・動画編集担当者を表示するための情報です。
export const event06 = {
  id: "event-06",
  date: "2026.09.13",
  title: "第六夜",
  youtubeId: "2JH06iuoWzQ",
  program: [
    {
      id: "mike-tsukiyotomegane",
      readerId: "mike",
      title: "月夜とめがね",
      titleKana: "つきよとめがね",
      author: "小川未明",
      readerArchive: {
        youtubeId: "gjgwiHfkIZU"
      }
    },
    {
      id: "if-matsu",
      readerId: "if",
      title: "待つ",
      titleKana: "まつ",
      author: "太宰治",
      readerArchive: {
        youtubeId: "DbIMZXHBjjc"
      }
    },
        {
      id: "if-yume10ya1",
      readerId: "if",
      title: "夢十夜より「第一夜」",
      titleKana: "ゆめじゅうやよりだいいちや",
      author: "夏目漱石",
      readerArchive: {
        youtubeId: "lGD1J54MYx8"
      }
    },
        {
      id: "machiru-kimigakiitekuretahoukagono",
      readerId: "machiru",
      title: "君が聴いてくれた、放課後のピアノ",
      titleKana: "きみがきいてくれた、ほうかごのぴあの",
      author: "声の書庫",
      readerArchive: {
        youtubeId: "0DouizqtTms"
      }
    },
    {
      id: "machiru-madobenoradio",
      readerId: "machiru",
      title: "窓辺のラジオ",
      titleKana: "まどべのらじお",
      author: "声の書庫",
      readerArchive: {
        youtubeId: "LuEaS2x70So"
      }

  ],
  videoStaff: {
    camera: "龍飛",
    editor: "りん（rinsan1120）"
  }
};
