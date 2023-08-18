const { ValidationError } = require('sequelize');
const boom = require('@hapi/boom');
// Desc: Error handler middleware
//       This middleware will catch all errors and send a 500 response
function logErrors (err, req, res, next) {
    console.log('logErrors')
    console.log(err)
    next(err)
}

//stack para ver donde ocurrio el error
function errorHandler (err, req, res, next) {
    console.log('errorHandler')
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    })
}

function boomErrorHandler (err, req, res, next) {
    console.log('boomErrorHandler')
    if (err.isBoom) {
        const { output } = err
        res.status(output.statusCode).json(output.payload)
    } else {
      next(err)
    }
}

function ormErrorHandler (err, req, res, next) {
  console.log('ormErrorHandler')
    if (err instanceof ValidationError) {
        res.status(409).json({
            statusCode: 409,
            message: err.message,
            errors: err.errors
        })
      next(err)
    }
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };