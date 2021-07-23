/**
 * @file
 * Adds some show/hide to the admin form to make the UXP easier.
 */
(function($){
  Drupal.behaviors.video = {
    attach: function (context, settings) {
      //lets see if we have any jmedia movies
      if($.fn.media) {
        $('.jmedia').media();
      }
	
      if(settings.video) {
        $.fn.media.defaults.flvPlayer = settings.video.flvplayer;
      }
	
      //lets setup our colorbox videos
      $('.video-box').each(function() {
        var url = $(this).attr('href');
        var data = $(this).metadata();
        var width = data.width;
        var height= data.height;
        var player = settings.video.player; //player can be either jwplayer or flowplayer.
        $(this).colorbox({
          html: '<a id="video-overlay" href="'+url+'" style="height:'+height+'; width:'+width+'; display: block;"></a>',
          onComplete:function() {
            if(player == 'flowplayer') {
              flowplayer("video-overlay", settings.video.flvplayer, {
                clip: {
                  autoPlay: settings.video.autoplay,
                  autoBuffering: settings.video.autobuffer
                }
              });
            } else {
              $('#video-overlay').media({
                flashvars: {
                  autostart: settings.video.autoplay
                },
                width:width,
                height:height
              });
            }
          }
        });
      });
    }
  };

  // On change of the thumbnails when edit.
  Drupal.behaviors.videoEdit = {
    attach : function(context, settings) {
      function setThumbnail(widget, type) {
        var thumbnails = widget.find('.video-thumbnails input');
        var defaultthumbnail = widget.find('.video-use-default-video-thumb');
        var largeimage = widget.find('.video-preview img');

        var activeThumbnail = thumbnails.filter(':checked');
        if (activeThumbnail.length > 0 && type != 'default') {
          var smallimage = activeThumbnail.next('label.option').find('img');
          largeimage.attr('src', smallimage.attr('src'));
          defaultthumbnail.attr('checked', false);
        }
        else if(defaultthumbnail.is(':checked')) {
          thumbnails.attr('checked', false);
          largeimage.attr('src', defaultthumbnail.data('defaultimage'));
        }
        else {
          // try to select the first thumbnail.
          if (thumbnails.length > 0) {
            thumbnails.first().attr('checked', 'checked');
            setThumbnail(widget, 'thumb');
          }
        }
      }

      $('.video-thumbnails input', context).change(function() {
        setThumbnail($(this).parents('.video-widget'), 'thumb');
      });

      $('.video-use-default-video-thumb', context).change(function() {
        setThumbnail($(this).parents('.video-widget'), 'default');
      });

      $('.video-widget', context).each(function() {
        setThumbnail($(this), 'both');
      });
    }
  }
})(jQuery);
;
;
!function(t){t.fn.multilevelpushmenu=function(e){var i=arguments;return returnValue=null,this.each(function(){function n(t){t.stopPropagation&&t.preventDefault?(t.stopPropagation(),t.preventDefault()):(t.cancelBubble=!0,t.returnValue=!1)}function s(e,i){return void 0==e||void 0==i?!1:void e.on(i,function(n,s){e.hide();try{s=s||{pageX:n.pageX,pageY:n.pageY};var r=document.elementFromPoint(s.pageX,s.pageY);r=3==r.nodeType?r.parentNode:r,t(r).trigger(i,s)}catch(a){t.error("Error while propagating event: "+a.message)}finally{e.show()}})}function r(){var e=t("<nav />").prop({id:N.settings.menuID,className:N.settings.wrapperClass}).appendTo(N.settings.container);a(N.settings.menu,e)}function a(e,i){void 0==e.level&&(e.level=0),t.each(e,function(){{var s=t("<div />").attr({"class":"levelHolderClass"+("rtl"==N.settings.direction?" rtl":" ltr"),"data-level":e.level,style:("rtl"==N.settings.direction?"margin-right: ":"margin-left: ")+(0!=e.level||N.settings.collapsed?"-200%":0)}).appendTo(i);H(N.settings.menuWidth)||C(N.settings.menuWidth)&&N.settings.menuWidth>0}s.on(z,function(t){n(t)}),s.bind(_,function(t){m(t,s)}),void 0!=this.id&&s.attr({id:this.id});var r=t("<h2 />").attr({style:"text-align: "+("rtl"==N.settings.direction?"right":"left")}).text(this.title).appendTo(s),a=t("<i />").prop({"class":("rtl"==N.settings.direction?"floatLeft":"floatRight")+" cursorPointer "+this.icon}).prependTo(r);a.bind(z,function(t){d(t,s,e)}),e.level>0&&c(s);t("<ul />").appendTo(s);t.each(this.items,function(){h(this,s,-1)})})}function l(){var t=N.settings.container.find("nav").length>0?N.settings.container.find("nav"):N.settings.menu;return 0==t.length?!1:(t.prop({id:N.settings.menuID,className:N.settings.wrapperClass}),void o(t))}function o(e){void 0==e.level&&(e.level=0),t.each(e,function(){{var i=t("<div />").attr({"class":"levelHolderClass"+("rtl"==N.settings.direction?" rtl":" ltr"),"data-level":e.level,style:("rtl"==N.settings.direction?"margin-right: ":"margin-left: ")+(0!=e.level||N.settings.collapsed?"-200%":0)}).appendTo(e);H(N.settings.menuWidth)||C(N.settings.menuWidth)&&N.settings.menuWidth>0}i.on(z,function(t){n(t)}),i.bind(_,function(t){m(t,i)});var s=e.children("h2");s.attr({style:"text-align: "+("rtl"==N.settings.direction?"right":"left")}),s.appendTo(i);var r=s.children("i");r.addClass(("rtl"==N.settings.direction?"floatLeft":"floatRight")+" cursorPointer"),r.bind(z,function(t){d(t,i,e)}),e.level>0&&c(i);var a=e.children("ul");a.appendTo(i),t.each(a.children("li"),function(){var n=t(this);n.attr({style:"text-align: "+("rtl"==N.settings.direction?"right":"left")});var s=n.children("a"),r=s.children("i");r.addClass("rtl"==N.settings.direction?"floatLeft":"floatRight"),n.children("ul").length>0?(s.bind(z,function(t){g(t,i,n)}),p(s),n.level=e.level+1,o(n)):s.bind(z,function(t){v(t,i,n)})})})}function d(e,i,s){if(t(N).find("div.levelHolderClass").is(":animated"))return!1;N.settings.onTitleItemClick.apply(this,Array.prototype.slice.call([e,i,N.settings])),n(e);var r="rtl"==N.settings.direction?parseInt(i.css("margin-right"))<0:parseInt(i.css("margin-left"))<0;if(0==s.level&&r)D();else{var a=N.settings.container.find("#"+N.settings.menuID+" div.levelHolderClass").filter(function(){var e="rtl"==N.settings.direction?t(this).attr("data-level")>i.attr("data-level")&&parseInt(t(this).css("margin-right"))>=0:t(this).attr("data-level")>i.attr("data-level")&&parseInt(t(this).css("margin-left"))>=0;return e}),l=N.settings.container.find("#"+N.settings.menuID+" div.levelHolderClass").filter(function(){var e="rtl"==N.settings.direction?t(this).attr("data-level")<=i.attr("data-level")&&parseInt(t(this).css("margin-right"))>=0:t(this).attr("data-level")<=i.attr("data-level")&&parseInt(t(this).css("margin-left"))>=0;return e});0==a.length&&1==l.length?T():T(parseInt(i.attr("data-level")))}i.css("visibility","visible"),i.find("."+N.settings.backItemClass).css("visibility","visible"),i.find("ul").css("visibility","visible"),i.removeClass(N.settings.menuInactiveClass)}function c(e){{var i=t("<div />").attr({"class":N.settings.backItemClass}).appendTo(e),n=t("<a />").prop({href:"#"}).text(N.settings.backText).appendTo(i);t("<i />").prop({"class":("rtl"==N.settings.direction?"floatLeft ":"floatRight ")+N.settings.backItemIcon}).prependTo(n)}n.bind(z,function(t){u(t,e)})}function u(e,i){return t(N).find("div.levelHolderClass").is(":animated")?!1:(N.settings.onBackItemClick.apply(this,Array.prototype.slice.call([e,i,N.settings])),n(e),void T(parseInt(i.attr("data-level")-1)))}function g(e,i,s){return t(N).find("div.levelHolderClass").is(":animated")?!1:(N.settings.onGroupItemClick.apply(this,Array.prototype.slice.call([e,i,s,N.settings])),D(s.find("div:first")),void(N.settings.preventGroupItemClick&&n(e)))}function p(e){t("<i />").attr({"class":("rtl"==N.settings.direction?" floatRight iconSpacing_rtl ":" floatLeft iconSpacing_ltr ")+N.settings.groupIcon}).prependTo(e)}function h(){var e=arguments[0],i=arguments[1],n=arguments[2],s=i.find("ul:first"),r=t("<li />");n<s.find("li").length&&n>=0?r.insertBefore(s.find("li").eq(n)):r.appendTo(s),r.attr({style:"text-align: "+("rtl"==N.settings.direction?"right":"left")}),void 0!=e.id&&r.attr({id:e.id});{var l=t("<a />").prop({href:e.link}).text(e.name).appendTo(r);t("<i />").prop({"class":("rtl"==N.settings.direction?"floatLeft ":"floatRight ")+e.icon}).prependTo(l)}e.items?(l.bind(z,function(t){g(t,i,r)}),p(l),e.items.level=parseInt(i.attr("data-level"),10)+1,a(e.items,r)):l.bind(z,function(t){v(t,i,r)})}function v(t,e,i){N.settings.onItemClick.apply(this,Array.prototype.slice.call([t,e,i,N.settings])),N.settings.preventItemClick&&n(t)}function m(e,i){var s=N.settings.onMenuSwipe.apply(this,Array.prototype.slice.call([e,i,N.settings]));if(0==s)return!1;if(t(N).find("div.levelHolderClass").is(":animated"))return!1;var r=i.attr("data-level")>0?i.attr("data-level")-1:void 0;if("touchmove"==e.type&&"desktop"!=N.settings.swipe){if(n(e),e=e.touches?e:e.originalEvent,!e.touches||e.touches.length<=0)return!1;var a=e.touches[0];if(N.settings.container.unbind("touchend"),N.settings.container.bind("touchend",function(t){n(t),i.significance=0,i.swipeStart=0,N.settings.container.unbind("touchend")}),void 0==i.swipeStart||0==i.swipeStart)return i.significance=0,i.swipeStart=a.pageX,!0;i.significance=a.pageX-i.swipeStart,Math.abs(i.significance)>.3*N.settings.overlapWidth&&("rtl"==N.settings.direction&&(i.significance*=-1),i.significance>0?D(void 0==r?r:i):T(r),i.significance=0,i.swipeStart=0)}else if("touchscreen"!=N.settings.swipe){n(e);var l=0;i.unbind("mousemove"),i.bind("mousemove",function(t){return l=t.clientX-e.clientX,Math.abs(l)>.3*N.settings.overlapWidth?(i.unbind("mousemove"),"rtl"==N.settings.direction&&(l*=-1),l>0?D(void 0==r?r:i):T(r),!0):void 0}),N.settings.container.unbind("mouseup"),N.settings.container.bind("mouseup",function(t){n(t),i.unbind("mousemove"),N.settings.container.unbind("mouseup")})}}function f(){var e=N.settings.container.find("#"+N.settings.menuID+" div.levelHolderClass").filter(function(){var e="rtl"==N.settings.direction?parseInt(t(this).css("margin-right"))>=0&&t(this).position().left<N.settings.container.width()-N.settings.overlapWidth:parseInt(t(this).css("margin-left"))>=0&&t(this).position().left>=0;return e});return e.length<1&&(e=!1),e}function y(){var e=N.settings.container.find("#"+N.settings.menuID+" div.levelHolderClass").filter(function(){var e="rtl"==N.settings.direction?t(this).position().left>N.settings.container.width()||parseInt(t(this).css("margin-right"))<0:t(this).position().left<0||parseInt(t(this).css("margin-left"))<0;return e});return e.length<1&&(e=!1),e}function w(){if(!N.redraw){N.redraw=!0;var e,i=arguments[0],n=arguments[1],s=arguments[2],r=t("#"+N.settings.menuID+" div.levelHolderClass").first().css("filter").match(/DXImageTransform\.Microsoft\.Shadow/)?t("#"+N.settings.menuID+" div.levelHolderClass").first().get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength:0,a=void 0==i?Math.max.apply(null,t("#"+N.settings.menuID+" div.levelHolderClass").map(function(){return t(this).width()}).get())-r:i-r,l=Math.max.apply(null,t("#"+N.settings.menuID+" div.levelHolderClass").map(function(){return t(this).attr("data-level")}).get()),o=H(N.settings.menuWidth)||C(N.settings.menuWidth)&&N.settings.menuWidth>0,d=H(N.settings.menuHeight)||C(N.settings.menuHeight)&&N.settings.menuHeight>0,c=void 0==s?t("#"+N.settings.menuID+" div.levelHolderClass"):s;o||void 0==N.menuWidth||(a=N.menuWidth),c.width(o&&void 0==i?N.settings.menuWidth:a),o&&((0==c.width()||H(N.settings.menuWidth)&&-1!=N.settings.menuWidth.indexOf("%"))&&void 0==i&&(c.css("min-width",""),c.width(parseInt(N.settings.container.parent().width()*parseInt(N.settings.menuWidth)/100))),a=c.width()-r,c.css("min-width",c.width()-r+"px"));var u=o&&void 0==i?c.width()-r+l*(N.settings.overlapWidth+r):a+l*(N.settings.overlapWidth+r),g=void 0==n?Math.max.apply(null,t("#"+N.settings.menuID+" div.levelHolderClass").map(function(){return t(this).height()}).get()):n;N.settings.container.css("min-height",""),N.settings.container.children("nav:first").css("min-height",""),d?(N.settings.container.height(N.settings.menuHeight),N.settings.container.css("min-height",N.settings.menuHeight),N.settings.container.children("nav:first").css("min-height",N.settings.menuHeight),t("#"+N.settings.menuID).height(N.settings.menuHeight),g=N.settings.container.height()):t("#"+N.settings.menuID).height(g),N.settings.container.css("min-height",g+"px"),N.settings.container.children("nav:first").css("min-height",g+"px"),N.settings.container.width(u),N.settings.container.height(g);var p=t("#"+N.settings.menuID+" div.levelHolderClass:first"),h=f(),v=y(),m=S(),w=1==m.length?m.attr("data-level"):0;h&&h.each(function(){"overlap"==N.settings.mode&&t(this).width(t(this).width()+(parseInt(w,10)-parseInt(t(this).attr("data-level"),10))*(N.settings.overlapWidth+r))}),v&&v.each(function(){"rtl"==N.settings.direction?t(this).css("margin-right",t(this).attr("data-level")!=p.attr("data-level")||N.settings.fullCollapse?-2*t(this).width():-1*t(this).width()+N.settings.overlapWidth):t(this).css("margin-left",t(this).attr("data-level")!=p.attr("data-level")||N.settings.fullCollapse?-2*t(this).width():-1*t(this).width()+N.settings.overlapWidth)}),e=p.width()+parseInt(p.css("rtl"==N.settings.direction?"margin-right":"margin-left"),10),b(N.settings.container,e),N.menuWidth=a,N.menuHeight=g,N.redraw=!1}}function b(t,e){return void 0==t||void 0==e?!1:(t.css("min-width",""),t.css("min-width",e+"px"),t.children("nav:first").css("min-width",""),t.children("nav:first").css("min-width",e+"px"),void t.width(e))}function I(){var e=t("#"+N.settings.menuID+" div.levelHolderClass:first"),i=N.settings.container.find("#"+N.settings.menuID+" div.levelHolderClass").filter(function(){var i="rtl"==N.settings.direction?(t(this).position().left>N.settings.container.width()||parseInt(t(this).css("margin-right"))<0)&&t(this).attr("data-level")>e.attr("data-level"):(t(this).position().left<0||parseInt(t(this).css("margin-left"))<0)&&t(this).attr("data-level")>e.attr("data-level");return i});i.each(function(){"rtl"==N.settings.direction?t(this).css("margin-right",t(this).attr("data-level")!=e.attr("data-level")||N.settings.collapsed?-2*t(this).width():0):t(this).css("margin-left",t(this).attr("data-level")!=e.attr("data-level")||N.settings.collapsed?-2*t(this).width():0)}),"rtl"==N.settings.direction?e.css("margin-right",N.settings.collapsed?-2*e.width():0):e.css("margin-left",N.settings.collapsed?-2*e.width():0)}function C(t){return"number"==typeof t&&parseFloat(t)==parseInt(t,10)&&!isNaN(t)}function H(t){return"string"==typeof t&&(-1!=t.indexOf("%")||-1!=t.indexOf("px")||-1!=t.indexOf("em"))}function k(){e&&void 0!=e.menu?r():l();return s(N.settings.container,z),w(),I(),x(N.settings.collapsed),N.settings.onMenuReady.apply(this,Array.prototype.slice.call([N.settings])),P}function x(e){e&&($baseLevelHolder=t("#"+N.settings.menuID+" div.levelHolderClass:first"),$baseLevelHolder.find("ul").hide(),$baseLevelHolder.addClass(N.settings.menuInactiveClass),$baseLevelHolder.stop().animate("rtl"==N.settings.direction?{marginRight:-1*$baseLevelHolder.width()+(N.settings.fullCollapse?0:N.settings.overlapWidth)}:{marginLeft:-1*$baseLevelHolder.width()+(N.settings.fullCollapse?0:N.settings.overlapWidth)}))}function W(e){return null==N.settings.containersToPush?!1:void t.each(N.settings.containersToPush,function(){var i=parseInt(t(this).css("margin-left")),n=C(i)?i:0,s=parseInt(t(this).css("margin-right")),r=C(s)?s:0;"ltr"==N.settings.direction&&t(this).stop().animate({marginLeft:n+e}),"rtl"==N.settings.direction&&t(this).stop().animate({marginRight:r+e})})}function T(){if(t(N).find("div.levelHolderClass").is(":animated"))return!1;N.settings.onCollapseMenuStart.apply(this,Array.prototype.slice.call([N.settings]));var e,i,n,s,r=arguments[0],a=arguments[1],l={},o=t("#"+N.settings.menuID+" div.levelHolderClass:first"),d=void 0==r?!0:!1;if(l.collapsingEnded=!1,"object"==typeof r)r=r.attr("data-level");else if("string"==typeof r){var c=L(r);r=c&&1==c.length?c.attr("data-level"):o.attr("data-level")}else(void 0==r||!C(r)||0>r)&&(r=o.attr("data-level"));void 0==a&&"object"!=typeof a?a=[{method:N.settings.onCollapseMenuEnd,args:[N.settings]}]:t.merge(a,[{method:N.settings.onCollapseMenuEnd,args:[N.settings]}]);var u=N.settings.container.find("#"+N.settings.menuID+" div.levelHolderClass").filter(function(){var e="rtl"==N.settings.direction?t(this).attr("data-level")>r&&parseInt(t(this).css("margin-right"))>=0&&t(this).position().left<N.settings.container.width()-N.settings.overlapWidth:t(this).attr("data-level")>r&&parseInt(t(this).css("margin-left"))>=0&&t(this).position().left>=0;return e}),g=N.settings.container.find("#"+N.settings.menuID+" div.levelHolderClass").filter(function(){var e="rtl"==N.settings.direction?t(this).attr("data-level")<=r&&parseInt(t(this).css("margin-right"))>=0&&t(this).position().left<N.settings.container.width()-N.settings.overlapWidth:t(this).attr("data-level")<=r&&parseInt(t(this).css("margin-left"))>=0&&t(this).position().left>=0;return e});return g.length>0&&(l.prevAnimEnded=!1,u.each(function(n,s){e=t(s).css("filter").match(/DXImageTransform\.Microsoft\.Shadow/)?t(s).get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength:0,i="overlap"==N.settings.mode?t(s).width()-(u.length+g.length-t(s).attr("data-level")-1)*(N.settings.overlapWidth+e)-e:t(s).width()-e,t(s).stop().animate("rtl"==N.settings.direction?{marginRight:-1*i,width:i}:{marginLeft:-1*i,width:i})}),l.nextAnimEnded=u.length>0?!1:!0,u.last().queue(function(){l.nextAnimEnded=!0,R(l,a)}),g.each(function(a,l){e=t(l).css("filter").match(/DXImageTransform\.Microsoft\.Shadow/)?t(l).get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength:0;var c=g.filter(function(){return t(this).attr("data-level")==r});if(c.css("visibility","visible"),c.find("."+N.settings.backItemClass).css("visibility","visible"),c.find("ul").css("visibility","visible"),c.removeClass(N.settings.menuInactiveClass),i="overlap"==N.settings.mode?t(l).width()-u.length*(N.settings.overlapWidth+e)-e:t(l).width()-e,"rtl"==N.settings.direction?t(l).stop().animate({width:i,marginRight:t(l).attr("data-level")==o.attr("data-level")&&d?N.settings.fullCollapse?-1*t(l).width():-1*t(l).width()+("overlap"==N.settings.mode?u.length+1:1)*N.settings.overlapWidth:0},function(){t(l).attr("data-level")==o.attr("data-level")&&d&&o.children("ul").first().hide(500,function(){o.addClass(N.settings.menuInactiveClass)}),s=o.width()+parseInt(o.css("margin-right"),10),b(N.settings.container,s)}):t(l).stop().animate({width:i,marginLeft:t(l).attr("data-level")==o.attr("data-level")&&d?N.settings.fullCollapse?-1*t(l).width():-1*t(l).width()+("overlap"==N.settings.mode?u.length+1:1)*N.settings.overlapWidth:0},function(){t(l).attr("data-level")==o.attr("data-level")&&d&&o.children("ul").first().hide(500,function(){o.addClass(N.settings.menuInactiveClass)}),s=o.width()+parseInt(o.css("margin-left"),10),b(N.settings.container,s)}),n="overlap"==N.settings.mode?-1*u.length*(N.settings.overlapWidth+e):0,t(l).attr("data-level")==o.attr("data-level")&&d){var p=N.settings.fullCollapse?-1*(o.width()-e):-1*(o.width()-e)+N.settings.overlapWidth;W(p)}else W(n)}),g.last().queue(function(){l.prevAnimEnded=!0,R(l,a)})),l.collapsingEnded=!0,R(l,a),P}function A(){if(t(N).find("div.levelHolderClass").is(":animated"))return!1;N.settings.onExpandMenuStart.apply(this,Array.prototype.slice.call([N.settings]));var e,i,n,s,r,a=arguments[0],l=arguments[1],o={},d=t("#"+N.settings.menuID+" div.levelHolderClass:first"),c=void 0==a?!0:!1,u="rtl"==N.settings.direction?parseInt(d.css("margin-right"),10)<0||d.position().left>=N.settings.container.width()-N.settings.overlapWidth:parseInt(d.css("margin-left"),10)<0||d.position().left<0;if(o.expandingEnded=!1,void 0==l&&"object"!=typeof l?l=[{method:N.settings.onExpandMenuEnd,args:[N.settings]}]:t.merge(l,[{method:N.settings.onExpandMenuEnd,args:[N.settings]}]),c){o.baseAnimEnded=!1,d.removeClass(N.settings.menuInactiveClass),r=d.width(),b(N.settings.container,r),"rtl"==N.settings.direction?d.stop().animate({marginRight:0},function(){d.children("ul").first().show(500,function(){o.baseAnimEnded=!0,R(o,l)})}):d.stop().animate({marginLeft:0},function(){d.children("ul").first().show(500,function(){o.baseAnimEnded=!0,R(o,l)})}),s=N.settings.fullCollapse?d.width():d.width()-N.settings.overlapWidth;{$(d)?null:W(s)}}else if("object"==typeof a?$selectedLevelHolder=a:"string"==typeof a?$selectedLevelHolder=L(a):($selectedLevelHolder=null,t.error("Provided menu selector is not valid")),$selectedLevelHolder&&1==$selectedLevelHolder.length){var g=S(),p=1==g.length?g.attr("data-level"):0,h=$selectedLevelHolder.width();if(o.setToOpenAnimEnded=!1,setToOpenHolders=V($selectedLevelHolder)){var v=t(setToOpenHolders).length-1;d.find("ul").each(function(){t(this).show(0)}),t(setToOpenHolders).find("ul").css("visibility","hidden"),t(setToOpenHolders).find("div").css("visibility","visible"),t(setToOpenHolders).find("."+N.settings.backItemClass).css("visibility","hidden"),t(setToOpenHolders).each(function(n,s){e=t(s).css("filter").match(/DXImageTransform\.Microsoft\.Shadow/)?t(s).get(0).filters.item("DXImageTransform.Microsoft.Shadow").strength:0,i=h-e+(v-t(s).attr("data-level"))*(N.settings.overlapWidth+e),N.settings.container.width()<i&&"overlap"==N.settings.mode&&b(N.settings.container,i),"rtl"==N.settings.direction?t(s).stop().animate({marginRight:0,width:"overlap"==N.settings.mode?i:h-e},function(){t(s).addClass(N.settings.menuInactiveClass)}):t(s).stop().animate({marginLeft:0,width:"overlap"==N.settings.mode?i:h-e},function(){t(s).addClass(N.settings.menuInactiveClass)})}),t(setToOpenHolders).last().queue(function(){t(this).removeClass(N.settings.menuInactiveClass),o.setToOpenAnimEnded=!0,R(o,l)}),u&&(s=N.settings.fullCollapse?d.width():d.width()-N.settings.overlapWidth,W(s)),"overlap"==N.settings.mode&&(n=u?h+(v-(N.settings.fullCollapse?0:1))*(N.settings.overlapWidth+e):(v-p)*(N.settings.overlapWidth+e),W(n)),$selectedLevelHolder.css("visibility","visible"),$selectedLevelHolder.find("."+N.settings.backItemClass).css("visibility","visible"),$selectedLevelHolder.find("ul").css("visibility","visible"),$selectedLevelHolder.removeClass(N.settings.menuInactiveClass)}else t.error("Invalid menu object provided")}else t.error("No or too many menus named "+a);o.expandingEnded=!0,R(o,l)}function D(){var e,i,n,s,r=arguments[0],a=S();return"object"==typeof r?e=r:"string"==typeof r?(s=L(r),s?e=s.eq(0):t.error(r+" menu level does not exist!")):e=t("#"+N.settings.menuID+" div.levelHolderClass:first"),i=E(e,a,!0),n=i.length>0?Math.max.apply(null,i.map(function(){return t(this).attr("data-level")}).get()):0,n<a.attr("data-level")?T(n,[{method:A,args:arguments}]):A.apply(this,Array.prototype.slice.call(arguments)),P}function L(){var e,i=arguments[0],n=N.settings.container.find("#"+N.settings.menuID+" div.levelHolderClass").filter(function(){return t(this).children("h2").text()==i});return n.length>0?(returnValue=n,e=returnValue):(returnValue=!1,e=returnValue),e}function M(){var e,i=arguments[0],n=N.settings.container.find("#"+N.settings.menuID+" div.levelHolderClass li").filter(function(){return t(this).children("a").text()==i});return n.length>0?(returnValue=n,e=returnValue):(returnValue=!1,e=returnValue),e}function V(){var e,i,n=arguments[0];return void 0==n||1!=n.length?(returnValue=!1,returnValue):(e=n.parents("div.levelHolderClass"),i=t.merge(e.get().reverse(),n.get()),returnValue=i,returnValue)}function E(){var e,i,n,s,r,a,l,o=arguments[0],d=arguments[1],c=void 0!=arguments[2]?arguments[2]:!1;return void 0==o||void 0==d?(returnValue=!1,returnValue):(e=1==o.length?o.parents("div.levelHolderClass"):null,i=1==d.length?d.parents("div.levelHolderClass"):null,n=null!=e?t.merge(e.get().reverse(),o.get()):[],s=null!=i?t.merge(i.get().reverse(),d.get()):[],r=n.length>=s.length?n:s,a=r===n?s:n,l=t(r).filter(function(){return c?-1!=t.inArray(this,a):-1==t.inArray(this,a)}),returnValue=l,returnValue)}function S(){var e=N.settings.container.find("#"+N.settings.menuID+" div.levelHolderClass").filter(function(){var e="rtl"==N.settings.direction?parseInt(t(this).css("margin-right"))>=0&&t(this).position().left<N.settings.container.width()-N.settings.overlapWidth:parseInt(t(this).css("margin-left"))>=0&&t(this).position().left>=0;return e}),i=Math.max.apply(null,e.map(function(){return t(this).attr("data-level")}).get());return $activeLevelHolder=e.filter(function(){return t(this).attr("data-level")==i}),returnValue=$activeLevelHolder,returnValue}function $(){var t=arguments[0],e=!1;if(void 0==t)return e;var i="rtl"==N.settings.direction?parseInt(t.css("margin-right"))>=0&&t.position().left<N.settings.container.width()-N.settings.overlapWidth:parseInt(t.css("margin-left"))>=0&&t.position().left>=0;return i}function j(){var e=arguments[0],i=arguments[1],n=arguments[2];if(void 0==i||"object"!=typeof e||!i)return!1;void 0==e.level&&(e.level=parseInt(i.attr("data-level"),10)),void 0==n&&(n=0);i.find("ul:first");return t.each(e,function(){void 0!=this.name&&h(this,i,n)}),w(N.menuWidth),P}function X(){var e=arguments[0];if(void 0==e||"object"!=typeof e||0==e.length)return!1;e.remove();var i=S();if(1==i.length){i.css("visibility","visible"),i.find("."+N.settings.backItemClass).css("visibility","visible"),i.find("ul").css("visibility","visible"),i.removeClass(N.settings.menuInactiveClass);var n=i.width()-N.menuWidth;if(0!=n){var s=f();s&&s.each(function(){t(this).width(t(this).width()-n)})}}return w(N.menuWidth),P}function R(e,i){var n=!0;t.each(e,function(t,e){n=n&&e}),n&&window.setTimeout(function(){t.each(i,function(t,e){e.method.apply(this,Array.prototype.slice.call(e.args))})},1)}function O(){var e=!1;return void 0!=N.settings[arguments[0]]?(void 0!=arguments[1]&&(N.settings[arguments[0]]=arguments[1]),e=N.settings[arguments[0]]):t.error("No option "+arguments[0]+" found in jQuery.multilevelpushmenu"),e}function q(){var t=!1;return function(e){(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))&&(t=!0)}(navigator.userAgent||navigator.vendor||window.opera),t}var z,_,N=this,P=t(this),B=void 0!=P.context?P:t("body"),G=e&&void 0!=e.menu?e.menu:P.find("nav"),Q=t.extend({container:B,containersToPush:null,menuID:(void 0!=B.prop("id")&&""!=B.prop("id")?B.prop("id"):this.nodeName.toLowerCase())+"_multilevelpushmenu",wrapperClass:"multilevelpushmenu_wrapper",menuInactiveClass:"multilevelpushmenu_inactive",menu:G,menuWidth:0,menuHeight:0,collapsed:!1,fullCollapse:!1,direction:"ltr",backText:"Back",backItemClass:"backItemClass",backItemIcon:"fa fa-angle-right",groupIcon:"fa fa-angle-left",mode:"overlap",overlapWidth:40,preventItemClick:!0,preventGroupItemClick:!0,swipe:"both",onCollapseMenuStart:function(){},onCollapseMenuEnd:function(){},onExpandMenuStart:function(){},onExpandMenuEnd:function(){},onGroupItemClick:function(){},onItemClick:function(){},onTitleItemClick:function(){},onBackItemClick:function(){},onMenuReady:function(){},onMenuSwipe:function(){}},e);t.data(N,"plugin_multilevelpushmenu")||(t.data(N,"plugin_multilevelpushmenu",Q),N.settings=t.data(N,"plugin_multilevelpushmenu"));var Y={init:function(){return k.apply(this,Array.prototype.slice.call(arguments))},collapse:function(){return T.apply(this,Array.prototype.slice.call(arguments))},expand:function(){return D.apply(this,Array.prototype.slice.call(arguments))},menuexpanded:function(){return $.apply(this,Array.prototype.slice.call(arguments))},activemenu:function(){return S.apply(this,Array.prototype.slice.call(arguments))},findmenusbytitle:function(){return L.apply(this,Array.prototype.slice.call(arguments))},finditemsbyname:function(){return M.apply(this,Array.prototype.slice.call(arguments))},pathtoroot:function(){return V.apply(this,Array.prototype.slice.call(arguments))},comparepaths:function(){return E.apply(this,Array.prototype.slice.call(arguments))},option:function(){return O.apply(this,Array.prototype.slice.call(arguments))},additems:function(){return j.apply(this,Array.prototype.slice.call(arguments))},removeitems:function(){return X.apply(this,Array.prototype.slice.call(arguments))},redraw:function(){return w.apply(this,Array.prototype.slice.call(arguments))},visiblemenus:function(){return f.apply(this,Array.prototype.slice.call(arguments))},hiddenmenus:function(){return y.apply(this,Array.prototype.slice.call(arguments))},propagateevent:function(){return s.apply(this,Array.prototype.slice.call(arguments))}};return q()?(z="touchend",_="touchmove"):(z="click",_="mousedown"),Y[e]?(returnValue=Y[e].apply(this,Array.prototype.slice.call(i,1)),returnValue):"object"!=typeof e&&e?(t.error("No "+e+" method found in jQuery.multilevelpushmenu"),void(returnValue||(returnValue=this))):(returnValue=Y.init.apply(this,arguments),returnValue)}),returnValue}}(jQuery);
;
/**
 * @file
 * Integrate codrops' ResponsiveMultiLevelMenu library with Responsive Menus.
 */
