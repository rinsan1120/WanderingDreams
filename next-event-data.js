// 次回開催予定は、このオブジェクトの mode と各表示内容を更新して管理します。
export const nextEvent = {
  mode: "preparing",

  scheduled: {
    year: "2026",
    day: "06.27",
    weekday: "SAT",
    status: "NEXT READING",
    title: "漂泊ノ夢　第三夜",
    openTime: "22:20",
    startTime: "22:30",
    performers: "白羽まちる、ʚみけɞ、花咲くバッカス",
    participation: "「漂泊ノ海」Group＋インスタンス",
    participationNote: "※事前に「漂泊ノ海」のGroupへの参加をお願いいたします。",
    note: "※進行等の都合により、時間は若干前後する可能性がございます。"
  },

  preparing: {
    dateLabel: "TBA",
    subLabel: "調整中",
    status: "PREPARING",
    title: "次の夜の支度をしています。",
    message: "漂泊ノ夢の次回開催日は、現在調整中です。また静かな海に物語の声が流れる夜が決まりましたら、こちらのサイトでお知らせします。",
    note: "※開催日・出演者・演目は、決まり次第掲載いたします。"
  }
};
