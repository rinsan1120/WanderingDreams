// このファイルは「第一夜」1回分の開催回データを管理します。
// 新しい開催回を追加する場合は、このファイルを複製し、
// ファイル名、export名、id、date、title、programなどを新しい開催回用に書き換えてください。
//
// id:
// - 開催回を識別する固定IDです。
// - 命名は "event-01", "event-02" のように event-番号 でそろえてください。
//
// date:
// - 開催日の表示と並び替えに使います。
// - "YYYY.MM.DD" の形式で入力してください。例: "2026.04.11"
//
// youtubeId:
// - 開催回全体のアーカイブ動画のYouTube動画IDです。
// - YouTubeのURL全体ではなく、watch?v= の後ろにある動画IDだけを入力してください。
// - 独自サムネイルを使いたい場合だけ thumbnail を追加できます。
//
// program:
// - その開催回で朗読された演目一覧です。
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
export const event01 = {
  id: "event-01",
  date: "2026.04.11",
  title: "第一夜",
  youtubeId: "lqz88xjOwz0",
  program: [
    {
      id: "bakkasu-bad-king",
      readerId: "bakkasu",
      title: "わるい王様（伝説）",
      author: "アンデルセン",
      readerArchive: {
        youtubeId: "MTdiwIZ5VdI"
      }
    },
    {
      id: "if-twin-stars",
      readerId: "if",
      title: "双子の星",
      author: "宮沢賢治",
      readerArchive: {
        youtubeId: "6wfjCH8EqSg"
      }
    },
    {
      id: "mike-flowers-and-humans",
      readerId: "mike",
      title: "花と人間の話",
      author: "小川未明",
      readerArchive: {
        youtubeId: "uReP7kulmpw"
      }
    }
  ],
  videoStaff: {
    camera: "龍飛",
    editor: "白羽まちる"
  }
};
