import "../styles/main.scss";

import smoothscroll from "smoothscroll-polyfill";
import ScrollablePage from "./scrollable-page.js";

window.__forceSmoothScrollPolyfill__ = true;
ScrollablePage.start();