jQuery(function(){jQuery(".slide-out-div").tabSlideOut({tabHandle:".handle",pathToTabImage:"http://www.birlasoft.com/sites/all/themes/birlasoft/images/enquiry-now.png",imageHeight:"141px",imageWidth:"32px",tabLocation:"right",speed:300,action:"click",topPos:"200px",leftPos:"20px",fixedPosition:!1})}),function(t){t.fn.tabSlideOut=function(o){var a=t.extend({tabHandle:".handle",speed:300,action:"click",topPos:"200px",leftPos:"20px",fixedPosition:!1,positioning:"absolute",pathToTabImage:null,imageHeight:null,imageWidth:null,onLoadSlideOut:!1},o||{});a.tabHandle=t(a.tabHandle);var e=this;a.fixedPosition,a.positioning="fixed",!document.all||window.opera||window.XMLHttpRequest||(a.positioning="absolute"),null!=a.pathToTabImage&&a.tabHandle.css({background:"url("+a.pathToTabImage+") no-repeat",width:a.imageWidth,height:a.imageHeight}),a.tabHandle.css({display:"block",textIndent:"-99999px",outline:"none",position:"absolute"}),e.css({"line-height":"1",position:a.positioning});var i={containerWidth:parseInt(e.outerWidth(),10)+"px",containerHeight:parseInt(e.outerHeight(),10)+"px",tabWidth:parseInt(a.tabHandle.outerWidth(),10)+"px",tabHeight:parseInt(a.tabHandle.outerHeight(),10)+"px"};"top"!==a.tabLocation&&"bottom"!==a.tabLocation||(e.css({left:a.leftPos}),a.tabHandle.css({right:0})),"top"===a.tabLocation&&(e.css({top:"-"+i.containerHeight}),a.tabHandle.css({bottom:"-"+i.tabHeight})),"bottom"===a.tabLocation&&(e.css({bottom:"-"+i.containerHeight,position:"fixed"}),a.tabHandle.css({top:"-"+i.tabHeight})),"left"!==a.tabLocation&&"right"!==a.tabLocation||(e.css({height:i.containerHeight,top:a.topPos}),a.tabHandle.css({top:0})),"left"===a.tabLocation&&(e.css({left:"-"+i.containerWidth}),a.tabHandle.css({right:"-"+i.tabWidth})),"right"===a.tabLocation&&(e.css({right:"-"+i.containerWidth}),a.tabHandle.css({left:"-"+i.tabWidth}),t("html").css("overflow-x","hidden")),a.tabHandle.click(function(t){t.preventDefault()});var n=function(){"top"===a.tabLocation?e.animate({top:"-"+i.containerHeight},a.speed).removeClass("open"):"left"===a.tabLocation?e.animate({left:"-"+i.containerWidth},a.speed).removeClass("open"):"right"===a.tabLocation?e.animate({right:"-"+i.containerWidth},a.speed).removeClass("open"):"bottom"===a.tabLocation&&e.animate({bottom:"-"+i.containerHeight},a.speed).removeClass("open")},s=function(){"top"==a.tabLocation?e.animate({top:"-3px"},a.speed).addClass("open"):"left"==a.tabLocation?e.animate({left:"-3px"},a.speed).addClass("open"):"right"==a.tabLocation?e.animate({right:"-3px"},a.speed).addClass("open"):"bottom"==a.tabLocation&&e.animate({bottom:"-3px"},a.speed).addClass("open")},c=function(){e.click(function(t){t.stopPropagation()}),t(document).click(function(){n()})};"click"===a.action&&(a.tabHandle.click(function(t){e.hasClass("open")?n():s()}),c()),"hover"===a.action&&(e.hover(function(){s()},function(){n()}),a.tabHandle.click(function(t){e.hasClass("open")&&n()}),c()),a.onLoadSlideOut&&(n(),setTimeout(s,500))}}(jQuery);