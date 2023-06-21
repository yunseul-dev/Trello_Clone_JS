import renderDom from './renderDom.js';

let _state;

const useState = initState => {
  const state = _state || initState;

  const setState = newState => {
    _state = newState;

    renderDom.render();
  };

  return [state, setState];
};

export default useState;
