# jfPopUp
jQuery plugin designed to load html popup message. 


## Script Set Up
Just follow these steps to enable:

1. Include jQuery on your page.

    ```html
    <script src="http://code.jquery.com/jquery.min.js"></script>
    ```

2. Download and include jfPopUp after jQuery and before its first use.

    ```html
    <script src="jquery.jfPopUp.js"></script>
    ```
3. Download and include jfPopUp.css in the head of the html.

    ```html
    <link href="css/jfPopUp.css" rel="stylesheet" type="text/css" />
    ```

4. Init the plugin by attaching it the elements you want responsible for launching external files.
    ```js
    $(window).jfPopUp({message:'type your message here'});
    $(window).data("jfPopUp").launch();
    ```
    
## Options and Defaults
__Options__ and *Defaults*
#### Basics
* __loadElement:__ *'body'* The element you want the light box to be loaded into.

#### Window Animation
The window fades in by default, but you can pass it From and To properties via lists and CSS properties to change its animation. The out will be the reverse of what ever you set.
* __message:__ *{'type your message here'}*  The message you want the popup to display.
* __animationFrom:__ *{opacity:'0'}*  The load window's animation starting properties.
* __animationTo:__ *{opacity:'1'}*  The load window's animation ending properties.
* __pause:__ *0*  Pause time before the window comes in.
* __speed:__ *500*  Speed of window animation.
* __ease:__ *'swing'*  You can pass the animation an ease, __but you must to link to a library or plugin such as, jqueryUI, that includes ease options__.

#### Passing Functions
* __onStart:__  You can pass a function to be called when the load has started.
* __onStartArgs:__  If the onStart function has arguments, you can pass argument values via an array ['arg1', 'arg2'].
* __onComplete:__ You can pass a function to be called when the load is completed.
* __onCompleteArgs:__ If the onComplete function has arguments, you can pass argument values via an array ['arg1', 'arg2'].
* __onClosed:__  You can pass a function to be called when the window is closed.
* __onClosedArgs:__  If the onClose function has arguments, you can pass argument values via an array ['arg1', 'arg2'].

### Options as Arguments
Options can be passed as arguments through the init function.
```js
$('window').jfPopUp({
	animationFrom:{opacity:'0', top:'80%'},
	animationTo:{opacity:'1', top:'50%'},
	pause:0,
	speed:250,
	ease:'swing',
	onStart:function(){console.log("started")},
	onComplete:function(){console.log("complete")},
	onClosed:function(){console.log("closed")},
  });
```
	
### Options as Data Attributes
Options can also be passed through data attributes in the opening of the attached element. __Notice that the data attributes use dashes instead of camel case__.
```html
<div class="popupme" 
	data-mouse-event="mouseover" 
	data-hash="externalFile.html"
	data-path-to-script="externalScript.js"
>Mouse Over Me</div>
```

## Public functions
There are a few public functions that can be called at any time after init.
* __launch():__ This function can be called to launch the external file associated with the element it's attached to. It's handy for launching on a unique event like drag stop or drop. Additionally, you will most likely need to disable the click functionality by setting the __mouseEvent__ to "none".
* __close():__ This closes the window.
* __destroy():__ This deactivates the plugin.
* __init():__ This initates the plugin, this gets called automatically. 

```js
$(window).data("jfPopUp").launch();
$(window).data("jfPopUp").close();
$(window).data("jfPopUp").destroy();
$(window).data("jfPopUp").init();
```
## Structure
These are the elements the plugin creates.

```html
<div class="lb_lightbox">
	<div class="lb_shade"></div>
	<div class="lb_window">
		<div class="lb_content"><!--stuff gets loaded here --></div>
		<div class="lb_closeBtn">close</div>
	</div>
</div>
```

### Classes
* __.lb_lightbox__: The main parent element of lightboxload.
* __.lb_shade__: The backdrop area.
* __.lb_window__: The parent of the content area and close button. Gives you a layer to work with.
* __.lb_content__: Where the external file will be loaded. If you choose iframe this will be an iFrame element.
* __.lb_closeBtn__: The close button.

## Credits
I used http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/ as a starting point for the plugin.


