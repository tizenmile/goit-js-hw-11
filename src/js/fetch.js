function fetchFromPixabay(searchName) {
  fetch(
    `https://pixabay.com/api/?key=29059571-ec18f33066846ba93eec17670&q=${searchName}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => console.log(error));
}

export { fetchFromPixabay };
