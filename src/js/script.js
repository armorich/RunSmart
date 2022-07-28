$(document).ready(function() {
    $('.carousel__inner').slick({
        speed: 1200,
        // adaptiveHeight: true, 
        prevArrow: '<button type="button" class="slick-prev"><img src = "icon/chevron-left-solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src = "icon/chevron-right-solid.png"></button>',
        responsive: [{
            breakpoint: 992,
            settings: {
                dots: true,
                arrows: false
            }
        }]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    // $('.catalog-item__link').each(function(i) {
    //     $(this).on('click', function(e) {
    //         e.preventDefault()
    //         $('.catalog-item__front').eq(i).toggleClass('catalog-item__front_active');
    //         $('.catalog-item__back').eq(i).toggleClass('catalog-item__back_active');
    //     });
    // });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__front').eq(i).toggleClass('catalog-item__front_active');
                $('.catalog-item__back').eq(i).toggleClass('catalog-item__back_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__backlink');

    $('[data-modal="consultation"]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    $('.button_mini').on('click', function() {
        $('.overlay, #order').fadeIn('slow');
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay #order').fadeIn('slow');
        });
    });
    // Jqueryvalidate


    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста введите своё имя!",
                    minlength: jQuery.validator.format("Введите {0} символов!")
                },
                phone: "Пожаллуйста введите свой номер телефона",
                email: {
                    required: "Пожалуйста введите адрес электронной почты",
                    email: "Неправильно введён адрес почты"
                }
            }
        });
    }
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');


    //MaskedInput

    $('input[name=phone]').mask("+7 (999) 999-99-99");



    // Mail to
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });
});