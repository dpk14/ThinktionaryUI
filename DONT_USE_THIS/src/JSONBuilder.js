
function  buildDate(year, month, day, hour, minute, second) {
    if (month.size() < 2) {
        if (month.size() == 0 || month == "0") throw Error;
        month = "0" + month
    } else if (month.size() > 2) throw Error
    if (year.size() != 4) throw Error
    var date = year +
}
