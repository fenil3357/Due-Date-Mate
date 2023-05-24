function convertUTCtoIST(dateUTC) {
    dateUTC = dateUTC.getTime()
    var dateIST = new Date(dateUTC);
    dateIST.setHours(dateIST.getHours() + 5);
    dateIST.setMinutes(dateIST.getMinutes() + 30);
    return dateIST;
} 

module.exports = convertUTCtoIST;