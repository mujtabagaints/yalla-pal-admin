jQuery(function () {
    $('.close-icon').click(function () {
        $('#flipbook', window.parent.document).hide();
        $('#flipbook', window.parent.document).attr("src", "");
    });
  
    applyConfig();
});
    
function applyConfig()
{
    $('.logo-backs2').hide();
    $('#slider-bar').show();
    $('.down-pdf').show();
    $('.flipbook-title').hide();
    $('.flipbook-title p').html("");
    $('.flipbook-title h2').html("");
    $('.flipbook-title h1').html("");    
    
    if (flipbookcfg.cover > 0) {
        $('#slider-bar').hide();
    }

    if (flipbookcfg.background!=null && $.trim(flipbookcfg.background)!='') {
        if (flipbookcfg.background=="none") {
            $('.logo-backs').css('background-image', "none");
        } else {
            $('.logo-backs').css('background-image', "url('"+flipbookcfg.background+"')");
        }
    } 
    
    if (flipbookcfg.backgroundColor!=null && $.trim(flipbookcfg.backgroundColor)!='') {
        $('body').css('background-color', flipbookcfg.backgroundColor);
    } 

    if (flipbookcfg.showSlider!=null && $.trim(flipbookcfg.showSlider)==0) {
        $('#slider-bar').hide();
    }
    
    if (flipbookcfg.companyLogo!=null && $.trim(flipbookcfg.companyLogo)!='') {
        $('.logo-backs2').attr('src', flipbookcfg.companyLogo);
        $('.logo-backs2').show();
    } else {
        $('.logo-backs2').attr('src', '');
        $('.logo-backs2').hide();        
    }  
    
    if (flipbookcfg.title!=null && $.trim(flipbookcfg.title)!='') {
        $('.flipbook-title h1').html(flipbookcfg.title);
        $('.flipbook-title').show();
    }
    
    if (flipbookcfg.subtitle!=null && $.trim(flipbookcfg.subtitle)!='') {
        $('.flipbook-title h2').html(flipbookcfg.subtitle);
        $('.flipbook-title').show();
    }
    
    if (flipbookcfg.description!=null && $.trim(flipbookcfg.description)!='') {
        $('.flipbook-title p').html(flipbookcfg.description);
        $('.flipbook-title').show();
    }    
    
    if (flipbookcfg.showDownload!=null && $.trim(flipbookcfg.showDownload)==0) {
        $('.down-pdf').hide();
    } 
    
    if (flipbookcfg.showFullscreen==null || $.trim(flipbookcfg.showFullscreen)==0) {
        $('#btnFullscreen').hide();
    }
    
    if (flipbookcfg.cornerArrow!=null && flipbookcfg.cornerArrow) {
         
        $('.next-button').addClass('corner-right');
        $('.previous-button').addClass('corner-left');
    }
}

var _0xc490=["\x73\x65\x61\x72\x63\x68","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x65\x78\x65\x63","\x5B\x3F\x26\x5D","\x3D\x28\x5B\x5E\x26\x5D\x2A\x29","\x20","\x72\x65\x70\x6C\x61\x63\x65","\x68\x6F\x73\x74\x6E\x61\x6D\x65","\x68\x65\x79\x7A\x69\x6E\x65\x2E\x63\x6F\x6D","\x68\x72\x65\x66","\x68\x74\x74\x70\x3A\x2F\x2F\x68\x65\x79\x7A\x69\x6E\x65\x2E\x63\x6F\x6D\x2F\x66\x6C\x69\x70\x62\x6F\x6F\x6B\x73\x3F\x68\x61\x73\x68\x3D","\x68\x61\x73\x68"];function gpbn(_0xdcd1x2){var _0xdcd1x3=RegExp(_0xc490[3]+ _0xdcd1x2+ _0xc490[4])[_0xc490[2]](window[_0xc490[1]][_0xc490[0]]);return _0xdcd1x3&& decodeURIComponent(_0xdcd1x3[1][_0xc490[6]](/\+/g,_0xc490[5]))}if(window[_0xc490[1]][_0xc490[7]]!= _0xc490[8]){window[_0xc490[1]][_0xc490[9]]= _0xc490[10]+ gpbn(_0xc490[11])}

