//common function to get response from promise
export function __response(promise, headers = 0) {
  return promise
    .then(response => {
      return { data: response.data, status: response.status, headers: headers ? response.headers : {} }
    })
    .catch(error => {
      let staticKeys = { headers: {}, request: {}, config: {} }
      return error.response ? { ...error.response, error: 1, ...staticKeys } :
        { error: 1, message: error.message, status: 201, ...staticKeys }
    });
}