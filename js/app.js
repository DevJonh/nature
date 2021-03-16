/**
 * DEBOUNCE DO LODASH
 * SERVE PARA EVITAR O ALTO PROCESSAMENTO DE CADA SCROLL DADO
 */

debounce = (func, wait, immediate) => {
    let timeout;
    return function() {
        let context = this, args = arguments;
        let later = function(){
            timeout = null;
            if(!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callNow) func.apply(context, args);
    };
};



/**
 * CRIAÇÃO DA ANIMAÇÃO DE JANELAS
 */
$('[data-group]').each(function(){

    let $allTarget = $(this).find('[data-target]');
    let $allClick = $(this).find('[data-click]');
    let activeClass = 'active';

    $allTarget.first().addClass(activeClass);
    $allClick.first().addClass(activeClass)

    $allClick.click(function(e){
        e.preventDefault();

        let id = $(this).data('click');
        let $target =$('[data-target ="' + id + '"]');

        $allClick.removeClass(activeClass);
        $allTarget.removeClass(activeClass);

        $target.addClass(activeClass);
        $(this).addClass(activeClass);
    });

});

/**
 * CRIAÇÃO DO SCROLL SUAVE
 */

 $('.menu-nav a[href^="#"]').click(function(e){
    e.preventDefault();

    let id =$(this).attr('href');
    let targetOffset = $(id).offset().top;

    $('html, body').animate({
        scrollTop: targetOffset
    }, 500)
 });

 $('.logo').click(function(e){
     e.preventDefault();
     $('html, body').animate({
         scrollTop: 0
    }, 500);
 });

 /**
  * CIRAÇÃO DE SCROLL SUAVE COM LINK ATIVO
  */

  $('section').each(function(){
    let height = $(this).height();
    let offsetTop = $(this).offset().top;
    let menuHeight = $('.menu').innerHeight();
    let id = $(this).attr('id');
    let $itemMenu = $('a[href="#'+ id +'"]');

      $(window).scroll(debounce(function(){
        let scrollTop = $(this).scrollTop();
        if(offsetTop - menuHeight < scrollTop && offsetTop + height - menuHeight > scrollTop) {
            $itemMenu.addClass('active');
        }else{
            $itemMenu.removeClass('active');
        }
      }, 150));
  });

  /**
   * CRIAÇÃO DO MENU OCULTO DO MOBILE
   */

  $('.mobile-btn').click(function(){
      $(this).toggleClass('active');
      $('.mobile-menu').toggleClass('active');
  });

/**
 * CRIAÇÃO DA ANIMAÇÃO DO SLIDE
 */
(function(){
    function slider(sliderName, velocidade){
        let sliderClass = '.' + sliderName;
        let activeClass = 'active';
        let rotate = setInterval(rotateSlide, velocidade);

    $(sliderClass).first().addClass(activeClass);

    $(sliderClass).hover(function(){
        clearInterval(rotate);
    }, function(){
        rotate = setInterval(rotateSlide, velocidade);
    });
    function rotateSlide(){
        let activeSlide = $(sliderClass +'> .active');
        let nextSlide = activeSlide.next();

        if(nextSlide.length == 0){
            nextSlide =$(sliderClass + '> :first');
        }
        activeSlide.removeClass(activeClass);
        nextSlide.addClass(activeClass);
    };
    }

    slider('introducao', 2000);
})();

/**
 * ANIMAÇÃO AO SCROLL
 */

(function(){
    let $target = $('[data-anime="scroll"]');
    let animationClass = 'animate';
    let offset = $(window).height() * 3/4;

    function animeScroll(){
        let documentTop = $(window).scrollTop();

        $target.each(function(){
            let itemTop = $(this).offset().top;

            if(documentTop  > itemTop - offset){
                $(this).addClass(animationClass);
            }else{
                $(this).removeClass(animationClass);
            }
        });
    }

    animeScroll();

    $(document).scroll(debounce(function(){
        animeScroll();
    }, 150));

})();