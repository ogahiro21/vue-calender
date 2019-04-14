let app = new Vue({
  el: '#app',
  data: {
    current: 0,
    days: [
      { id: "sun", value: "日" },
      { id: "mon", value: "月" },
      { id: "tue", value: "火" },
      { id: "wed", value: "水" },
      { id: "thu", value: "木" },
      { id: "fri", value: "金" },
      { id: "sat", value: "土" }
    ],
    selectMonth: moment().format('MMMM'),
    selectDate: moment().format('Do'),
    selectDay: moment().format('dddd')
  },
  computed: {
    currentMoment() {
      return moment().add(this.current, 'months')
    },
    year() {
      return this.currentMoment.format('YYYY')
    },
    month() {
      return this.currentMoment.format('MMMM');
    },
    calendarData() {
      // この月に何日まであるかを算出
      const numOfMonth = this.currentMoment.endOf('month').date()
      // この月の1日〜最終日までの配列
      const daysOfMonth = [...Array(numOfMonth).keys()].map(i => ++i)
      // 1日の曜日（0~6の数値で取得）
      const firstWeekDay = this.currentMoment.startOf('month').weekday()
      // 週ごとの二次元配列を生成
      const data = [...Array(6)].map((empty, weekIndex) =>
        [...Array(7)].map((empty, dayIndex) => {
          const i = 7 * weekIndex + dayIndex - firstWeekDay
          if (i < 0 || daysOfMonth[i] === undefined) {
            return null
          }
          return daysOfMonth[i]
        })
      )
      // 全てnullの配列があれば除去する
      return data.filter(week => week.filter(day => day != null).length > 0)
    },
  },
  methods: {
    goNextMonth() {
      this.current++;
    },
    goPrevMonth() {
      this.current--;
    },
    dateClick(input) {
      let m = this.currentMoment;
      let date = moment().year(m.format('YYYY')).month(m.format('MM')-1).date(input);
      this.selectMonth = date.format('MMMM');
      this.selectDate = date.format('Do');
      this.selectDay = date.format('dddd');
    },
  },
})