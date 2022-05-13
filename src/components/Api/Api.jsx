const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getIngridients = (url) => {
  
  return fetch(url)
    .then(checkResponse)
    
};

export default getIngridients;
