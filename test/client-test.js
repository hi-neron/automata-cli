'use strict'

const test = require('ava')
const client = require('../')
const nock = require('nock')
const fixtures = require('./fixtures')

let options = {
  endpoints: {
    auth: 'http://automata.test/auth',
    users: 'http://automata.test/users',
    pictures: 'http://automata.test/pictures'
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
})

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

// addPictureAward(iamgeId, award, token)
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

  let result = await client.addAvatar(imageId, award, token)
  t.deepEqual(result, image)
})

test('edit user masteries', async t => {
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

  let result = await client.editMasteries(imageId, award, token)
  t.deepEqual(result, image)
})
