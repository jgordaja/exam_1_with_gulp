$(document).ready(function() {
    
    // меню "бургер"
    $('#burger').click(function() {
        // відкрити/закрити меню
        $('#menu').toggleClass('active');
        // змінити бургер на Х і навпаки
        $('#burger').toggleClass('is-active');
        // зафіксувати body щоб не скролився коли визвано меню
        $('body').toggleClass('lock');
        // рибрати небажану прозорість 
        $('#header__background').toggleClass('header__background--none');
    })

    // // якщо нажато пункт меню
    $('.menu__item').click(function() {
        // переходимо кудись або ще якийсь код
        // your code...
        // закрити відкрите менюs
        $('#menu').toggleClass('active');
        // змінити Х на бургер
        $('#burger').toggleClass('is-active');
        // прибрати lock-клас у body
        $('body').toggleClass('lock'); 
    })

    // запуск відтворення youtube-відео при натисканні кастомної псевдо-кнопки
    const  customVideoButton = $('#custom_video_button');
    const screensaver = $('#screensaver');
    const iframeVideo = $('#iframeVideo');

    customVideoButton.click( function() {
        iframeVideo[0].src += "?autoplay=1";
        setTimeout(function(){
            // приховати кнопку і картинку з затримкою в 500мс щоб відео встигло почати відтворюватися
            customVideoButton.css('display', 'none');
            screensaver.css('display', 'none'); 
        }, 500); 
    })

});