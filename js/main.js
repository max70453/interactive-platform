

(function($) {
	const eventsData = [
		{ 
			id: 1, 
			name: 'Ярмарка вакансий в IT', 
			date: '2025-02-15', 
			description: 'Крупнейшая ярмарка вакансий в сфере информационных технологий. Встречи с ведущими работодателями, презентации компаний, собеседования.', 
			url: 'events/it-job-fair', 
			duration: '6 часов', 
			format: 'Офлайн', 
			type: 'Ярмарка вакансий', 
			sfera: 'IT', 
			organizer: 'TechRecruit' 
		},
		{ 
			id: 2, 
			name: 'Мастер-класс по управлению проектами', 
			date: '2025-02-20', 
			description: 'Практический мастер-класс по методологиям управления проектами. Разбор кейсов, практические задания, networking.', 
			url: 'events/pm-masterclass', 
			duration: '3 часа', 
			format: 'Гибрид', 
			type: 'Мастер-класс', 
			sfera: 'Менеджмент', 
			organizer: 'PM School' 
		},
		{ 
			id: 3, 
			name: 'День карьеры в финансах', 
			date: '2025-03-05', 
			description: 'Презентации ведущих финансовых компаний, воркшопы по финансовому анализу, консультации по построению карьеры в финансовом секторе.', 
			url: 'events/finance-career-day', 
			duration: '8 часов', 
			format: 'Офлайн', 
			type: 'День карьеры', 
			sfera: 'Финансы', 
			organizer: 'FinPro' 
		},
		{ 
			id: 4, 
			name: 'Вебинар по digital-маркетингу', 
			date: '2025-03-15', 
			description: 'Онлайн-семинар по последним трендам в digital-маркетинге. Стратегии продвижения, инструменты аналитики, практические кейсы.', 
			url: 'events/digital-marketing-webinar', 
			duration: '2 часа', 
			format: 'Онлайн', 
			type: 'Вебинар', 
			sfera: 'Маркетинг', 
			organizer: 'Digital Pro' 
		},
		{ 
			id: 5, 
			name: 'Форум молодых специалистов', 
			date: '2025-04-10', 
			description: 'Масштабный форум для начинающих специалистов. Выступления экспертов, карьерные консультации, нетворкинг.', 
			url: 'events/young-professionals-forum', 
			duration: '2 дня', 
			format: 'Офлайн', 
			type: 'Форум', 
			sfera: 'Карьерное развитие', 
			organizer: 'Career Lab' 
		},
		{ 
			id: 6, 
			name: 'Тренинг по soft skills', 
			date: '2025-04-20', 
			description: 'Интенсивный тренинг по развитию soft skills. Коммуникация, лидерство, тайм-менеджмент, эмоциональный интеллект.', 
			url: 'events/soft-skills-training', 
			duration: '4 часа', 
			format: 'Гибрид', 
			type: 'Тренинг', 
			sfera: 'Личностное развитие', 
			organizer: 'Skill Up' 
		}
	]
	localStorage.setItem('events', JSON.stringify(eventsData));
    "use strict";
     $(document).on('ready', function() {	
	
		/*===============================
			Search Form JS
		=================================*/
		$('.search-area .icon').on( "click", function(){
			$('.search-area').toggleClass('active');
		});		
		
		/*===============================
			Mobile Menu JS
		=================================*/
		$('.menu').slicknav({
			prependTo:".mobile-menu",
			duration: 600,
			closeOnClick:true,
		});
		

		/*================================
			Nice Select JS
		==================================*/ 
		// $('select').niceSelect();
		
		
		/*================================
			Course Single Slider JS
		==================================*/ 
		$('.course-single-gallery').owlCarousel({
			items:1,
			autoplay:true,
			loop:false,
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			autoplayTimeout:5000,
			autoplayHoverPause:true,
			smartSpeed: 500,
			merge:true,
			nav:true,
			navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
			dots:false
		});
		
		/*================================
			Testimonials JS
		==================================*/ 
		$('.testimonial-slider').owlCarousel({
			items:1,
			autoplay:false,
			autoplayTimeout:3000,
			smartSpeed: 500,
			autoplayHoverPause:true,
			margin:0,
			loop:true,
			merge:true,
			center:false,
			nav:false,
			dots:true,
		});	
		
		
		/*================================
			News Slider JS
		==================================*/ 
		$('.news-slider').owlCarousel({
			autoplay:false,
			autoplayTimeout:3500,
			smartSpeed: 600,
			autoplayHoverPause:true,
			margin:10,
			loop:true,
			merge:true,
			dots:false,
			nav:true,
			navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
			responsive:{
				300: {
					items:1,
					nav:false,
				},
				480: {
					items:1,
					nav:false,
				},
				768: {
					items:2,
					nav:false,
				},
				1170: {
					items:2,
				},
			}
		});	
		
		/*================================
			Events Slider JS
		==================================*/
		$('.event-gallery').owlCarousel({
			items:1,
			autoplay:false,
			autoplayTimeout:3500,
			smartSpeed: 600,
			autoplayHoverPause:true,
			animateOut: 'fadeOut',
			animateIn: 'fadeIn',
			margin:0,
			loop:true,
			merge:true,
			nav:true,
			navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
			dots:false,
		});	
		
		/*================================
			Clients Slider JS
		==================================*/
		$('.client-slider').owlCarousel({
			autoplay:false,
			autoplayTimeout:3500,
			smartSpeed: 600,
			autoplayHoverPause:true,
			margin:30,
			loop:true,
			merge:true,
			nav:false,
			dots:false,
			responsive:{
				300: {
					items:2,
				},
				480: {
					items:3,
				},
				768: {
					items:3,
				},
				1170: {
					items:4,
				},
			}
		});	
		
		/*================================
			Image Gallery JS
		==================================*/
		$('#gallery-item').cubeportfolio({
			filters: '#gallery-menu',
			loadMore: '#loadMore',
			loadMoreAction: 'click',
			defaultFilter: '*',
			layoutMode: 'grid',
			animationType: 'quicksand',
			gridAdjustment: 'responsive',
			gapHorizontal: 20,
			gapVertical: 20,
				mediaQueries: [{
					width: 1100,
					cols: 3,
				},{
					width: 768,
					cols: 3,
				}, {
					width: 480,
					cols: 2,
				},{
					width: 0,
					cols: 1,
				}],
				caption: 'overlayBottomPush',
				displayType: 'sequentially',
				displayTypeSpeed: 80,

			// lightbox
			lightboxDelegate: '.cbp-lightbox',
			lightboxGallery: true,
			lightboxTitleSrc: 'data-title',
			lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
		});

		
		/*================================
			CounterUp JS
		==================================*/
		$('.counter').counterUp({
			delay: 10,
			time: 4000
			
		});	
		
		/*================================
			Circle JS
		==================================*/
		$('.circle').circleProgress({
			fill: {
				color: '#05C46B'
			}
		})
		
		
		/*================================
			Faqs JS
		==================================*/
		$('.panel').on('click', function() {
            $(".panel").removeClass("active");
            $(this).addClass("active");
		});
		
		/*================================
			VideoPopup JS
		==================================*/
		$('.video-popup').magnificPopup({
			type: 'iframe',
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});
	
		/*================================
			Parallax JS
		==================================*/
		$(window).stellar({
            responsive: true,
            positionProperty: 'position',
			horizontalOffset: 0,
			verticalOffset: 0,
            horizontalScrolling: false
        });
		
		/*=====================================
			Final CountDown
		======================================*/ 
		$('[data-countdown]').each(function() {
			var $this = $(this),
				finalDate = $(this).data('countdown');
			$this.countdown(finalDate, function(event) {
				$this.html(event.strftime(
					'<div class="cdown"><span class="days"><strong>%-D</strong><p>Days</p></span></div><div class="cdown"><span class="hour"><strong> %-H</strong><p>Hours</p></span></div> <div class="cdown"><span class="minutes"><strong>%M</strong> <p>Minutes</p></span></div><div class="cdown"><span class="second"><strong> %S</strong><p>Seconds</p></span></div>'
				));
			});
		});
		
		
		/*================================
			ScrollUp JS
		==================================*/
		$.scrollUp({
			scrollName: 'scrollUp',      // Element ID
			scrollDistance: 300,         // Distance from top/bottom before showing element (px)
			scrollFrom: 'top',           // 'top' or 'bottom'
			scrollSpeed: 1000,            // Speed back to top (ms)
			animation: 'fade',           // Fade, slide, none
			animationSpeed: 200,         // Animation speed (ms)
			scrollTrigger: false,        // Set a custom triggering element. Can be an HTML string or jQuery object
			scrollTarget: false,         // Set a custom target element for scrolling to. Can be element or number
			easing: 'easeInOutQuart',
			scrollText: ["<i class='fa fa-home'></i>"], // Text for element, can contain HTML
			scrollTitle: false,          // Set a custom <a> title if required.
			scrollImg: false,            // Set true to use image
			activeOverlay: false,        // Set CSS color to display scrollUp active point, e.g '#00FFFF'
			zIndex: 2147483647           // Z-Index for the overlay
		});
	
	});
		
		/*================================
			Preloader JS
		==================================*/
		$(window).on('load', function() {
				$('.book_preload').fadeOut('slow', function(){
				$(this).remove();
			});
		});
})(jQuery);
		