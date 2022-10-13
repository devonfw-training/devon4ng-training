// Full list of configuration options available at:
// https://github.com/hakimel/reveal.js#configuration
var revealConfig = {
  controls: true,
  progress: true,
  history: true,
  center: true,
  minScale: 1,
  maxScale: 1,
  transition: "fade", // none/fade/slide/convex/concave/zoom

  // Optional reveal.js plugins
  dependencies: [
    {
      src: "../../node_modules/reveal.js/lib/js/classList.js",
      condition: function () {
        return !document.body.classList;
      },
    },
    {
      src: "../../node_modules/reveal.js/plugin/markdown/marked.js",
      condition: function () {
        return !!document.querySelector("[data-markdown]");
      },
    },
    {
      src: "../../node_modules/reveal.js/plugin/markdown/markdown.js",
      condition: function () {
        return !!document.querySelector("[data-markdown]");
      },
    },
    {
      src: "../../node_modules/reveal.js/plugin/highlight/highlight.js",
      async: true,
      condition: function () {
        return !!document.querySelector("pre code");
      },
      callback: function () {
        hljs.initHighlightingOnLoad();
      },
    },
    {
      src: "../../node_modules/reveal.js/plugin/zoom-js/zoom.js",
      async: true,
    },
    {
      src: "../../node_modules/reveal.js/plugin/notes/notes.js",
      async: true,
    },
    {
      src: "../../node_modules/reveal.js/plugin/menu/menu.js",
      async: true,
    },
  ],
  menu: {
    hideMissingTitles: true,
    custom: true,
    custom: [
      {
        title: "Links",
        icon: '<i class="fa fa-link">',
        src: "./navigation/links.html",
      },
    ],
  },
};
