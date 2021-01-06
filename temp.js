let ver = 3;
let head = document['getElementsByTagName']('head')[0];
let body = document['getElementsByTagName']('body')[0];
let main = document['getElementsByTagName']('main')[0];
let lang = document['documentElement']['lang'];
let path = location['pathname'];
console.log('path='+path);

let params = SearchKeyFromLocation();
let id = params['id']; //(/(\d+)\.html/ ['exec'](location['pathname'])) ? /(\d+)\.html/ ['exec'](location['pathname'])[1] : '';
console.log('id='+id);

let cats = [34, 66, 44, 1503, 15, 6, 13, 1524, 200000343, 21, 509, 18, 1420, 1511, 200000297]; // список категорий
let cat = cats[Math['floor'](Math['random']() * cats['length'])]; // Случайное значение
console.log('cat='+cat);
let country = ['ru', 'pt', 'ar', 'tr', 'nl', 'pl', 'ja', 'ko', 'en', 'de', 'fr', 'it', 'es']; // список языков
let script = document['createElement']('script');
    script['type'] = 'text/javascript';
let donor = 'https://project.nekaters.com';

country['forEach'](el => GetLang(el));
console.log('lang='+lang);

let bot = CheckBot();
console.log('bot='+bot);
let key = '+'; // ключик tds
Loading(); // Вывожу сообщение о загрузке данных
var timestamp = Date.now().toString().slice(0, -3);
console.log('timestamp='+timestamp);
// Проверяю кто пришел

if(id) {
    console.log('yes id!');
    if(bot){
        console.log('bot!');
        // подгружаю товар        
        script['src'] = location['origin'] + '/'+lang+'.js?'+timestamp; // id + lang
        main['appendChild'](script);
    }
    else {
        console.log('tds!');
        // подгружаю tds
        let check = params['key'];
        if(check != key) {
            console.log('stop tds!');
            location['href'] = location['origin'] + '/?key=' + key; // tds
        }
    }
}
else {
    console.log('no id!');
    if (path == '/') {
        console.log('path root');
        script['src'] = 'cats.js?'+timestamp;
        //script.innerHTML = 
        document['querySelector']('meta[name="robots"]')['content'] = 'noindex, follow';
        //script['src'] = donor +'/api/getProducts/?callback=search&category_ids=' + cat + '&target_language=' + lang;
        //location['origin'] + '/cats.js?'+timestamp; // id + lang
        main['appendChild'](script);
    }
    else{
        console.log('path NO root');
        if (params['id']) {
            console.log('yes id');
            location['href'] = location['origin'] + '/?id=' + params['id'];
        }
        else {
            console.log('no id');
            if (params['sitemap']) {
                console.log('yes sitemap');
                location['href'] = location['origin'] + 'sitemap_19.xml'; //(donor +'/sitemap/' + location['host'] + '/sitemap-' + params['sitemap'] + '.xml');
            }
            else {
                console.log('no sitemap');
                if(params['sitemap'] == 'product' || params['sitemap'] == 'top' || params['sitemap'] == 'products' || params['sitemap'] == 'sitemap'){
                    console.log('go sitemap');
                    script['src'] = 'sitemap.js' + timestamp; //donor + '/product/' + location['host'] + '/?callback=sitemap';
                    main['appendChild'](script);
                }
                else{
                    console.log('go 404');
                    Stop404();
                }
            }
        }
    }
}

// https://project.nekaters.com/sitemap/site.ru/sitemap.xml
// https://project.nekaters.com/sitemap/site.ru/sitemap-19.xml
// https://project.nekaters.com/product/site.web.app/?callback=search
// https://project.nekaters.com/assets/js/06-01-2021/firebase.js

// Подгрузка странички
function Loading() {
    main['innerHTML'] = '<div class="loading"></div>' + 'id='+ id + ' ver=' + ver; // Показываю подгрузку странички
}
function Stop404() {
    main['innerHTML'] = '<div>404 Not Found</div>'; // Показываю подгрузку странички
    document['querySelector']('meta[name="robots"]')['content'] = 'noindex, follow'
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

// Вывожу информацию о товаре
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


function MyCat(myJsonData) { 
    document['title'] = location['hostname'];
    let item = myJsonData['length'];
    if (!(item > 0)) {
        document['querySelector']('meta[name="robots"]')['content'] = 'noindex, follow';
        let h2 = document.createElement('h2'); // h2
        h2.setAttribute('class', 'center');
        h2.innerHTML = 'Products Not Found';
        main['innerHTML'] = h2.outerHTML;
    }
    else{
        main['innerHTML'] = '';
        myJsonData['forEach'](function(el, i){
           setTimeout(function(){
            MyDraw(el);
        }, 200 * ++i);
       });
    }


    function MyDraw(myJsonDataItem){
        // Сюда поместим item
        let main_el = main; // <main class="main"></main>

        // item будет содержать item-img и item-detail
        let div_root = document.createElement('div'); // <div class="item"></div>
        div_root.setAttribute('class', 'item');

        // item-img будет содержать только ссылку
        let div_first = document.createElement('div'); // <div class="item-img"></div>
        div_first.setAttribute('class', 'item-img');

        // item-detail будет содержать item-title, btn btn-buy, btn btn-cart
        let div_second = document.createElement('div'); // <div class="item-detail"></div>
        div_second.setAttribute('class', 'item-detail');


        let a_product = document.createElement('a'); // <a href="***" title="***"></a> для item-img
        a_product.setAttribute('title', myJsonDataItem['product_title']);
        a_product.setAttribute('href', location['origin'] +'?id='+ myJsonDataItem['product_id']);

        let img_product = document.createElement('img'); // <img src="***" title="***"></a>
        img_product.setAttribute('alt', myJsonDataItem['product_title']);
        img_product.setAttribute('src', myJsonDataItem['product_main_image_url']);

        let h3_product = document.createElement('h3'); // <h3 class="item-title"></h3>
        h3_product.setAttribute('title', 'item-title');

        let a_h3_product = document.createElement('a'); // <a href="***" title="***"></a>
        a_h3_product.setAttribute('title', 'item-detail');
        a_h3_product.setAttribute('href', location['origin'] +'?id='+ myJsonDataItem['product_id']);
        a_h3_product.innerHTML = myJsonDataItem['product_title'];

        let a_buy_product = document.createElement('a'); // <a class="btn btn-buy" href="***" title="***" target="_blank">
        a_buy_product.setAttribute('class', 'btn btn-buy');
        a_buy_product.setAttribute('href', location['origin'] +'?id='+ myJsonDataItem['product_id']);
        a_buy_product.setAttribute('title', myJsonDataItem['product_title']);
        a_buy_product.setAttribute('target', '_blank');
        a_buy_product.innerHTML = 'BUY NOW';

        let b_buy_product = document.createElement('b'); // <b class="btn btn-cart"></b>
        b_buy_product.setAttribute('title', 'btn btn-cart');
        b_buy_product.innerHTML = (myJsonDataItem['target_sale_price'] || myJsonDataItem['target_original_price']) + ' ' + myJsonDataItem['target_original_price_currency'];

        a_product.appendChild(img_product); 
        div_first.appendChild(a_product); 

        h3_product.appendChild(a_h3_product); 
        div_second.appendChild(h3_product); 
        div_second.appendChild(a_buy_product); 
        div_second.appendChild(b_buy_product); 

        div_root.appendChild(div_first); 
        div_root.appendChild(div_second); 
        main_el.appendChild(div_root); // add item

    }
}


