(function($) {


    $.jfPopUp = function(element, options) {
        var plugin = this;
        var $element = $(element);
        var $ldElement;
        var $mb;
        var $mbWin;
        var dataatts = $element.data();
        var win = false;        

        var defaults = {
            loadElement: 'body',
            message:"Hello :)",
            auto:false,
            mouseEvent:'none',
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

            if (plugin.settings.mouseEvent !=='none'){
                $element.bind(plugin.settings.mouseEvent, onMouse);
            }
        };
        // mouse event
        function onMouse(event){
            event.preventDefault();              
            plugin.launch();

        }
        
       
        function completed(){
            // add close functionality
            $('.mb_closeBtn, .mb_shade').bind('click',plugin.close); 
            // call on complete function
            plugin.settings.onComplete.apply(plugin,plugin.settings.onCompleteArgs); 
        }
        plugin.close = function(){
            $mbWin.animate(plugin.settings.animationFrom, plugin.settings.speed, plugin.settings.ease, 
                function(){    
                $mb.animate({opacity:'.85'},plugin.settings.speed, "", 
                    function(){
                        if (plugin.settings.mouseEvent !=='none'){
                            $element.unbind(plugin.settings.mouseEvent, onMouse);
                        }      
                        $('.mb_closeBtn, .mb_shade').unbind('click');
                        $mb.remove();
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
            tag.push('<div class="mb_messagebox">');
            tag.push('<div class="mb_shade"></div>');
            tag.push('<div class="mb_window">');    
            tag.push('<div class="mb_content">'+plugin.settings.message+'</div>');     
            tag.push('<div class="mb_closeBtn"></div>');
            tag.push('</div></div>');
            var tagString = '';
            $(tag).each(function(index, element){
                tagString+=element;
            });
            $ldElement.prepend(tagString);
            // cache objects 
            $mb = $('.mb_messagebox');  
            $mbWin = $('.mb_window');
          
            // shade animation
            $('.mb_shade').css({opacity:'0'}).animate({opacity:'1'}, plugin.settings.speed);
            // set, load, and animate window
            $mbWin.css(plugin.settings.animationFrom); 
            $mbWin.delay(plugin.settings.pause).animate(plugin.settings.animationTo, plugin.settings.speed, plugin.settings.ease, completed);    
        };  
        plugin.init();


        if (plugin.settings.auto){
            plugin.launch();
        }

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