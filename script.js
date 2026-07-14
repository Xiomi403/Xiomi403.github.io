/**
 * プロジェクト：ポートフォリオサイト
 * ファイル：script.js
 * 機能：言語切り替え、ダークモード、スクロールアニメーションなど
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 要素の取得 ---
    const langToggleBtn = document.getElementById('langToggle');
    const langText = langToggleBtn.querySelector('.lang-text');
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // --- 状態管理 ---
    let isEnglish = false;
    let isDarkTheme = true;

    // --- 言語切り替え機能 ---
    /**
     * @summary ページ内のテキストをJP/ENで切り替える
     */
    const toggleLanguage = () => {
        isEnglish = !isEnglish;
        langText.textContent = isEnglish ? 'JP' : 'EN';
        
        // data-jp, data-en属性を持つ全ての要素を取得
        const elements = document.querySelectorAll('[data-jp][data-en]');
        
        elements.forEach(el => {
            if (isEnglish) {
                el.textContent = el.getAttribute('data-en');
            } else {
                el.textContent = el.getAttribute('data-jp');
            }
        });

        // <title> タグの切り替え
        const titleEl = document.querySelector('title');
        if(titleEl) {
            titleEl.textContent = isEnglish ? titleEl.getAttribute('data-en') : titleEl.getAttribute('data-jp');
        }
    };

    langToggleBtn.addEventListener('click', toggleLanguage);


    // --- テーマ（ダーク/ライト）切り替え機能 ---
    /**
     * @summary bodyのテーマ属性を切り替え、アイコンを変更する
     */
    const toggleTheme = () => {
        isDarkTheme = !isDarkTheme;
        const root = document.documentElement;
        
        if (isDarkTheme) {
            root.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            root.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };

    themeToggleBtn.addEventListener('click', toggleTheme);


    // --- モバイルナビゲーション ---
    /**
     * @summary ハンバーガーメニューの開閉
     */
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // リンクをクリックしたらメニューを閉じる
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-xmark');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });


    // --- スクロールアニメーション (Intersection Observer) ---
    /**
     * @summary 画面内に入った要素に表示アニメーションクラスを付与する
     */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible-on-scroll');
                // 一度表示されたら監視を解除（毎回アニメーションさせたい場合はコメントアウト）
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-on-scroll');
    hiddenElements.forEach(el => observer.observe(el));


    // --- トップへ戻るボタンの表示制御とスクロール ---
    /**
     * @summary スクロール量に応じてトップへ戻るボタンの表示/非表示を切り替える
     */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
