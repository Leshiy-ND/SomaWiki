function showLocalStorage() {
    document.getElementById("popup-local-storage-holder").style.display = "flex";
}
function closeLocalStorage() {
    document.getElementById("popup-local-storage-holder").style.display = "none";
}
function cleanLocalStorage() {
    localStorage.removeItem( "SomaWiki:visitFirst"    );
    localStorage.removeItem( "SomaWiki:visitPrev"     );
    localStorage.removeItem( "SomaWiki:visitLast"     );
    localStorage.removeItem( "SomaWiki:visits"        );
    localStorage.removeItem( "SomaWiki:warning"       );
    localStorage.removeItem( "SomaWiki:warningClosed" );
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

    var visitFirst    = localStorage.getItem( "SomaWiki:visitFirst"    );
    var visitPrev     = localStorage.getItem( "SomaWiki:visitPrev"     );
    var visitLast     = localStorage.getItem( "SomaWiki:visitLast"     );
    var visits        = localStorage.getItem( "SomaWiki:visits"        );
    var warning       = localStorage.getItem( "SomaWiki:warning"       );

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

    var textLS, textFirst, textPrev, textVisits, textWarning, textClean;
    switch (language) {
        case Lang.RU:
            textLS      = "ЛОКАЛЬНОЕ ХРАНИЛИЩЕ";
            textFirst   = "Первый визит";
            textPrev    = "Прошлый визит";
            textVisits  = "Посещений";
            textWarning = "Предупреждение о спойлерах";
            textClean   = "Очистить";
            break;
        case Lang.EN:
            textLS      = "LOCAL STORAGE";
            textFirst   = "First visit";
            textPrev    = "Previous visit";
            textVisits  = "Visits";
            textWarning = "Spoiler warning";
            textClean   = "Clean";
            break;  
    }
    lsPanel.innerHTML =    `<h2 style="text-align: center; margin-top: 0">` + textLS + `</h2>
                            <p>
                                <b>` + textFirst   + `</b>: ` + visitFirst + `<br/>
                                <b>` + textPrev    + `</b>: ` + visitPrev  + `<br/>
                                <b>` + textVisits  + `</b>: ` + visits     + `<br/>
                                <b>` + textWarning + `</b>: ` + warning    + `
                            </p>`;

    var buttonClose         = document.createElement("div");
    buttonClose.textContent = "❌";
    buttonClose.className   = "button-close";
    buttonClose.onclick     = function() { closeLocalStorage() };
    lsPanel.appendChild(buttonClose);

    var buttonClean = document.createElement("div");
    if (visitLast) buttonClean.className = "button-text";
    else           buttonClean.className = "button-text-disabled";
    
    buttonClean.textContent = textClean;
    buttonClean.style.float = "right";
    buttonClean.onclick     = function() { cleanLocalStorage() };
    lsPanel.appendChild(buttonClean);
}

// v v v v v v v v v v v v v v v v LOCAL STORAGE v v v v v v v v v v v v v v v v

// localStorage.clear();
var shouldShowWarning;
{
    var today = getToday();

    var visitFirst = localStorage.getItem("SomaWiki:visitFirst");

    if (!visitFirst) /* if there's no record of fisrt visit / if this one is the first */ {
        localStorage.setItem( "SomaWiki:visitFirst",    today );
        localStorage.setItem( "SomaWiki:visitPrev",     today );
        localStorage.setItem( "SomaWiki:visitLast",     today );
        localStorage.setItem( "SomaWiki:visits",        1     );
        localStorage.setItem( "SomaWiki:warning",       'y'   );
        localStorage.setItem( "SomaWiki:warningClosed", 'n'   );
        shouldShowWarning = true;
    } else {
        var visitLast     = localStorage.getItem( "SomaWiki:visitLast"     );
        var warningClosed = localStorage.getItem( "SomaWiki:warningClosed" );

        if (visitLast == today) {
            shouldShowWarning = (warningClosed == 'n');
        } else {
            var visits  = localStorage.getItem( "SomaWiki:visits"  );
            var warning = localStorage.getItem( "SomaWiki:warning" );

            shouldShowWarning = (warning == 'y' && warningClosed == 'n');

            localStorage.setItem( "SomaWiki:visits",    parseInt(visits) + 1 );
            localStorage.setItem( "SomaWiki:visitPrev", visitLast            );
            localStorage.setItem( "SomaWiki:visitLast", today                );
        }
    }

    var lsHolder       = document.createElement('div');
    lsHolder.className = "popup-holder";
    lsHolder.id        = "popup-local-storage-holder";
    document.body.appendChild(lsHolder);

    var lsPanel       = document.createElement('div');
    lsPanel.className = "popup-panel";
    lsPanel.id        = "popup-local-storage-panel";
    lsHolder.appendChild(lsPanel);

    updateLocalStorage();
}

