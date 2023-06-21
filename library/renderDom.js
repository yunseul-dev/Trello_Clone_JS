import updateElement from './diff.js';
import handler from './handler.js';

let DOMString;
let root;

const renderDom = {
  createRoot($root) {
    root = $root;
  },

  initRender(App) {
    DOMString = App;

    root.innerHTML = DOMString();
    handler.bindEventHandler(root);
  },

  render() {
    handler.removeEventHandler(root);

    const $virtualRoot = root.cloneNode();
    $virtualRoot.innerHTML = DOMString();

    updateElement(root, root, $virtualRoot);
    handler.bindEventHandler(root);
  },
};

export default renderDom;
