const axios = require('axios');
let pagePagination = 1;
const fetchFromPixabay = async (searchName, pagePagination) => {
  const key = '29059571-ec18f33066846ba93eec17670';
  const getData = axios
    .get(`https://pixabay.com/api/`, {
      params: {
        q: searchName,
        key: key,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: pagePagination,
      },
    })
    .catch(function (error) {
      console.log(error);
    });

  return getData;
};

export { fetchFromPixabay, pagePagination };
