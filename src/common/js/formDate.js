export function formDate(value) {
  let date = new Date(value)
  let yy = date.getFullYear()
  let mm = (date.getMonth() + 1)
  let dd = date.getDate()
  let h = date.getHours()
  let m = date.getMinutes()
  let time = `${yy}-${mm}-${dd} ${h}:${m}`
  return time
}
