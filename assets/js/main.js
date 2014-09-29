$.fn.addClassSVG = function(className){
    $(this).attr('class', function(index, existingClassNames) {
        if (existingClassNames) {
            return existingClassNames + ' ' + className;
        } else {
            return className;
        }
    });
    return this;
};

$.fn.removeClassSVG = function(className){
    $(this).attr('class', function(index, existingClassNames) {
        var re = new RegExp(className, 'g');
        return existingClassNames.replace(re, '');
    });
    return this;
};

$.fn.highlightSVG = function(element,className){
    $(this).mouseover(function() {
        element.addClassSVG(className);
    });
    $(this).mouseout(function() {
        element.removeClassSVG(className);
    });
    return this;
};
(function($){
    'use strict';

    var $mapContainer  = $('#map-container'),
        $idfLarge      = $('#ile-de-france-zoomed'),
        $path          = $('path, #dom-tom g'),
        $tooltip       = $('<span/>', {
            class: 'tooltip',
        });

    $('#ile-de-france-min').highlightSVG($idfLarge, 'highlight');

    $('input[name=map-type]', '#map-type').on('change', function() {
       var mapType = $(this).val();

       $mapContainer.attr('class', mapType);
    });

    $path.on('mouseover', function(evt) {
        var $this = $(this),
            name  = $this.data('name');

        if (name != '') {
            $mapContainer.append($tooltip);

            $tooltip.show().text(name).css({
                position   : 'absolute',
                top        : evt.pageY,
                left       : evt.pageX + 30
            });
        };

    });

    $path.on('mouseout', function() {
        $tooltip.remove();
    });

})(jQuery);