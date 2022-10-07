import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const rnd = Math.floor(Math.random() * 1000000000000000000);
  const response = http.post(`http://localhost:3014/signup`, {
    email: `den${rnd}@yandex.ru`,
    password: '123456',
    firstName: 'Даниил',
    lastName: 'Полиенко',
    fatherName: 'Викторович',
  });
  check(response, {
    'is status 200': r => r.status === 200,
    'token created': r => {
      return r.body.includes('token');
    },
  });
}

export let options = {
  vus: 10,
  duration: '1s',
};
