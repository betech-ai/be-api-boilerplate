const KEY = 'apiKeys';

const storeToLocalStorage = (key, value) => {
  const next = JSON.parse(localStorage.getItem(KEY)) || {};
  next[key] = value;
  localStorage.setItem(KEY, JSON.stringify(next))
};

const getFromLocalStorage = (key) => {
  const keys = JSON.parse(localStorage.getItem(KEY)) || {};
  return keys[key];
}

const getValue = (evt) => (evt.target).value;

const init = () => {
  const accessToken = window.document.getElementById('access-token');

  accessToken.value = getFromLocalStorage('accessToken') || '';

  accessToken.addEventListener('change', (evt) => {
    const value = getValue(evt);
    storeToLocalStorage('accessToken', value);
  });
};

window.addEventListener('load', init);