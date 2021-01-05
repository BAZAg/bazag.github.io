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
    var timestamp = Date.now().toString().slice(0, -3);
    script['src'] = location['origin'] + '/'+lang+'.js?'+timestamp;
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


function MyCard(myJsonData) { 
    if (myJsonData['product_id']) {
        document['title'] = myJsonData['title'];
        document['querySelector']('meta[name="description"]')['content'] = myJsonData['title'];
        document['querySelector']('meta[name="keywords"]')['content'] = myJsonData['title'];
        document['querySelector']('meta[name="twitter:image"]')['content'] = myJsonData['product_main_image_url']['replace']('_350x350.jpg', '');
        document['querySelector']('meta[name="twitter:title"]')['content'] = myJsonData['title'];
        document['querySelector']('meta[name="twitter:description"]')['content'] = myJsonData['title'];
        document['querySelector']('meta[name="twitter:url"]')['content'] = location['href'];
        document['querySelector']('meta[property="og:title"]')['content'] = myJsonData['title'];
        document['querySelector']('meta[property="og:description"]')['content'] = myJsonData['title'];
        document['querySelector']('meta[property="og:image"]')['content'] = myJsonData['product_main_image_url']['replace']('_350x350.jpg', '');
        document['querySelector']('meta[property="og:url"]')['content'] = location['href'];
        document['querySelector']('meta[property="og:site_name"]')['content'] = document['domain'];
        document['querySelector']('meta[property="product:price:amount"]')['content'] = (myJsonData['target_sale_price'] || myJsonData['target_original_price']);
        document['querySelector']('meta[property="product:price:currency"]')['content'] = myJsonData['target_original_price_currency'];

        let thumbnail = document.createElement('div');
         thumbnail.setAttribute('class', 'thumbnail');

        myJsonData['product_small_image_urls']['string']['forEach'](function (elImgUrl) {
            let myImg = document.createElement('div');
            myImg.setAttribute('class', 'img');
            let myImgData = document.createElement('img');
            myImgData.setAttribute('src', elImgUrl);
            myImgData.setAttribute('alt', myJsonData['title']);
            myImg.appendChild(myImgData);
            thumbnail.appendChild(myImg);
        });
        let h1 = document.createElement('h1'); // h1
        h1.setAttribute('class', 'title');
        let ah1 = document.createElement('a'); // ссылка в h1
        ah1.setAttribute('href', myJsonData['noindex']);
        ah1.setAttribute('title', myJsonData['title']);
        ah1.innerHTML = myJsonData['title'];
        h1.appendChild(ah1);

        let divh1 = document.createElement('div'); // h1
        divh1.setAttribute('class', 'image');

        let imgh1 = document.createElement('img');
        imgh1.setAttribute('src', myJsonData['product_main_image_url']['replace']('_350x350.jpg', ''));
        imgh1.setAttribute('alt', myJsonData['title']);
        divh1.appendChild(imgh1);

        let detail = document.createElement('div'); // h1
        detail.setAttribute('class', 'center detail');

        let discount = document.createElement('div'); // h1
        discount.setAttribute('class', 'discount');
        discount.innerHTML = myJsonData['title']['split']('-')[0];
        detail.appendChild(discount);

        let saleprice = document.createElement('span'); // h1
        saleprice.setAttribute('class', 'saleprice');

        saleprice.innerHTML = myJsonData['target_sale_price'] + ' ' + myJsonData['target_original_price_currency'];
        let originalprice = document.createElement('span'); // h1
        originalprice.setAttribute('class', 'originalprice');
        originalprice.innerHTML = myJsonData['target_original_price'] + ' ' + myJsonData['target_original_price_currency'];
        let saleprice1 = document.createElement('span'); // h1
        saleprice1.setAttribute('class', 'saleprice');
        saleprice1.innerHTML = myJsonData['target_original_price'] + ' ' + myJsonData['target_original_price_currency'];

        let divsale = document.createElement('div'); // h1
        if(myJsonData['target_sale_price']) {
            divsale.appendChild(saleprice);
            divsale.appendChild(originalprice);
        }
        else{
            divsale.appendChild(saleprice1);
        }
        detail.appendChild(divsale);

        let button_buy = document.createElement('a'); // ссылка в h1
        button_buy.setAttribute('href', '#');
        button_buy.setAttribute('class', 'btn btn-buy');
        button_buy.setAttribute('target', '_blank');
        button_buy.setAttribute('title', 'BUY NOW');
        button_buy.innerHTML = 'BUY NOW';

        let button_cart = document.createElement('a'); // ссылка в h1
        button_cart.setAttribute('href', '#');
        button_cart.setAttribute('class', 'btn btn-cart');
        button_cart.setAttribute('target', '_blank');
        button_cart.setAttribute('title', 'ADD TO CART');
        button_cart.innerHTML = 'ADD TO CART';

        let divsource = document.createElement('div'); // h1
        divsource.setAttribute('class', 'source');
        divsource.innerHTML = 'from SHop';
        detail.appendChild(button_buy);
        detail.appendChild(button_cart);
        detail.appendChild(divsource);

        let psource = document.createElement('p'); // h1
        psource.setAttribute('class', 'center');
        psource.innerHTML = myJsonData['product_title'];

        let sss = [h1.outerHTML , divh1.outerHTML , thumbnail.outerHTML , detail.outerHTML , psource.outerHTML];

        main['innerHTML'] = sss.join(' ');

        let schema = { 
          '@context': 'https://schema.org/',
          '@type': 'Product',
          'name': myJsonData['title'],
          'image': myJsonData['product_small_image_urls']['string'],
          'description': myJsonData['title'],
          'sku': myJsonData['product_id'],
          'aggregateRating': {
              '@type': 'AggregateRating',
              'ratingValue': myJsonData['evaluate_score'],
              'reviewCount': myJsonData['volume']
            },
            'offers': { 
                '@type': 'Offer',
                'url': location['href'],
                'priceCurrency': myJsonData['target_original_price_currency'],
                'price': (myJsonData['target_sale_price'] || myJsonData['target_original_price']),
                'priceValidUntil': myJsonData['valid_time'],
                'availability': 'https://schema.org/InStock',
                'seller': { 
                    '@type': 'Organization',
                    'name': myJsonData['first_level_category_name']
                }
            } 
        };
        let script_draw = document['createElement']('script');
        script_draw['type'] = 'application/ld+json';
        script_draw['text'] = JSON['stringify'](schema);
        head['appendChild'](script_draw);
    }
    else { 
        document['querySelector']('meta[name="robots"]')['content'] = 'noindex, follow';
        let h2 = document.createElement('h2'); // h1
        h2.setAttribute('class', 'center');
        h2.innerHTML = 'Product Not Found';
        main['innerHTML'] = h2.outerHTML;
    }
}