// Full list of configuration options available at:
// https://revealjs.com/config/
const revealConfig = {
  hash: true,
  controls: true,
  progress: true,
  history: true,
  center: true,
  minScale: 1,
  maxScale: 1,
  transition: "fade", // none/fade/slide/convex/concave/zoom
  menu: {
    hideMissingTitles: true,
    custom: true,
    custom: [
      {
        title: "Links",
        icon: '<i class="fa fa-link">',
        src: "../common/navigation/links.html",
      },
    ],
  },
};
