const Lang = { EN: "en", RU: "ru" };
var language;



function showLocalStorage() {
    document.getElementById("popup-local-storage-holder").style.display = "flex";
}
function closeLocalStorage() {
    document.getElementById("popup-local-storage-holder").style.display = "none";
}
function cleanLocalStorage() {
    localStorage.removeItem("SomaWiki:visitFirst");
    localStorage.removeItem("SomaWiki:visitLast");
    localStorage.removeItem("SomaWiki:visits");
    localStorage.removeItem("SomaWiki:warning");
    updateLocalStorage();
}



function getToday() {
    var today = new Date();

    var year  = today.getFullYear();
    var month = today.getMonth() + 1;
    var date  = today.getDate();
    if (month < 10) month = "0" + month;
    if (date < 10)  date  = "0" + date;

    return year + '/' + month + '/' + date;
}

function updateLocalStorage() {
    var today = getToday();

    var visitFirst = localStorage.getItem( "SomaWiki:visitFirst" );
    var visitPrev  = localStorage.getItem( "SomaWiki:visitPrev"  );
    var visitLast  = localStorage.getItem( "SomaWiki:visitLast"  );
    var visits     = localStorage.getItem( "SomaWiki:visits"     );
    var warning    = localStorage.getItem( "SomaWiki:warning"    );

    var textToday, textYes, textNo;
    switch (language) {
        case Lang.RU:
            textToday = "сегодня";
            textYes   = "да";
            textNo    = "нет";
            break;
        case Lang.EN:
            textToday = "today";
            textYes   = "yes";
            textNo    = "no";
            break;  
    }
    if (visitFirst == today) {
        visitFirst = textToday + " :)";
        visitPrev = "-"
    }
    warning = (warning == 'n') ? textNo : textYes;

    var lsPanel = document.getElementById("popup-local-storage-panel");

    var textLS, textFirst, textPrev, textVisits, textWarning;
    switch (language) {
        case Lang.RU:
            textLS      = "ЛОКАЛЬНОЕ ХРАНИЛИЩЕ";
            textFirst   = "Первый визит";
            textPrev    = "Прошлый визит";
            textVisits  = "Посещений";
            textWarning = "Предупреждение о спойлерах";
            break;
        case Lang.EN:
            textLS      = "LOCAL STORAGE";
            textFirst   = "First visit";
            textPrev    = "Previous visit";
            textVisits  = "Visits";
            textWarning = "Spoiler warning";
            break;  
    }
    lsPanel.innerHTML =    `<h2 style="text-align: center; margin-top: 0">` + textLS + `</h2>
                            <p>
                                <b>` + textFirst   + `</b>: ` + visitFirst + `<br/>
                                <b>` + textPrev    + `</b>: ` + visitPrev  + `<br/>
                                <b>` + textVisits  + `</b>: ` + visits     + `<br/>
                                <b>` + textWarning + `</b>: ` + warning    + `
                            </p>`;
    var buttonClose = document.createElement("div");
    buttonClose.className = "button-close";
    buttonClose.textContent = "❌";
    buttonClose.onclick = function() { closeLocalStorage() };
    lsPanel.appendChild(buttonClose);

    var buttonClean = document.createElement("div");
    if (visitLast) buttonClean.className = "button-text";
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

    var home      = document.createElement('a');
    var translate = document.createElement('a');
    var showLS    = document.createElement('div');

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
    translate.style.textDecoration = "none"

    showLS.textContent = '⚙️';
    showLS.onclick = function() { showLocalStorage(); }
    showLS.style.cursor = "pointer"
    showLS.style.fontSize = "inherit"
    showLS.style.marginLeft = "1vh"

    var header = document.getElementById('universal-header');
    header.appendChild(home);
    header.appendChild(translate);
    header.appendChild(showLS);

    // v v v v v v v v v v v v v v v v LOCAL STORAGE v v v v v v v v v v v v v v v v

    // localStorage.clear();
    var shouldShowWarning;
    {
        var today = getToday();

        var visitFirst = localStorage.getItem("SomaWiki:visitFirst");

        if (!visitFirst) /* if there's no record of fisrt visit / if this one is the first */ {
            localStorage.setItem( "SomaWiki:visitFirst", today );
            localStorage.setItem( "SomaWiki:visitPrev",  today );
            localStorage.setItem( "SomaWiki:visitLast",  today );
            localStorage.setItem( "SomaWiki:visits",     1     );
            localStorage.setItem( "SomaWiki:warning",    'y'   );
            shouldShowWarning = true;
        } else {
            var visitLast = localStorage.getItem("SomaWiki:visitLast")

            if (visitLast == today) {
                shouldShowWarning = false;
            } else {
                var visits  = localStorage.getItem( "SomaWiki:visits"  );
                var warning = localStorage.getItem( "SomaWiki:warning" );
                shouldShowWarning = (warning == 'y');

                localStorage.setItem( "SomaWiki:visits",    parseInt(visits) + 1 );
                localStorage.setItem( "SomaWiki:visitPrev", visitLast            );
                localStorage.setItem( "SomaWiki:visitLast", today                );
            }
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