(function ($) {
  Drupal.behaviors.mlpm = {
    attach: function (context, settings) {
      settings.responsive_menus = settings.responsive_menus || {};
      var $windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      $.each(settings.responsive_menus, function(ind, iteration) {
        if (iteration.responsive_menus_style != 'mlpm') {
          return true;
        }
        if (!iteration.selectors.length) {
          return;
        }
        // Only apply if window size is correct.  Runs once on page load.
        var $media_size = iteration.media_size || 768;
        if ($windowWidth <= $media_size || $media_size == 0) {
          //change array of strings to array of jquery elements
          var $contToPush = [];
          for (i in iteration.push) {
            $contToPush.push($(iteration.push[i]));
          }
          // Call mlpm with our settings.
          $(iteration.selectors).once('responsive-menus-mlpm', function() {
            if (iteration.nav_block == 1) {
              $(this).wrapInner("<nav id=" + iteration.nav_block_name + "></nav>");
            }
            if (iteration.move_to) {
              $(this).detach().prependTo(iteration.move_to);
            }
            //set up a menu toggle button
            if (iteration.toggle_container) {
              $(iteration.toggle_container).prepend("<a id='mlpm-toggle' href='#'>" + iteration.toggle_text + "</a>");
              $('#mlpm-toggle').click({menu:this}, function(event) {
                if ($(event.data.menu).multilevelpushmenu('visiblemenus') == false) {
                  $(event.data.menu).multilevelpushmenu('expand');
                } else {
                  $(event.data.menu).multilevelpushmenu('collapse');
                }
              });
            }
            //make clicking on certain elements close the menu (for the off menu click effect)
            if (iteration.off_menu) {
              $(iteration.off_menu).click({menu: this}, function(event) {
                if ($(event.data.menu).multilevelpushmenu('visiblemenus') != false) {
                  $(event.data.menu).multilevelpushmenu('collapse');
                }
              });
            }

            //Define the multi level push menu
            $(this).multilevelpushmenu({
              container: $(this),
              menuID: iteration.nav_block_name,
              direction: iteration.direction,
              menuHeight: iteration.menu_height,
              mode: iteration.mode,
              collapsed: iteration.collapsed == 1,
              fullCollapse: iteration.full_collapse == 1,
              swipe: iteration.swipe,
              containersToPush: $contToPush,
              backText: iteration.back_text,
              backItemClass: iteration.back_class,
              backItemIcon: iteration.back_icon,
              groupIcon: iteration.group_icon,
              onItemClick: function() {
                $item = arguments[2];
                var itemHref = $item.find('a:first').attr('href');
                location.href = itemHref;
              },
              onExpandMenuEnd: function () {
                //Browse back through the layers of the menu during overlap
                $menu = arguments[0];
                $('.multilevelpushmenu_inactive').click({menu: $menu.container}, function (event) {
                  event.data.menu.multilevelpushmenu('collapse', $(this).attr('data-level'));
                });
              }
            });
          });
        }

      });

    }
  };
}(jQuery));;
(function ($) {

  Drupal.behaviors.captcha = {
    attach: function (context) {

      // Turn off autocompletion for the CAPTCHA response field.
      // We do it here with JavaScript (instead of directly in the markup)
      // because this autocomplete attribute is not standard and
      // it would break (X)HTML compliance.
      $("#edit-captcha-response").attr("autocomplete", "off");

    }
  };

  Drupal.behaviors.captchaAdmin = {
    attach: function (context) {
      // Add onclick handler to checkbox for adding a CAPTCHA description
      // so that the textfields for the CAPTCHA description are hidden
      // when no description should be added.
      // @todo: div.form-item-captcha-description depends on theming, maybe
      // it's better to add our own wrapper with id (instead of a class).
      $("#edit-captcha-add-captcha-description").click(function() {
        if ($("#edit-captcha-add-captcha-description").is(":checked")) {
          // Show the CAPTCHA description textfield(s).
          $("div.form-item-captcha-description").show('slow');
        }
        else {
          // Hide the CAPTCHA description textfield(s).
          $("div.form-item-captcha-description").hide('slow');
        }
      });
      // Hide the CAPTCHA description textfields if option is disabled on page load.
      if (!$("#edit-captcha-add-captcha-description").is(":checked")) {
        $("div.form-item-captcha-description").hide();
      }
    }

  };

})(jQuery);
;
/**
 * @file
 * JavaScript behaviors for the front-end display of webforms.
 */

