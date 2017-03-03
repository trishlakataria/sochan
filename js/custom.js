/*	################################################################
	File Name: custom.js
	Template Name: D'one
	Created By: Shah Zobayer Ahmed
	http://themencoder.com

	1) PRELOADER
	2) FIX MENU
	3) YOUTUBE VIDEO
    4) OWL QUOTE ACTIVATION
    5) ISOTOPE WORK
    6) OWL CLIENT ACTIVATION
    7) OWL TESTIMONIAL ACTIVATION
    8) SKILL PROGRESS BAR
    9) COUNTER UP
    10) NICESCROLL

################################################################# */

$('document').ready(function() {


    $(".navbar-toggle").click(function(){
        $(this).toggleClass("mbl-menu");
    });


    /*==============================
       FIX MENU
    ==============================*/
    (function($){
        // menu fixed
        var navHeight = window.innerHeight - 86;
        var nav = $('.header-section');
        $(window).scroll(function () {
            if ($(this).scrollTop() > navHeight ) {
                nav.addClass("fixed");
            } else {
                nav.removeClass("fixed");
            }
        });

        var lastId,
        topMenu = $("#top-menu"),
        topMenuHeight = topMenu.outerHeight()+15,
        menuItems = topMenu.find("a"),
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

        // so we can get a fancy scroll animation
        menuItems.click(function(e){
            var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 300);
            e.preventDefault();
        });

        // Bind to scroll
        $(window).scroll(function(){
            var fromTop = $(this).scrollTop()+topMenuHeight;
            var cur = scrollItems.map(function(){
                if ($(this).offset().top < fromTop)
                return this;
            });
           cur = cur[cur.length-1];
           var id = cur && cur.length ? cur[0].id : "";
           if (lastId !== id) {
                lastId = id;
                menuItems
                 .parent().removeClass("active")
                 .end().filter("[href=#"+id+"]").parent().addClass("active");
            }
        });
    })(jQuery);
	
	

	//for skills
	(function($){
        $('.progressbar').each(function(){
    		var t = $(this);
    		var dataperc = t.attr('data-perc'),
    				barperc = Math.round(dataperc*5);
    		t.find('.bar').animate({width:barperc}, dataperc*25);
    		t.find('.label').append('<div class="perc"></div>');

    		function perc() {
    			var length = t.find('.bar').css('width'),
    				perc = Math.round(parseInt(length)/5.56),
    				labelpos = (parseInt(length)-1);
    			t.find('.label').css('left', labelpos);
    			t.find('.perc').text(perc+'%');
    		}
    		perc();
    		setInterval(perc, 0);
        });
		
    })(jQuery);


    /*==============================
        JQUERY NICESCROLL
    ==============================*/
    (function($){
        $("html").niceScroll({
            cursorborder:"",
            cursorcolor:"#00F",
            boxzoom:false,
            scrollspeed:60,
            cursorcolor: "#fbd202",
            cursorwidth: "5px",
            zindex: "9999999",
            mousescrollstep:40,
            enablemousewheel: true,
        });
   })(jQuery);

   //Pretty Photo
	 $("a[data-gallery^='prettyPhoto']").prettyPhoto({
	  social_tools: false
	 });

	
	 //for preloader
	 (function () {
	    $(window).load(function() {
	        $('#preloader-item').fadeOut();
	        $('#preloader').delay(350).fadeOut('slow');
	    });
	}());
	
	
	// Testimonials Carousel
	
	var testimonial = $("#testimonial-carousel");

	testimonial.owlCarousel({
		navigation : true,
		pagination: true,
		slideSpeed : 1000,
		stopOnHover: true,
		autoPlay: 3000,
		singleItem: true,
		navigationText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>']
	});

	//for scroll to top
	var btt= $('.back-top');  
	    btt.on('click',function (){
		   $('html,body').animate({
		      scrollTop:0
		   },700);
		});
		
		
		 //for animated
		new WOW().init();
	   
	   
		// for isotope
	  var $container = $('.isotope').isotope({
		itemSelector: '.element-item',
		layoutMode: 'fitRows',
		getSortData: {
		  name: '.name',
		  symbol: '.symbol',
		  number: '.number parseInt',
		  category: '[data-category]',
		  weight: function( itemElem ) {
			var weight = $( itemElem ).find('.weight').text();
			return parseFloat( weight.replace( /[\(\)]/g, '') );
		  }
		}
	  });

	  // filter functions
	  var filterFns = {
		// show if number is greater than 50
		numberGreaterThan50: function() {
		  var number = $(this).find('.number').text();
		  return parseInt( number, 10 ) > 50;
		},
		// show if name ends with -ium
		ium: function() {
		  var name = $(this).find('.name').text();
		  return name.match( /ium$/ );
		}
	  };

	  // bind filter button click
	  $('#filters').on( 'click', 'button', function() {
		var filterValue = $( this ).attr('data-filter');
		// use filterFn if matches value
		filterValue = filterFns[ filterValue ] || filterValue;
		$container.isotope({ filter: filterValue });
	  });

	  // bind sort button click
	  $('#sorts').on( 'click', 'button', function() {
		var sortByValue = $(this).attr('data-sort-by');
		$container.isotope({ sortBy: sortByValue });
	  });
	  
	  // change is-checked class on buttons
	  $('.button-group').each( function( i, buttonGroup ) {
		var $buttonGroup = $( buttonGroup );
		$buttonGroup.on( 'click', 'button', function() {
		  $buttonGroup.find('.is-checked').removeClass('is-checked');
		  $( this ).addClass('is-checked');
		});
	  });
	  
  
});
