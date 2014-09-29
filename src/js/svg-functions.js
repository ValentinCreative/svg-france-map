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