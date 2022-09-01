(function () {
  "use strict";
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  // Preloader
  $(window).load(function () {
    $(".preloader").fadeOut("slow");
  });

  // Full Height
  var fullHeight = function () {
    if (!isMobile.any()) {
      $(".js-fullheight").css("height", $(window).height());
      $(window).resize(function () {
        $(".js-fullheight").css("height", $(window).height());
      });
    }
  };
  // Animations
  var contentWayPoint = function () {
    var i = 0;
    $(".animate-box").waypoint(
      function (direction) {
        if (direction === "down" && !$(this.element).hasClass("animated")) {
          i++;
          $(this.element).addClass("item-animate");
          setTimeout(function () {
            $("body .animate-box.item-animate").each(function (k) {
              var el = $(this);
              setTimeout(
                function () {
                  var effect = el.data("animate-effect");
                  if (effect === "fadeIn") {
                    el.addClass("fadeIn animated");
                  } else if (effect === "fadeInLeft") {
                    el.addClass("fadeInLeft animated");
                  } else if (effect === "fadeInRight") {
                    el.addClass("fadeInRight animated");
                  } else {
                    el.addClass("fadeInUp animated");
                  }
                  el.removeClass("item-animate");
                },
                k * 200,
                "easeInOutExpo"
              );
            });
          }, 100);
        }
      },
      {
        offset: "85%",
      }
    );
  };
  // Burger Menu
  var burgerMenu = function () {
    $(".js-oliven-nav-toggle").on("click", function (event) {
      event.preventDefault();
      var $this = $(this);
      if ($("body").hasClass("offcanvas")) {
        $this.removeClass("active");
        $("body").removeClass("offcanvas");
      } else {
        $this.addClass("active");
        $("body").addClass("offcanvas");
      }
    });
  };
  // Click outside of offcanvass
  var mobileMenuOutsideClick = function () {
    $(document).click(function (e) {
      var container = $("#oliven-aside, .js-oliven-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas")) {
          $("body").removeClass("offcanvas");
          $(".js-oliven-nav-toggle").removeClass("active");
        }
      }
    });
    $(window).scroll(function () {
      if ($("body").hasClass("offcanvas")) {
        $("body").removeClass("offcanvas");
        $(".js-oliven-nav-toggle").removeClass("active");
      }
    });
  };
  // Slider
  var sliderMain = function () {
    $(".oliven-hero .flexslider").flexslider({
      animation: "fade",
      autoplay: true,
      slideshowSpeed: 5000,
      controlNav: true,
      directionNav: false,
      start: function () {
        setTimeout(function () {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      },
      before: function () {
        setTimeout(function () {
          $(".slider-text").removeClass("animated fadeInUp");
          $(".flex-active-slide")
            .find(".slider-text")
            .addClass("animated fadeInUp");
        }, 500);
      },
    });
  };

  var loadGallery = function () {
    var images = [
      {
        src: "/images/gallery/engagement-sit.webp",
        detail: "Engagement",
      },
      {
        src: "/images/gallery/engagement-hand.webp",
        detail: "Engagement",
      },
      {
        src: "/images/gallery/prewedding-sit.webp",
        detail: "Prewedding",
      },

      {
        src: "/images/gallery/engagement-green.webp",
        detail: "Engagement",
      },

      {
        src: "/images/gallery/prewedding-green.webp",
        detail: "Prewedding",
      },
      {
        src: "/images/gallery/prewedding-stand.webp",
        detail: "Prewedding",
      },
    ];

    var galleryRow = $("#gallery-row");
    galleryRow.empty();

    images.forEach((image) => {
      galleryRow.append(`
        <div class="col-md-4 gallery-item ${image.detail.toLowerCase()}">
          <a href="${image.src}" class="img-zoom">
            <div class="gallery-box">
              <div class="gallery-img">
                <img
                  src="${image.src}"
                  class="img-fluid mx-auto d-block"
                  alt=""
                />
              </div>
              <div class="gallery-detail">
                <h4 class="mb-0">${image.detail}</h4>
              </div>
            </div>
          </a>
        </div>
      `);
    });

    // Magnific Popup
    $(".img-zoom").magnificPopup({
      type: "image",
      closeOnContentClick: !0,
      mainClass: "mfp-fade",
      gallery: {
        enabled: !0,
        navigateByImgClick: !0,
        preload: [0, 1],
      },
    });
  };

  var loadWishes = function (animateNewestWish) {
    function done_func(response) {
      var data = JSON.parse(response);
      if (data !== undefined && data.records !== undefined) {
        dayjs.extend(window.dayjs_plugin_relativeTime);

        var wishesList = $("#wishes-list");
        wishesList.empty();

        data.records
          .sort((a, b) => {
            return new Date(a.createdTime) < new Date(b.createdTime) ? 1 : -1;
          })
          .filter((record) => {
            return (
              record.fields.Flagged === undefined ||
              record.fields.Flagged === false
            );
          })
          .forEach((record, index) => {
            wishesList.append(
              `<div class="col-md-12" ${index === 0 ? 'id="newest-wish"' : ""}>
                <div class="item ${
                  index !== data.records.length - 1 ? "mb-30" : ""
                }">
                  <div class="info valign">
                    <div class="full-width">
                      <span><h6>${record.fields.Name}</h6></span>
                      <span><h6>·</h6></span>
                      <span><p>${dayjs(
                        record.fields.CreatedTime
                      ).fromNow()}</p></span>
                      <p>${record.fields.Wish ? record.fields.Wish : ""}</p>
                    </div>
                  </div>
                </div>
              </div>`
            );
          });

        if (animateNewestWish) {
          var newestWish = $("#newest-wish");
          newestWish.animate({ opacity: "5%" }, 500);
          newestWish.animate({ opacity: "100%" }, 1000);
        }
      }
    }
    function fail_func(data) {
      console.log("fail getting wishes from the server", data);
    }

    var url = "https://lab.ariefrahmansyah.dev/wedding-api/list";
    $.ajax({
      type: "GET",
      url: url,
    })
      .done(done_func)
      .fail(fail_func);
  };

  // Document on load.
  $(function () {
    fullHeight();
    contentWayPoint();
    burgerMenu();
    mobileMenuOutsideClick();
    sliderMain();
    loadGallery();
    loadWishes(true);
  });
  // Sections background image from data background
  var pageSection = $(".bg-img, section");
  pageSection.each(function (indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
    }
  });
  // Friends owlCarousel
  $(".friends .owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    mouseDrag: true,
    autoplay: false,
    dots: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
  // When & Where owlCarousel
  $(".whenwhere .owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    mouseDrag: true,
    autoplay: false,
    dots: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 3,
      },
    },
  });
  // Gift Registry owlCarousel
  $(".gift .owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    mouseDrag: true,
    autoplay: true,
    dots: false,
    responsiveClass: true,
    responsive: {
      0: {
        margin: 10,
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  });
  // Smooth Scrolling
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000,
            function () {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });
  // Gallery
  $(window).on("load", function () {
    var e = $(".gallery-filter"),
      a = $("#gallery-filter");
    e.isotope({
      filter: "*",
      layoutMode: "masonry",
      animationOptions: {
        duration: 750,
        easing: "linear",
      },
    }),
      a.find("a").on("click", function () {
        var o = $(this).attr("data-filter");
        return (
          a.find("a").removeClass("active"),
          $(this).addClass("active"),
          e.isotope({
            filter: o,
            animationOptions: {
              animationDuration: 750,
              easing: "linear",
              queue: !1,
            },
          }),
          !1
        );
      });
  });

  // RSVP FORM
  var form = $(".contact__form"),
    message = $(".contact__msg"),
    form_data;
  function done_func(response) {
    loadWishes(true);
    form.find('input:not([type="submit"]), textarea').val("");

    var wishReceived = $("#wish-received");
    wishReceived.show();
  }
  function fail_func(data) {
    message.fadeIn().removeClass("alert-success").addClass("alert-secondary");
    message.text("Server is busy. Please try again.");
    setTimeout(function () {
      message.fadeOut();
    }, 3000);
  }
  form.submit(function (e) {
    e.preventDefault();
    form_data = $(this).serializeArray();

    var fields = {};
    $.map(form_data, function (n) {
      fields[n["name"]] = n["value"];
    });
    fields["CreatedTime"] = new Date().toISOString();

    var payload = {
      fields: fields,
    };

    $.ajax({
      type: "POST",
      url: form.attr("action"),
      data: JSON.stringify(payload),
      dataType: "json",
      contentType: "application/json",
    })
      .done(done_func)
      .fail(fail_func);
  });
})();

