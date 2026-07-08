// 次回開催予定は、このオブジェクトの mode と各表示内容を更新して管理します。
export const nextEvent = {
  mode: "scheduled",

  scheduled: {
    year: "2026",
    day: "07.25",
    weekday: "SAT",
    status: "NEXT READING",
    title: "漂泊ノ夢　第四夜",
    openTime: "22:20",
    startTime: "22:30",
    performers: "白羽まちる、唯ノイフ、？？？",
    participation: "「漂泊ノ海」Groupインスタンス",
    participationNote: "※事前に「漂泊ノ海」のGroupへの参加をお願いいたします。",
    note: "※進行等の都合により、時間は若干前後する可能性がございます。"
  },

  preparing: {
    dateLabel: "TBA",
    subLabel: "調整中",
    status: "PREPARING",
    title: "次の夜の支度をしています。",
    message: "次回開催日が決まりましたら、当サイト及び主催者のXにてお知らせいたします。",
    note: ""
  }
};
