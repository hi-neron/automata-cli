'use strict'

const request = require('request-promise')
const Promise = require('bluebird')

class Client {
  constructor (options) {
    this.options = options || {
      endpoints: {
        pictures: 'http://api.automata.co/pictures',
        auth: 'http://api.automata.co/auth',
        users: 'http://api.automata.co/users',
        contributions: 'http://api.automata.co/contributions'
      }
    }
  }

// AUTH

  authenticate (username, password, cb) {
    let options = {
      method: 'POST',
      uri: `${this.options.endpoints.auth}/`,
      body: {
        username,
        password
      },
      json: true
    }
    console.log('authenticate from client')
    return Promise.resolve(request(options)).asCallback(cb)
  }

// PICTURES

  createPicture (image, token, cb) {
    let options = {
      method: 'POST',
      uri: `${this.options.endpoints.pictures}/`,
      body: image,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      json: true
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  getPicture (imageId, cb) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.pictures}/${imageId}`,
      json: true
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  getAllPictures (cb) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.pictures}/`,
      json: true
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  getPicturesByUser (username, cb) {
    console.log('hola mundo')

    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.pictures}/byuser/${username}`,
      json: true
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  deletePicture (data, token, cb) {
    let options = {
      method: 'DELETE',
      uri: `${this.options.endpoints.pictures}/`,
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      json: true
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  addPictureAward (imageId, award, token, cb) {
    let options = {
      method: 'POST',
      uri: `${this.options.endpoints.pictures}/award/${imageId}`,
      body: award,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      json: true
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  // users
  createUser (user, cb) {
    let options = {
      method: 'POST',
      uri: `${this.options.endpoints.users}/`,
      body: user,
      json: true
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  getUser (username, cb) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/${username}`,
      json: true
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  getUsersByMastery (mastery, cb) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/mastery/${mastery}`,
      json: true
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  addAvatar (username, avatar, token, cb) {
    let options = {
      method: 'POST',
      uri: `${this.options.endpoints.users}/avatar/${username}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: avatar,
      json: true
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  editMasteries (username, mastery, token, cb) {
    let options = {
      method: 'POST',
      uri: `${this.options.endpoints.users}/mastery/${username}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: mastery,
      json: true
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  // contributions
  getContrib (contribId, cb) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.contributions}/${contribId}`,
      json: true
    }
    return Promise.resolve(request(options)).asCallback(cb)
  }

  getTenContribs (lastT, cb) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.contributions}/last/${lastT}`,
      json: true
    }
    return Promise.resolve(request(options)).asCallback(cb)
  }

  getContribsByTag (tag, cb) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.contributions}/getbytag/${tag}`,
      json: true
    }
    return Promise.resolve(request(options)).asCallback(cb)
  }

  createContrib (contribution, username, token, cb) {
    contribution.username = username

    let options = {
      method: 'POST',
      uri: `${this.options.endpoints.contributions}/`,
      body: contribution,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      json: true
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  deleteContrib (contribId, username, token, cb) {
    let data = {
      username: username,
      contribId: contribId
    }

    let options = {
      method: 'DELETE',
      uri: `${this.options.endpoints.contributions}/`,
      json: true,
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  editContrib (contribId, username, changes, token, cb) {
    let data = {
      contribId: contribId,
      username: username,
      changes: changes
    }

    let options = {
      method: 'POST',
      url: `${this.options.endpoints.contributions}/edit`,
      json: true,
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  rateContrib (contribId, scoringUsername, token, cb) {
    let data = {
      contribId: contribId,
      username: scoringUsername
    }

    let options = {
      method: 'POST',
      url: `${this.options.endpoints.contributions}/rate`,
      json: true,
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  devRes (contribId, username, devResponse, token, cb) {
    let data = {
      contribId: contribId,
      username: username,
      devRes: devResponse
    }

    let options = {
      method: 'POST',
      url: `${this.options.endpoints.contributions}/devres`,
      json: true,
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  // messages
  // add contrib Message
  addContribMessage (contribId, username, message, token, cb) {
    let data = {
      contribId: contribId,
      username: username,
      content: message
    }

    let options = {
      method: 'POST',
      url: `${this.options.endpoints.contributions}/addmessage`,
      json: true,
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  // del Contrib Message
  delContribMessage (contribId, messageId, username, token, cb) {
    let data = {
      contribId: contribId,
      username: username,
      messageId: messageId
    }

    let options = {
      method: 'POST',
      url: `${this.options.endpoints.contributions}/delmessage`,
      json: true,
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    return Promise.resolve(request(options)).asCallback(cb)
  }

  setManOfMonth (username, mom, token, cb) {
    let data = {
      username: username
    }

    let options = {
      method: 'POST',
      url: `${this.options.endpoints.contributions}/setmom/${mom}`,
      json: true,
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    return Promise.resolve(request(options)).asCallback(cb)
  }

  getManOfMonth (cb) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.contributions}/getmom`,
      json: true
    }
    return Promise.resolve(request(options)).asCallback(cb)
  }
}

module.exports = Client
