(function($) {

    $.jfPopUp = function(element, options) {
        var plugin = this;
        var $element = $(element);
        var $ldElement;
        var $lb;
        var $lbWin;
        var dataatts = $element.data();
        var win = false;

        console.log($element)

        var defaults = {
            loadElement: 'body',
            message:"Hello :)",
            animationFrom:{opacity:'0', 'margin-top':'100px'},
            animationTo:{opacity:'1', 'margin-top':'0px'},
            pause:0,
            speed:250,
            ease:'swing',
            onStart: function() {}, 
            onStartArgs: [],
            onComplete: function() {}, 
            onCompleteArgs: [],
            onClosed: function() {}, 
            onClosedArgs: []
        };
        plugin.settings = {};

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options, dataatts);             
            $ldElement = $(plugin.settings.loadElement);
        };
       
        function completed(){
            // add close functionality
            $('.lb_closeBtn, .lb_shade').bind('click',plugin.close); 
            // call on complete function
            plugin.settings.onComplete.apply(plugin,plugin.settings.onCompleteArgs); 
        }
        plugin.close = function(){
            $lbWin.animate(plugin.settings.animationFrom, plugin.settings.speed, plugin.settings.ease, 
                function(){    
                $lb.animate({opacity:'0'},plugin.settings.speed, "", 
                    function(){      
                        $('.lb_content').unload();
                        $('.lb_closeBtn, .lb_shade').unbind('click');
                        $lb.remove();
                        plugin.settings.onClosed.apply(plugin,plugin.settings.onClosedArgs);
                        win = false;
                });
            });  
        };
        plugin.destroy = function(){
            if (win){
                plugin.close();
            }
            $element.removeData('jfPopUp', plugin);
            plugin = null;
        };
       
        plugin.launch = function(){
            //------------------------ launch function
            win = true;
            // call on start function
            plugin.settings.onStart.apply(plugin,plugin.settings.onStartArgs);
            // make tags
            var tag = [];
            tag.push('<div class="lb_lightbox">');
            tag.push('<div class="lb_shade"></div>');
            tag.push('<div class="lb_window">');
            
                tag.push('<div class="lb_content">'+plugin.settings.message+'</div>');
            
            tag.push('<div class="lb_closeBtn"></div>');
            tag.push('</div></div>');
            var tagString = '';
            $(tag).each(function(index, element){
                tagString+=element;
            });
            $ldElement.prepend(tagString);
            // cache objects 
            $lb = $('.lb_lightbox');  
            $lbWin = $('.lb_window');
          
            // shade animation
            $('.lb_shade').css({opacity:'0'}).animate({opacity:'1'}, plugin.settings.speed);
            // set, load, and animate window
            $lbWin.css(plugin.settings.animationFrom); 
            $lbWin.delay(plugin.settings.pause).animate(plugin.settings.animationTo, plugin.settings.speed, plugin.settings.ease, completed);    
        
        };  
        plugin.init();
    };

    $.fn.jfPopUp = function(options) {
        return this.each(function() {
            if (undefined === $(this).data('jfPopUp')) {
                var plugin = new $.jfPopUp(this, options);
                $(this).data('jfPopUp', plugin);
            }
        });
    };
})(jQuery);