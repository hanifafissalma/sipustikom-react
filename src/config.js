import cookie from 'react-cookie';

export function addOptions(defaults, url) {
  defaults.headers['Authorization'] = 'Bearer '+ cookie.load('ncess');
}

export var service = 'http://192.168.9.21:8080/api';
