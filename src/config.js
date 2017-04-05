import cookie from 'react-cookie';

export function addOptions(defaults, url) {
  defaults.headers['Authorization'] = 'Bearer '+ cookie.load('ncess');
}

export var service = 'http://localhost/sipustikom-service/public/api';
