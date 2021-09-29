if (window.location.href.indexOf('library/vote') > -1) {
    // awaiting.push(function(data) {
    var votes = {};

    function runVote(item) {
        var settings = {
            "url": "https://us-central1-skill-flow.cloudfunctions.net/vote",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                uid: auth.user.id,
                docId: item.docId
            }),
        };
        $.ajax(settings);
    }

    function addVoteItem(item) {
        var settings = {
            "url": "https://us-central1-skill-flow.cloudfunctions.net/addItem",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                ...item,
                uid: auth.uid
            }),
        };
        return $.ajax(settings);
    }

    function getVote(dbCollectionId, itemId, library, callback) {
        var ref = db.collection(dbCollectionId).doc(itemId);
        var dbItem = ref.onSnapshot(function(doc) {
            var data = doc.data() || false;
            if (!doc || !data) {
                var defVote = defaultVote(itemId, library);
                addVoteItem(defVote);
                data = ref.get().then(function(newData) {
                    return newData.data();
                })
            }
            if (callback) {
                votes[itemId] = data;
                callback(votes[itemId]);
            }
            return data;
        });
        return dbItem;
    }

    function defaultVote(itemId, library) {
        return {
            docId: itemId,
            library: library,
            votes: [],
            scores: [],
            season: {
                start: null,
                end: null
            }
        }
    }

    function disableVote(vote, voteTotal) {

        var hash = '#vote-item-' + vote.docId;
        var voteItem = $(hash);
        var voteBtn = $(hash + ' .vote-btn');
        var voteForm = $(hash + ' form');
        voteBtn.attr('aria-label', 'Total Votes: ' + voteTotal);
        voteBtn.attr('aria-role', 'aside');

        voteBtn.removeClass('sending');
        voteBtn.find('vote-icon').html('');
        voteItem.find('[data-display-vote]').text(voteTotal);
        voteItem.addClass('voting-disabled');
        voteItem.removeClass('voting-enabled');
        voteBtn = $(hash + '.voting-disabled .vote-btn');
        voteForm = $(hash + '.voting-enabled form');



        voteForm.submit(function(e) {
            e.preventDefault();
            return false;
        });
        voteBtn.click(function(e) {
            e.preventDefault();
            return false;
        });
    }


    function enableVote(vote, voteTotal) {
        var hash = '#vote-item-' + vote.docId;
        var voteItem = $(hash);
        voteItem.find('[data-display-vote]').text(voteTotal);
        var voteBtn = $(hash + '.voting-enabled .vote-btn');
        var voteForm = $(hash + '.voting-enabled form');
        voteItem.addClass('voting-enabled');
        voteItem.removeClass('voting-disabled');
        voteBtn.attr('aria-label', 'Vote now! Total Votes: ' + voteTotal);
        voteBtn.attr('aria-role', 'submit');
        voteForm.submit(function(e) {
            if ($(hash).hasClass('voting-disabed')) {
                e.preventDefault();


                return false;
            } else {
                voteBtn.addClass('sending');
                voteBtn.find('.vote-icon').html('<span class="spinner"></span>');
                voteBtn.attr('aria-label', 'Sending vote...');
                return runVote(vote)
            }
        });
        voteBtn.click(function(e) {
            var disabled = $(hash).hasClass('voting-disabled');

            if (disabled) {
                e.preventDefault();

                return false;
            } else {
                voteBtn.addClass('sending');
                voteBtn.attr('aria-label', 'Sending vote...');
                voteBtn.find('.vote-icon').html('<span class="spinner"></span>');
                return runVote(vote);
            }
        });
    }

    function renderVote(vote) {
        var hash = '#vote-item-' + vote.docId;
        var voteItem = $(hash);
        var voteBtn = $(hash + ' .vote-btn');
        var votes = vote.votes || false;

        if (!votes) {
            return false;
        }
        var voteTotal = getVoteCount(vote);
        var userVoted = getUserVoted(vote.votes);
        if (userVoted) {
            disableVote(vote, voteTotal);
        } else {
            enableVote(vote, voteTotal);
        }
        voteBtn.addClass('show');
        voteItem.addClass('show');
    }

    function getUserVoted(array) {
        var uid = auth.user.id || false;
        if (!array || !uid || !array.length || array.length < 0) {
            return false;
        }
        var voted = array.filter(function(vote) {
            return vote == auth.user.id;
        })[0] || false;
        if (voted) {
            return true;
        } else {
            return false;
        }
    }

    function getVoteCount(vote) {
        var votes = vote.votes || false;
        if (!votes || !votes.length || votes.length < 1) {
            return 0;
        } else {
            total = votes.length;
            if (total > 999) {
                total = total.toString();
                total = total.subString(0, 2) + 'k';
            }
            total = total.toString();
            return total;
        }
    }

    var voteItems = $('[data-vote]') || false;


    function votesInit() {
        voteItems.each(function(index) {
            var voteItem = voteItems.eq(index);
            var voteForm = voteItem.find('.item-data-form');
            var itemId = voteForm.attr('data-item');
            if (!itemId) {
                return this.remove();
            }
            if (!voteItem.attr('id')) {
                voteItem.attr('id', 'vote-item-' + itemId);
            }
            var hash = '#' + itemId;
            voteItem = $(hash);
            voteBtn = $(hash + '.vote-btn');

            getVote("items", itemId, "vote", function(vote) {
                return renderVote(vote);
            });
        });
    }
    votesInit();
    // $('[data-votes-tab="true"]').click(votesInit);
    // });
}