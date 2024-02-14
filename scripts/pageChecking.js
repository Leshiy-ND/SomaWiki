var existentPages = [
    {
        "name": "Places",
        "folders": [
            {
                "name": "Simons_Apartment",
                "folders": []
            }
        ]
    },
    {
        "name": "Characters",
        "folders": [
            {
                "name": "Ashley_Hall",
                "folders": [],
                "files": [
                    "en.html",
                    "ru.html"
                ]
            },
            {
                "name": "Simon_Jarett",
                "folders": [],
                "files": [
                    "en.html",
                    "ru.html"
                ]
            },
            {
                "name": "Chris",
                "folders": [],
                "files": [
                    "en.html",
                    "ru.html"
                ]
            },
            {
                "name": "Simons_mom",
                "folders": [],
                "files": [
                    "ru.html"
                ]
            },
            {
                "name": "Catherine_Chun",
                "folders": [],
                "files": [
                    "ru.html"
                ]
            },
            {
                "name": "Simon_Jarett_II",
                "folders": [],
                "files": [
                    "en.html",
                    "ru.html"
                ]
            },
            {
                "name": "David_Munshi",
                "folders": [],
                "files": [
                    "ru.html"
                ]
            },
            {
                "name": "James_G",
                "folders": [],
                "files": [
                    "en.html",
                    "ru.html"
                ]
            },
            {
                "name": "Jesse",
                "folders": [],
                "files": [
                    "en.html",
                    "ru.html"
                ]
            },
            {
                "name": "Wei",
                "folders": [],
                "files": [
                    "ru.html"
                ]
            },
            {
                "name": "Paul_Berg",
                "folders": [],
                "files": [
                    "ru.html"
                ]
            },
            {
                "name": "Jon_Ribon",
                "folders": [],
                "files": [
                    "ru.html"
                ]
            },
            {
                "name": "Steve",
                "folders": [],
                "files": [
                    "en.html",
                    "ru.html"
                ]
            },
            {
                "name": "Matt",
                "folders": [],
                "files": [
                    "en.html",
                    "ru.html"
                ]
            },
            {
                "name": "Robyn_McConnell",
                "folders": [],
                "files": [
                    "ru.html"
                ]
            },
            {
                "name": "Erin_Peake",
                "folders": [],
                "files": [
                    "ru.html"
                ]
            },
            {
                "name": "Sally_R",
                "folders": [],
                "files": [
                    "en.html",
                    "ru.html"
                ]
            }
        ]
    }
];



function pageExists(pagePath) {
    const slash        = pagePath.indexOf("/");
    const pageCategory = pagePath.substring(0, slash);
    const pageName     = pagePath.substring(slash + 1);

    for (var category of existentPages) {
        if (category.name != pageCategory) continue;

        for (var page of category.folders) {
            if (page.name != pageName) continue;

            if (page.files.includes(language + ".html")) return true;
        }
    }

    return false;
}



console.log(existentPages);

document.querySelectorAll("[hpage]").forEach(pageRef => {
    const pagePath = pageRef.getAttribute("hpage")
    pageRef.removeAttribute("hpage");

    if (pageExists(pagePath)) {
        pageRef.className = "hpage";
        pageRef.href      = "Pages/" + pagePath + "/" + language + ""; // Put ".html" for local use and revove before push
    } else {
        pageRef.className = "hpage-404";
    }
});