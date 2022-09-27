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

export default function setup(root, loading) {
  function applyHtmlText(text) {
    const tmpl = document.createElement('template');
    tmpl.innerHTML = text;

    const newApp = tmpl.content.querySelector(root);

    patch(document.querySelector(root), () => {
      traverse(newApp, true);
    });
  }

  document.body.addEventListener('click', async (e) => {
    const origin = e.target.closest('a');

    if (!origin) {
      return;
    }
    const newHref = origin.href;

    if (new URL(newHref).origin !== location.origin) {
      return;
    }

    e.preventDefault();

    document.querySelector(loading).style.display = 'block';
    try {
      const result = await fetch(newHref);
      const htmlText = await result.text();

      applyHtmlText(htmlText);

      history.pushState({ htmlText }, null, newHref);
    } catch (error) {
      // TODO Error handling
      console.log(error);
    }

    document.querySelector(loading).style.display = 'none';
  });

  window.addEventListener('popstate', (event) => {
    if (!event.state || !event.state.htmlText) {
      return;
    }

    applyHtmlText(event.state.htmlText);
  });

  // For history back
  history.replaceState({ htmlText: document.documentElement.outerHTML }, null, location);
}
