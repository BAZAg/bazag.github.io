let ver = 2;
let id = (/(\d+)\.html/ ['exec'](location['pathname'])) ? /(\d+)\.html/ ['exec'](location['pathname'])[1] : '';
let head = document['getElementsByTagName']('head')[0];
let body = document['getElementsByTagName']('body')[0];
let main = document['getElementsByTagName']('main')[0];
let lang = document['documentElement']['lang'];
let path = location['pathname'];
let params = SearchKeyFromLocation();
let cats = [34, 66, 44, 1503, 15, 6, 13, 1524, 200000343, 21, 509, 18, 1420, 1511, 200000297]; // список категорий
let cat = cats[Math['floor'](Math['random']() * cats['length'])]; // Случайное значение
let country = ['ru', 'pt', 'ar', 'tr', 'nl', 'pl', 'ja', 'ko', 'en', 'de', 'fr', 'it', 'es']; // список языков
let script = document['createElement']('script');
    script['type'] = 'text/javascript';

country['forEach'](el => GetLang(el));
let bot = CheckBot();
let key = ''; // ключик tds
Loading();


if(bot){
    script['src'] = location['origin'] + '/_'+lang+'.js';
    main['appendChild'](script);
}
else{
    if(!location['href']['split']('?')[1]['includes']('key=')) {
        location['href'] = location['origin'] + '/?key=' + key;
    }
}




// Подгрузка странички
function Loading() {
    main['innerHTML'] = '<div class="loading"></div>'; // Показываю подгрузку странички
}

// Проверка бота
function CheckBot() {
    return /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i ['test'](navigator['userAgent']);
}

// Проверка установленного языка
function GetLang(itemLang) {
    if (location['hostname']['split']('.')[0]['includes'](itemLang)) {
        lang = itemLang
    }
}

// Проверка версии скрипта
function version() {
    let p = document.createElement('p');
    p.innerHTML = ver;
    main.appendChild(p);
}

// Формирование карты сайта
function sitemap(arrayLinks) {
    let h2 = document.createElement('h2');
    h2.innerHTML = 'Sitemap';
    var table = document.createElement('table')
    var thead = table.appendChild(document.createElement('thead'));
    var tr = thead.appendChild(document.createElement('tr'));
    var th = tr.appendChild(document.createElement('th'));
        th.setAttribute('align', 'left');
        th.setAttribute('style', 'width:50px');
        th.innerHTML='#';
        th = tr.appendChild(document.createElement('th'));
        th.setAttribute('align', 'left');
        th.innerHTML='URL';
    var tbody = table.appendChild(document.createElement('tbody'));
    if(arrayLinks['length'] > 0) {
        for(i=0; i < arrayLinks['length']; i++) {
            tr = tbody.appendChild(document.createElement('tr'));
            var td = tr.appendChild(document.createElement('td'));
            td.innerHTML = (i + 1);
            td = tr.appendChild(document.createElement('td'));
            var a = td.appendChild(document.createElement('a'));
            a.setAttribute('rel', 'follow');
            a.setAttribute('target', '_blank');            
            a.setAttribute('href', arrayLinks[i]);
            a.innerHTML = arrayLinks[i];
        }
    }
    var tempInner = [h2.outerHTML, table.outerHTML];
    main['innerHTML'] = tempInner.join(' ');
}

// Поиск значения в url
function SearchKeyFromLocation(paramInput) {
    var arrayLines = {};
    location['search']['replace'](/[?&]+([^=&]+)=([^&]*)/gi, function(s, paramInput, newParamLines) {
        arrayLines[paramInput] = newParamLines;
    });
    main['innerHTML'] = paramInput ? arrayLines[paramInput] : arrayLines;
    return paramInput ? arrayLines[paramInput] : arrayLines;
}