!function($){$.jfPopUp=function(t,n){function s(){$(".lb_closeBtn, .lb_shade").bind("click",e.close),e.settings.onComplete.apply(e,e.settings.onCompleteArgs)}var e=this,i=$(t),o,a,l,p=i.data(),c=!1;console.log(i);var d={loadElement:"body",message:"Hello :)",animationFrom:{opacity:"0","margin-top":"100px"},animationTo:{opacity:"1","margin-top":"0px"},pause:0,speed:250,ease:"swing",onStart:function(){},onStartArgs:[],onComplete:function(){},onCompleteArgs:[],onClosed:function(){},onClosedArgs:[]};e.settings={},e.init=function(){e.settings=$.extend({},d,n,p),o=$(e.settings.loadElement)},e.close=function(){l.animate(e.settings.animationFrom,e.settings.speed,e.settings.ease,function(){a.animate({opacity:"0"},e.settings.speed,"",function(){$(".lb_content").unload(),$(".lb_closeBtn, .lb_shade").unbind("click"),a.remove(),e.settings.onClosed.apply(e,e.settings.onClosedArgs),c=!1})})},e.destroy=function(){c&&e.close(),i.removeData("jfPopUp",e),e=null},e.launch=function(){c=!0,e.settings.onStart.apply(e,e.settings.onStartArgs);var t=[];t.push('<div class="lb_lightbox">'),t.push('<div class="lb_shade"></div>'),t.push('<div class="lb_window">'),t.push('<div class="lb_content">'+e.settings.message+"</div>"),t.push('<div class="lb_closeBtn"></div>'),t.push("</div></div>");var n="";$(t).each(function(t,s){n+=s}),o.prepend(n),a=$(".lb_lightbox"),l=$(".lb_window"),$(".lb_shade").css({opacity:"0"}).animate({opacity:"1"},e.settings.speed),l.css(e.settings.animationFrom),l.delay(e.settings.pause).animate(e.settings.animationTo,e.settings.speed,e.settings.ease,s)},e.init()},$.fn.jfPopUp=function(t){return this.each(function(){if(void 0===$(this).data("jfPopUp")){var n=new $.jfPopUp(this,t);$(this).data("jfPopUp",n)}})}}(jQuery);