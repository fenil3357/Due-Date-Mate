const path = require('path')
const fs = require('fs');
const moment = require('moment');
const common = require('../config/common');

class Response {
    /**
     * Class default constructor
     */
    constructor() {
        this.file_path = path.join(__dirname, path.basename(__filename));
    }

    /**
     * @returns {object} reflection object
     */
    res200 = (res, body = '', otherOptions = '', message) => {
        try {
            if (body.toJS) {
                body = body.toJS();
            }
            const json = JSON.stringify({
                success: true,
                message: message || common.messages.defaultSuccessMessage,
                status: common.responseCode[200],
                data: body,
                //meta: otherOptions,
            });
            if (!res.headersSent) {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
            }
            res.status(common.responseCode[200]);
            return res.end(json);
        } catch (e) {
            this.error(res, e, this.file_path);
            return this.res500(res)
        }
    }

    /**
     * @returns {object} reflection object
     */
    res500 = (res, body = '', message) => {
        try {
            body = (body === '') ? common.messages.internalServerError : body;

            const json = JSON.stringify({
                success: false,
                message: message || common.messages.defaultErrorMessage,
                status: common.responseCode[500],
                error: body,
            });
            if (!res.headersSent) {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
            }
            res.status(common.responseCode[500]);
            return res.end(json);
        } catch (error) {

            this.error(res, error, this.file_path);
            return res.end(JSON.stringify({
                success: false,
                message: common.messages.defaultErrorMessage,
                status: common.responseCode[500]
            }));
        }
    }

    /**
     * @returns {object} reflection object
     */
    res404 = (_req, res, message) => {
        try {
            const json = JSON.stringify({
                status: common.responseCode[404],
                success: false,
                message: message || common.messages.defaultErrorMessage,
                error: common.messages.pageNotFound,
            });
            if (!res.headersSent) {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
            }
            res.status(common.responseCode[404]);
            return res.end(json);
        } catch (e) {
            this.error(res, e, this.file_path);
            return this.res500(res)
        }
    }

    /**
     * @returns {object} reflection object
     */
    res422 = (res, body, message) => {
        try {
            if (body.toJS) {
                body = body.toJS();
            }
            const json = JSON.stringify({
                success: false,
                message: message || common.messages.defaultErrorMessage,
                status: common.responseCode[422],
                error: body,
            });
            if (!res.headersSent) {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
            }
            res.status(common.responseCode[422]);
            return res.end(json);
        } catch (e) {
            this.error(res, e, this.file_path);
            return this.res500(res)
        }
    }

    /**
     * @returns {object} reflection object
     */
    res401 = (res, body = null, message) => {
        try {
            if (body && body.toJS) {
                body = body.toJS();
            } else {
                body = common.messages.unauthorizedAccess;
            }
            const json = JSON.stringify({
                success: false,
                message: message || common.messages.defaultErrorMessage,
                status: common.responseCode[401],
                error: body,
            });
            if (!res.headersSent) {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
            }
            res.status(common.responseCode[401]);
            return res.end(json);
        } catch (e) {
            this.error(res, e, this.file_path);
            return this.res500(res)
        }
    }

    /**
     * @returns {object} reflection object
     */
     res403 = (res, body = null, message) => {
        try {
            if (body && body.toJS) {
                body = body.toJS();
            } else {
                body = common.messages.unauthorizedAccess;
            }
            const json = JSON.stringify({
                success: false,
                message: message || common.messages.defaultErrorMessage,
                status: common.responseCode[403],
                error: body,
            });
            if (!res.headersSent) {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
            }
            res.status(common.responseCode[403]);
            return res.end(json);
        } catch (e) {
            this.error(res, e, this.file_path);
            return this.res500(res)
        }
    }

    /**
     * @returns {object} reflection object
     */
    res400 = (res, body = null, message) => {
        try {
            if (body && body.toJS) {
                body = body.toJS();
            } else {
                body = common.messages.tokenExpired;
            }
            const json = JSON.stringify({
                success: false,
                message: message || common.messages.defaultErrorMessage,
                status: common.responseCode[400],
                error: body,
            });
            if (!res.headersSent) {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
            }
            res.status(common.responseCode[400]);
            return res.end(json);
        } catch (e) {
            this.error(res, e, this.file_path);
            return this.res500(res)
        }
    }

    /**
     * @returns {object} reflection object
     */
    error = (res, body, dirName = '') => {
        try {
            fs.appendFile(`logs/${moment().format('MMMMDoYYYY')}.txt`, `\n\nError : ${moment().format()} : ${dirName} | ${body.toString()}`, (err) => {
                (err) ? console.log(body.toString()) : false;
            });
        } catch (e) {
            console.log('Exception', e);
        }
    }
}
module.exports = new Response();