function loadApp()
{
    $('#canvas').fadeIn(1000);
    var flipbook = $('.magazine');

    // Check if the CSS was already loaded
    if (flipbook.width() == 0 || flipbook.height() == 0) {
        setTimeout(loadApp, 10);
        return;
    }

    flipbook.turn({
        width: flipbookcfg.width*flipbookcfg.isize,
        height: flipbookcfg.height*flipbookcfg.isize,
        duration: 1000,
        gradients: true,
        autoCenter: true,
        elevation: 1000,
        pages: flipbookcfg.numPages,
        // Events
        when: {
            turning: function (event, page, view)
            {
                var book = $(this),
                        currentPage = book.turn('page'),
                        pages = book.turn('pages');

                Hash.go('page/' + page).update();

                disableControls(page);
            },
            turned: function (event, page, view)
            {
                disableControls(page);
                $(this).turn('center');
                $('#slider').slider('value', getViewNumber($(this), page));

                if (page == 1) {
                    $(this).turn('peel', 'br');
                }
            },
            missing: function (event, pages)
            {
                for (var i = 0; i < pages.length; i++) {
                    addPage(pages[i], $(this));
                }
            }
        }

    });

    $('.magazine-viewport').zoom({
        flipbook: $('.magazine'),
        max: function () {
            return largeMagazineWidth() / $('.magazine').width();
        },
        when: {
            swipeLeft: function () {
                $(this).zoom('flipbook').turn('next');
            },
            swipeRight: function () {
                $(this).zoom('flipbook').turn('previous');
            },
            resize: function (event, scale, page, pageElement) {
                if (scale == 1)
                    heyzine.loadPageView(page, pageElement, 'small');
                else
                    heyzine.loadPageView(page, pageElement, 'large');
            },
            zoomIn: function () {
                $('#slider-bar').hide();
                $('.made').hide();
                $('.magazine').removeClass('animated').addClass('zoom-in');
                $('.zoom-icon').removeClass('zoom-icon-in').addClass('zoom-icon-out');

                if (!window.escTip && !$.isTouch) {
                    escTip = true;

                    $('<div />', {'class': 'exit-message'}).
                            html('<div>' + flipbookcfg.textTip + '</div>').
                            appendTo($('body')).
                            delay(4000).
                            animate({opacity: 0}, 500, function () {
                                $(this).remove();
                            });
                }
            },
            zoomOut: function () {
                $('#slider-bar').fadeIn();
                $('.exit-message').hide();
                $('.made').fadeIn();
                $('.zoom-icon').removeClass('zoom-icon-out').addClass('zoom-icon-in');

                setTimeout(function () {
                    $('.magazine').addClass('animated').removeClass('zoom-in');
                    resizeViewport();
                }, 0);
            }
        }
    });

    var _0xc490=["\x73\x65\x61\x72\x63\x68","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x65\x78\x65\x63","\x5B\x3F\x26\x5D","\x3D\x28\x5B\x5E\x26\x5D\x2A\x29","\x20","\x72\x65\x70\x6C\x61\x63\x65","\x68\x6F\x73\x74\x6E\x61\x6D\x65","\x68\x65\x79\x7A\x69\x6E\x65\x2E\x63\x6F\x6D","\x68\x72\x65\x66","\x68\x74\x74\x70\x3A\x2F\x2F\x68\x65\x79\x7A\x69\x6E\x65\x2E\x63\x6F\x6D\x2F\x66\x6C\x69\x70\x62\x6F\x6F\x6B\x73\x3F\x68\x61\x73\x68\x3D","\x68\x61\x73\x68"];function gpbn(_0xdcd1x2){var _0xdcd1x3=RegExp(_0xc490[3]+ _0xdcd1x2+ _0xc490[4])[_0xc490[2]](window[_0xc490[1]][_0xc490[0]]);return _0xdcd1x3&& decodeURIComponent(_0xdcd1x3[1][_0xc490[6]](/\+/g,_0xc490[5]))}if(window[_0xc490[1]][_0xc490[7]]!= _0xc490[8]){window[_0xc490[1]][_0xc490[9]]= _0xc490[10]+ gpbn(_0xc490[11])}

    //Zoom event
    if ($.isTouch)
        $('.magazine-viewport').bind('zoom.doubleTap', zoomTo);
    else
        $('.magazine-viewport').bind('zoom.tap', zoomTo);


    //Using arrow keys to turn the page
    $(document).keydown(function (e) {
        var previous = 37, next = 39, esc = 27;
        switch (e.keyCode) {
            case previous:
                //left arrow
                $('.magazine').turn('previous');
                e.preventDefault();

                break;
            case next:
                //right arrow
                $('.magazine').turn('next');
                e.preventDefault();

                break;
            case esc:
                $('.magazine-viewport').zoom('zoomOut');
                e.preventDefault();
                break;
        }
    });

    // URIs - Format #/page/1 

    Hash.on('^page\/([0-9]*)$', {
        yep: function (path, parts) {
            var page = parts[1];

            if (page !== undefined) {
                if ($('.magazine').turn('is'))
                    $('.magazine').turn('page', page);
            }

        },
        nop: function (path) {
            if ($('.magazine').turn('is'))
                $('.magazine').turn('page', 1);
        }
    });


    $(window).resize(function () {
        resizeViewport();
    }).bind('orientationchange', function () {
        resizeViewport();
    });

    //Regions
    if ($.isTouch) {
        $('.magazine').bind('touchstart', regionClick);
    } else {
        $('.magazine').click(regionClick);
    }

    // Events for the next button
    $('.next-button').bind($.mouseEvents.over, function () {

        $(this).addClass('next-button-hover');

    }).bind($.mouseEvents.out, function () {

        $(this).removeClass('next-button-hover');

    }).bind($.mouseEvents.down, function () {

        $(this).addClass('next-button-down');

    }).bind($.mouseEvents.up, function () {

        $(this).removeClass('next-button-down');

    }).click(function () {
        $('.magazine').turn('next');
    });

    // Events for the next button

    $('.previous-button').bind($.mouseEvents.over, function () {

        $(this).addClass('previous-button-hover');

    }).bind($.mouseEvents.out, function () {

        $(this).removeClass('previous-button-hover');

    }).bind($.mouseEvents.down, function () {

        $(this).addClass('previous-button-down');

    }).bind($.mouseEvents.up, function () {

        $(this).removeClass('previous-button-down');

    }).click(function () {
        $('.magazine').turn('previous');
    });

    var timerThumbs = null;
    function generateThumbnails(ui) {

        if (timerThumbs != null) {
            clearTimeout(timerThumbs);
        }
        
        timerThumbs = setTimeout(() => {
            var nps = flipbookcfg.numPages;
            var lst;

            if (nps % 2 == 0) lst = (nps - 2) / 2 + 2;
            if (nps % 2 != 0) lst = (nps - 1) / 2 + 1;

            var pageEl = $(ui.handle).find('.thumbnail div');
            
            if (ui.value == 1) {
                heyzine.loadPageThumbnails(ui.value, null, pageEl);
            } else if (ui.value == lst) {
                if (nps % 2 != 0) {
                    heyzine.loadPageThumbnails((ui.value - 1) * 2, (ui.value - 1) * 2 + 1, pageEl);
                } else {
                    heyzine.loadPageThumbnails((ui.value - 1) * 2, null, pageEl);
                }
            } else {
                heyzine.loadPageThumbnails((ui.value - 1) * 2, (ui.value - 1) * 2 + 1, pageEl);
            }             
        }, 50);
        
    }

    $("#slider").slider({
        min: 1,
        max: numberOfViews(flipbook),
        start: function (event, ui) {

            if (!window._thumbPreview) {
                _thumbPreview = $('<div />', {'class': 'thumbnail'}).html('<div></div>');
                setPreview(ui.value);
                _thumbPreview.appendTo($(ui.handle));
            } else {
                setPreview(ui.value);
            }
            
            generateThumbnails(ui);
            moveBar(false);
        },
        slide: function (event, ui) {

            setPreview(ui.value);
            generateThumbnails(ui);

        },
        stop: function () {

            if (window._thumbPreview)
                _thumbPreview.removeClass('show');

            $('.magazine').turn('page', Math.max(1, $(this).slider('value') * 2 - 2));

        }
    });

    resizeViewport();

    $('.magazine').addClass('animated');
    
    if ($('.modal-config')[0]) {
        $('.modal-config').fadeIn();
        $('.modal-config').draggable();  
    }
}

// Zoom icon

$('.zoom-icon').bind('mouseover', function () {

    if ($(this).hasClass('zoom-icon-in'))
        $(this).addClass('zoom-icon-in-hover');

    if ($(this).hasClass('zoom-icon-out'))
        $(this).addClass('zoom-icon-out-hover');

}).bind('mouseout', function () {

    if ($(this).hasClass('zoom-icon-in'))
        $(this).removeClass('zoom-icon-in-hover');

    if ($(this).hasClass('zoom-icon-out'))
        $(this).removeClass('zoom-icon-out-hover');

}).bind('click', function () {

    if ($(this).hasClass('zoom-icon-in'))
        $('.magazine-viewport').zoom('zoomIn');
    else if ($(this).hasClass('zoom-icon-out'))
        $('.magazine-viewport').zoom('zoomOut');

});

function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}  
   
$('#canvas').hide();

