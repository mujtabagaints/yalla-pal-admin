(function( $ ) {
 
    function genLinks(el, key) 
    {
        var endpoint = 'https://heyzine.com/api1';
        var q = "?k=" + key;
        
        if ($(el).attr('title')!=null) q += '&t=' + $(el).attr('title');
        if ($(el).attr('subtitle')!=null) q += '&s=' + $(el).attr('subtitle');
        if ($(el).attr('showdownload')!=null) q += '&d=1';
        
        if ($(el).attr('href')!=null) {
            $(el).attr('href', endpoint + q + '&pdf=' + $(el).attr('href'));
        } else {
            $(el).on('click', function() {
                document.location.href = endpoint + q + '&pdf=' + $(el).attr('flipbook');
            });
        }
    }
    
    $.pdfFlipbook = function( opts ) {
        $('[flipbook]').each(function(i, d) {
            genLinks(d, opts.key);
        });
    };
    
    $.fn.pdfFlipbook = function( opts ) {
        return $(this).each(function(i, d) {
            genLinks(d, opts.key);
        });
    };    
 
}( jQuery ));

