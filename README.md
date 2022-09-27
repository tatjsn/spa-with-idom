# spa-with-idom

## Description

A proof of concept that single-page app (SPA) "good" behaviours can be achieved as an add-on upgrade to existing multi page apps (MPA) using [incremental-dom](https://github.com/google/incremental-dom).


## Definition of "good" SPA behaviours

Across page transitions:

* Local states are preserved.
* Videos are preserved.
* More.


## Demo

* [11ty demo](https://11ty-spa.vercel.app/)
* [Simple demo](https://spa-with-idom.vercel.app/)

## How to use

Add following script:
```html
<script type="module" src="https://unpkg.com/spa-idom@0.0.1/dist/main.js"></script>
```

Add following attributes to app container and loading indicator:

- `spa-app`
- `spa-loader`

See `app/index.html` for example.

See https://github.com/tatjsn/11ty-spa-idom for more practical usage.
