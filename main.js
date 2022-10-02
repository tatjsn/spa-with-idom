import {
  elementOpenStart,
  elementOpenEnd,
  elementClose,
  attr,
  text,
  skipNode,
  currentElement,
  currentPointer,
  patchOuter,
} from 'incremental-dom';

const app = '[spa-app]';
const loading = '[spa-loading]';

// https://github.com/google/incremental-dom/issues/314
function comment(text) {
  const currE = currentElement();
  const currP = currentPointer();
  let comment;
  if (currP && currP.nodeName === '#comment') {
    comment = currP;
  } else {
    comment = document.createComment('');
    currE.insertBefore(comment, currP);
  }
  comment.data = text;
  skipNode();
}

function traverse(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    text(node.data);
    return;
  }

  if (node.nodeType === Node.COMMENT_NODE) {
    comment(node.data);
    return;
  }

  const tagName = node.tagName.toLowerCase();

  elementOpenStart(tagName);
  for (const na of node.attributes) {
    attr(na.name, na.value);
  }
  elementOpenEnd(tagName);

  for (const child of node.childNodes) {
    traverse(child);
  }

  elementClose(tagName);
}

function applyHtmlText(text) {
  const tmpl = document.createElement('template');
  tmpl.innerHTML = text;

  const node = tmpl.content.querySelector(app);

  patchOuter(document.querySelector(app), traverse, node);
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
history.replaceState(
  { htmlText: document.documentElement.outerHTML },
  null,
  location
);
