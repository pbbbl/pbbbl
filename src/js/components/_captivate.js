function renderCaptivate(item) {


    item.fullscreen = false;
    var { _id, id, outer, frame, controls, toggle, url, width, height, ratio, doc, fullscreen } = item;
    var $render = $(`#${id}`);
    $render.height(height);
    $render.width(width);
    $render.css({
        "width": `${width + 0}px`,
        "height": `${height + 0}px`

    })
    $render.html(`
        <div class="captivate-outer" id="${outer}" style="width: ${width}px; height: ${height}px;">
            
            <div class="captivate-controls" id="${controls}">
                <button class="button captivate-enter" id="${toggle}" data-target="captivate-outer-${id}" aria-expanded="${fullscreen}" aria-controls="captivate-frame ${id}" type="button" aria-has-popup="true">Start Lesson</button>
            </div>
            <iframe tabindex="0" title="Interactive Lesson" id="${frame}" class="captivate-frame" style="width: ${width}px; height: ${height}px;" src="${url}">
            </iframe>
        </div>

        `);
    var $outer = $(`#${outer}`);
    var $frame = $(`#${frame}`);
    var $resizables = $(`#${outer}`);
    var $toggle = $(`#${toggle}`);
    var $doc = $('html');
    var adjustSize = function() {
        width = $render.width();
        height = $render.height();
        var frameHeight = $render.height();

        if (item.fullscreen && item.fullscreen == true) {
            width = $doc.width();
            height = $doc.height();
            frameHeight = height - 60;




        } else {

        }

        $resizables.width(width);
        $resizables.height(height);
        $resizables.css({
            "width": `${width}px`,
            "height": `${height}px`
        });
        $frame.width(width);
        $frame.height(frameHeight);
        $frame.css({
            "width": `${width}px`,
            "height": `${frameHeight}px`
        });


    }
    $toggle.click(function() {
        item.fullscreen = !item.fullscreen;

        $toggle.toggleClass('theme-light');
        $outer.toggleClass('fullscreen');
        $doc.toggleClass('captivate-fullscreen captivate-overlay');

        var buttonText = 'Start Lesson';
        var focusTarget;

        if (item.fullscreen && item.fullscreen == true) {

            buttonText = 'Exit Lesson';
            focusTarget = $frame;


        } else {
            focusTarget = $toggle;
            $frame.attr('src', '');
            $frame.attr('src', url);

        }
        adjustSize();


        $toggle.text(buttonText);
        $toggle.attr('aria-expanded', item.fullscreen);
        focusTarget.focus();


    });

    window.onresize = adjustSize;



}

function setDataInit() {
    var isMobile = $('html').width() < 992;
    var screenRatio = $('html').width() / $('html').height();
    var captivateRatio = isMobile ? $('html').width() / $('html').height() : .5625;
    $('[data-sets]').each(function() {
        var sets = $(this).attr('data-sets');

        var _id = $(this).attr('data-id');
        var id = $(this).attr('id');
        var $this = $('#' + id);
        if (sets == 'captivate') {


            var item = {
                _id,
                id,
                render: $this.attr('data-render-id'),
                outer: `captivate-outer-${id}`,
                frame: `captivate-frame-${id}`,
                toggle: `captivate-toggle-${id}`,
                controls: `captivate-controls-${id}`,
                url: $this.attr('data-url'),
                width: $this.width(),
                height: $this.width() * captivateRatio,
                ratio: captivateRatio,
                doc: {
                    screenRatio,
                    docWidth: $('html').width(),
                    docHeight: $('html').height()

                }

            };
            renderCaptivate(item);

        }

    });

}
$(function() {

    setDataInit();
})