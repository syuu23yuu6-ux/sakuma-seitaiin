/**
 * Bloom Nail Academy
 * Main Web Application Script
 * 
 * Architecture:
 * - Modular initialization functions
 * - Responsive animation handling via gsap.matchMedia()
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize GSAP Plugins
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // 2. Initialize App Modules
    const app = {
        init() {
            this.initLoader();
            this.initHeadroom();
            this.initMicromodal();
            this.initHamburgerMenu();
            this.initHeroFeatures();
            this.initCarousels();
            this.initTabs();
            this.initTrustCounters();
            this.initQualificationChart();
            this.initAOS();
            this.initStickyCTA();
            this.handleResponsiveAnimations();
        },

        initMicromodal() {
            if (typeof MicroModal !== 'undefined') {
                MicroModal.init({
                    disableScroll: true,
                    awaitOpenAnimation: true,
                    awaitCloseAnimation: true
                });
            }
        },

        initTabs() {
            const tabGroups = document.querySelectorAll('.tabs');
            tabGroups.forEach(group => {
                const nav = group.querySelector('.tabs__nav');
                const btns = group.querySelectorAll('.tabs__btn');
                const panes = group.querySelectorAll('.tabs__pane');

                nav.addEventListener('click', (e) => {
                    const targetBtn = e.target.closest('.tabs__btn');
                    if (!targetBtn) return;

                    // Remove active states
                    btns.forEach(btn => {
                        btn.classList.remove('is-active');
                        btn.setAttribute('aria-selected', 'false');
                    });
                    panes.forEach(pane => {
                        pane.classList.remove('is-active');
                        pane.setAttribute('hidden', 'true');
                    });

                    // Add active state to clicked tab
                    targetBtn.classList.add('is-active');
                    targetBtn.setAttribute('aria-selected', 'true');
                    
                    const controls = targetBtn.getAttribute('aria-controls');
                    const targetPane = document.getElementById(controls);
                    if (targetPane) {
                        targetPane.classList.add('is-active');
                        targetPane.removeAttribute('hidden');
                        
                        // GSAP Smooth fade if available
                        if (typeof gsap !== 'undefined') {
                            gsap.fromTo(targetPane, 
                                { opacity: 0, y: 5 }, 
                                { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
                            );
                        }
                    }
                });
            });
        },

        initCarousels() {
            if (typeof Swiper === 'undefined') return;

            // S14: Voices Carousel
            if (document.querySelector('.swiper-voices')) {
                new Swiper('.swiper-voices', {
                    slidesPerView: 1.2, // Show a bit of the next slide on mobile
                    spaceBetween: 16,
                    grabCursor: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    breakpoints: {
                        // >= 576px
                        576: {
                            slidesPerView: 2.2,
                            spaceBetween: 24,
                        },
                        // >= 768px (Tablet)
                        768: {
                            slidesPerView: 2.5,
                            spaceBetween: 32,
                        },
                        // >= 1024px (Desktop)
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 32,
                        }
                    }
                });
            }

            // S21: SNS Feed
            if (document.querySelector('.swiper-sns')) {
                new Swiper('.swiper-sns', {
                    slidesPerView: 2.5,
                    spaceBetween: 8,
                    loop: true,
                    grabCursor: true,
                    autoplay: {
                        delay: 0,
                        disableOnInteraction: false,
                    },
                    speed: 4000, // Smooth continuous speed
                    breakpoints: {
                        576: { slidesPerView: 3.5, spaceBetween: 12 },
                        768: { slidesPerView: 4.5, spaceBetween: 16 },
                        1024: { slidesPerView: 6.5, spaceBetween: 16 },
                    }
                });
            }
        },

        initQualificationChart() {
            const chart = document.querySelector('.gsap-donut');
            if (!chart || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

            const targetValue = parseInt(chart.getAttribute('data-value'), 10);
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // circumference = 251.327 for r=40
            const circumference = 251.327;
            
            if (prefersReducedMotion) {
                const offset = circumference - (targetValue / 100) * circumference;
                chart.style.strokeDashoffset = offset;
            } else {
                ScrollTrigger.create({
                    trigger: chart,
                    start: "top 85%",
                    once: true,
                    onEnter: () => {
                        const targetOffset = circumference - (targetValue / 100) * circumference;
                        gsap.to(chart, {
                            strokeDashoffset: targetOffset,
                            duration: 2,
                            ease: "power2.out"
                        });
                    }
                });
            }
        },

        initTrustCounters() {
            const counters = document.querySelectorAll('.gsap-counter');
            if (counters.length === 0 || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'), 10);
                
                if (prefersReducedMotion) {
                    // Golden Rule A11y: Avoid animation if user requested reduced motion
                    counter.innerText = target;
                } else {
                    ScrollTrigger.create({
                        trigger: counter,
                        start: "top 85%", // Starts animating when 85% into the viewport
                        once: true,
                        onEnter: () => {
                            let obj = { val: 0 };
                            gsap.to(obj, {
                                val: target,
                                duration: 2,
                                ease: "power2.out",
                                onUpdate: () => {
                                    // Math.floor to ensure an integer string during interpolation
                                    counter.innerText = Math.floor(obj.val);
                                }
                            });
                        }
                    });
                }
            });
        },

        initHeroFeatures() {
            // 1. Swiper Background Slider
            if (typeof Swiper !== 'undefined' && document.getElementById('hero-slider')) {
                new Swiper('#hero-slider', {
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                    },
                    speed: 2000, // Slow, elegant crossfade
                    simulateTouch: false,
                    allowTouchMove: false
                });
            }

            // 2. GSAP Parallax for Background
            const heroBg = document.getElementById('hero-bg');
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && heroBg) {
                // MatchMedia to disable intensive parallax on small mobile devices if preferred
                let mm = gsap.matchMedia();
                mm.add("(min-width: 769px)", () => {
                    gsap.to(heroBg, {
                        yPercent: 20, // Better calculation than string percentage for transforms
                        ease: "none",
                        scrollTrigger: {
                            trigger: "#hero",
                            start: "top top",
                            end: "bottom top",
                            scrub: true
                        }
                    });
                });
            }

            // 3. Typed.js for dynamic catchy copy
            const typedTarget = document.getElementById('typed-text');
            if (typeof Typed !== 'undefined' && typedTarget) {
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                
                if (prefersReducedMotion) {
                    // Respect a11y: Just show the text immediately. Fixed XSS risk.
                    typedTarget.textContent = '好きを、一生の仕事にする。';
                } else {
                    new Typed('#typed-text', {
                        strings: [
                            'あなたも、<br>選ばれるプロのネイリストへ',
                            '好きを、一生の仕事にする。',
                            '圧倒的な技術力を、最短で。'
                        ],
                        typeSpeed: 60,
                        backSpeed: 30,
                        backDelay: 2000,
                        startDelay: 800, // Wait roughly for loader
                        loop: true
                    });
                }
            }
        },

        initLoader() {
            const loader = document.getElementById('loader');
            if (!loader) return;
            
            // Wait for window load event to ensure assets are ready
            window.addEventListener('load', () => {
                // Check user preference for motion. A11y respect.
                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                const duration = prefersReducedMotion ? 0 : 0.8;

                gsap.to(loader, {
                    opacity: 0,
                    duration: duration,
                    ease: "power2.inOut",
                    onComplete: () => {
                        loader.style.display = 'none'; // Remove from flow
                    }
                });
            });
        },

        initHeadroom() {
            const header = document.getElementById('header');
            if (!header || typeof Headroom === 'undefined') return;

            const headroom = new Headroom(header, {
                offset: 80, // Height in px where header state changes
                tolerance: {
                    up: 5,
                    down: 0
                },
                classes: {
                    initial: "header",
                    pinned: "header--pinned",
                    unpinned: "header--unpinned",
                    top: "header--top",
                    notTop: "is-scrolled",
                    bottom: "header--bottom",
                    notBottom: "header--not-bottom"
                }
            });
            headroom.init();
        },

        initHamburgerMenu() {
            const hamburger = document.getElementById('hamburger');
            const nav = document.getElementById('main-nav');
            const overlay = document.getElementById('nav-overlay');
            if (!hamburger || !nav) return;

            const toggleMenu = (forceState) => {
                const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
                const newState = forceState !== undefined ? forceState : !isExpanded;
                
                hamburger.setAttribute('aria-expanded', newState);
                if (newState) {
                    nav.classList.add('is-active');
                    document.body.style.overflow = 'hidden';
                } else {
                    nav.classList.remove('is-active');
                    document.body.style.overflow = '';
                }
            };

            hamburger.addEventListener('click', () => toggleMenu());

            // Close on overlay click
            if (overlay) {
                overlay.addEventListener('click', () => toggleMenu(false));
            }

            // Close menu when a navigation link is clicked (Mobile)
            const navLinks = nav.querySelectorAll('.nav__link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) toggleMenu(false);
                });
            });

            // Prevent scroll lock bug on desktop resize
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && hamburger.getAttribute('aria-expanded') === 'true') {
                    toggleMenu(false);
                }
            });
        },

        initAOS() {
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-out-cubic',
                    once: true, // Only animate once
                    offset: 50
                });
            }
        },

        initStickyCTA() {
            const stickyCta = document.getElementById('sticky-cta');
            const hero = document.getElementById('hero');
            if (!stickyCta || !hero || typeof ScrollTrigger === 'undefined') return;

            // Show CTA only after scrolling past the Hero section
            ScrollTrigger.create({
                trigger: hero,
                start: "bottom top", 
                onEnter: () => stickyCta.classList.add('is-visible'),
                onLeaveBack: () => stickyCta.classList.remove('is-visible')
            });
        },

        handleResponsiveAnimations() {
            if (typeof gsap === 'undefined') return;

            // Setup MatchMedia for responsive GSAP animations (Auto Cleanup)
            const mm = gsap.matchMedia();

            mm.add({
                isDesktop: "(min-width: 769px)",
                isMobile: "(max-width: 768px)"
            }, (context) => {
                let { isDesktop, isMobile } = context.conditions;

                // Example: Call specific initialization functions based on breakpoint
                this.initHero(isDesktop);
                // this.initCounters(isDesktop);
                // this.initQualification(isDesktop);

                return () => {
                    // Optional custom cleanup here (GSAP timelines cleanup automatically contextually)
                };
            });
        },

        initHero(isDesktop) {
            // S03: Hero Section Logic (Swiper, GSAP, Typed) will go here
            console.log('Hero initialized. Desktop mode:', isDesktop);
        }
        
    };

    // Run the app application
    app.init();
});
