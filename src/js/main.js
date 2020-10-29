import "../styles/main.scss";


ScrollOut({
    cssProps: {
        viewportY: true,
        visibleY: true,
    }
});


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