(function ($) {

  "use strict";

  Drupal.behaviors.webform = Drupal.behaviors.webform || {};

  Drupal.behaviors.webform.attach = function (context) {
    // Calendar datepicker behavior.
    Drupal.webform.datepicker(context);

    // Conditional logic.
    if (Drupal.settings.webform && Drupal.settings.webform.conditionals) {
      Drupal.webform.conditional(context);
    }
  };

  Drupal.webform = Drupal.webform || {};

  Drupal.webform.datepicker = function (context) {
    $('div.webform-datepicker').each(function () {
      var $webformDatepicker = $(this);
      var $calendar = $webformDatepicker.find('input.webform-calendar');

      // Ensure the page we're on actually contains a datepicker.
      if ($calendar.length == 0) {
        return;
      }

      var startDate = $calendar[0].className.replace(/.*webform-calendar-start-(\d{4}-\d{2}-\d{2}).*/, '$1').split('-');
      var endDate = $calendar[0].className.replace(/.*webform-calendar-end-(\d{4}-\d{2}-\d{2}).*/, '$1').split('-');
      var firstDay = $calendar[0].className.replace(/.*webform-calendar-day-(\d).*/, '$1');
      // Convert date strings into actual Date objects.
      startDate = new Date(startDate[0], startDate[1] - 1, startDate[2]);
      endDate = new Date(endDate[0], endDate[1] - 1, endDate[2]);

      // Ensure that start comes before end for datepicker.
      if (startDate > endDate) {
        var laterDate = startDate;
        startDate = endDate;
        endDate = laterDate;
      }

      var startYear = startDate.getFullYear();
      var endYear = endDate.getFullYear();

      // Set up the jQuery datepicker element.
      $calendar.datepicker({
        dateFormat: 'yy-mm-dd',
        yearRange: startYear + ':' + endYear,
        firstDay: parseInt(firstDay),
        minDate: startDate,
        maxDate: endDate,
        onSelect: function (dateText, inst) {
          var date = dateText.split('-');
          $webformDatepicker.find('select.year, input.year').val(+date[0]).trigger('change');
          $webformDatepicker.find('select.month').val(+date[1]).trigger('change');
          $webformDatepicker.find('select.day').val(+date[2]).trigger('change');
        },
        beforeShow: function (input, inst) {
          // Get the select list values.
          var year = $webformDatepicker.find('select.year, input.year').val();
          var month = $webformDatepicker.find('select.month').val();
          var day = $webformDatepicker.find('select.day').val();

          // If empty, default to the current year/month/day in the popup.
          var today = new Date();
          year = year ? year : today.getFullYear();
          month = month ? month : today.getMonth() + 1;
          day = day ? day : today.getDate();

          // Make sure that the default year fits in the available options.
          year = (year < startYear || year > endYear) ? startYear : year;

          // jQuery UI Datepicker will read the input field and base its date
          // off of that, even though in our case the input field is a button.
          $(input).val(year + '-' + month + '-' + day);
        }
      });

      // Prevent the calendar button from submitting the form.
      $calendar.click(function (event) {
        $(this).focus();
        event.preventDefault();
      });
    });
  };

  Drupal.webform.conditional = function (context) {
    // Add the bindings to each webform on the page.
    $.each(Drupal.settings.webform.conditionals, function (formKey, settings) {
      var $form = $('.' + formKey + ':not(.webform-conditional-processed)');
      $form.each(function (index, currentForm) {
        var $currentForm = $(currentForm);
        $currentForm.addClass('webform-conditional-processed');
        $currentForm.bind('change', {'settings': settings}, Drupal.webform.conditionalCheck);

        // Trigger all the elements that cause conditionals on this form.
        Drupal.webform.doConditions($currentForm, settings);
      });
    });
  };

  /**
   * Event handler to respond to field changes in a form.
   *
   * This event is bound to the entire form, not individual fields.
   */
  Drupal.webform.conditionalCheck = function (e) {
    var $triggerElement = $(e.target).closest('.webform-component');
    var $form = $triggerElement.closest('form');
    var triggerElementKey = $triggerElement.attr('class').match(/webform-component--[^ ]+/)[0];
    var settings = e.data.settings;
    if (settings.sourceMap[triggerElementKey]) {
      Drupal.webform.doConditions($form, settings);
    }
  };

  /**
   * Processes all conditional.
   */
  Drupal.webform.doConditions = function ($form, settings) {

    var stackPointer;
    var resultStack;

    /**
     * Initializes an execution stack for a conditional group's rules.
     *
     * Also initializes sub-conditional rules.
     */
    function executionStackInitialize(andor) {
      stackPointer = -1;
      resultStack = [];
      executionStackPush(andor);
    }

    /**
     * Starts a new subconditional for the given and/or operator.
     */
    function executionStackPush(andor) {
      resultStack[++stackPointer] = {
        results: [],
        andor: andor,
      };
    }

    /**
     * Adds a rule's result to the current sub-conditional.
     */
    function executionStackAccumulate(result) {
      resultStack[stackPointer]['results'].push(result);
    }

    /**
     * Finishes a sub-conditional and adds the result to the parent stack frame.
     */
    function executionStackPop() {
      // Calculate the and/or result.
      var stackFrame = resultStack[stackPointer];
      // Pop stack and protect against stack underflow.
      stackPointer = Math.max(0, stackPointer - 1);
      var $conditionalResults = stackFrame['results'];
      var filteredResults = $.map($conditionalResults, function (val) {
        return val ? val : null;
      });
      return stackFrame['andor'] === 'or'
                ? filteredResults.length > 0
                : filteredResults.length === $conditionalResults.length;
    }

    // Track what has been set/hidden for each target component's elements.
    // Hidden elements must be disabled because if they are required and don't
    // have a value, they will prevent submission due to html5 validation.
    // Each execution of the conditionals adds a temporary class
    // webform-disabled-flag so that elements hidden or set can be disabled and
    // also be prevented from being re-enabled by another conditional (such as a
    // parent fieldset). After processing conditionals, this temporary class
    // must be removed in preparation for the next execution of the
    // conditionals.
    $.each(settings.ruleGroups, function (rgid_key, rule_group) {
      var ruleGroup = settings.ruleGroups[rgid_key];

      // Perform the comparison callback and build the results for this group.
      executionStackInitialize(ruleGroup['andor']);
      $.each(ruleGroup['rules'], function (m, rule) {
        switch (rule['source_type']) {
          case 'component':
            var elementKey = rule['source'];
            var element = $form.find('.' + elementKey)[0];
            var existingValue = settings.values[elementKey] ? settings.values[elementKey] : null;
            executionStackAccumulate(window['Drupal']['webform'][rule.callback](element, existingValue, rule['value']));
            break;

          case 'conditional_start':
            executionStackPush(rule['andor']);
            break;

          case 'conditional_end':
            executionStackAccumulate(executionStackPop());
            break;
        }
      });
      var conditionalResult = executionStackPop();

      $.each(ruleGroup['actions'], function (aid, action) {
        var $target = $form.find('.' + action['target']);
        var actionResult = action['invert'] ? !conditionalResult : conditionalResult;
        switch (action['action']) {
          case 'show':
            var changed = actionResult != Drupal.webform.isVisible($target);
            if (actionResult) {
              $target.find('.webform-conditional-disabled:not(.webform-disabled-flag)')
                .removeClass('webform-conditional-disabled')
                .webformProp('disabled', false);
              $target
                .removeClass('webform-conditional-hidden')
                .show();
              $form.find('.chosen-disabled').prev().trigger('chosen:updated.chosen');
            }
            else {
              $target
                .hide()
                .addClass('webform-conditional-hidden')
                .find(':input')
                  .addClass('webform-conditional-disabled webform-disabled-flag')
                  .webformProp('disabled', true);
            }
            if (changed && $target.is('tr')) {
              Drupal.webform.restripeTable($target.closest('table').first());
            }
            break;

          case 'require':
            var $requiredSpan = $target.find('.form-required, .form-optional').first();
            if (actionResult != $requiredSpan.hasClass('form-required')) {
              var $targetInputElements = $target.find("input:text,textarea,input[type='email'],select,input:radio,input:file");
              // Rather than hide the required tag, remove it so that other
              // jQuery can respond via Drupal behaviors.
              Drupal.detachBehaviors($requiredSpan);
              $targetInputElements
                .webformProp('required', actionResult)
                .toggleClass('required', actionResult);
              if (actionResult) {
                $requiredSpan.replaceWith('<span class="form-required" title="' + Drupal.t('This field is required.') + '">*</span>');
              }
              else {
                $requiredSpan.replaceWith('<span class="form-optional"></span>');
              }
              Drupal.attachBehaviors($requiredSpan);
            }
            break;

          case 'set':
            var $texts = $target.find("input:text,textarea,input[type='email']");
            var $selects = $target.find('select,select option,input:radio,input:checkbox');
            var $markups = $target.filter('.webform-component-markup');
            if (actionResult) {
              var multiple = $.map(action['argument'].split(','), $.trim);
              $selects
                .webformVal(multiple)
                .webformProp('disabled', true)
                  .addClass('webform-disabled-flag');
              $texts
                .val([action['argument']])
                .webformProp('readonly', true)
                .addClass('webform-disabled-flag');
              // A special case is made for markup. It is sanitized with
              // filter_xss_admin on the server. otherwise text() should be used
              // to avoid an XSS vulnerability. text() however would preclude
              // the use of tags like <strong> or <a>.
              $markups.html(action['argument']);
            }
            else {
              $selects.not('.webform-disabled-flag')
                .webformProp('disabled', false);
              $texts.not('.webform-disabled-flag')
                .webformProp('readonly', false);
              // Markup not set? Then restore original markup as provided in
              // the attribute data-webform-markup.
              $markups.each(function () {
                var $this = $(this);
                var original = $this.data('webform-markup');
                if (original !== undefined) {
                  $this.html(original);
                }
              });
            }
            break;
        }
      }); // End look on each action for one conditional.
    }); // End loop on each conditional.

    $form.find('.webform-disabled-flag').removeClass('webform-disabled-flag');
  };

  /**
   * Event handler to prevent propagation of events.
   *
   * Typically click for disabling radio and checkboxes.
   */
  Drupal.webform.stopEvent = function () {
    return false;
  };

  Drupal.webform.conditionalOperatorStringEqual = function (element, existingValue, ruleValue) {
    var returnValue = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase() === ruleValue.toLowerCase()) {
        returnValue = true;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringNotEqual = function (element, existingValue, ruleValue) {
    var found = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase() === ruleValue.toLowerCase()) {
        found = true;
      }
    });
    return !found;
  };

  Drupal.webform.conditionalOperatorStringContains = function (element, existingValue, ruleValue) {
    var returnValue = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase().indexOf(ruleValue.toLowerCase()) > -1) {
        returnValue = true;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringDoesNotContain = function (element, existingValue, ruleValue) {
    var found = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase().indexOf(ruleValue.toLowerCase()) > -1) {
        found = true;
      }
    });
    return !found;
  };

  Drupal.webform.conditionalOperatorStringBeginsWith = function (element, existingValue, ruleValue) {
    var returnValue = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase().indexOf(ruleValue.toLowerCase()) === 0) {
        returnValue = true;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringEndsWith = function (element, existingValue, ruleValue) {
    var returnValue = false;
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    $.each(currentValue, function (n, value) {
      if (value.toLowerCase().lastIndexOf(ruleValue.toLowerCase()) === value.length - ruleValue.length) {
        returnValue = true;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringEmpty = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var returnValue = true;
    $.each(currentValue, function (n, value) {
      if (value !== '') {
        returnValue = false;
        return false; // break.
      }
    });
    return returnValue;
  };

  Drupal.webform.conditionalOperatorStringNotEmpty = function (element, existingValue, ruleValue) {
    return !Drupal.webform.conditionalOperatorStringEmpty(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorSelectGreaterThan = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    return Drupal.webform.compare_select(currentValue[0], ruleValue, element) > 0;
  };

  Drupal.webform.conditionalOperatorSelectGreaterThanEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var comparison = Drupal.webform.compare_select(currentValue[0], ruleValue, element);
    return comparison > 0 || comparison === 0;
  };

  Drupal.webform.conditionalOperatorSelectLessThan = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    return Drupal.webform.compare_select(currentValue[0], ruleValue, element) < 0;
  };

  Drupal.webform.conditionalOperatorSelectLessThanEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var comparison = Drupal.webform.compare_select(currentValue[0], ruleValue, element);
    return comparison < 0 || comparison === 0;
  };

  Drupal.webform.conditionalOperatorNumericEqual = function (element, existingValue, ruleValue) {
    // See float comparison: http://php.net/manual/en/language.types.float.php
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var epsilon = 0.000001;
    // An empty string does not match any number.
    return currentValue[0] === '' ? false : (Math.abs(parseFloat(currentValue[0]) - parseFloat(ruleValue)) < epsilon);
  };

  Drupal.webform.conditionalOperatorNumericNotEqual = function (element, existingValue, ruleValue) {
    // See float comparison: http://php.net/manual/en/language.types.float.php
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    var epsilon = 0.000001;
    // An empty string does not match any number.
    return currentValue[0] === '' ? true : (Math.abs(parseFloat(currentValue[0]) - parseFloat(ruleValue)) >= epsilon);
  };

  Drupal.webform.conditionalOperatorNumericGreaterThan = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    return parseFloat(currentValue[0]) > parseFloat(ruleValue);
  };

  Drupal.webform.conditionalOperatorNumericGreaterThanEqual = function (element, existingValue, ruleValue) {
    return Drupal.webform.conditionalOperatorNumericGreaterThan(element, existingValue, ruleValue) ||
           Drupal.webform.conditionalOperatorNumericEqual(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorNumericLessThan = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.stringValue(element, existingValue);
    return parseFloat(currentValue[0]) < parseFloat(ruleValue);
  };

  Drupal.webform.conditionalOperatorNumericLessThanEqual = function (element, existingValue, ruleValue) {
    return Drupal.webform.conditionalOperatorNumericLessThan(element, existingValue, ruleValue) ||
           Drupal.webform.conditionalOperatorNumericEqual(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorDateEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return currentValue === ruleValue;
  };

  Drupal.webform.conditionalOperatorDateNotEqual = function (element, existingValue, ruleValue) {
    return !Drupal.webform.conditionalOperatorDateEqual(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorDateBefore = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return (currentValue !== false) && currentValue < ruleValue;
  };

  Drupal.webform.conditionalOperatorDateBeforeEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return (currentValue !== false) && (currentValue < ruleValue || currentValue === ruleValue);
  };

  Drupal.webform.conditionalOperatorDateAfter = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return (currentValue !== false) && currentValue > ruleValue;
  };

  Drupal.webform.conditionalOperatorDateAfterEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.dateValue(element, existingValue);
    return (currentValue !== false) && (currentValue > ruleValue || currentValue === ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeEqual = function (element, existingValue, ruleValue) {
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return currentValue === ruleValue;
  };

  Drupal.webform.conditionalOperatorTimeNotEqual = function (element, existingValue, ruleValue) {
    return !Drupal.webform.conditionalOperatorTimeEqual(element, existingValue, ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeBefore = function (element, existingValue, ruleValue) {
    // Date and time operators intentionally exclusive for "before".
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return (currentValue !== false) && (currentValue < ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeBeforeEqual = function (element, existingValue, ruleValue) {
    // Date and time operators intentionally exclusive for "before".
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return (currentValue !== false) && (currentValue < ruleValue || currentValue === ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeAfter = function (element, existingValue, ruleValue) {
    // Date and time operators intentionally inclusive for "after".
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return (currentValue !== false) && (currentValue > ruleValue);
  };

  Drupal.webform.conditionalOperatorTimeAfterEqual = function (element, existingValue, ruleValue) {
    // Date and time operators intentionally inclusive for "after".
    var currentValue = Drupal.webform.timeValue(element, existingValue);
    return (currentValue !== false) && (currentValue > ruleValue || currentValue === ruleValue);
  };

  /**
   * Utility function to compare values of a select component.
   *
   * @param string a
   *   First select option key to compare
   * @param string b
   *   Second select option key to compare
   * @param array options
   *   Associative array where the a and b are within the keys
   *
   * @return integer based upon position of $a and $b in $options
   *   -N if $a above (<) $b
   *   0 if $a = $b
   *   +N if $a is below (>) $b
   */
  Drupal.webform.compare_select = function (a, b, element) {
    var optionList = [];
    $('option,input:radio,input:checkbox', element).each(function () {
      optionList.push($(this).val());
    });
    var a_position = optionList.indexOf(a);
    var b_position = optionList.indexOf(b);
    return (a_position < 0 || b_position < 0) ? null : a_position - b_position;
  };

  /**
   * Utility to return current visibility.
   *
   * Uses actual visibility, except for hidden components which use the applied
   * disabled class.
   */
  Drupal.webform.isVisible = function ($element) {
    return $element.hasClass('webform-component-hidden')
              ? !$element.find('input').first().hasClass('webform-conditional-disabled')
              : $element.closest('.webform-conditional-hidden').length == 0;
  };

  /**
   * Function to get a string value from a select/radios/text/etc. field.
   */
  Drupal.webform.stringValue = function (element, existingValue) {
    var value = [];
    if (element) {
      var $element = $(element);
      if (Drupal.webform.isVisible($element)) {
        // Checkboxes and radios.
        $element.find('input[type=checkbox]:checked,input[type=radio]:checked').each(function () {
          value.push(this.value);
        });
        // Select lists.
        if (!value.length) {
          var selectValue = $element.find('select').val();
          if (selectValue) {
            if ($.isArray(selectValue)) {
              value = selectValue;
            }
            else {
              value.push(selectValue);
            }
          }
        }
        // Simple text fields. This check is done last so that the select list
        // in select-or-other fields comes before the "other" text field.
        if (!value.length) {
          $element.find('input:not([type=checkbox],[type=radio]),textarea').each(function () {
            value.push(this.value);
          });
        }
      }
    }
    else {
      switch ($.type(existingValue)) {
        case 'array':
          value = existingValue;
          break;

        case 'string':
          value.push(existingValue);
          break;
      }
    }
    return value;
  };

  /**
   * Utility function to calculate a second-based timestamp from a time field.
   */
  Drupal.webform.dateValue = function (element, existingValue) {
    var value = false;
    if (element) {
      var $element = $(element);
      if (Drupal.webform.isVisible($element)) {
        var day = $element.find('[name*=day]').val();
        var month = $element.find('[name*=month]').val();
        var year = $element.find('[name*=year]').val();
        // Months are 0 indexed in JavaScript.
        if (month) {
          month--;
        }
        if (year !== '' && month !== '' && day !== '') {
          value = Date.UTC(year, month, day) / 1000;
        }
      }
    }
    else {
      if ($.type(existingValue) === 'array' && existingValue.length) {
        existingValue = existingValue[0];
      }
      if ($.type(existingValue) === 'string') {
        existingValue = existingValue.split('-');
      }
      if (existingValue.length === 3) {
        value = Date.UTC(existingValue[0], existingValue[1], existingValue[2]) / 1000;
      }
    }
    return value;
  };

  /**
   * Utility function to calculate a millisecond timestamp from a time field.
   */
  Drupal.webform.timeValue = function (element, existingValue) {
    var value = false;
    if (element) {
      var $element = $(element);
      if (Drupal.webform.isVisible($element)) {
        var hour = $element.find('[name*=hour]').val();
        var minute = $element.find('[name*=minute]').val();
        var ampm = $element.find('[name*=ampm]:checked').val();

        // Convert to integers if set.
        hour = (hour === '') ? hour : parseInt(hour);
        minute = (minute === '') ? minute : parseInt(minute);

        if (hour !== '') {
          hour = (hour < 12 && ampm == 'pm') ? hour + 12 : hour;
          hour = (hour === 12 && ampm == 'am') ? 0 : hour;
        }
        if (hour !== '' && minute !== '') {
          value = Date.UTC(1970, 0, 1, hour, minute) / 1000;
        }
      }
    }
    else {
      if ($.type(existingValue) === 'array' && existingValue.length) {
        existingValue = existingValue[0];
      }
      if ($.type(existingValue) === 'string') {
        existingValue = existingValue.split(':');
      }
      if (existingValue.length >= 2) {
        value = Date.UTC(1970, 0, 1, existingValue[0], existingValue[1]) / 1000;
      }
    }
    return value;
  };

  /**
   * Make a prop shim for jQuery < 1.9.
   */
  $.fn.webformProp = $.fn.webformProp || function (name, value) {
    if (value) {
      return $.fn.prop ? this.prop(name, true) : this.attr(name, true);
    }
    else {
      return $.fn.prop ? this.prop(name, false) : this.removeAttr(name);
    }
  };

  /**
   * Make a multi-valued val() function.
   *
   * This is for setting checkboxes, radios, and select elements.
   */
  $.fn.webformVal = function (values) {
    this.each(function () {
      var $this = $(this);
      var value = $this.val();
      var on = $.inArray($this.val(), values) != -1;
      if (this.nodeName == 'OPTION') {
        $this.webformProp('selected', on ? value : false);
      }
      else {
        $this.val(on ? [value] : false);
      }
    });
    return this;
  };

  /**
   * Given a table's DOM element, restripe the odd/even classes.
   */
  Drupal.webform.restripeTable = function (table) {
    // :even and :odd are reversed because jQuery counts from 0 and
    // we count from 1, so we're out of sync.
    // Match immediate children of the parent element to allow nesting.
    $('> tbody > tr, > tr', table)
      .filter(':visible:odd').filter('.odd')
        .removeClass('odd').addClass('even')
      .end().end()
      .filter(':visible:even').filter('.even')
        .removeClass('even').addClass('odd');
  };

})(jQuery);
;
/**
 * jQuery Validation Plugin 1.11.0pre
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2012 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($) {

$.extend($.fn, {
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if (!this.length) {
			if (options && options.debug && window.console) {
				console.warn( "nothing selected, can't validate, returning nothing" );
			}
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data(this[0], 'validator');
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr('novalidate', 'novalidate');

		validator = new $.validator( options, this[0] );
		$.data(this[0], 'validator', validator);

		if ( validator.settings.onsubmit ) {

			this.validateDelegate( ":submit", "click", function(ev) {
				if ( validator.settings.submitHandler ) {
					validator.submitButton = ev.target;
				}
				// allow suppressing validation by adding a cancel class to the submit button
				if ( $(ev.target).hasClass('cancel') ) {
					validator.cancelSubmit = true;
				}
			});

			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug ) {
					// prevent form submit to be able to see console output
					event.preventDefault();
				}
				function handle() {
					var hidden;
					if ( validator.settings.submitHandler ) {
						if (validator.submitButton) {
							// insert a hidden input as a replacement for the missing submit button
							hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);
						}
						validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if (validator.submitButton) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						return false;
					}
					return true;
				}

				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}

		return validator;
	},
	// http://docs.jquery.com/Plugins/Validation/valid
	valid: function() {
		if ( $(this[0]).is('form')) {
			return this.validate().form();
		} else {
			var valid = true;
			var validator = $(this[0].form).validate();
			this.each(function() {
				valid &= validator.element(this);
			});
			return valid;
		}
	},
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function(attributes) {
		var result = {},
			$element = this;
		$.each(attributes.split(/\s/), function(index, value) {
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		});
		return result;
	},
	// http://docs.jquery.com/Plugins/Validation/rules
	rules: function(command, argument) {
		var element = this[0];

		if (command) {
			var settings = $.data(element.form, 'validator').settings;
			var staticRules = settings.rules;
			var existingRules = $.validator.staticRules(element);
			switch(command) {
			case "add":
				$.extend(existingRules, $.validator.normalizeRule(argument));
				staticRules[element.name] = existingRules;
				if (argument.messages) {
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				}
				break;
			case "remove":
				if (!argument) {
					delete staticRules[element.name];
					return existingRules;
				}
				var filtered = {};
				$.each(argument.split(/\s/), function(index, method) {
					filtered[method] = existingRules[method];
					delete existingRules[method];
				});
				return filtered;
			}
		}

		var data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules(element),
			$.validator.attributeRules(element),
			$.validator.dataRules(element),
			$.validator.staticRules(element)
		), element);

		// make sure required is at front
		if (data.required) {
			var param = data.required;
			delete data.required;
			data = $.extend({required: param}, data);
		}

		return data;
	}
});

// Custom selectors
$.extend($.expr[":"], {
	// http://docs.jquery.com/Plugins/Validation/blank
	blank: function(a) {return !$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/filled
	filled: function(a) {return !!$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/unchecked
	unchecked: function(a) {return !a.checked;}
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

$.validator.format = function(source, params) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.validator.format.apply( this, args );
		};
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray(arguments).slice(1);
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each(params, function(i, n) {
		source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	});
	return source;
};

$.extend($.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function(element, event) {
			this.lastActive = element;

			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.addWrapper(this.errorsFor(element)).hide();
			}
		},
		onfocusout: function(element, event) {
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
				this.element(element);
			}
		},
		onkeyup: function(element, event) {
			if ( event.which === 9 && this.elementValue(element) === '' ) {
				return;
			} else if ( element.name in this.submitted || element === this.lastElement ) {
				this.element(element);
			}
		},
		onclick: function(element, event) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element(element);
			}
			// or option elements, check parent select in that case
			else if (element.parentNode.name in this.submitted) {
				this.element(element.parentNode);
			}
		},
		highlight: function(element, errorClass, validClass) {
			if (element.type === 'radio') {
				this.findByName(element.name).addClass(errorClass).removeClass(validClass);
			} else {
				$(element).addClass(errorClass).removeClass(validClass);
			}
		},
		unhighlight: function(element, errorClass, validClass) {
			if (element.type === 'radio') {
				this.findByName(element.name).removeClass(errorClass).addClass(validClass);
			} else {
				$(element).removeClass(errorClass).addClass(validClass);
			}
		}
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
	setDefaults: function(settings) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format("Please enter no more than {0} characters."),
		minlength: $.validator.format("Please enter at least {0} characters."),
		rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
		range: $.validator.format("Please enter a value between {0} and {1}."),
		max: $.validator.format("Please enter a value less than or equal to {0}."),
		min: $.validator.format("Please enter a value greater than or equal to {0}.")
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $(this.settings.errorLabelContainer);
			this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
			this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = (this.groups = {});
			$.each(this.settings.groups, function(key, value) {
				if (typeof value === "string") {
					value = value.split(/\s/);
				}
				$.each(value, function(index, name) {
					groups[name] = key;
				});
			});
			var rules = this.settings.rules;
			$.each(rules, function(key, value) {
				rules[key] = $.validator.normalizeRule(value);
			});

			function delegate(event) {
				var validator = $.data(this[0].form, "validator"),
					eventType = "on" + event.type.replace(/^validate/, "");
				if (validator.settings[eventType]) {
          validator.settings['name_event'] = eventType;
					validator.settings[eventType].call(validator, this[0], event);
				}
			}
			$(this.currentForm)
				.validateDelegate(":text, [type='password'], [type='file'], select, textarea, " +
					"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
					"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], " +
					"[type='range'], [type='color'] ",
					"focusin focusout keyup", delegate)
				.validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

			if (this.settings.invalidHandler) {
				$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
			}
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/form
		form: function() {
			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalid = $.extend({}, this.errorMap);
			if (!this.valid()) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
				this.check( elements[i] );
			}
			return this.valid();
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/element
		element: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element ) !== false;
			if (result) {
				delete this.invalid[element.name];
			} else {
				this.invalid[element.name] = true;
			}
			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
		showErrors: function(errors) {
			if(errors) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[name],
						element: this.findByName(name)[0]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function(element) {
					return !(element.name in errors);
				});
			}
			if (this.settings.showErrors) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$( this.currentForm ).resetForm();
			}
			this.submitted = {};
			this.lastElement = null;
			this.prepareForm();
			this.hideErrors();
			this.elements().removeClass( this.settings.errorClass ).removeData( "previousValue" );
		},

		numberOfInvalids: function() {
			return this.objectLength(this.invalid);
		},

		objectLength: function( obj ) {
			var count = 0;
			for ( var i in obj ) {
				count++;
			}
			return count;
		},

		hideErrors: function() {
			this.addWrapper( this.toHide ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if( this.settings.focusInvalid ) {
				try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
					.filter(":visible")
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger("focusin");
				} catch(e) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function(n) {
				return n.element.name === lastActive.name;
			}).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// select all valid inputs inside the form (no submit or reset buttons)
			return $(this.currentForm)
			.find("input, select, textarea")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				if ( !this.name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this);
				}

				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) ) {
					return false;
				}

				rulesCache[this.name] = true;
				return true;
			});
		},

		clean: function( selector ) {
			return $( selector )[0];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.replace(' ', '.');
			return $( this.settings.errorElement + "." + errorClass, this.errorContext );
		},

		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $([]);
			this.toHide = $([]);
			this.currentElements = $([]);
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor(element);
		},

		elementValue: function( element ) {
			var type = $(element).attr('type'),
				val = $(element).val();

			if ( type === 'radio' || type === 'checkbox' ) {
				return $('input[name="' + $(element).attr('name') + '"]:checked').val();
			}

			if ( typeof val === 'string' ) {
				return val.replace(/\r/g, "");
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $(element).rules();
			var dependencyMismatch = false;
			var val = this.elementValue(element);
			var result;

			for (var method in rules ) {
				var rule = { method: method, parameters: rules[method] };
				try {

					result = $.validator.methods[method].call( this, val, element, rule.parameters );

					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					}

					if( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch(e) {
					if ( this.settings.debug && window.console ) {
						console.log("exception occured when checking element " + element.id + ", check the '" + rule.method + "' method", e);
					}
					throw e;
				}
			}
			if (dependencyMismatch) {
				return;
			}
			if ( this.objectLength(rules) ) {
				this.successList.push(element);
			}
			return true;
		},

		// return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		customDataMessage: function(element, method) {
			return $(element).data('msg-' + method.toLowerCase()) || (element.attributes && $(element).attr('data-msg-' + method.toLowerCase()));
		},

		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[name];
			return m && (m.constructor === String ? m : m[method]);
		},

		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for(var i = 0; i < arguments.length; i++) {
				if (arguments[i] !== undefined) {
					return arguments[i];
				}
			}
			return undefined;
		},

		defaultMessage: function( element, method) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customDataMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call(this, rule.parameters, element);
			} else if (theregex.test(message)) {
				message = $.validator.format(message.replace(theregex, '{$1}'), rule.parameters);
			}
			this.errorList.push({
				message: message,
				element: element
			});

			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},

		addWrapper: function(toToggle) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements;
			for ( i = 0; this.errorList[i]; i++ ) {
				var error = this.errorList[i];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if (this.settings.success) {
				for ( i = 0; this.successList[i]; i++ ) {
					this.showLabel( this.successList[i] );
				}
			}
			if (this.settings.unhighlight) {
				for ( i = 0, elements = this.validElements(); elements[i]; i++ ) {
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not(this.invalidElements());
		},

		invalidElements: function() {
			return $(this.errorList).map(function() {
				return this.element;
			});
		},

		showLabel: function(element, message) {
			var label = this.errorsFor( element );
			if ( label.length ) {
				// refresh error/success class
				label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

				// check if we have a generated label, replace the message then
				if ( label.attr("generated") ) {
					label.html(message);
				}
			} else {
				// create label
				label = $("<" + this.settings.errorElement + "/>")
					.attr({"for":  this.idOrName(element), generated: true})
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				}
				if ( !this.labelContainer.append(label).length ) {
					if ( this.settings.errorPlacement ) {
						this.settings.errorPlacement(label, $(element) );
					} else {
						label.insertAfter(element);
					}
				}
			}
			if ( !message && this.settings.success ) {
				label.text("");
				if ( typeof this.settings.success === "string" ) {
					label.addClass( this.settings.success );
				} else {
					this.settings.success( label, element );
				}
			}
			this.toShow = this.toShow.add(label);
		},

		errorsFor: function(element) {
			var name = this.idOrName(element);
			return this.errors().filter(function() {
				return $(this).attr('for') === name;
			});
		},

		idOrName: function(element) {
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		},

		validationTargetFor: function(element) {
			// if radio/checkbox, validate first element in group instead
			if (this.checkable(element)) {
				element = this.findByName( element.name ).not(this.settings.ignore)[0];
			}
			return element;
		},

		checkable: function( element ) {
			return (/radio|checkbox/i).test(element.type);
		},

		findByName: function( name ) {
			return $(this.currentForm).find('[name="' + name + '"]');
		},

		getLength: function(value, element) {
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				return $("option:selected", element).length;
			case 'input':
				if( this.checkable( element) ) {
					return this.findByName(element.name).filter(':checked').length;
				}
			}
			return value.length;
		},

		depend: function(param, element) {
			return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
		},

		dependTypes: {
			"boolean": function(param, element) {
				return param;
			},
			"string": function(param, element) {
				return !!$(param, element.form).length;
			},
			"function": function(param, element) {
				return param(element);
			}
		},

		optional: function(element) {
			var val = this.elementValue(element);
			return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
		},

		startRequest: function(element) {
			if (!this.pending[element.name]) {
				this.pendingRequest++;
				this.pending[element.name] = true;
			}
		},

		stopRequest: function(element, valid) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if (this.pendingRequest < 0) {
				this.pendingRequest = 0;
			}
			delete this.pending[element.name];
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
				$(this.currentForm).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
				this.formSubmitted = false;
			}
		},

		previousValue: function(element) {
			return $.data(element, "previousValue") || $.data(element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}

	},

	classRuleSettings: {
		required: {required: true},
		email: {email: true},
		url: {url: true},
		date: {date: true},
		dateISO: {dateISO: true},
		number: {number: true},
		digits: {digits: true},
		creditcard: {creditcard: true}
	},

	addClassRules: function(className, rules) {
		if ( className.constructor === String ) {
			this.classRuleSettings[className] = rules;
		} else {
			$.extend(this.classRuleSettings, className);
		}
	},

	classRules: function(element) {
		var rules = {};
		var classes = $(element).attr('class');
		if ( classes ) {
			$.each(classes.split(' '), function() {
				if (this in $.validator.classRuleSettings) {
					$.extend(rules, $.validator.classRuleSettings[this]);
				}
			});
		}
		return rules;
	},

	attributeRules: function(element) {
		var rules = {};
		var $element = $(element);

		for (var method in $.validator.methods) {
			var value;

			// support for <input required> in both html5 and older browsers
			if (method === 'required') {
				value = $element.get(0).getAttribute(method);
				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if (value === "") {
					value = true;
				}
				// force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr(method);
			}

			if (value) {
				rules[method] = value;
			} else if ($element[0].getAttribute("type") === method) {
				rules[method] = true;
			}
		}

		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function(element) {
		var method, value,
			rules = {}, $element = $(element);
		for (method in $.validator.methods) {
			value = $element.data('rule-' + method.toLowerCase());
			if (value !== undefined) {
				rules[method] = value;
			}
		}
		return rules;
	},

	staticRules: function(element) {
		var rules = {};
		var validator = $.data(element.form, 'validator');
		if (validator.settings.rules) {
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
		}
		return rules;
	},

	normalizeRules: function(rules, element) {
		// handle dependency check
		$.each(rules, function(prop, val) {
			// ignore rule when param is explicitly false, eg. required:false
			if (val === false) {
				delete rules[prop];
				return;
			}
			if (val.param || val.depends) {
				var keepRule = true;
				switch (typeof val.depends) {
				case "string":
					keepRule = !!$(val.depends, element.form).length;
					break;
				case "function":
					keepRule = val.depends.call(element, element);
					break;
				}
				if (keepRule) {
					rules[prop] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[prop];
				}
			}
		});

		// evaluate parameters
		$.each(rules, function(rule, parameter) {
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		});

		// clean number parameters
		$.each(['minlength', 'maxlength', 'min', 'max'], function() {
			if (rules[this]) {
				rules[this] = Number(rules[this]);
			}
		});
		$.each(['rangelength', 'range'], function() {
			var parts;
			if (rules[this]) {
				if ($.isArray(rules[this])) {
					rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
				} else if (typeof rules[this] === 'string') {
					parts = rules[this].split(/[\s,]+/);
					rules[this] = [Number(parts[0]), Number(parts[1])];
				}
			}
		});

		if ($.validator.autoCreateRanges) {
			// auto-create ranges
			if (rules.min && rules.max) {
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			}
			if (rules.minlength && rules.maxlength) {
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function(data) {
		if( typeof data === "string" ) {
			var transformed = {};
			$.each(data.split(/\s/), function() {
				transformed[this] = true;
			});
			data = transformed;
		}
		return data;
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function(name, method, message) {
		$.validator.methods[name] = method;
		$.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
		if (method.length < 3) {
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		}
	},

	methods: {

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function(value, element, param) {
			// check if dependency is met
			if ( !this.depend(param, element) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			}
			if ( this.checkable(element) ) {
				return this.getLength(value, element) > 0;
			}
			return $.trim(value).length > 0;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function(value, element, param) {
			if ( this.optional(element) ) {
				return "dependency-mismatch";
			}

			var previous = this.previousValue(element);
			if (!this.settings.messages[element.name] ) {
				this.settings.messages[element.name] = {};
			}
			previous.originalMessage = this.settings.messages[element.name].remote;
			this.settings.messages[element.name].remote = previous.message;

			param = typeof param === "string" && {url:param} || param;

			if ( previous.old === value ) {
				return previous.valid;
			}

			previous.old = value;
			var validator = this;
			this.startRequest(element);
			var data = {};
			data[element.name] = value;
			$.ajax($.extend(true, {
				url: param,
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				success: function(response) {
					validator.settings.messages[element.name].remote = previous.originalMessage;
					var valid = response === true || response === "true";
					if ( valid ) {
						var submitted = validator.formSubmitted;
						validator.prepareElement(element);
						validator.formSubmitted = submitted;
						validator.successList.push(element);
						delete validator.invalid[element.name];
						validator.showErrors();
					} else {
						var errors = {};
						var message = response || validator.defaultMessage( element, "remote" );
						errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
						validator.invalid[element.name] = true;
						validator.showErrors(errors);
					}
					previous.valid = valid;
					validator.stopRequest(element, valid);
				}
			}, param));
			return "pending";
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function(value, element, param) {
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || length >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function(value, element, param) {
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || length <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function(value, element, param) {
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/min
		min: function( value, element, param ) {
			return this.optional(element) || value >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/max
		max: function( value, element, param ) {
			return this.optional(element) || value <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/range
		range: function( value, element, param ) {
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function(value, element) {
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function(value, element) {
			return this.optional(element) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function(value, element) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function(value, element) {
			return this.optional(element) || /^\d+$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function(value, element) {
			if ( this.optional(element) ) {
				return "dependency-mismatch";
			}
			// accept only spaces, digits and dashes
			if (/[^0-9 \-]+/.test(value)) {
				return false;
			}
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (var n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n);
				nDigit = parseInt(cDigit, 10);
				if (bEven) {
					if ((nDigit *= 2) > 9) {
						nDigit -= 9;
					}
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return (nCheck % 10) === 0;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function(value, element, param) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $(param);
			if (this.settings.onfocusout) {
				target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
					$(element).valid();
				});
			}
			return value === target.val();
		}

	}

});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

}(jQuery));

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
(function($) {
	var pendingRequests = {};
	// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) {
		$.ajaxPrefilter(function(settings, _, xhr) {
			var port = settings.port;
			if (settings.mode === "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = xhr;
			}
		});
	} else {
		// Proxy ajax
		var ajax = $.ajax;
		$.ajax = function(settings) {
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if (mode === "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				return (pendingRequests[port] = ajax.apply(this, arguments));
			}
			return ajax.apply(this, arguments);
		};
	}
}(jQuery));

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
(function($) {
	$.extend($.fn, {
		validateDelegate: function(delegate, type, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		}
	});
}(jQuery));
;
