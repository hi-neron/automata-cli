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
  },
  getContrib () {
    return {
      publicId: '6QjLPtk8EYHsb0G9FIqftU',
      id: 'e0de1420-01ba-4e19-91c6-00a76ba0668a',
      title: 'Una contrib',
      dateAdded: '2017-08-08T12:40:00.368Z',
      user: {
        userId: '6QjLPtk8EYHsb0G9FIqftU',
        username: 'roberto',
        title: 'Esparandaculo',
        avatar: 'pepe.jpg'
      },
      tags: ['love', 'data'],
      data: {
        type: 'message',
        info: 'esta es mi contribucuon',
        image: 'noTieneImage.png'
      },
      messages: [
        {
          date: '2017-08-08T12:40:00.368Z',
          message: 'hola mundo',
          user: {
            username: 'titi',
            avatar: 'nono.png'
          }
        }
      ],
      rate: ['pepe', 'conan'],
      dev: {
        message: null,
        approval: false
      }
    }
  },
  getContribs () {
    return [
      this.getContrib(),
      this.getContrib(),
      this.getContrib()
    ]
  }
}

module.exports = fixtures
