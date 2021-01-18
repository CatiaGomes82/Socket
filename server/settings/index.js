module.exports = {

    // messages
    INVALID_MODEL_ERROR: 'Model is not valid:',
    USER_VALID: 'USER_VALID',
    USER_NOT_VALID: 'USER_NOT_VALID',

    // status codes
    HTTP_OK: 200,
    HTTP_CREATED: 201,
    HTTP_NOT_FOUND: 404,
    HTTP_SERVER_ERROR: 500,
    HTTP_BAD_REQUEST: 400,

    // regex
    REGEX_EMAIL: new RegExp(/[\w.+\-]*@codehousegroup\.com(\W|$)/, 'i')
}