$(document).ready(function(){

	var winWidth = $(window).width();
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	window.onresize = function(event) {
    	let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	};


	$("#nav").on("click","a", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
		top = $(id).offset().top;
		$('.main__wrapper').removeClass('fixed');
		$('body,html').animate({scrollTop: top}, 900);
		if (winWidth < 960){
			$('#header').css('transform', 'translateX(-275px)');
			$('.mob__menu').css('opacity', '1');
		}

	});


	$('.slider').owlCarousel({
		loop:true,
		margin:0,
		nav:true,
		items:1,
		smartSpeed: 800,
		autoplay: true,
		autoplayTimeout: 3500
	})

	$('.smart-basket__form').submit(function (e) {
		var form = this;
		var numItem = $('.smart-basket__product-item').length;
		e.preventDefault();

		console.log('.smart-basket__form');

		if(numItem < 2){
			$('.smart-basket__empty-title').css('display','block');
		} else {
			$('.wrap__thanks').fadeIn(500);
			setTimeout(function(){
				form.submit();
			}, 2500);
		}
	});

	$('#mask_phone').inputmask("+7(999)999-99-99");

	$(window).scroll(function(){
		if ($(this).scrollTop() > 300) {
			$('.totop').fadeIn(500);
		} else {
			$('.totop').fadeOut(500);
		}
	});

	$('.totop').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 600);
		return false;
	});

	$('.trigger').on('click', function() {
		$('.modal-wrapper').toggleClass('open');
		$('.page-wrapper').toggleClass('blur-it');
		return false;
	});

	$('.head').on('click', function (){
		$('.modal-wrapper').removeClass('open');
	})

	$('.mob__menu').on('click', function (){
//		block_scroll();
		$('.main__wrapper').addClass('fixed');
		$('#header').css('transform', 'translateX(0)');
		$('.mob__menu').css('opacity', '0');
	})

/*	function block_scroll(){
		if(winWidth < 960){
			$('.is-preload').css({"height":"100vh", "overflow-y":"hidden"});
		}
	}

*/

	$('.close__menu').on('click', function (){
		$('.main__wrapper').removeClass('fixed');
		$('#header').css('transform', 'translateX(-275px)');
		$('.mob__menu').css('opacity', '1');
//		$('.is-preload').css({"height":"auto", "overflow":"auto"});
	})

	if (winWidth < 960) {
		$(window).scroll(function(){
			if ($(window).scrollTop() > $("#main").offset().top) {
				$('.one').addClass('fixed');
				$('.mob__menu').addClass('fixed');
			}
			else {
				$('.one').removeClass('fixed');
				$('.mob__menu').removeClass('fixed');
			};
		});

		jQuery('body').swipe( {
		swipeStatus:function(event, phase, direction, distance, duration, fingerCount, fingerData, currentDirection)
		{
			if (phase=="end"){
				//сработает через 20 пикселей то число которое выбрали в threshold
				if (direction == 'left') {
					$('.main__wrapper').removeClass('fixed');
					$('#header').css('transform', 'translateX(-275px)');
					$('.mob__menu').css('opacity', '1');
					$('.is-preload').css({"height":"auto", "overflow":"auto"});
				}
			}
		},
		threshold: 60
		})

	}

});

//корзина покупки
$('.smart-basket__min').on('click', function (e) {
	e.preventDefault();
//    $('.wrap__form').addClass('wrap__form--active');
	$('.btn.btn-primary').click();
	var min_count = $('.smart-basket__min-count').text();
	var productCost = $('.smart-basket__product-item').children('.buy').attr('data-sb-product-price');
	var productItems = $('.smart-basket__product-item').children('.buy').attr('data-sb-product-quantity');
	var quantity__cost = 0;

//счетчик
	$('.smart-basket__quantity-common').text('Всего товаров: ' + min_count);
	$('.smart-basket__product-item .smart-basket__product-price-common .smart-basket__input').each(function () {
		quantity__cost += parseFloat(this.value);
	});
	$('.smart-basket__form').find('.all__items__cost').attr('value', quantity__cost);
	$('.smart-basket__price-common span').text(quantity__cost);
});

//продолжить покупки
$('.smart-basket__close-form').on('click', function(e){
	e.preventDefault();
	$('#header').css('display','flex');
	$('#header').css('transform', 'translateX(0px)');
	$('.mob__menu').css('opacity', '0');
	$('.is-preload').css('overflow-y', 'auto');
	$('.wrap__form').removeClass('wrap__form--active');
	$('.mob__menu').css('display', 'block');
	$('.smart-basket__empty-title').css('display','none');

	
		var txt = $('.smart-basket__quantity-common').text();
		txt = txt.replace(/[^0-9]/g, '');
		console.log('тест ' + txt);
	$('.smart-basket__min-count').text(txt);
});


