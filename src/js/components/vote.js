var dbVotes = {};

if (window.location.href.indexOf('library/vote') > -1) {
    var voteItems = $('[data-render-vote]') || false;

    function votesInit() {
        voteItems.each(function() {
            const $this = $(`#${$(this).attr('id')}`);
            const itemID = $this.attr('data-id');
            if (!itemID) {
                return $this.remove();
            }
            var parentEl = $this.parents('.item-wrapper');

            parentEl.attr('id', `parent-${itemID}`);
            parentEl = $(`#parent-${itemID}`);
            const dataEl = $(`#parent-${itemID} .item-data`);
            const cardBodySelector = `#parent-${itemID} .data.card-body`;
            var dataCardBodyEl = $(cardBodySelector);
            var cardBody = dataCardBodyEl.html();
            var renderId = $this.attr('id');


            var item = {
                dbID: itemID,
                dbCID: 'items',
                itemID,
                cid: $this.attr('data-cid'),
                title: $this.attr('data-title'),
                slug: $this.attr('data-slug'),
                open: $this.attr('data-open'),
                opens: $this.attr('data-opens'),
                closes: $this.attr('data-closes'),
                cardBodySelector,
                votes: [],
                renderId
            }


            var html = buildVote({
                ...item,
                voted: false,
                voteCount: "-",
                enabled: true,
                loading: true,
                cardBody
            });
            dbVotes[itemID] = item;
            renderVote({ html, renderId });
            const votes = getVote(item, (dbItem) => {


                const cardBodySelector = dbItem.cardBodySelector;
                var dataCardBodyEl = $(cardBodySelector);
                var cardBody = dataCardBodyEl.html();
                var renderItem = {
                    ...dbItem,
                    loading: false,
                    voted: getUserVoted(dbItem.votes),
                    voteCount: getVoteCount(dbItem),
                    cardBody
                }
                renderItem.enabled = !renderItem.voted && renderItem.open == 'true';

                var html = buildVote(renderItem);
                dbVotes[itemID] = dbItem;

                return renderVote({ html, renderId: item.renderId });
            });
        });
    }
    votesInit();

}

function renderVote({ html, renderId }) {


    $('#' + renderId).html(html);

}

function dbVoteAction(el) {

    const itemID = el.dataset.target;
    const item = dbVotes[itemID];
    const cardBodySelector = item.cardBodySelector;
    var dataCardBodyEl = $(cardBodySelector);
    var cardBody = dataCardBodyEl.html();
    const renderItem = {
        ...item,
        enabled: true,
        loading: true,
        voted: false,
        voteCount: getVoteCount(item),
        cardBody
    }
    const html = buildVote(renderItem);
    renderVote({ html, renderId: item.renderId });
    runVote(item);
}

function buildVote(item) {

    item.cardBody = item.cardBody.replace('<p>', '').replace('</p>', '');
    const html = `<div data-req-path="/library/vote" class="card-item vote ${item.loading ? 'loading' : 'not-loading'} ${item.enabled ? 'enabled' : 'disabled'}" id="rendered-vote-${item.itemID}">
        <div class="card-item-row">
            <div class="card-item-body">
                <h4 class="card-title">${item.title}</h4>
                <p class="card-body small">${item.cardBody}</p>
                <div class="pt-20 vote-learn-more">
                    <a href="/learn/${item.slug}" class="button small primary-flat w-inline-block">
                        <div>Learn more</div>
                        <div class="sr">&nbsp;about&nbsp;</div>
                        <div class="sr">${item.title}</div>
                    </a>
                </div>
            </div>
            <div class="db-action-wrapper">
                <${item.enabled ? 'button type="button"' : 'div'} class="db-action" aria-label="${item.enabled ? 'Vote now! (Total votes: ' + item.voteCount + ')' : 'You voted already. (Total Votes: ' + item.voteCount + ')'}" onClick="${item.enabled ? 'dbVoteAction(this)' : ''}" data-target="${item.itemID}"id="db-action-${item.itemID}">
                    <div class="action-icon-wrapper" style="position:relative" aria-hidden="true">
                        <div class="action-icon if-enabled"></div>
                        <div class="action-icon if-loading spinner"></div>
                    </div>
                    <div class="action-text"><span class="sr">Total votes: </span>${item.voteCount}</div>
                </${item.enabled ? 'button' : 'div'}>
            </div>
        </div>
    </div>`;
    return html;
}

function getVoteCount(vote) {
    var total;
    var votes = vote.votes || false;
    if (!votes || !votes.length || votes.length < 1) {
        total = 0;
    } else {
        total = votes.length;
        if (total > 999) {
            total = total.toString();
            total = total.subString(0, 2) + 'k';
        }
        total = total.toString();

    }
    return total;
}

function getUserVoted(array) {
    var uid = auth.uid || false;
    if (!array || !uid || !array.length || array.length < 0) {
        return false;
    }
    var voted = array.filter(function(vote) {
        return vote == auth.uid;
    })[0] || false;
    if (voted) {
        return true;
    } else {
        return false;
    }
}


function runVote(item) {
    const data = {
        ...item,
        uid: auth.uid
    };
    if (data.open != 'true' || getUserVoted(item) != false) {
        return;
    }


    var settings = {
        "url": "https://us-central1-skill-flow.cloudfunctions.net/vote",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(data)
    };
    $.ajax(settings);
}

function addVoteItem(item) {
    const data = {
        ...item,
        uid: auth.uid
    }

    var settings = {
        "url": "https://us-central1-skill-flow.cloudfunctions.net/addItem",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(data)
    };
    return $.ajax(settings);
}

function setItem(item) {
    const data = {
        ...item,
        uid: auth.uid
    }

    var settings = {
        "url": "https://us-central1-skill-flow.cloudfunctions.net/setDBItem",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(data)
    };
    return $.ajax(settings);
}

function getVote(item, callback) {

    var ref = db.collection(item.dbCID).doc(item.itemID);
    var dbItem = ref.onSnapshot(function(doc) {
        var data = doc.exists ? doc.data() : false;
        if (!data) {
            addVoteItem(item);
            // data = ref.get().then(function(newData) {
            //     return newData.data();
            // });
        }
        if (data && callback) {
            var needsUpdate = false;
            for (var key in data) {
                if (data[key] != item[key] && typeof data[key] == 'string') {
                    needsUpdate = true;
                    if (needsUpdate) {
                        setItem({
                            dbID: data.dbID,
                            dbCID: data.dbCID,
                            itemID: item.dbID,
                            cid: item.cid,
                            title: item.title,
                            slug: item.slug,
                            open: item.open,
                            opens: item.opens,
                            closes: item.closes,
                            cardBodySelector: item.cardBodySelector,
                            votes: data.votes,
                            renderId: item.renderId
                        });
                    }

                }
            }

            return callback(data);
        }
        return data;
    });
    return dbItem;
}

function defaultVote(itemId, library) {
    return {
        dbID: itemId,
        library: library,
        votes: [],
        scores: [],
        season: {
            start: null,
            end: null
        }
    }
}