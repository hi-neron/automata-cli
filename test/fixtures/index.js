'use strict'

const uuid = require('uuid-base62')

const fixtures = {
  getPicture () {
    let id = uuid.uuid()
    return {
      description: 'a random description',
      url: `http://random.test/${id}.jpg`,
      awards: [],
      id: id,
      userId: uuid.encode(id),
      publicId: uuid.encode(id),
      createdAt: new Date().toString()
    }
  },
  getUser () {
    return {
      id: uuid.uuid(),
      name: 'random Name',
      username: 'randomUsername',
      password: uuid.uuid(),
      createdAt: new Date().toString()
    }
  },
  getPictures () {
    return [
      this.getPicture(),
      this.getPicture(),
      this.getPicture(),
      this.getPicture()
    ]
  },
  getUsers () {
    return [
      this.getUser(),
      this.getUser(),
      this.getUser()
    ]
  }
}

module.exports = fixtures
