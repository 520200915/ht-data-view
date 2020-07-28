import axios from 'axios'
// const domain = 'http://192.168.0.63:8209'
const domain = 'http://d.test.glsx.com.cn:7060'
class Request {
  get(url, data, success, fail) {
    return this.request('GET', url, data, success, fail)
  }
  post(url, data, success, fail) {
    return this.request('POST', url, data, success, fail)
  }
  request(method, url, data, success, fail) {
    if (!success) success = data
    return new Promise((resolve, reject) => {
      let obj = {
        method: method,
        url: `${domain}/gdv${url}`,
      }
      method != 'GET' ? obj.data = data : obj.params = data
      axios(obj)
        .then(response => {
          if (response.status == 200) {
            if (success && typeof success === 'function') {
              success(response.data, resolve)
            } else {
              resolve(response.data)
            }
          }
        })
        .catch(error => {
          if (fail && typeof fail === 'function') {
            fail(error, reject)
          } else {
            reject(error)
          }
        })
    })
  }
}
const request = new Request()
export {
  request
}