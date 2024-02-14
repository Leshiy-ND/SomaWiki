const Lang = { EN: "en", RU: "ru" };
var language;



document.addEventListener('DOMContentLoaded', function() {
    var scripts = document.getElementsByTagName("script"), src = scripts[scripts.length-1].src;
    var base    = document.createElement("base");
    base.href   = src.substring(0, src.lastIndexOf("/")) + "/../";
    document.head.appendChild(base);

    var favicon  = document.createElement("link");
    favicon.rel  = "icon";
    favicon.type = "image/x-icon";
    favicon.href = "src/Images/favicon.png"
    document.head.appendChild(favicon);
    
    var currentPageUrl = window.location.href;
    switch (currentPageUrl.substring(currentPageUrl.lastIndexOf("/")).substring(1, 3))
    {
        case "ru": language = Lang.RU; break;
        default:   language = Lang.EN;
    }

    var scripts = [
        "popups",
        "hnf",
        "pageChecking",
        "storyChoices"
    ];

    for (var scriptName of scripts) {
        var scriptElement = document.createElement("script");
        scriptElement.id  = "script_"  + scriptName;
        scriptElement.src = "scripts/" + scriptName + ".js";

        document.head.appendChild(scriptElement);
    }
});