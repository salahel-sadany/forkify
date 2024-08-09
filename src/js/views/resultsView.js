import View from './view';
import previewView from './previewView';
import icons from '../../img/icons.svg';

class ResultsView extends View {
  _parentEL = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query';
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