$('.product__size-element:first-child').addClass('product__size-element_active');
//удалить класс с ближайшего элемента
$('.product__size-element').on('click', function (e) {
	e.preventDefault();
	$(this).closest('.card').find('.product__size-element_active').removeClass('product__size-element_active');
	$(this).addClass('product__size-element_active');
	var cost__value = $(this).attr('data-sb-curent-price');
	var size__value = $(this).attr('data-sb-curent-size');
	$(this).closest('.card').find('.product__price-number').html(cost__value);
	$(this).closest('.card').find('.buy').attr({
		'data-sb-product-price': cost__value,
		'data-sb-product-size': size__value
	});
});


// счетчик корзины
$('.buy').on('click', function () {
	var d = $(this).closest('.card').find('.smart-basket__product-quantity-state').val();
	var basket__count = $('.smart-basket__min-count').html();
	var c = Number(basket__count);
	console.log('basket__count', typeof c);
	var thisCart = $(this).closest('.card');
//    var r = Number(basket__count);
	var inBasket1 = $(this).hasClass('in_Basket_one');
	var inBasket2 = $(this).hasClass('in_Basket_two');
	addToCart(thisCart, c);
});

$('.product-quantity').append('<div class="smart-basket__quantity-item"></div>');
$('.smart-basket__quantity-item').append('<div class="smart-basket__quantity-item"><button class="smart-basket__remove-item">-</button><input class="smart-basket__product-quantity-state" pattern="^[0-9]" value="1"><button class="smart-basket__add-item">+</button></div>');

$('.smart-basket__remove-item').on('click', function () {
	var s = $(this).siblings('.smart-basket__product-quantity-state').val();
	s--;
	if (s == 0) {
		s = 1;
	}
	$(this).siblings('.smart-basket__product-quantity-state').val(s);
	$(this).siblings('.smart-basket__product-quantity-state').attr('value', s);
	$(this).closest('.card').children('.buy').attr('data-sb-product-quantity', s);
});

$('.smart-basket__add-item').on('click', function () {
	var s = $(this).siblings('.smart-basket__product-quantity-state').val();
	s++;
	$(this).siblings('.smart-basket__product-quantity-state').val(s);
	$(this).siblings('.smart-basket__product-quantity-state').attr('value', s);
	$(this).closest('.card').children('.buy').attr('data-sb-product-quantity', s);
});

var arrID = new Array();
var arrSIZE = new Array();

function addToCart(thisCart, c) {
	var productImg = thisCart.children('img').attr('src');
	var productName = thisCart.children('h4').text();
	var productSize = thisCart.children('.buy').attr('data-sb-product-size');
	var productID = thisCart.children('.buy').attr('data-sb-id-or-vendor-code');
	var productCost = thisCart.children('.buy').attr('data-sb-product-price');
	var productItems = thisCart.children('.buy').attr('data-sb-product-quantity');
	var productQuantity = productCost * productItems;
	var basket__item = $('.smart-basket__product-item:last');

	arrID.push(productID);
	arrSIZE.push(productSize);

	var checkID = true;
	var checkSIZE = true;
	var checkFirstID = true;
	var checkFirstSIZE = true;
	for(let i = 0; i < arrID.length; i++){
		if ((arrID[i] == productID) && (arrSIZE[i] == productSize)){
			if((checkFirstID == false) && (checkFirstSIZE == false)){
				thisCart.children('.buy').text('Товар уже добавлен');
				setTimeout(function(){
					thisCart.children('.buy').text('В корзину');
				}, 1500);
				checkID = false;
				checkSIZE = false;
			}
			checkFirstID = false;
			checkFirstSIZE = false;
		}
	}

	
	if (checkID == true || checkSIZE == true){
		$('.smart-basket__product-item:last').after('<div class="smart-basket__product-item"></div>');
		$('.smart-basket__product-item:last').append('<div class="smart-basket__product-name"><img src="' + productImg + '" width="60">' + productName + '<span class="smart-basket__product-size"> Размер: ' + productSize + ' </span></span><input class="smart-basket__input" type="hidden" value="' + productName + '" name="productName[]"><input class="smart-basket__input" type="hidden" value="' + productSize + '" name="productSize[]"></div>');
		$('.smart-basket__product-item:last').append('<div class="smart-basket__product-id">' + productID + '<input class="smart-basket__input" type="hidden" value="' + productID + '" name="productID[]"></div>');
		$('.smart-basket__product-item:last').append('<div class="smart-basket__product-price">' + productCost + '.00<input class="smart-basket__input" type="hidden" value="' + productCost + '" name="productCost[]"></div>');
		$('.smart-basket__product-item:last').append('<div class="smart-basket__product-quantity"></div>');
		$('.smart-basket__product-quantity:last').append('<button class="smart-basket__remove-item">-</button><input class="smart-basket__product-quantity-state" pattern="^[0-9]" value="' + productItems + '" name ="productItems[]" ><button class="smart-basket__add-item">+</button>');
		$('.smart-basket__product-item:last').append('<div class="smart-basket__product-price-common"><input class="smart-basket__input" value="' + productQuantity + '" name="productQuantity[]" ></div>');
		$('.smart-basket__product-item:last').append('<button class="smart-basket__product-delete" data-sb-product-delete="001"><span class="smart-basket__delete-icon">×</span></button>');
		
		var now_count = thisCart.children('.buy').attr('data-sb-product-quantity');
		var r = Number(now_count);

		c += r;
		$('.smart-basket__min-count').text(c);

	}
		
//        console.log(min_count, typeof min_count);
}

