const { Week, WeekEnd, AnyMonth, Quarter, Year, Season, WeekDay, Day, Hour, Minute, Moment } = require('../units')
const mapping = {
  day: Day,
  hour: Hour,
  second: Moment,
  milliscond: Moment,
  instant: Moment,
  minute: Minute,
  week: Week,
  weekend: WeekEnd,
  month: AnyMonth,
  quarter: Quarter,
  year: Year,
  season: Season,
}

// when a unit of time is spoken of as 'this month' - instead of 'february'
const nextLast = function (doc, context) {
  //this month, last quarter, next year
  let m = doc.match('^(weekday|day|hour|minute|second|instant|millisecond|week|month|weekend|quarter|season|year)$')
  if (m.found === true) {
    let str = m.text('reduced')
    if (mapping.hasOwnProperty(str)) {
      let Model = mapping[str]
      if (!Model) {
        return null
      }
      let unit = new Model(null, str, context)
      return unit
    }
  }

  //try this version - 'next friday, last thursday'
  m = doc.match('^#WeekDay$')
  if (m.found === true) {
    let str = m.text('reduced')
    let unit = new WeekDay(str, null, context)
    return unit
  }
  return null
}
module.exports = nextLast
