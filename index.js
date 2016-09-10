'use strict'

const Client = require('./lib/client')

exports.newClient = function (options) {
  return new Client(options)
}
