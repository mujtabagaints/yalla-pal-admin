
heyzine = {

    pdfjsLib: null,
    pdf: null,
    config: null,

    
    load: (url, config) => {

        heyzine.config = config;


        return new Promise((resolve, reject) => {
            this.pdfjsLib = window['pdfjs-dist/build/pdf'];
            this.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;

            var loadingTask = this.pdfjsLib.getDocument(url);
            loadingTask.promise.then((pdf) => {
                this.pdf = pdf;
                heyzine.initTurn();
                resolve(this.pdf);
            }, (reason) => {
                reject(reason);
            });
        });

    },
    
    initTurn: () => {
        $('#magazineViewport').html('');
        $('#magazineViewport').append($('#tplMagazine').html());
    },

    loadPage: (numPage, canvas, pageWidth) => {

        return new Promise((resolve, reject) => {

            pdf.getPage(numPage).then(function(page) {

                var desiredWidth = typeof pageWidth === 'undefined' ? $('.page-wrapper').width() : pageWidth;
                var viewport = page.getViewport({ scale: 1 });
                var scale = desiredWidth / viewport.width;
                var viewport = page.getViewport({ scale: scale });

                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
            
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };

                var renderTask = page.render(renderContext);
                renderTask.promise.then(function () {
                    resolve();
                });

            }).catch((e) => {
                console.log(e);
                reject(e);
            });
        });

    },

    turn: function(numPage, canvasLeft, canvasRight) {
        this.loadPage(numPage, canvasLeft);
        this.loadPage(numPage + 1, canvasRight);
    },

    loadPageView: (page, pageElement, size) => {

        const config = heyzine.config;
        const canvas = $('<canvas width="' + config.width + '" height="' + config.height + '">');

        heyzine.loadPage(page, canvas.get(0)).then(() => {

            pageElement.find('.loader').remove();
            pageElement.find('img').remove();
            
            var image = new Image();
            image.src = canvas.get(0).toDataURL();
            image.style="width: 100%; height: 100%;";
            $(image).appendTo(pageElement);

            var domPage = $(image).closest('.page');
            
            if (page - flipbookcfg.cover == 1) {
                domPage.addClass('page-first');
            } else if (page - flipbookcfg.cover == flipbookcfg.numPages) {
                domPage.addClass('page-last');
            }

        });
    },
    
    loadImage: (page, position) => {
        
        return new Promise((resolve, reject) => {
            
            const canvas = $('<canvas width="253.6" height="165">');
    
            heyzine.loadPage(page, canvas.get(0), 253.6).then(() => {

                var image = new Image();
                image.src = canvas.get(0).toDataURL();
                if (position == 'left') {
                    image.style = "width: 50%; height: 100%; float: left;";
                } else if (position == 'right') {
                    image.style = "width: 50%; height: 100%; float: right;";
                } else {
                    image.style = "width: 100%; height: 100%;"
                }

                resolve(image);

            });
        });
    },
    
    loadPageThumbnails: (page1, page2, pageElement) => {
        
        var pos = page2 == null ? 'full' : 'left';
        heyzine.loadImage(page1, pos).then((img) => {
            if (page2 != null) {
                heyzine.loadImage(page2, 'right').then((img2) => {
                    $(pageElement).html('');
                    $(img).appendTo(pageElement);
                    $(img2).appendTo(pageElement);
                });
            } else {
                $(pageElement).html('');
                $(img).appendTo(pageElement);
            }
        });

    }

};



