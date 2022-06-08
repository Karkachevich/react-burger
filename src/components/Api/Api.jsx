

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};



export const getIngridients = (url) => {
  return fetch(url).then(checkResponse);
};



export const createOrder = (url, basketIngredientsId) => {
  return fetch(`${url}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: basketIngredientsId,
    }),
  }).then(checkResponse);
};

