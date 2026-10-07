import { archives } from "./event-archives-data.js";
import { casts } from "./members-data.js";

// 開催回の演目を唯一の情報源として、両ページで同じ個別アーカイブを生成します。
function getCastById(readerId) {
  return casts.find((cast) => cast.id === readerId);
}

export function getReaderName(programItem) {
  return getCastById(programItem?.readerId)?.name
    || programItem?.readerName
    || "読み手未設定";
}

function getEventDateValue(event) {
  if (!event?.date) return Number.NEGATIVE_INFINITY;

  const [year, month, day] = event.date.split(".").map(Number);
  if (!year || !month || !day) return Number.NEGATIVE_INFINITY;

  const date = new Date(year, month - 1, day);
  const time = date.getTime();

  return Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time;
}

export function getReaderArchiveItems(readerId) {
  return archives
    .flatMap((archive) => {
      if (!Array.isArray(archive.program)) return [];

      return archive.program
        .map((programItem, index) => {
          if (!programItem.readerArchive) return null;

          return {
            id: `${archive.id}-${programItem.id}`,
            readerId: programItem.readerId,
            readerName: getReaderName(programItem),
            eventId: archive.id,
            title: programItem.title,
            titleKana: programItem.titleKana || "",
            author: programItem.author,
            youtubeId: programItem.readerArchive.youtubeId || "",
            thumbnail: programItem.readerArchive.thumbnail || "",
            event: archive,
            originalIndex: index
          };
        })
        .filter(Boolean);
    })
    .filter((item) => readerId === undefined || item.readerId === readerId)
    .sort((a, b) => {
      const dateDifference = getEventDateValue(b.event) - getEventDateValue(a.event);
      return dateDifference || a.originalIndex - b.originalIndex;
    });
}
