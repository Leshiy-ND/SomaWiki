const Lang = { EN: "en", RU: "ru" };
var language;



function showLocalStorage() {
    document.getElementById("popup-local-storage-holder").style.display = "flex";
}
function closeLocalStorage() {
    document.getElementById("popup-local-storage-holder").style.display = "none";
}
function cleanLocalStorage() {
    localStorage.removeItem("SomaWiki:visits");
    localStorage.removeItem("SomaWiki:lastVisit");
    localStorage.removeItem("SomaWiki:warning");
    updateLocalStorage();
}



function updateLocalStorage() {
    var today = new Date(); {
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var date = today.getDate();
        if (month < 10) { month = "0" + month; }
        if (date < 10)  { date  = "0" + date;  }

        today = year + '/' + month + '/' + date;
    }

    var visits    = localStorage.getItem('SomaWiki:visits');
    var lastVisit = localStorage.getItem('SomaWiki:lastVisit');
    var warning   = localStorage.getItem('SomaWiki:warning');
    switch (language) {
        case Lang.RU:
            if (lastVisit == today) { lastVisit = "сегодня :)" }
            if (warning == 'n') { warning = "нет" } else { warning = "да" }
            break;
        case Lang.EN:
            if (lastVisit == today) { lastVisit = "today :)" }
            if (warning == 'n') { warning = "no" } else { warning = "yes" }
            break;  
    }

    var lsPanel = document.getElementById("popup-local-storage-panel");

    var textLS, textVisits, textLast;
    switch (language) {
        case Lang.RU:
            textLS      = "ЛОКАЛЬНОЕ ХРАНИЛИЩЕ";
            textVisits  = "Посещений";
            textLast    = "Последний визит";
            textWarning = "Предупреждение о спойлерах";
            break;
        case Lang.EN:
            textLS      = "LOCAL STORAGE";
            textVisits  = "Visits";
            textLast    = "Last visit";
            textWarning = "Spoiler warning";
            break;  
    }
    lsPanel.innerHTML =    `<h2 style="text-align: center; margin-top: 0">` + textLS + `</h2>
                            <p>
                                <b>` + textVisits  + `</b>: ` + visits    + `<br/>
                                <b>` + textLast    + `</b>: ` + lastVisit + `<br/>
                                <b>` + textWarning + `</b>: ` + warning   + `
                            </p>`;
    var buttonClose = document.createElement("div");
    buttonClose.className = "button-close";
    buttonClose.textContent = "❌";
    buttonClose.onclick = function() { closeLocalStorage() };
    lsPanel.appendChild(buttonClose);

    var buttonClean = document.createElement("div");
    if (lastVisit) buttonClean.className = "button-text";
    else           buttonClean.className = "button-text-disabled";
    switch (language) {
        case Lang.RU:
            buttonClean.textContent = "Очистить";
            break;
        case Lang.EN:
            buttonClean.textContent = "Clean";
            break;  
    }
    buttonClean.onclick = function() { cleanLocalStorage() };
    buttonClean.style.float = "right"
    lsPanel.appendChild(buttonClean);
}



document.addEventListener('DOMContentLoaded', function() {
    var currentPageUrl = window.location.href;
    switch (currentPageUrl.substring(currentPageUrl.lastIndexOf("/")).substring(1, 3))
    {
        case "ru": language = Lang.RU; break;
        default:   language = Lang.EN;
    }
    
    var scripts = document.getElementsByTagName("script"), src = scripts[scripts.length-1].src;
    var path_home = src.substring(0, src.lastIndexOf("/"));

    // v v v v v v v v v v v v v v v v HEADER v v v v v v v v v v v v v v v v

    var home = document.createElement('a');
    var translate = document.createElement('a');
    var showLS = document.createElement('a');

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
    home.style.marginRight = "auto";
    translate.textContent = '🌐';
    showLS.textContent = '⚙️';
    showLS.onclick = function() { showLocalStorage(); }
    showLS.style.cursor = "pointer"
    showLS.style.marginLeft = "1vh"

    var header = document.getElementById('universal-header');
    header.appendChild(home);
    header.appendChild(translate);
    header.appendChild(showLS);

    // v v v v v v v v v v v v v v v v LOCAL STORAGE v v v v v v v v v v v v v v v v

    // localStorage.clear();
    {
        var today = new Date(); {
            var year = today.getFullYear();
            var month = today.getMonth() + 1;
            var date = today.getDate();
            if (month < 10) { month = "0" + month; }
            if (date < 10)  { date  = "0" + date;  }

            today = year + '/' + month + '/' + date;
        }

        var visits    = localStorage.getItem('SomaWiki:visits');
        var lastVisit = localStorage.getItem('SomaWiki:lastVisit');
        if (!lastVisit) {
            localStorage.setItem('SomaWiki:visits', 1);
            localStorage.setItem('SomaWiki:lastVisit', today);
            localStorage.setItem('SomaWiki:warning', 'y');
        } else {
            localStorage.setItem('SomaWiki:visits', parseInt(visits) + 1);
        }

        var lsHolder = document.createElement('div');
        lsHolder.className = "popup-holder";
        lsHolder.id = "popup-local-storage-holder";
        header.appendChild(lsHolder);

        var lsPanel = document.createElement('div');
        lsPanel.className = "popup-panel";
        lsPanel.id = "popup-local-storage-panel";
        lsHolder.appendChild(lsPanel);

        updateLocalStorage();
    }

    // v v v v v v v v v v v v v v v v FOOTER v v v v v v v v v v v v v v v v

    var footer = document.getElementById('universal-footer');
    switch (language) {
        case Lang.RU:
            footer.innerHTML = 
                `Весь "сайт" - работа фаната. <br />
                <br />
                Все персонажи и прочее принадлежат Frictional Games. <br />
                <br />
                Купите и поиграйте в <a href="https://store.steampowered.com/app/282140/SOMA/">Soma</a>.`;
            break;
        case Lang.EN:
            footer.innerHTML = 
                `The whole "site" - work of lonely fan. <br />
                <br />
                All character and other stuff belongs to Frictional Games. <br />
                <br />
                Go buy and play <a href="https://store.steampowered.com/app/282140/SOMA/">Soma</a>.`;
            break;
    }
}); 
