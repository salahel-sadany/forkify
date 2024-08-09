class SearchView {
  #parentEL = document.querySelector('.search');
  getQeury() {
    const query = this.#parentEL.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEL.querySelector('.search__field').value = '';
  }

  addHandlerRender(handler) {
    this.#parentEL.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
