(function(jQuery) {
	jQuery('.responsive').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
  
});


jQuery('.responsive_4').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
  
});
  
  jQuery('.single-news-item').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
	arrows: false
  });
  jQuery('.single-item').slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
	arrows: false
  });
    jQuery('.single-itemArrow').slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
	arrows: true
  });
}(jQuery));


 jQuery(document).ready(function () {
     jQuery("#respMenu").aceResponsiveMenu({
         resizeWidth: '768', // Set the same in Media query       
         animationSpeed: 'fast', //slow, medium, fast
         accoridonExpAll: false //Expands all the accordion menu on click
     });
	 
	  var wow_animations = new WOW({
		boxClass: 'wow',
		animateClass: 'animated'
	});
	wow_animations.init();	
	 
 });


jQuery( document ).ready(function () {
		jQuery(".moreBox").slice(0, 2).show();
		if (jQuery(".blogBox:hidden").length != 0) {
			jQuery("#loadMore").show();
		}		
		jQuery("#loadMore").on('click', function (e) {
			e.preventDefault();
			jQuery(".moreBox:hidden").slice(0, 6).slideDown();
			if (jQuery(".moreBox:hidden").length == 0) {
				jQuery("#loadMore").fadeOut('slow');
				jQuery("#article-shortLink").fadeOut('slow');
			}
		});
		
		jQuery(".moreBox1").slice(0, 2).show();
		if (jQuery(".blogBox1:hidden").length != 0) {
			jQuery("#loadMore1").show();
		}		
		jQuery("#loadMore1").on('click', function (e) {
			e.preventDefault();
			jQuery(".moreBox1:hidden").slice(0, 6).slideDown();
			if (jQuery(".moreBox1:hidden").length == 0) {
				jQuery("#loadMore1").fadeOut('slow');
			}
		});
		
		jQuery(".moreBox2").slice(0, 2).show();
		if (jQuery(".blogBox2:hidden").length != 0) {
			jQuery("#loadMore2").show();
		}		
		jQuery("#loadMore2").on('click', function (e) {
			e.preventDefault();
			jQuery(".moreBox2:hidden").slice(0, 6).slideDown();
			if (jQuery(".moreBox2:hidden").length == 0) {
				jQuery("#loadMore2").fadeOut('slow');
			}
		});
		
		jQuery(".moreBox3").slice(0, 2).show();
		if (jQuery(".blogBox3:hidden").length != 0) {
		jQuery("#loadMore3").show();
		}
		jQuery("#loadMore3").on('click', function (e) {
		e.preventDefault();
		jQuery(".moreBox3:hidden").slice(0, 6).slideDown();
		if (jQuery(".moreBox3:hidden").length == 0) {
		jQuery("#loadMore3").fadeOut('slow');
		}
		});
	});


function showHide(e) {
    document.getElementById(e) && ("none" != document.getElementById(e + "-show").style.display ? (jQuery("#" + e + "-show").hide(), jQuery("#" + e).slideDown("slow")) : (jQuery("#" + e + "-show").show(), jQuery("#" + e).slideUp("slow")))
} 
// career page script
jQuery(function () {
            jQuery('#dg-container').carrousel({
                current: 0,
                autoplay: true,
                interval: 3000
            });
        });



jQuery(document).ready(function() {
  jQuery('#fullview-slide').skdslider({
          slideSelector: '.slide',
          delay:5000,
          animationSpeed:2000,
          showNextPrev:false,
          showPlayButton:false,
          autoSlide:true,
          animationType:'sliding'
        });

  jQuery(".min_accordion_head").click(function() {
    if (jQuery('.min_accordion_body').is(':visible')) {
      jQuery(".min_accordion_body").slideUp(300);
      jQuery(".plusminus").html('<i class="mdi mdi-36px mdi-plus"></i>');
    }
    if (jQuery(this).next(".min_accordion_body").is(':visible')) {
      jQuery(this).next(".min_accordion_body").slideUp(300);
      jQuery(this).children(".plusminus").html('<i class="mdi mdi-36px mdi-plus"></i>');
    } else {
      jQuery(this).next(".min_accordion_body").slideDown(300);
      jQuery(this).children(".plusminus").html('<i class="mdi mdi-36px mdi-minus"></i>');
    }
  });
});


function openVerticalTabs(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("Vertabcontent1");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

if(!jQuery("#defaultOpen").length == 0) {
  document.getElementById("defaultOpen").click();
}

jQuery( "#frm_stayuptodate_global" ).on( "submit", function(e) {
jQuery.ajax({
	type: 'POST',
	url: '/ajaxcalls/resources-stayuptodate-global.php',
	dataType: 'json',
	data: jQuery("#frm_stayuptodate_global").serialize(),
	success: function(data) {
		//jQuery("#sign_me_up").val('Sign Me Up');
		if (data.status == '0') {
			jQuery("#frm_error_element").html(data.errmsg);
			//setTimeout(function(){jQuery('#frm_error_element').fadeOut();}, 5000);
			return false;
		} else {
			jQuery('#frm_stayuptodate_global').trigger("reset");
			jQuery("#resources_sticky_content").html(data.thankyoumsg);
			jQuery.cookie("resource_widget", "closed", {expires: 1000, path: "/", domain: "birlasoft.com"}),
			setTimeout(function(){jQuery('#resourceWidgetId').fadeOut();}, 5000);
			
		}
	}
});
e.preventDefault();
});

jQuery(document).scroll(function() {
  var y = jQuery(this).scrollTop(),
      news = jQuery('#resources-sticky');
    
  if (y >= 475) {
    news.slideDown();
  } else {
    news.slideUp();
  }
 
});