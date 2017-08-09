'use strict'

const request = require('request-promise')

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

  authenticate (username, password) {
    let options = {
      method: 'POST',
      uri: `${this.options.endpoints.auth}/`,
      body: {
        username,
        password
      },
      json: true
    }

    return Promise.resolve(request(options))
  }

// PICTURES

  createPicture (image, token) {
    let options = {
      method: 'POST',
      uri: `${this.options.endpoints.pictures}/`,
      body: image,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      json: true
    }

    return Promise.resolve(request(options))
  }

  getPicture (imageId) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.pictures}/${imageId}`,
      json: true
    }

    return Promise.resolve(request(options))
  }

  getAllPictures () {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.pictures}/`,
      json: true
    }

    return Promise.resolve(request(options))
  }

  getPicturesByUser (username) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.pictures}/byuser/${username}`,
      json: true
    }

    return Promise.resolve(request(options))
  }

  deletePicture (data, token) {
    let options = {
      method: 'DELETE',
      uri: `${this.options.endpoints.pictures}/`,
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      json: true
    }

    return Promise.resolve(request(options))
  }

  addPictureAward (imageId, award, token) {
    let options = {
      method: 'POST',
      uri: `${this.options.endpoints.pictures}/award/${imageId}`,
      body: award,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      json: true
    }

    return Promise.resolve(request(options))
  }

  // users
  createUser (user) {
    let options = {
      method: 'POST',
      uri: `${this.options.endpoints.users}/`,
      body: user,
      json: true
    }

    return Promise.resolve(request(options))
  }

  getUser (username) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/${username}`,
      json: true
    }

    return Promise.resolve(request(options))
  }

  getUsersByMastery (mastery) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.users}/mastery/${mastery}`,
      json: true
    }

    return Promise.resolve(request(options))
  }

  addAvatar (username, avatar, token) {
    let options = {
      method: 'POST',
      uri: `${this.options.endpoints.users}/avatar/${username}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: avatar,
      json: true
    }

    return Promise.resolve(request(options))
  }

  editMasteries (username, mastery, token) {
    let options = {
      method: 'POST',
      uri: `${this.options.endpoints.users}/mastery/${username}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: mastery,
      json: true
    }

    return Promise.resolve(request(options))
  }

  // contributions
  getContrib (contribId) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.contributions}/${contribId}`,
      json: true
    }
    return Promise.resolve(request(options))
  }

  getTenContribs (lastT) {
    let options = {
      method: 'GET',
      uri: `${this.options.endpoints.contributions}/last/${lastT}`,
      json: true
    }
    return Promise.resolve(request(options))
  }

  createContrib (contribution, username, token) {
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

    return Promise.resolve(request(options))
  }

  deleteContrib (contribId, username, token) {
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

    return Promise.resolve(request(options))
  }

  editContrib (contribId, username, changes, token) {
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

    return Promise.resolve(request(options))
  }

  rateContrib (contribId, scoringUsername, token) {
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

    return Promise.resolve(request(options))
  }

  devRes (contribId, username, devResponse, token) {
    let data = {
      contribId: contribId,
      username: username,
      devRes: devResponse
    }

    let options = {
      method: 'POST',
      url: `${this.options.endpoints.contributions}/devRes`,
      json: true,
      body: data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }

    return Promise.resolve(request(options))
  }
}

module.exports = Client
