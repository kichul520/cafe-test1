// 오피스 제주 카페 랜딩 페이지 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // 네비게이션 링크 클릭 시 모바일 메뉴 닫기
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 스크롤 시 헤더 스타일 변경
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // 스크롤 애니메이션 (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 애니메이션 대상 요소들에 fade-in 클래스 추가
    const animateElements = document.querySelectorAll(
        '.about-content, .menu-item, .gallery-item, .location-content, .contact-item, .info-item'
    );

    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 활성 네비게이션 링크 표시
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // 히어로 섹션 패럴랙스 효과
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        if (scrolled <= heroHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
        }
    });

    // 메뉴 아이템 호버 효과
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 갤러리 아이템 클릭 효과 (라이트박스 준비)
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.style.cursor = 'pointer';

        item.addEventListener('click', function() {
            // 향후 라이트박스 기능 추가 가능
            const imageName = this.querySelector('.image-placeholder').textContent;
            console.log(`갤러리 이미지 클릭: ${imageName}`);
        });
    });

    // 페이지 로드 애니메이션
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // 콘솔 메시지
    console.log('%c오피스 제주에 오신 것을 환영합니다!',
        'color: #2c5f4a; font-size: 20px; font-weight: bold;');
    console.log('%c제주 사계의 바다를 품은 감성 카페',
        'color: #4a9d7c; font-size: 14px;');
});
