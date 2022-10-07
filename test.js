const supertest = require('supertest');
const requestWithSupertest = supertest('http://localhost:3014');

describe('User Endpoints', () => {
  let tokenDen = '';
  let idDen = '';
  let idDanya = '';
  let tokenDanya = '';
  let roleDen;
  let roleDanya;
  let achievememtDen;
  it('Create new user', async () => {
    const res = await requestWithSupertest.post('/signup').send({ email: 'den@yandex.ru', password: '123456', firstName: 'Den', lastName: 'Smr', fatherName: 'Ptr' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
  it('Create another user', async () => {
    const res = await requestWithSupertest.post('/signup').send({ email: 'danya@yandex.ru', password: '123456', firstName: 'danya', lastName: 'polienko', fatherName: 'vktr' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
  it('Create user with existing email', async () => {
    const res = await requestWithSupertest.post('/signup').send({ email: 'den@yandex.ru', password: '123456', firstName: 'Den', lastName: 'Smr', fatherName: 'Ptr' });
    expect(res.statusCode).toEqual(400);
  });
  it('Try creating user without name', async () => {
    const res = await requestWithSupertest.post('/signup').send({ email: 'den@yandex.ru', password: '123456', lastName: 'Smr', fatherName: 'Ptr' });
    expect(res.statusCode).toEqual(422);
  });
  it('Try logining with non existing email', async () => {
    const res = await requestWithSupertest.post('/login').send({ email: 'donyaschefer@yandex.ru', password: '123456' });
    expect(res.statusCode).toEqual(400);
  });
  it('Try logining with wrong password', async () => {
    const res = await requestWithSupertest.post('/login').send({ email: 'den@yandex.ru', password: '1234567' });
    expect(res.statusCode).toEqual(400);
  });
  it('Try logining without password', async () => {
    const res = await requestWithSupertest.post('/login').send({ email: 'den@yandex.ru' });
    expect(res.statusCode).toEqual(422);
  });
  it('Login user', async () => {
    const res = await requestWithSupertest.post('/login').send({ email: 'den@yandex.ru', password: '123456' });
    tokenDen = res.body.token;
    idDen = res.body.result.id;
    roleDen = res.body.result.role;
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
  it('Login user', async () => {
    const res = await requestWithSupertest.post('/login').send({ email: 'danya@yandex.ru', password: '123456' });
    tokenDanya = res.body.token;
    idDanya = res.body.result.id;
    roleDanya = res.body.result.role;
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
  it('Get items without token', async () => {
    const res = await requestWithSupertest.get('/achievement').set('Accept', 'application/json');
    expect(res.statusCode).toEqual(403);
  });
  it('Get items with token but without filters', async () => {
    const res = await requestWithSupertest.get('/achievement').set('Authorization', tokenDen);
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors.length).toEqual(2);
    expect(res.body.errors[0].msg).toEqual('Invalid value');
    // expect(res.body.count).toEqual(0);
    // expect(res.body.rows.count).toEqual(0);
  });
  it('Get items with token and with filters', async () => {
    const res = await requestWithSupertest.get('/achievement').set('Authorization', tokenDen).query({ role: roleDen, page: 0 });
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.count).toEqual(0);
    expect(res.body.rows.length).toEqual(0);
  });
  it('Try creating achievememt without image', async () => {
    const res = await requestWithSupertest
      .post('/achievement')
      .set('Authorization', tokenDen)
      .set('Content-Type', 'multipart/form-data')
      .field('projectName', 'SFEDU IOT')
      .field('team', 'Barbariki')
      .field('event', 'Hackaton')
      .field('result', '2')
      .field('owner', idDen);

    expect(res.statusCode).toEqual(400);
  });
  it('Try creating achievememt without projectName', async () => {
    const testImage = './public/test/cert.jpg';

    const res = await requestWithSupertest
      .post('/achievement')
      .set('Authorization', tokenDen)
      .set('Content-Type', 'multipart/form-data')
      .field('team', 'Barbariki')
      .field('event', 'Hackaton')
      .field('result', '2')
      .field('owner', idDen)
      .attach('uploaded_file', testImage);

    expect(res.statusCode).toEqual(422);
  });
  it('Try creating achievememt without team', async () => {
    const testImage = './public/test/cert.jpg';

    const res = await requestWithSupertest
      .post('/achievement')
      .set('Authorization', tokenDen)
      .set('Content-Type', 'multipart/form-data')
      .field('projectName', 'SFEDU IOT')
      .field('event', 'Hackaton')
      .field('result', '2')
      .field('owner', idDen)
      .attach('uploaded_file', testImage);

    expect(res.statusCode).toEqual(200);
  });
  it('Create achievement', async () => {
    const testImage = './public/test/cert.jpg';

    const res = await requestWithSupertest
      .post('/achievement')
      .set('Authorization', tokenDen)
      .set('Content-Type', 'multipart/form-data')
      .field('projectName', 'SFEDU IOT')
      .field('team', 'Barbariki')
      .field('event', 'Hackaton')
      .field('result', '2')
      .field('owner', idDen)
      .attach('uploaded_file', testImage);
    achievememtDen = res.body.id;
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
  });
  it('Create achievement by another user', async () => {
    const testImage = './public/test/cert.jpg';

    const res = await requestWithSupertest
      .post('/achievement')
      .set('Authorization', tokenDanya)
      .set('Content-Type', 'multipart/form-data')
      .field('projectName', 'SFDEDU AI')
      .field('team', 'Zinder')
      .field('event', 'SFEDUNET')
      .field('result', '1')
      .field('owner', idDanya)
      .attach('uploaded_file', testImage);
    achievememtDanya = res.body.id;
    expect(res.statusCode).toEqual(200);
  });
  it('Get new items with token and with filters', async () => {
    const res = await requestWithSupertest.get('/achievement').set('Authorization', tokenDen).query({ role: roleDen, page: 0 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.count).toEqual(2);
    expect(res.body.rows.length).toEqual(2);
  });
  it('Delete achievement', async () => {
    const res = await requestWithSupertest.delete('/achievement').set('Authorization', tokenDen).query({ role: roleDen, id: achievememtDen });
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toEqual(achievememtDen);
  });
  it('Try delete achievement of another user', async () => {
    const res = await requestWithSupertest.delete('/achievement').set('Authorization', tokenDen).query({ role: roleDen, id: achievememtDanya });
    expect(res.statusCode).toEqual(400);
  });
});
