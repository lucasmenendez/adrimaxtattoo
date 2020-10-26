import  "smoothscroll-polyfill";
window.__forceSmoothScrollPolyfill__ = true;

export default class ScrollablePage {
    constructor(parentSelector = "main", childSelector = "section") {
        this.current = null;
        this.targets = [];
        this.isScrolling = false;

        this.touchAnchor = 0;
        this.deltaOffset = {
            touch: 100,
            wheel: 30
        };

        this.init(parentSelector, childSelector);
        this.listenEvents();
    }

    static start(parent, child) {
        new ScrollablePage(parent, child);
    }

    init(parentSelector, childSelector) {
        const parent = document.querySelector(parentSelector);
        this.targets = Array.from(parent.querySelectorAll(childSelector));
        this.current = this.targets.find(child => child.classList.contains("active"));

        if (!this.current) {
            this.current = parent.firstElementChild;
            this.current.classList.add("active");
        }
    }

    listenEvents() {
        // Mousewhell events
        document.addEventListener("wheel", e => this.onWheelScroll(e));
        document.addEventListener("mousewheel", e => this.onWheelScroll(e));
        document.addEventListener("DOMMouseScroll", e => this.onWheelScroll(e));
        
        // Touch events
        document.addEventListener("touchstart", e => this.onTouchStart(e));
        document.addEventListener("touchend", e => this.onTouchEnd(e));
    }

    onWheelScroll(event) {
        if (Math.abs(event.deltaY) > this.deltaOffset.wheel && !this.isScrolling) {
            this.isScrolling = true;
            this.moveVertical(event.deltaY);
        }
    }

    onTouchStart(event) {
        this.touchAnchor = event.changedTouches[0].screenY;
    }

    onTouchEnd(event) {
        const deltaY = this.touchAnchor - event.changedTouches[0].screenY;
        if (Math.abs(deltaY) > this.deltaOffset.touch) this.moveVertical(deltaY);
    }

    moveVertical(deltaY) {
        if (
            deltaY > 0 && !this.current.nextElementSibling ||
            deltaY < 0 && !this.current.previousElementSibling
        ) {
            this.isScrolling = false;
            return;
        }

        this.current.classList.remove("active");
        this.current = deltaY > 0 ? this.current.nextElementSibling : this.current.previousElementSibling;
        this.current.classList.add("active");

        let scrollChecker;
        window.addEventListener("scroll", () => {
            window.clearTimeout(scrollChecker);
            scrollChecker = setTimeout(_ => {
                this.isScrolling = false;
            }, 66);
        }, false);

        window.scroll({
            top: this.current.offsetTop,
            left: this.current.offsetLeft,
            behavior: 'smooth',
        });
    }
}