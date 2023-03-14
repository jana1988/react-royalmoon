const endpoint = "/api";
// const endpoint = "http://www.t1sbe-java.t1t.in";
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export default async function upload(url, file) {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("access_token")
        ? `Bearer ${localStorage.getItem("access_token")}`
        : "",
    },
    body: formData,
  };

  return fetch(endpoint + url, config)
    .then((response) => response.json())
    .then((res) => res.data)
    .catch((error) => {
      if (error.code) {
        console.log(1111111, error.code);
      }
      if ("stack" in error && "message" in error) {
        // notification.error({
        //   message: `请求错误: ${url}`,
        //   description: error.message,
        // });
        console.log(22222222222, error.message);
      }
      return error;
    });
}
