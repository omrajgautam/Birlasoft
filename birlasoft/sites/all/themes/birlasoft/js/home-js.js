jQuery(window).load(function(jQuery) {
	jQuery('.single-item').slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
	arrows: false
  });
    jQuery('.single-news-item').slick({
	autoplay: true,
	dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
	arrows: false
  });
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