const Lang = { EN: "en", RU: "ru" };

document.addEventListener('DOMContentLoaded', function() {
    var currentPageUrl = window.location.href;
    var language;
    switch (currentPageUrl.substring(currentPageUrl.lastIndexOf("/")).substring(1, 3))
    {
        case "ru": language = Lang.RU; break;
        default:   language = Lang.EN;
    }
    
    var scripts = document.getElementsByTagName("script"), src = scripts[scripts.length-1].src;
    var path_home = src.substring(0, src.lastIndexOf("/"));

    ////////

    var home = document.createElement('a');
    var translate = document.createElement('a');

    switch (language) {
        case Lang.RU:
            home.href = path_home + "/home/ru";
            translate.href = "./en";
            break;
        case Lang.EN:
            home.href = path_home + "/home/en";
            translate.href = "./ru";
            break;
    }
    home.textContent = 'Soma Wiki';
    translate.textContent = '🌐';

    var header = document.getElementById('universal-header');
    header.appendChild(home);
    header.appendChild(translate);

    ////////

    var footer = document.getElementById('universal-footer');
    switch (language) {
        case Lang.RU:
            footer.innerHTML = 
                `Весь "сайт" - работа фаната. <br />
                <br />
                Все персонажи и прочее принадлежат Frictional Games. <br />
                <br />
                Купите и поиграйте в <a href="https://store.steampowered.com/app/282140/SOMA/">Soma</a>.`
            ;
            break;
        case Lang.EN:
            footer.innerHTML = 
                `The whole "site" - work of lonely fan. <br />
                <br />
                All character and other stuff belongs to Frictional Games. <br />
                <br />
                Go buy and play <a href="https://store.steampowered.com/app/282140/SOMA/">Soma</a>.`
            ;
            break;
    }
}); 
