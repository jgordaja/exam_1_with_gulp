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

});