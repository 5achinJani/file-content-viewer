const apiUrl = "/read-file/";
export const fileBrowserApi = ({ fileName, page }) => {
  const url = `${apiUrl}fileName/${fileName}/page/${page}`;

  return fetch(url)
    .then(statusCheck)
    .then(toJson)
    .then(response => {
      if (response.status !== 200) {
        return Promise.reject(response);
      } else {
        return Promise.resolve(response);
      }
    })
    .catch(function(response) {
      console.log("Fetch Error :-S", response);
      return Promise.reject(response);
    });
};

function statusCheck(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}

function toJson(response) {
  return response.json();
}
