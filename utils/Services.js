import request from './ApiCentral';

function fetchLocation(location) {
  return request({
    url: `/cities?q=${location}`,
    method: 'GET',
  });
}

function fetchEstablishments(location) {
  return request({
    url: `/establishments?city_id=${location}`,
    method: 'GET',
  });
}

function fetchCategories() {
  return request({
    url: '/categories',
    method: 'GET',
  });
}

function fetchRestaurants(id, typeId, categoryId) {
  return request({
    url: `/search?entity_id=${id}&establishment_type=${typeId}&category=${categoryId}}`,
    method: 'GET',
  });
}

const Services = {
  fetchLocation,
  fetchCategories,
  fetchEstablishments,
  fetchRestaurants,
};

export default Services;
