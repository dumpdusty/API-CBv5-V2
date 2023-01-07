import supertest from 'supertest'

function register(firstName, lastName, email, password){
    return supertest(process.env.BASE_URL)
        .post('user')
        .send({firstName: firstName, lastName: lastName, email: email, password: password})
}

export { register }
