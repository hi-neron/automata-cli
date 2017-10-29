'use strict'

const test = require('ava')
const client = require('../')
const nock = require('nock')
const fixtures = require('./fixtures')

let options = {
  endpoints: {
    auth: 'http://automata.test/auth',
    users: 'http://automata.test/users',
    pictures: 'http://automata.test/pictures',
    contributions: 'http://api.automata.co/contributions'
  }
}

test.beforeEach(t => {
  t.context.cli = client.newClient(options)
})

test('asegurar cliente', t => {
  const client = t.context.cli
// auth
  t.is(typeof client.authenticate, 'function')

// images
  t.is(typeof client.createPicture, 'function')
  t.is(typeof client.getPicture, 'function')
  t.is(typeof client.getAllPictures, 'function')
  t.is(typeof client.getPicturesByUser, 'function')
  t.is(typeof client.deletePicture, 'function')
  t.is(typeof client.addPictureAward, 'function')

// users

  t.is(typeof client.createUser, 'function')
  t.is(typeof client.getUser, 'function')
  t.is(typeof client.getUsersByMastery, 'function')
  t.is(typeof client.addAvatar, 'function')
  t.is(typeof client.editMasteries, 'function')

// Contributions
  t.is(typeof client.editContrib, 'function')
  t.is(typeof client.rateContrib, 'function')
  t.is(typeof client.getTenContribs, 'function')
  t.is(typeof client.getContrib, 'function')
  t.is(typeof client.createContrib, 'function')
  t.is(typeof client.deleteContrib, 'function')
})

// autenticacion
test('authenticate', async t => {
  const client = t.context.cli

  let user = fixtures.getUser()

  let credentials = {
    username: user.username,
    password: user.password
  }

  const token = 'a-token-secure'

  nock(options.endpoints.auth)
    .post('/', credentials)
    .reply(200, token)

  let result = await client.authenticate(user.username, user.password)

  t.deepEqual(result, token)
})

// images
test('create an image', async t => {
  const client = t.context.cli

  let token = 'xxx-xxx-xxx'
  let image = fixtures.getPicture()

  let newImage = {
    src: image.src,
    description: image.description
  }

  nock(options.endpoints.pictures, {
    reqHeaders: {
      'Authorization': `Bearer ${token}`
    }
  })
    .post('/', newImage)
    .reply(200, image)

  let result = await client.createPicture(newImage, token)
  t.deepEqual(result, image)
})

test('Get one image', async t => {
  const client = t.context.cli

  let image = fixtures.getPicture()

  nock(options.endpoints.pictures)
    .get(`/${image.publicId}`)
    .reply(200, image)

  let result = await client.getPicture(image.publicId)
  t.deepEqual(result, image)
})

test('Get all images', async t => {
  const client = t.context.cli

  let images = fixtures.getPictures()

  nock(options.endpoints.pictures)
    .get('/')
    .reply(200, images)

  let result = await client.getAllPictures()
  t.deepEqual(result, images)
})

test('Get pictures by user', async t => {
  const client = t.context.cli

  let images = fixtures.getPictures()

  nock(options.endpoints.pictures)
    .get(`/byuser/${images[0].username}`)
    .reply(200, images)

  let result = await client.getPicturesByUser()
  t.deepEqual(result, images)
})

test('delete picture', async t => {
  const client = t.context.cli

  let image = fixtures.getPictures()
  let user = fixtures.getUser()
  let token = 'xxx-xxx-xxx'

  let imageId = image.publicId
  let userId = user.publicId

  let response = {
    code: 204,
    message: `image ${imageId} successful deleted`,
    status: 'ok'
  }

  let data = {
    userId: userId,
    imageId: imageId
  }

  nock(options.endpoints.pictures, {
    reqHeaders: {
      'Authorization': `Bearer ${token}`
    }
  })
    .delete('/', data)
    .reply(200, response)

  let result = await client.deletePicture(data, token)
  t.deepEqual(result, response)
})

test('add picture award', async t => {
  const client = t.context.cli

  let token = 'xxx-xxx-xxx'

  let sponsor = fixtures.getUser()
  let image = fixtures.getPicture()

  let imageId = image.publicId

  let award = {
    sponsor: sponsor.username,
    type: 'amazing'
  }

  nock(options.endpoints.pictures, {
    reqHeaders: {
      'Authorization': `Bearer ${token}`
    }
  })
    .post(`/award/${imageId}`, award)
    .reply(200, image)

  let result = await client.addPictureAward(imageId, award, token)
  t.deepEqual(result, image)
})

// users
test('create an user', async t => {
  const client = t.context.cli

  let user = fixtures.getUser()

  nock(options.endpoints.users)
    .post('/', user)
    .reply(200, user)

  let result = await client.createUser(user)
  t.deepEqual(result, user)
})

test('Get user', async t => {
  const client = t.context.cli

  let user = fixtures.getUser()

  nock(options.endpoints.users)
    .get(`/${user.username}`)
    .reply(200, user)

  let result = await client.getUser(user.username)
  t.deepEqual(result, user)
})

test('Get users by masteries', async t => {
  const client = t.context.cli

  let users = fixtures.getUsers()

  let mastery = 'Photography'

  nock(options.endpoints.users)
    .get(`/mastery/${mastery}`)
    .reply(200, users)

  let result = await client.getUsersByMastery(mastery)
  t.deepEqual(result, users)
})