// v v v v v v v v v v v v v v v v SPOILER WARNING v v v v v v v v v v v v v v v v

if (shouldShowWarning) {
    function updateWarningText(lang) {
        var textHeader, textParagraph, textStop;
        switch (lang) {
            case Lang.RU:
                textHeader    = "! СПОЙЛЕРЫ !";
                textStop      = "Не показывать";
                textParagraph = `Это фанатская вики игры Soma (2015). <br/>
                                    Там есть пара моментов, которые вы могли бы пожелать испытать сами.`;
                break;
            case Lang.EN:
                textHeader    = "! SPOILERS !";
                textStop      = "Don't show";
                textParagraph = `This is fan-made wiki about Soma (2015). <br/>
                                    That game has some moments you could like to experiense firsthand.`;
                break;  
        }
        var elementHeader    = document.getElementById( "popup-spoiler-warning-header"    );
        var elementParagraph = document.getElementById( "popup-spoiler-warning-paragraph" );
        var elementStop      = document.getElementById( "popup-spoiler-warning-stop"      );
        elementHeader.textContent  = textHeader;
        elementStop.textContent    = textStop;
        elementParagraph.innerHTML = textParagraph;
    }

    var swHolder           = document.createElement('div');
    swHolder.className     = "popup-holder";
    swHolder.id            = "popup-spoiler-warning-holder";
    swHolder.style.display = "flex";
    document.body.appendChild(swHolder);

    var swPanel       = document.createElement('div');
    swPanel.className = "popup-panel";
    swPanel.id        = "popup-spoiler-warning-panel";
    swPanel.innerHTML = `<h1 id="popup-spoiler-warning-header"    style="text-align: center; margin-top: 0;"> </h1>
                            <p  id="popup-spoiler-warning-paragraph" style="text-align: center;"                 </p>`;
    swHolder.appendChild(swPanel);
    
    var buttonClose         = document.createElement("div");
    buttonClose.textContent = "❌";
    buttonClose.className   = "button-close";
    buttonClose.onclick     = function() {
        localStorage.setItem( "SomaWiki:warningClosed", 'y' );
        swHolder.remove();
    };

    var warningLanguage               = language;
    var buttonTranslate               = document.createElement('div');
    buttonTranslate.textContent       = '🌐';
    buttonTranslate.style.fontSize    = "4.5vh";
    buttonTranslate.style.float       = "left";
    buttonTranslate.style.cursor      = "pointer";
    buttonTranslate.style.marginRight = "1vh";
    buttonTranslate.onclick           = function() {
        switch (warningLanguage) {
            case Lang.RU: warningLanguage = Lang.EN; break;
            case Lang.EN: warningLanguage = Lang.RU; break;  
        }
        updateWarningText(warningLanguage);
    };

    var buttonStop         = document.createElement("div");
    buttonStop.id          = "popup-spoiler-warning-stop";
    buttonStop.className   = "button-text";
    buttonStop.style.float = "right"
    buttonStop.onclick     = function() {
        localStorage.setItem( "SomaWiki:warning", 'n' );
        updateLocalStorage();
        buttonStop.className = "button-text-disabled";
    };

    swPanel.appendChild(buttonClose);
    swPanel.appendChild(buttonTranslate);
    swPanel.appendChild(buttonStop);

    updateWarningText(language);
}