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
export const event03 = {
  id: "event-03",
  date: "2026.06.27",
  title: "第三夜",
  youtubeId: "XWj7ig7OJ9U",
  program: [
    {
      id: "machiru-little-prince-2",
      readerId: "machiru",
      title: "星の王子さま（後編）",
      author: "サン=テグジュペリ",
      readerArchive: {
        youtubeId: "SdStX04sdF8"
      }
    },
    {
      id: "mike-orihime-and-hikoboshi",
      readerId: "mike",
      title: "織姫と彦星",
      author: "ʚみけɞ",
      readerArchive: {
        youtubeId: "WN6bVJGSPXY"
      }
    },
    {
      id: "bakkasu-kashiwa-dream",
      readerId: "bakkasu",
      title: "年とったカシワの木のさいごの夢",
      author: "アンデルセン",
      readerArchive: {
        youtubeId: "z1sadDOXiW4"
      }
    }
  ],
  videoStaff: {
    camera: "龍飛",
    editor: "白羽まちる"
  }
};
