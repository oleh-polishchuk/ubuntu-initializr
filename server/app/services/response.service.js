/**
 * Response Service
 * Allow to send success or error response
 */

/**
 * Method return success response with status 200
 *
 * @param res
 *          - the instance of the response object
 * @param data
 *          - the user response data
 */
exports.success = (res, data) => {
    res.status(200)
        .send({
            success: true,
            data: data
        })
};

/**
 * Method log error message and return error response with status 500 and error message
 *
 * @param res
 *          - the instance of the response object
 * @param message
 *          - the error message
 */
exports.error = (res, message) => {
    console.error(message);
    res.status(500)
        .send({
            success: false,
            data: {},
            message: message
        })
};

