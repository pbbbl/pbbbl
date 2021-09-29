var page = {
    url: window.location.href,
    collection: null,
    item: null,
    items: {},
    collections: {},
    render: function(callback) {
        if (callback) {
            return callback(this);
        }
    }
};

// if (window.location.href.indexOf('dev=true') > -1) {

var pathArray = window.location.pathname.split('/');
var pageSlug = pathArray[pathArray.length - 1];



// }

function runPage(options, render) {
    var stored = window.localStorage.getItem(options.id) || false;
    if (!stored) {
        page = {
            ...page,
            ...options
        }
    } else {
        page = {
            ...page,
            ...stored,
            ...options
        }
    }
    if (render) {
        return render(page);
    }
    return page;
}

function addItem(data) {
    page.items[data.id] = page.item = {
        id: null,
        index: null,
        slug: null,
        name: null,
        cid: null,
        cslug: null,
        library: null,
        active: pageSlug === data.slug,
        voted: false,
        votes: 0,
        season: [null, null],
        score: null,
        fields: [],
        ...data
    }
    var pageSlug;
    if (window.location.href.indexOf('/') > -1) {
        pageSlug = window.location.href.split('/');
    } else {
        pageSlug = [''];
    }
    pageSlug = pageSlug[pageSlug.length - 1];
    if (pageSlug === page.items[data.id].slug) {
        page.item = page.items[data.id];
    }
    if (page.collection && page.collection.items) {
        page.collection.items.push(page.items[data.id]);
    }
}

function addCollection(data) {

    page.collections[data.cid] = {
        cid: null,
        slug: null,
        name: null,
        library: null,
        active: null,
        items: [],
        fields: [],
        ts: null,
        ...data
    };
    if (data.active) {
        page.collection = page.collections[data.cid];
    }
    return page.collections[data.cid];
}