// v v v v v v v v v v v v v v v v HEADER v v v v v v v v v v v v v v v v

var home      = document.createElement('a');
var translate = document.createElement('a');
var showLS    = document.createElement('div');

var currentPageUrl = window.location.href;
translate.href = currentPageUrl.substring(0, currentPageUrl.lastIndexOf("/"));
switch (language) {
    case Lang.RU:
        home.href      = "home/ru"; // Put ".html" for local use and revove before push
        translate.href +=    "/en"; // Put ".html" for local use and revove before push
        break;
    case Lang.EN:
        home.href      = "home/en"; // Put ".html" for local use and revove before push
        translate.href +=    "/ru"; // Put ".html" for local use and revove before push
        break;  
}
home.textContent       = 'Soma Wiki';
home.style.marginRight = "auto";

translate.textContent   = '🌐';
showLS.textContent      = '⚙️';
showLS.style.cursor     = "pointer"
showLS.style.fontSize   = "inherit"
showLS.style.marginLeft = "1vh"
showLS.onclick = function() { showLocalStorage(); }

var header = document.getElementById('universal-header');
header.appendChild(home);
header.appendChild(translate);
header.appendChild(showLS);

// v v v v v v v v v v v v v v v v FOOTER v v v v v v v v v v v v v v v v

var footer = document.getElementById('universal-footer');
switch (language) {
    case Lang.RU:
        footer.innerHTML = 
            `Весь "сайт" - работа фаната. <br/>
            <br/>
            Все персонажи и прочее принадлежат Frictional Games. <br/>
            <br/>
            Купите и поиграйте в <a href="https://store.steampowered.com/app/282140/SOMA/">Soma</a>.`;
        
    case Lang.EN:
        footer.innerHTML = 
            `The whole "site" - work of lonely fan. <br/>
            <br/>
            All character and other stuff belongs to Frictional Games. <br/>
            <br/>
            Go buy and play <a href="https://store.steampowered.com/app/282140/SOMA/">Soma</a>.`;
        break;
}