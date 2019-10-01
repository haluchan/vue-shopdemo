export default function (timestamp) {
  let date = new Date(timestamp * 1000)
  let dateTime = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes()
  ]
  let tmp = `${dateTime[0]}/${dateTime[1]}/${dateTime[2]}`
  return tmp
}
