import { MOVIES_URL } from "./constants";

function getResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Произошла ошибка: ${res.status}`);
  }
}

export const getMovies = () => {
  return fetch(`${MOVIES_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(getResponse);
};
