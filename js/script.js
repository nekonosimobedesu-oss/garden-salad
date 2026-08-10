//drawer
$("#js-drawer-icon").on("click", function (e) {
  e.preventDefault();
  $("#js-drawer-icon").toggleClass("is-checked");
  $("#js-drawer-content").toggleClass("is-checked");
});
$("#js-drawer-content [href]").on("click", function (event) {
  $("#js-drawer-icon").trigger("click");
});

// ヘッダーの高さ分だけコンテンツを下げる
$(function () {
  const height = $(".js-header").height();
  $("main").css("margin-top", height);
});

//スムーススクロール
$('a[href^="#"]').on('click', function () {
  var speed = 300;
  var href = $(this).attr("href");
  var target = $(href == "#" || href == "" ? 'html' : href);
  var position = target.offset().top;
  $("html, body").animate({
    scrollTop: position
  }, speed, "swing");
  return false;
});

//contact
const form = document.querySelector(".contact__form");
if (form) {
  const inputs = form.querySelectorAll("input[required]");
  const downloadBtn = document.querySelector(".contact__btn .button");
  const privacyCheck = form.querySelector(".form-checkbox__input");
  function check() {
    let hasError = false;
    inputs.forEach((input) => {
      if (input.type !== "checkbox" && input.value.trim() === "") {
        hasError = true;
      }
    });
    if (privacyCheck && !privacyCheck.checked) {
      hasError = true;
    }
    if (!hasError) {
      downloadBtn.classList.add("active");
      form.classList.remove("invalid");
    } else {
      downloadBtn.classList.remove("active");
      form.classList.add("invalid");
    }
  }
  inputs.forEach((input) => {
    input.addEventListener("input", check);
  });
  if (privacyCheck) {
    privacyCheck.addEventListener("change", check);
  }
  window.addEventListener("load", check);
  form.addEventListener("submit", (e) => {
    alert("送信完了しました！");
    downloadBtn.classList.add("submitted");
  });
}

///modal
$(".js-modal-open").on("click", function (e) {
  e.preventDefault();
  const modalId = $(this).attr("data-target");
  $(`#${modalId}`)[0].showModal();
});
$(".js-modal-close").on("click", function (e) {
  e.preventDefault();
  $(this).closest("dialog")[0].close();
});

//top-button(スムーススクロール)
$(function () {
  var pagetop = $("#page__top");
  pagetop.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 80) {
      pagetop.fadeIn(300);
    } else {
      pagetop.fadeOut(300);
    }
  });
  pagetop.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
  });
});

//パララックス
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined") {
    console.error("GSAP is not loaded");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  const targets = [
    { selector: ".about__picture", image: ".about__picture img" },
    { selector: ".menu__picture", image: ".menu__picture img" },
  ];
  targets.forEach(({ selector, image }) => {
    const el = document.querySelector(selector);
    if (!el) {
      console.error(`${selector} element not found`);
      return;
    }
    gsap.to(image, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: selector,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  });
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});

//gsap
gsap.registerPlugin(ScrollTrigger, SplitText);
// ヘッダーのタイムラインアニメーション
const headerTl = gsap.timeline();
headerTl
  .from(".header__logo", {
    opacity: 0,
    filter: "blur(5px)",
    x: -50,
    duration: 0.5,
    ease: "power3.out",
  })
  .from(
    ".fv__title--type1",
    {
      y: 50,
      filter: "blur(5px)",
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    },
    "<"
  )
  .from(".header__nav", {
    x: 50,
    filter: "blur(5px)",
    opacity: 0,
    duration: 0.3,
    ease: "power2.out",
  })
  .from(
    ".fv__title--type2",
    {
      y: 50,
      filter: "blur(5px)",
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    },
    "<"
  )
  .from(".fv__title--type3", {
    y: 50,
    filter: "blur(5px)",
    opacity: 0,
    duration: 0.4,
    ease: "power2.out",
  })
  .from(".fv__text", {
    x: -50,
    filter: "blur(5px)",
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  })
  .from(".fv__text--type2", {
    x: 50,
    filter: "blur(5px)",
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
  });
gsap.fromTo(
  ".fv__inner",
  { scale: 1 },
  { scale: 1.1, duration: 3, ease: "power2.out" }
);
// IntersectionObserverでScrollTriggerやSplitTextを遅延初期化
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        initScrollTrigger(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -10% 0px",
  }
);
// data-trigger属性の要素を監視
document.querySelectorAll("[data-trigger]").forEach((el) => {
  el.style.visibility = "hidden"; // 初期状態を非表示に
  observer.observe(el);
});
// 初期化関数
function initScrollTrigger(el) {
  const delay = el.dataset.delay ? parseFloat(el.dataset.delay) : 0;
  el.style.visibility = "visible";
  if (el.classList.contains("section__title-main")) {
    const split = new SplitText(el, { type: "chars" });
    gsap.from(split.chars, {
      opacity: 0,
      y: 30,
      scale: 0.8,
      filter: "blur(5px)",
      duration: 0.6,
      delay: delay,
      ease: "power2.out",
      stagger: {
        each: 0.05,
        from: "random",
      },
    });
  } else if (el.classList.contains("curtain-mask")) {
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(el, {
          x: "-100%",
          filter: "blur(5px)",
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            el.style.display = "none";
          },
        });
      },
    });
  } else if (el.classList.contains("curtain-mask--type2")) {
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(el, {
          x: "100%",
          filter: "blur(5px)",
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            el.style.display = "none";
          },
        });
      },
    });
  } else if (el.classList.contains("curtain-mask--type3")) {
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(el, {
          y: "100%",
          filter: "blur(5px)",
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            el.style.display = "none";
          },
        });
      },
    });
  } else {
    gsap.from(el, {
      autoAlpha: 0,
      y: 30,
      filter: "blur(5px)",
      duration: 0.6,
      delay: delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }
}

//テキスト左右に動かす
gsap.to(".fv__bottom-bg", {
  x: 150,
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".fv__bottom-bgs",
    start: "top bottom",
    end: "bottom top",
    scrub: 0.5,
  },
});
