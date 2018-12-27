const Authorization =
  "563492ad6f91700001000001bc7facfb76db416d93e41d5fd4a16e11";
const BASE_URL = "https://api.pexels.com/v1";

export function fetchPhotos(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${BASE_URL}/search?query=${search}&per_page=50&page=1`,
        {
          headers: { Authorization }
        }
      );
      if (response.status !== 200) {
        throw new Error();
      }
      const data = await response.json();
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
}
