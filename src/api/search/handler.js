class SearchHandler {
  constructor(searchService) {
    this._service = searchService;

    this.getSearchHandler = this.getSearchHandler.bind(this);
  }

  async getSearchHandler(request, h) {
    const { q, category } = request.query;

    const data = await this._service.searchData({ q, category });

    const response = h.response({
      status: 'success',
      data
    });
    response.code(200);
    return response;
  }
}

module.exports = SearchHandler;
