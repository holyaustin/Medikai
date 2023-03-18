export default function convertUnixTime(unix) {
    let a = new Date(unix * 1000),    //seconds to milliseconds
        year = a.getFullYear(),
        months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        month = months[a.getMonth()],
        date = a.getDate(),
        hour = a.getHours(),
        min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes(),
        sec = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds()
    return `${month} ${date}, ${year}`
}
