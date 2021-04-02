< script type = "text/javascript" >
    awaitJquery(function() {

            var keys = Object.keys(page.items);
            for (var i = 0; i < keys.length; {

                    var key = keys[i];
                    var item = page.items[key];
                    var dataEl = $('.cms-item[data-item="' + item.id + '"]');


                    var listItem = dataEl.parents('[role="listitem"]');

                    if (listItem && Object.keys(item).length) {
                        addAttrs(listItem, item);
                    }

                    if (i + 1 >= keys.length) {

                        var lists = $('[data-sort-season="true"] [role="list"]');

                        lists.each(function(index) {

                            var list = $(this);
                            var items = list.find('[role="listitem"][data-season-end]');
                            items.sort(function(a, b) {

                                var aN = parseInt($(a).attr('data-season-end'));
                                var bN = parseInt($(b).attr('data-season-end'));
                                var anAfter = aN > bN;



                                return bN - aN;
                            }).appendTo(list);
                        });
                        // Require a library
                        var reqLibLists = $('[data-require-library]');
                        reqLibLists.each(function() {
                            var list = $(this);
                            var listLib = list.attr('data-require-library');
                            var items = list.find('[role="listitem"]');
                            items.each(function(index) {
                                var item = $(items).eq(index);
                                var lib = item.attr('data-library');

                                if (!lib || lib != listLib) {

                                    item.remove();
                                }
                            })
                        });
                        // Require Library Season Closed, Ended, False
                        var reqLibLists = $('[data-require-library]');
                        reqLibLists.each(function() {
                            var list = $(this);
                            var listLib = list.attr('data-require-library');
                            var items = list.find('[role="listitem"]');
                            items.each(function(index) {
                                var item = $(items).eq(index);
                                var lib = item.attr('data-library');

                                if (!lib || lib != listLib) {
                                    item.remove();
                                }
                            })
                        });

                        var requireSeason = $('[data-require-season]');

                        requireSeason.each(function() {
                                var attrs, attr, list;
                                var passed = true;
                                list = $(this);
                                attr = 'data-season-' + list.attr('data-require-season');
                                if (attr.indexOf(' ') > -1) {
                                    attr = attr.trim();
                                }
                                if (!attr) {
                                    return;
                                }
                                if (attr.indexOf(',') > -1) {
                                    var attrs = attr.split(',');
                                } else {
                                    attrs = [attr];
                                }
                                for (var i = 0; i < attrs.length; {
                                        onEachEl($(this).find('[role="listitem"]'), function(el) {
                                            if (!el) {
                                                return;
                                            }
                                            if (!el.attr(attr[i]) || el.attr(attr[i]) == 'false') {
                                                passed = false;
                                            }
                                            if (i + 1 >= attrs.length) {
                                                if (!passed) {
                                                    el.remove;
                                                }
                                                return;
                                            }
                                        });
                                    }
                                });
                        }
                    }



                })

            function addAttrs(target, data) {

                for (var attr in data) {
                    if (!attr) {
                        target.attr('data-' + attr, 'false');
                    }

                    if (attr && typeof attr != "array" && typeof attr != "object" && typeof attr != 'function') {
                        target.attr('data-' + attr, data[attr]);
                    }

                    if (attr && typeof attr == "array") {
                        for (var i = 0; i < data[{
                                    target.attr('data-' + attr + '-' + attr[i], true);
                                    target.attr('data-' + attr, attr.join(','));
                                }

                            }
                            if (attr && typeof attr == "object") {
                                var keys = Object.keys(attr);
                                for (var i = 0; i < keys.length; {
                                        var attrKey = keys[i];
                                        var value = attr[attrKey];
                                        var dataAttr = 'data-' + attr + '-' + attrKey;

                                        target.attr(dataAttr, value || true);
                                    }

                                }



                            }
                        }

                        function cmsItemAction(id, action) {
                            var dataEl = $('.cms-item[data-item="' + id + '"]');
                            dataEl.parents('[role="listitem"]')[action]();
                        }

                        function onEachEl(items, callback) {
                            items.each(function() {

                                var item = $(this);
                                callback(item);
                            });
                        }

                        function getSeason({
                            start,
                            end,
                            active
                        }) {
                            var ts = new Date();
                            ts = ts.getTime();
                            if (start && start != "" && end && end != "") {

                                var tsMin = Date.parse(start) || false;
                                var tsMax = Date.parse(end) || false;
                                var active = tsMin < ts && tsMax > ts;
                                var past = tsMax < ts;
                                var future = tsMin > ts;
                                return {
                                    start: tsMin,
                                    end: tsMax,
                                    active,
                                    past,
                                    future
                                }

                            }
                        } <
                        /script>