// Countdown wedding
(function () {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
  let birthday = "Sep 3, 2022 07:30:00",
    countDown = new Date(birthday).getTime(),
    x = setInterval(function () {
      let now = new Date().getTime(),
        distance = countDown - now;

      if (distance < 0) {
        let headline = document.getElementById("countdown-headline");
        headline.innerText = "We have been married for";

        let gettingMarried1 = document.getElementById("getting-married-1");
        gettingMarried1.innerText = "Are married!";
        let gettingMarried2 = document.getElementById("getting-married-2");
        gettingMarried2.innerText = "Are married!";

        let seeyou = document.getElementById("seeyou");
        seeyou.style.display = "none";

        distance = Math.abs(distance);
      }

      document.getElementById("days").innerText = Math.floor(distance / day);
      document.getElementById("hours").innerText = Math.floor(
        (distance % day) / hour
      );
      document.getElementById("minutes").innerText = Math.floor(
        (distance % hour) / minute
      );
      document.getElementById("seconds").innerText = Math.floor(
        (distance % minute) / second
      );
    }, 0);
})();

function playPauseToggle() {
  let track = document.getElementById("track");
  var icon = $("#music-controller-icon");
  if (track.paused) {
    track.play();
    icon.attr("class", "ti-control-pause");
  } else {
    track.pause();
    icon.attr("class", "ti-music-alt");
  }
}

(function () {
  function onPlayerStateChange(event) {
    let track = document.getElementById("track");
    var ctrl = $("#music-controller-container");
    var icon = $("#music-controller-icon");

    if (event.data === 1) {
      track.pause();
      icon.attr("class", "ti-music-alt");
      ctrl.fadeOut(1000);
    } else {
      ctrl.fadeIn(1000);
    }
  }

  function onYouTubeIframeAPIReady() {
    new YT.Player("live-player", {
      events: {
        onStateChange: onPlayerStateChange,
      },
    });

    new YT.Player("engagement-player", {
      events: {
        onStateChange: onPlayerStateChange,
      },
    });

    new YT.Player("prewedding-player", {
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
  }

  window.onYouTubePlayerAPIReady = function () {
    onYouTubeIframeAPIReady();
  };
})();
