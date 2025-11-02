const axiosInstance = require('./axiosInstance');

exports.searchPhotos = async (term, perPage = 20) => {
  const resp = await axiosInstance.get('/search/photos', {
    params: { query: term, per_page: perPage },
  });

  return resp.data.results.map(img => ({
    id: img.id,
    alt_description: img.alt_description,
    url_regular: img.urls.regular,
    url_thumb: img.urls.thumb,
    photographer: img.user.name,
    link: img.links.html
  }));
};
