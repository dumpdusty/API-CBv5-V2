import supertest from 'supertest'

function login(email, password) {
  return supertest(process.env.BASE_URL)
    .post('/v5/user/login')
    .send({ email, password })
}

function register(firstName, lastName, email, password) {
  return supertest(process.env.BASE_URL)
    .post('/v5/user')
    .send({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    })
}

function emailSearch(email){
    return supertest(process.env.BASE_URL)
        .post(`/email/search`)
        .send({ email })
}

export { login, register, emailSearch }
