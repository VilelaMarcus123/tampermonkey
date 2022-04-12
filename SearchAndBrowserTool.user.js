// ==UserScript==
// @name         Search and Browser Tool
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.backcountry.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.localhost
// @grant        none
// ==/UserScript==


// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js

var constructorTokenSite = {
    bcs: {
        integration: "key_yXDrAABgyB4WdrAd",
        pqa: "key_JAYzlQXbHFfPLUIE",
        production: "key_ThZDupSK87zBwmZ8",
        production_preview: "key_bgxAp7V3ccnjupIR"
    },
    competitivecyclist: {
        integration: "key_sozAPdgXUOTDcg5D",
        pqa: "key_KYCFgAMlTG0ZsyT9",
        production: "key_oqXsomOIKrdKxapy",
        production_preview: "key_D5UWGIdLq5sRfnJO"
    },
    steepcheap: {
        integration: "key_pHAoV62gN10PMy5k",
        pqa: "key_hy4lI2Z49cdbrbnU",
        production: "key_dzaWufzGHFhnezlT",
        production_preview: "key_MUk85YAoMXKfqmeW"
    }
}

var getConstructorUrl = () => {
    var brand = JSON.parse(document.getElementById('__NEXT_DATA__').innerHTML).props.pageProps.brandId;
    var category = JSON.parse(document.getElementById('__NEXT_DATA__').innerHTML).props.pageProps.categoryId;
    var ruleCategory = JSON.parse(document.getElementById('__NEXT_DATA__').innerHTML).props.pageProps.ruleCategoryId;
    var pageType = JSON.parse(document.getElementById('__NEXT_DATA__').innerHTML).props.pageProps.type;
    var siteKeyParam = getSiteKeyParam();
    var constructorUrl = 'https://app.constructor.io/dashboard/';
    var searchandizeUrl = 'searchandizing/';
    var interactUrl = 'interact';
    var url = '';

    switch(pageType) {
        case 'search':
            url = searchandizeUrl + 'dynamic/' + JSON.parse(document.getElementById('__NEXT_DATA__').innerHTML).query.q.replaceAll(/(“|”)/g, '') + '?';
            break;
        case 'plp-cat':
            url = searchandizeUrl + 'browse/group_id/' + category + '?';
            break;
        case 'rule':
            url = searchandizeUrl + 'collections/' + ruleCategory + '?';
            break;
        case 'brand':
            url = interactUrl + '?category=' + category + '&f.Brand=["' + brand + '"]&';
            break;
        case 'plp-brand':
            url = searchandizeUrl + 'browse/Brand/' + brand + '?';
            break;
    }
    return constructorUrl + url + siteKeyParam;
}

var getSiteKeyParam = () => {
    var regex = new RegExp('.' + JSON.parse(document.getElementById('__NEXT_DATA__').innerHTML).props.pageProps.config.site.domain + '(\\S*)');
    var env = window.location.href
        .replace('https://', '')
        .replace(regex, '')
        .replace('www.', '');
    var envKey;

    switch (env) {
        case 'dev':
        case 'integration':
            envKey = 'integration';
            break;
        case 'pqa':
            envKey = 'pqa';
            break;
        case 'preview':
            envKey = 'production_preview';
            break;
        default:
            envKey = 'production';
            break;
    }

    return 'index_key=' + constructorTokenSite[JSON.parse(document.getElementById('__NEXT_DATA__').innerHTML).props.pageProps.config.site.code][envKey];
}

(function() {
    'use strict';

    // Your code here...

    console.log("Product Ids:");
    JSON.parse(document.getElementById('__NEXT_DATA__').innerHTML).props.pageProps.plpData.products.forEach(({id}) => console.log(id));
    console.log("Constructor URL:");
    var constructorUrl = getConstructorUrl()
    console.log(constructorUrl);
})();


