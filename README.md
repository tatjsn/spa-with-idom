# spa-with-idom

## Description

Automatic enhancement to bring single-page app (SPA) features to SSG or SSR HTML pages.

Powered by [incremental-dom](https://github.com/google/incremental-dom).

Not ready for production.

## Benefits

You'll get these SPA goodness for free, without writing any additional JS.

- Preserved local states and continuous video playback across page transitions.
- Unlimited and simultaneous dynamic islands (as islands architecture).
- More.

## Trade-offs

The library prioritise simplicity and freedom of software stack with a cost of performance, because all interactions will be full-page requests.

This might be a minor issue for SSG, but if you're doing SSR you might need to heavily optimise to make it feel responsive.

## Demo

- [Eleventy demo](https://11ty-spa.vercel.app/) ([source](https://github.com/tatjsn/11ty-spa-idom))
- [Form submit demo](https://lemon-vaulted-pelican.glitch.me/) ([source](https://glitch.com/~lemon-vaulted-pelican))
- [App-like demo](https://flannel-sedate-woodwind.glitch.me/) ([source](https://glitch.com/~flannel-sedate-woodwind))
- [Prerelease](https://spa-with-idom.vercel.app/)

## How to use

Add `spa-app` to your app container, and `spa-loader` to the loading indicator UI. See [app/index.html](app/index.html) for example.

```html
<body>
  <div spa-app>
    ...
  </div>
  <div spa-loader style="display:none">Now loading</div>
</div>
```

Add the following script tag to your exising app:

```html
<head>
  <script
    type="module"
    src="https://unpkg.com/spa-idom@0.0.1/dist/main.js"
  ></script>
</head>
```
