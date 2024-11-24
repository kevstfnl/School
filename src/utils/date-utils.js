const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

export function formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    const monthName = months[parseInt(month, 10) - 1];
    return parseInt(day, 10) + " " + monthName + " " + year;
}


export function splitTDate(date) {
    return date.split("T")[0];
}