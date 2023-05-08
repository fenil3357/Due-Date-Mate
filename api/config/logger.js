const fs = require('fs');
const moment = require('moment');
const response = require('./response')

class Logger {
    /**
     * Class default constructor
     */
    constructor() {
        const dir = './logs';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

    /**
     * @returns {object} reflection object
     */
    error = (res, body, dirName = '') => {
        try {
            let str = body.toString();
            //if body is a object then convert object into string
            if (typeof body === 'object') {
                str = JSON.stringify(body, null, 4);
            }
            fs.appendFile(`logs/${moment().format('MMMMDoYYYY')}.txt`, `\n\nError : ${moment().format()} : ${dirName} | ${str}`, (err) => {
                (err) ? console.log(body.toString()) : false;
            });
            if (res && !res.headersSent) {
                response.res500(res, '', body.message);
            }
        } catch (e) {
            console.log('Exception', e);
        }
    }

    /**
     * @returns {object} reflection object
     */
    debug = (body, dirName = '') => {
        try {
            fs.appendFile(`logs/${moment().format('MMMMDoYYYY')}.txt`, `\n\nDebug : ${moment().format()} : ${dirName} | ${body.toString()}`, (err) => {
                (err) ? console.log(body.toString()) : false;
            });
        } catch (e) {
            console.log('Exception', e);
        }
    }

    /**
     * @returns {object} reflection object
     */
    info = (body, dirName = '') => {
        try {
            fs.appendFile(`logs/${moment().format('MMMMDoYYYY')}.txt`, `\n\nInfo : ${moment().format()} : ${dirName} | ${body.toString()}`, (err) => {
                (err) ? console.log(body.toString()) : false;
            });
        } catch (e) {
            console.log('Exception', e);
        }
    }

    /**
     * @returns {object} reflection object
     */
    warning = (body, dirName = '') => {
        try {
            fs.appendFile(`logs/${moment().format('MMMMDoYYYY')}.txt`, `\n\nWarning : ${moment().format()} : ${dirName} | ${body.toString()}`, (err) => {
                (err) ? console.log(body.toString()) : false;
            });
        } catch (e) {
            console.log('Exception', e);
        }
    }
}
module.exports = new Logger();
