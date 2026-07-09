// このファイルは、各開催回ファイルをサイト上の一覧へ登録する索引ファイルです。
// 開催回の本文データは archives/event-XX.js に分けて管理します。
//
// 新しい開催回を追加する手順:
// 1. archives/event-03.js など既存ファイルを複製し、新しい event-XX.js を作ります。
// 2. このファイルの import に、新しい開催回を追加します。
// 3. 下の archives 配列にも、新しい開催回を追加します。
//
// archives 配列へ書く順番を間違えても、date の新しい順に自動ソートされます。
//
// 既存開催回を削除・変更する場合の注意:
// - id を変更すると、読み手別アーカイブやリンク用の参照も変わります。
// - 削除する場合は import と archives 配列の両方から外してください。
// - 日付は "YYYY.MM.DD" の形式を維持してください。
import { event01 } from "./archives/event-01.js";
import { event02 } from "./archives/event-02.js";
import { event03 } from "./archives/event-03.js";

export const archives = [
  event01,
  event02,
  event03
].sort((a, b) => String(b.date ?? "").localeCompare(String(a.date ?? "")));
