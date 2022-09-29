import { elementOpen, elementClose, text, patch } from 'incremental-dom';

const app = '*[spa-app]';
const loading = '*[spa-loading]';

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

function applyHtmlText(text) {
  const tmpl = document.createElement('template');
  tmpl.innerHTML = text;

  const newApp = tmpl.content.querySelector(app);

  patch(document.querySelector(app), () => {
    traverse(newApp, true);
  });
}

async function fetchAndPatch(url, options) {
  document.querySelector(loading).style.display = 'block';
  try {
    const result = await fetch(url, options);
    const htmlText = await result.text();

    applyHtmlText(htmlText);

    history.pushState({ htmlText }, null, url);
  } catch (error) {
    // TODO Error handling
    console.log(error);
  }

  document.querySelector(loading).style.display = 'none';
}

document.body.addEventListener('click', (e) => {
  const origin = e.target.closest('a');

  if (!origin || e.shiftKey || e.ctrlKey || e.metaKey) {
    return;
  }

  if (new URL(origin.href).origin !== location.origin) {
    return;
  }

  e.preventDefault();

  fetchAndPatch(origin.href);
});

document.body.addEventListener('submit', (e) => {
  if (new URL(e.target.action).origin !== location.origin) {
    return;
  }

  e.preventDefault();

  const formData = new FormData(e.target);

  fetchAndPatch(e.target.action, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams([...formData]),
  });
});



window.addEventListener('popstate', (event) => {
  if (!event.state || !event.state.htmlText) {
    return;
  }

  applyHtmlText(event.state.htmlText);
});

// For history back
history.replaceState({ htmlText: document.documentElement.outerHTML }, null, location);
