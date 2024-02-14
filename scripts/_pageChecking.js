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