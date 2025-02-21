new WOW({
    animateClass: "animate__animated"
}).init();

$('#burger').on("click", function () {
    $('#menu').addClass('open');
});

$('#menu *').on("click", () => {
    $('#menu').removeClass('open');
});


let loader = $('.loader');

$('.order-block .btn').on("click",function () {
    loader.css('display', 'flex');
    let chooseMacaroon = $('#choose-macaroon-input');
    let name = $('#name-input');
    let phone = $('#phone-input');
    let hasError = false;
    chooseMacaroon.css('border', '1px solid rgb(130, 19, 40)');
    name.css('border', '1px solid rgb(130, 19, 40)');
    phone.css('border', '1px solid rgb(130, 19, 40)');
    $('.invalid-text').hide();
    if (!chooseMacaroon.val()) {
        chooseMacaroon.css('border', '1px solid red');
        chooseMacaroon.next().show();
        hasError = true;
    }
    if (!name.val()) {
        name.css('border', '1px solid red');
        name.next().show();
        hasError = true;
    }
    if (!phone.val()) {
        phone.css('border', '1px solid red');
        phone.next().show();
        hasError = true;
    }

    let form = $('.order-block-form');
    let orderResultText = $('.order-result-text');

    if (!hasError) {
        $.ajax({
            method: 'POST',
            url: 'http://testologia.ru/checkout',
            data: {product: chooseMacaroon.val(), name: name.val(), phone: phone.val()}
        })
            .done(function (msg) {
                loader.hide();
                form.fadeOut();
                setTimeout(function () {
                    orderResultText.fadeIn('slow');
                    orderResultText.css('visibility', 'visible');
                    orderResultText.css('display', 'flex');
                }, 1000)
                if(msg.success === 1) {
                    orderResultText.text('Спасибо за Ваш заказ. Мы скоро свяжемся с Вами!');
                } else if(msg.success === 0) {
                    orderResultText.text('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    orderResultText.css('color', 'red');
                }
            })
    }

    loader.css('display', 'none');
})