$('.smart-basket__form').on('click', '.smart-basket__add-item', function (e) {
	e.preventDefault();
	var tmp_cost = 0;
	var txt = $(this).siblings('.smart-basket__product-quantity-state').attr('value');
	var items_cost = $(this).closest('.smart-basket__product-item').find('.smart-basket__product-price .smart-basket__input').attr('value');
	$(this).siblings('.smart-basket__product-quantity-state').attr('value', 1 + (+txt));
	var items__val = $(this).siblings('.smart-basket__product-quantity-state').attr('value');
	tmp_cost = items_cost * items__val;
	$(this).closest('.smart-basket__product-quantity').siblings('.smart-basket__product-price-common').children('.smart-basket__input').attr('value', tmp_cost);
	var sum = 0;
	$('.smart-basket__form .smart-basket__product-quantity-state').each(function () {
		sum += parseFloat(this.value);
	});
	$('.smart-basket__quantity-common').text('Всего товаров: ' + sum);
	var all_cost = 0;
	$('.smart-basket__form .smart-basket__product-price-common .smart-basket__input').each(function () {
		all_cost += parseFloat(this.value);
	});
	$('.smart-basket__form').find('.all__items__cost').attr('value', all_cost);
	$('.smart-basket__price-common span').text(all_cost);
});

$('.smart-basket__form').on('click', '.smart-basket__remove-item', function (e) {
	e.preventDefault();
	var tmp_cost = 0;
	var txt = $(this).siblings('.smart-basket__product-quantity-state').attr('value');
	var items_cost = $(this).closest('.smart-basket__product-item').find('.smart-basket__product-price .smart-basket__input').attr('value');  //косяк
	if (txt == 1) {
		txt = 2;
	}
	$(this).siblings('.smart-basket__product-quantity-state').attr('value', txt - 1);
	var items__val = $(this).siblings('.smart-basket__product-quantity-state').attr('value');
	tmp_cost = items_cost * items__val;
	$(this).closest('.smart-basket__product-quantity').siblings('.smart-basket__product-price-common').children('.smart-basket__input').attr('value', tmp_cost);
	var sum = 0;
	$('.smart-basket__form .smart-basket__product-quantity-state').each(function () {
		sum += parseFloat(this.value);
	});
	$('.smart-basket__quantity-common').text('Всего товаров: ' + sum);
	var all_cost = 0;
	$('.smart-basket__form .smart-basket__product-price-common .smart-basket__input').each(function () {
		all_cost += parseFloat(this.value);
	});
	$('.smart-basket__form').find('.all__items__cost').attr('value', all_cost);
	$('.smart-basket__price-common span').text(all_cost);
});

$('.smart-basket__form').on('click', '.smart-basket__product-delete', function (event) {
	event.preventDefault();
	let n_cost;
	// Общая стоимость
	let cost__quantity = $(this).closest('.smart-basket__form').find('.smart-basket__result-common .smart-basket__price-common span').text();
	// Колличество предметов
	let item__val = $(this).closest('.smart-basket__product-item').find('.smart-basket__product-quantity .smart-basket__product-quantity-state').attr('value');
	//стоимость единцы товара
	let item__cost = $(this).closest('.smart-basket__product-item').find('.smart-basket__product-price-common .smart-basket__input').attr('value');
	//Колличество предметов
	let items__all = $(this).closest('.smart-basket__form').find('.smart-basket__result-common .smart-basket__quantity-common').text();
	items__all = items__all.replace(/[^0-9]/g, '');
	cost__quantity = cost__quantity.replace(/[^0-9.]/g, '');
	cost__quantity = (0 + (+cost__quantity));
	n_cost = cost__quantity;
	items__all -= item__val;
	$(this).closest('.smart-basket__form').find('.smart-basket__result-common .smart-basket__quantity-common').text('Всего товаров: ' + items__all);
	items__all = 0;
	cost__quantity -= item__cost;
	$('.smart-basket__form').find('.all__items__cost').attr('value', cost__quantity);
	$('.smart-basket__price-common span').text(cost__quantity);
	$(this).parents('.smart-basket__product-item').remove();
});

//hack for mobile v


// Сначала получаем высоту окна просмотра 
// и умножаем ее на 1%





	var winHeight = $(window).height();

	if(winHeight < 290){
		$('#nav ul li a').css('font-size','14px');
		$('.wrap_menu #nav').css('line-height','3vh');
		$('#header .bottom').css('top','23px');
	}


//проверка одиннковых товаров

