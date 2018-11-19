new WOW().init();
var user = detect.parse(navigator.userAgent);

jQuery(document).ready(function() {
	$('.header ul').onePageNav({
		currentClass: '_active',
		changeHash: false,
		scrollSpeed: 1000,
		scrollThreshold: 0.5,
		filter: '',
		easing: 'swing',
	});

	function is_touch_device() {
		return 'ontouchstart' in window        // works on most browsers 
			|| navigator.maxTouchPoints;       // works on IE10/11 and Surface
	};

	if (user.browser.family != 'Safari') {
		//if (!is_touch_device()) {
			$('.parallax-layer').each(function(indx, element) {
				var el = $(element);

				el.parallax({
					xorigin: 1,
					yorigin: 1,
					xparallax: '100px',
					yparallax: '200px'
				});
				
				$('body').trigger('mouseenter');
			});

			$('.cost__tabs li').click(function() {
				$(this).closest('.cost').find('.cost__images_item').eq($(this).index()).addClass('_active').siblings().removeClass('_active');
			});
		/*} else {
			$('.ftitle__img').addClass('_notouch');
		}*/
	}

	var browser = user.browser.family.toLowerCase(),
		os = user.os.family.toLowerCase();

	$('html').addClass('html-'+browser.replace(/\s/ig, '')+' html-'+os.replace(/\s/ig, ''));

	$('.reviews__items').slick({
		slidesToShow: 2,
		slidesToScroll: 2,
		infinite: true,
		prevArrow: $('.reviews__arrow--prev'),
		nextArrow: $('.reviews__arrow--next'),
		speed: 600,
		adaptiveHeight: true,
		responsive: [{
			breakpoint: 750,
			settings: {
				slidesToScroll: 1,
				slidesToShow: 1
			}
		}],
	});

	$('.clients__items').slick({
		slidesToShow: 10,
		slidesToScroll: 1,
		infinite: true,
		prevArrow: $('.clients__arrow--prev'),
		nextArrow: $('.clients__arrow--next'),
		speed: 600,
		adaptiveHeight: true,
		variableWidth: true,
		autoplay: true,
  		autoplaySpeed: 1500,
		responsive: [{
			breakpoint: 750,
			settings: {
				slidesToScroll: 3,
				slidesToShow: 3,
			}
		}, {
			breakpoint: 480,
			settings: {
				slidesToScroll: 2,
				slidesToShow: 2,
			}
		}]
	});

	/*$('.clients__items').liMarquee({
		direction: 'left', //Направление движения бегущей строки (left | right | up | down)
		circular: true, //Если "true" - строка непрерывная
		scrolldelay: 0, //Величина задержки в миллисекундах между движениями
		scrollamount: 60, //Скорость движения контента (px/sec)
		hoverstop: false,
		drag: false,
	});*/

	$('.header__icon').click(function(event) {
		$('.header ul').fadeToggle(150);
		$(this).toggleClass('_open');
		event.stopPropagation();
	});

	$('.header ul').click(function(event) {
		if ($(window).outerWidth() < 750) {
			event.stopPropagation();
		}
	});

	$(window).click(function(event) {
		if ($(window).outerWidth() < 750) {
			if ($('.header ul').css('display') != 'none') {
				$('.header ul').fadeOut(150);
				$('.header__icon').removeClass('_open');
			}
		}
	});

	$('.scrollTo').click(function(event) {
		var id = $(this).attr('href');

		$('body').animate({
			scrollTop: $(id).offset().top
		}, 1500, 'swing');

		event.preventDefault();
		event.stopPropagation();

		return false;
	});

	$('.modal-link').click(function(event) {
		var id = $(this).attr('href');

		$(id).arcticmodal();

		event.preventDefault();
		event.stopPropagation();

		return false;
	});

	function openModal(id) {
		$(id).arcticmodal();

		return false;
	}

	$.arcticmodal('setDefault', {
		overlay: {
			css: {
				backgroundColor: '#000000',
				opacity: .5
			}
		},
		beforeOpen: function() {
			$('html').addClass('html--fixed')
		},
		afterClose: function() {
			$('html').removeClass('html--fixed')
		}
	});

	$('.request__form form').submit(function(event) {

 console.log('function 1');
			$("#btn").click(
			function(){
				sendAjaxForm('result_form', 'ajax_form', 'https://app-1527939627.000webhostapp.com/rem.php');
				return false; 
			}
		);

	 
	function sendAjaxForm(result_form, ajax_form, url) {
			$.ajax({
					url:     url, //url страницы (action_ajax_form.php)
					type:     "POST", //метод отправки
					dataType: "html", //формат данных
					data: $("#"+ajax_form).serialize(),  // Сеарилизуем объект
					success: function(response) { //Данные отправлены успешно
						result = $.parseJSON(response);
						$('#result_form').html('Имя: '+result.name+'<br>Телефон: '+result.phonenumber);
				},
				error: function(response) { // Данные не отправлены
							$('#result_form').html('Ошибка. Данные не отправлены.');
				}
		 });
	}
	console.log('function');
		openModal('#popup-request');
		console.log('function');

		return false;
	});

	if (window.device) {
		if (device.tablet() || device.ipad() || device.windows()) {
			$('#meta-viewport').attr({'content':'width=750px'});
		}

		if (device.mobile()) {
			$('#meta-viewport').attr({'content': 'width=device-width, initial-scale=1, maximum-scale=1'});
		}
	}
});

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 55.793041, lng: 37.591642},
		zoom: 15,
		scrollwheel: false,
		disableDoubleClickZoom: true,
		styles: [
		  {
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#212121"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.icon",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#757575"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#212121"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#757575"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.country",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#9e9e9e"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.land_parcel",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.locality",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#bdbdbd"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#757575"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#181818"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#616161"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#1b1b1b"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "geometry.fill",
		    "stylers": [
		      {
		        "color": "#2c2c2c"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#8a8a8a"
		      }
		    ]
		  },
		  {
		    "featureType": "road.arterial",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#373737"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#3c3c3c"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway.controlled_access",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#4e4e4e"
		      }
		    ]
		  },
		  {
		    "featureType": "road.local",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#616161"
		      }
		    ]
		  },
		  {
		    "featureType": "transit",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#757575"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#000000"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#3d3d3d"
		      }
		    ]
		  }
		]
	});

	var marker = new google.maps.Marker({
		position: {lat: 55.793041, lng: 37.591642},
		map: map,
	});
}
