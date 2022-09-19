import { elementOpen, elementClose, text, patch } from 'incremental-dom';

function getPropsArray(node) {
  const result = [];
  for (const attr of node.attributes) {
    result.push(attr.name);
    result.push(attr.value);
  }
  return result;
}

function traverse(node, top = false) {
  if (node.nodeType === Node.TEXT_NODE) {
    text(node.data);
    return;
  }
  if (!top) {
    elementOpen(node.tagName.toLowerCase(), null, null, ...getPropsArray(node));
  }
  for (const child of node.childNodes) {
    traverse(child);
  }
  if (!top) {
    elementClose(node.tagName.toLowerCase());
  }
}

document.body.addEventListener('click', async (e) => {
  const origin = e.target.closest('a');

  if (origin) {
    const newHref = origin.href;

    if (new URL(newHref).origin !== location.origin) {
      return;
    }

    e.preventDefault();

    const result = await fetch(newHref);
    const text = await result.text();
    const tmpl = document.createElement('template');
    tmpl.innerHTML = text;

    const newApp = tmpl.content.querySelector('#app');

    patch(document.querySelector('#app'), () => {
      traverse(newApp, true);
    });

    history.pushState({}, null, newHref);
  }
})
