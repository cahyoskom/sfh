import axios from 'axios';
import { fail } from '../components/common/toast-message';

export function GET(url, header) {
  return axios
    .get(url, header)
    .then(res => {
      return res;
    })
    .catch(err => {
      if (typeof err.response == 'undefined') {
        fail('Network Error, Connection Not Found');
        return { status: 400 };
      } else {
        let errorData = err.response.data || {
          message: 'Something Went Wrong',
          trace: ''
        };
        fail('Error ' + (err.response.status || '') + ':' + errorData.message + ' ' + errorData.trace);
        return err.response;
      }
    });
}

export function GETFILE(url, header) {
  return axios
    .get(url, {
      responseType: 'blob',
      // timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        Accept: '*/*'
      }
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      if (typeof err.response == 'undefined') {
        fail('Network Error, Connection Not Found');
        return { status: 400 };
      } else {
        let errorData = err.response.data || {
          message: 'Something Went Wrong',
          trace: ''
        };
        fail('Error ' + (err.response.status || '') + ':' + errorData.message + ' ' + errorData.trace);
        return err.response;
      }
    });
}

export function POST(url, body, header) {
  return axios
    .post(url, body, header)
    .then(res => {
      return res;
    })
    .catch(err => {
      if (typeof err.response == 'undefined') {
        fail('Network Error, Connection Not Found');
        return { status: 400 };
      } else {
        let errorData = err.response.data || {
          message: 'Something Went Wrong',
          trace: ''
        };
        fail('Error ' + (err.response.status || '') + ':' + errorData.message + ' ' + errorData.trace);
        return err.response;
      }
    });
}

export function PUT(url, body, header) {
  return axios
    .put(url, body, header)
    .then(res => {
      return res;
    })
    .catch(err => {
      if (typeof err.response == 'undefined') {
        fail('Network Error, Connection Not Found');
        return { status: 400 };
      } else {
        let errorData = err.response.data || {
          message: 'Something Went Wrong',
          trace: ''
        };
        fail('Error ' + (err.response.status || '') + ':' + errorData.message + ' ' + errorData.trace);
        return err.response;
      }
    });
}

export function DELETE(url, header) {
  return axios
    .delete(url, header)
    .then(res => {
      return res;
    })
    .catch(err => {
      if (typeof err.response == 'undefined') {
        fail('Network Error, Connection Not Found');
        return { status: 400 };
      } else {
        let errorData = err.response.data || {
          message: 'Something Went Wrong',
          trace: ''
        };
        fail('Error ' + (err.response.status || '') + ':' + errorData.message + ' ' + errorData.trace);
        return err.response;
      }
    });
}
