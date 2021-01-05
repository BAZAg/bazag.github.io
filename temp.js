main = document['getElementsByTagName']('main')[0];

function sitemap(arrayLinks) {
    let h2 = document.createElement('h2');
    h2.innerHTML = 'Sitemap';
    var table = document.createElement('table')
    var thead = table.appendChild(document.createElement('thead'));
    var tr = thead.appendChild(document.createElement('tr'));
    var th = tr.appendChild(document.createElement('th'));
        th.setAttribute('align', 'left');
        th.setAttribute('style', 'width:50px');
        th.text='#';
        th = tr.appendChild(document.createElement('th'));
        th.setAttribute('align', 'left');
        th.text='URL';
    var tbody = table.appendChild(document.createElement('tbody'));
    if(arrayLinks['length'] > 0) {
        for(i=0; i < arrayLinks['length']; i++) {
            tr = tbody.appendChild(document.createElement('tr'));
            var td = tr.appendChild(document.createElement('td'));
            td.innerHTML = (i + 1);
            td = tr.appendChild(document.createElement('td'));
            var a = td.appendChild(document.createElement('a'));
            a.setAttribute('rel', 'follow');
            a.setAttribute('href', arrayLinks[i]);
            a.innerHTML = arrayLinks[i];
        }
    }
    var tempInner = [h2.innerHTML, table.innerHTML];
    main['innerHTML'] = tempInner.join(' ');
}

// Поиск значения в url
function SearchKeyFromLocation(paramInput) {
    var arrayLines = {};
    location['search']['replace'](/[?&]+([^=&]+)=([^&]*)/gi, function(s, paramInput, newParamLines) {
        arrayLines[paramInput] = newParamLines;
    });
    return paramInput ? arrayLines[paramInput] : arrayLines
}