test('add user avatar', async t => {
  const client = t.context.cli
  let avatarImage = 'a_random_avatar.jpg'
  let token = 'xxx-xxx-xxx'

  let user = fixtures.getUser()

  let username = user.username

  let avatar = {
    avatar: avatarImage,
    userId: user.userId
  }

  nock(options.endpoints.users, {
    reqHeaders: {
      'Authorization': `Bearer ${token}`
    }
  })
    .post(`/avatar/${username}`, avatar)
    .reply(200, user)

  let result = await client.addAvatar(username, avatar, token)
  t.deepEqual(result, user)
})

test('edit user masteries', async t => {
  const client = t.context.cli

  let token = 'xxx-xxx-xxx'
  let masteries = ['photo', 'brand']

  let user = fixtures.getUser()

  let username = user.username

  let data = {
    userId: user.publicId,
    masteries: masteries
  }

  nock(options.endpoints.users, {
    reqHeaders: {
      'Authorization': `Bearer ${token}`
    }
  })
    .post(`/mastery/${username}`, data)
    .reply(200, user)

  let result = await client.editMasteries(username, data, token)
  t.deepEqual(result, user)
})

// contributions

test('Get contribution', async t => {
  const client = t.context.cli

  let contrib = fixtures.getContrib()

  nock(options.endpoints.contributions)
    .get(`/${contrib.publicId}`)
    .reply(200, contrib)

  let result = await client.getContrib(contrib.publicId)
  t.deepEqual(result, contrib)
})

test('Get ten contribution', async t => {
  const client = t.context.cli

  let contribs = fixtures.getContribs()
  let lastT = 0 // ultimas 10 publciaciones

  nock(options.endpoints.contributions)
    .get(`/last/${lastT}`)
    .reply(200, contribs)

  let result = await client.getTenContribs(lastT)
  t.deepEqual(result, contribs)
  t.is(result.length, contribs.length)
})

test('Get contributions by tag', async t => {
  const client = t.context.cli

  let contrib = fixtures.getContrib()
  let tag = contrib.tags[0]
  console.log(tag)

  let contribs = fixtures.getContribs()

  nock(options.endpoints.contributions)
    .get(`/getbytag/${tag}`)
    .reply(200, contribs)

  let result = await client.getContribsByTag(tag)
  t.is(result.length, contribs.length)
})

test('Create one contribution', async t => {
  const client = t.context.cli

  let token = 'xxx-xxx-xxx'
  let contrib = fixtures.getContrib()

  let username = 'jorgito'
  let newContrib = contrib.data
  contrib.data.username = username

  nock(options.endpoints.contributions, {
    reqHeaders: {
      'Authorization': `Bearer ${token}`
    }
  })
    .post('/', newContrib)
    .reply(200, contrib)

  let result = await client.createContrib(newContrib, username, token)
  t.deepEqual(result, contrib)
})

test('deleteContrib', async t => {
  const client = t.context.cli

  let contrib = fixtures.getContrib()
  let user = fixtures.getUser()
  let token = 'xxx-xxx-xxx'

  let contribId = contrib.publicId
  let username = user.username

  let response = {
    message: `Contribution ${contribId} successful deleted`,
    status: 200
  }

  let data = {
    username: username,
    contribId: contribId
  }

  nock(options.endpoints.contributions, {
    reqHeaders: {
      'Authorization': `Bearer ${token}`
    }
  })
    .delete('/', data)
    .reply(200, response)

  let result = await client.deleteContrib(contribId, username, token)
  t.deepEqual(result, response)
})

test('editContrib', async t => {
  const client = t.context.cli
  let token = 'xxx-xxx'
  let contribId = '123123'
  let username = 'holaMundo'

  let changes = {
    type: 'efe',
    image: 'werw',
    info: 'efw2ef'
  }

  let data = {
    contribId: contribId,
    username: username,
    changes: changes
  }

  let response = {
    status: 200,
    message: 'edit success'
  }

  nock(options.endpoints.contributions, {
    reqHeaders: {
      'Authorization': `Bearer ${token}`
    }
  })
    .post('/edit', data)
    .reply(200, response)

  let result = await client.editContrib(contribId, username, changes, token)
  t.is(result.status, 200, 'status code 200')
})

test('rateContrib', async t => {
  let client = t.context.cli

  let token = 'xxx-xxx-xxx'
  let scoringUsername = 'fastasma'
  let contribId = '123193418'

  let data = {
    contribId: contribId,
    username: scoringUsername
  }

  let response = {
    status: 200,
    contribId: contribId
  }

  nock(options.endpoints.contributions, {
    reqHeaders: {
      'Authorization': `Bearer ${token}`
    }
  })
    .post('/rate', data)
    .reply(200, response)

  let result = await client.rateContrib(contribId, scoringUsername, token)
  console.log(result)
  t.is(result.status, 200, 'status code 200')
})

test('devRes', async t => {
  let client = t.context.cli

  let token = 'xxx-xxx-xxx'

  let username = 'fastasma'
  let contribId = '123193418'

  let devResponse = {
    message: 'Esto puede funcionar',
    approval: true
  }

  let data = {
    contribId: contribId,
    username: username,
    devRes: devResponse
  }

  let response = {
    status: 200,
    message: devResponse.message,
    approval: devResponse.approval
  }

  nock(options.endpoints.contributions, {
    reqHeaders: {
      'Authorization': `Bearer ${token}`
    }
  })
    .post('/devres', data)
    .reply(200, response)

  let result = await client.devRes(contribId, username, devResponse, token)
  console.log(result)
  t.is(result.message, response.message)
})

