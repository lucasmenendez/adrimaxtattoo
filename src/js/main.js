import "../styles/main.scss";

ScrollOut({
    cssProps: {
        viewportY: true,
        visibleY: true,
    }
});

const portfolio = document.querySelector("#portfolio .gallery");

portfolio.addEventListener("wheel", e => onWheelScroll(e));
portfolio.addEventListener("mousewheel", e => onWheelScroll(e));
portfolio.addEventListener("DOMMouseScroll", e => onWheelScroll(e));

let stopped = false;
function onWheelScroll(event) {
    const start = 0;
    const end = portfolio.scrollWidth - portfolio.offsetWidth;

    if (
        (event.deltaY < 0 && portfolio.scrollLeft == end) ||
        (event.deltaY > 0 && portfolio.scrollLeft == start)
    ) stopped = false;

    if (!stopped) {
        portfolio.scrollLeft += event.deltaY;
        event.preventDefault();
    }

    if (
        (event.deltaY < 0 && portfolio.scrollLeft <= start) ||
        (event.deltaY > 0 && portfolio.scrollLeft >= end)
    ) stopped = true;
}


function getMedia() {
    return new Promise((resolve, reject) => {
        new InstagramFeed({
            username: "adrimaxtattoo",
            callback: data => {
                const media = data.edge_owner_to_timeline_media || null
                if (media && media.edges) resolve(media.edges.map(img => {
                    return {
                        picture: img.node.display_url,
                        thumbnail: img.node.thumbnail_src
                    }
                }));
            },
            on_error: err => reject(err)
        });
    });  
}

//getMedia().then(data => console.log(data));