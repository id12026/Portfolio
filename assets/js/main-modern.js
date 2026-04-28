/**
* Modern Portfolio Interactive Features
* Enhanced with smooth animations, scroll effects, and particle system
*/

(function($) {
  "use strict";

  // Loading Screen
  $(window).on('load', function() {
    setTimeout(function() {
      $('.loader').addClass('hidden');
    }, 500);
  });

  // Create Floating Particles
  function createParticles() {
    const particlesContainer = $('<div class="particles"></div>');
    $('body').append(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
      const particle = $('<div class="particle"></div>');
      particle.css({
        left: Math.random() * 100 + '%',
        animationDelay: Math.random() * 20 + 's',
        animationDuration: (15 + Math.random() * 10) + 's'
      });
      particlesContainer.append(particle);
    }
  }
  createParticles();

  // Smooth Scroll to Top Button
  function createScrollTopButton() {
    const scrollTopBtn = $('<div class="scroll-top"><i class="bx bx-up-arrow-alt" style="color: white; font-size: 24px;"></i></div>');
    $('body').append(scrollTopBtn);
    
    $(window).on('scroll', function() {
      if ($(this).scrollTop() > 300) {
        scrollTopBtn.addClass('active');
      } else {
        scrollTopBtn.removeClass('active');
      }
    });
    
    scrollTopBtn.on('click', function() {
      $('html, body').animate({ scrollTop: 0 }, 800);
    });
  }
  createScrollTopButton();

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  setTimeout(() => {
    document.querySelectorAll('.icon-box, .portfolio-item, .experience-card, .info-box').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease';
      observer.observe(el);
    });
  }, 1000);

  // Nav Menu Click Handler
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;
      }
    }
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Skills Animation on Hover
  $('.skill-badge').on('mouseenter', function() {
    $(this).css('transform', 'translateY(-5px) scale(1.05)');
  }).on('mouseleave', function() {
    $(this).css('transform', 'translateY(0) scale(1)');
  });

  // Portfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });
  });

  // Initiate venobox (lightbox feature)
  $(document).ready(function() {
    $('.venobox').venobox();
  });

  // Typing Animation Enhancement
  var typed = new Typed('.typing', {
    strings: ["Data Analyst", "Data Scientist", "Web Developer", "Python Developer"],
    loop: true,
    typeSpeed: 65,
    backSpeed: 65,
    showCursor: true,
    cursorChar: '|'
  });

  // Parallax Effect on Mouse Move
  $(document).on('mousemove', function(e) {
    const mouseX = e.clientX / $(window).width();
    const mouseY = e.clientY / $(window).height();
    
    $('.particle').each(function(index) {
      const speed = (index + 1) * 0.5;
      $(this).css('transform', `translate(${mouseX * speed}px, ${mouseY * speed}px)`);
    });
  });

  // Card Tilt Effect
  $('.icon-box, .portfolio-wrap').on('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    $(this).css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
  }).on('mouseleave', function() {
    $(this).css('transform', 'perspective(1000px) rotateX(0) rotateY(0) scale(1)');
  });

  // Animate Numbers/Stats
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.text(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

})(jQuery);
