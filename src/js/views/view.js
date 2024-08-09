import icons from '../../img/icons.svg';
export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;

    this._clear();
    this._parentEL.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEL.querySelectorAll('*'));

    newElements.forEach((newEL, i) => {
      const curEL = curElements[i];
      if (
        !curEL.isEqualNode(newEL) &&
        newEL.firstChild?.nodeValue.trim() !== ''
      )
        curEL.textContent = newEL.textContent;

      if (!curEL.isEqualNode(newEL)) {
        Array.from(newEL.attributes).forEach((attr, i) => {
          curEL.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentEL.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>`;

    this._clear();
    this._parentEL.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentEL.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentEL.insertAdjacentHTML('afterbegin', markup);
  }
}
