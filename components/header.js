class MobileHeader extends HTMLElement {
    constructor() {
        super();
        this.menuOpen = false;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 50;
                }

                @media (max-width: 768px) {
                    :host {
                        display: block;
                    }
                }

                .header-container {
                    background: rgba(10, 10, 10, 0.8);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(55, 65, 81, 0.3);
                    padding: 1rem;
                }

                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .logo-icon {
                    width: 36px;
                    height: 36px;
                    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 14px;
                    color: white;
                }

                .logo-text {
                    font-size: 1.25rem;
                    font-weight: bold;
                    background: linear-gradient(to right, #3b82f6, #8b5cf6);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .menu-toggle {
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    background: rgba(31, 41, 55, 0.3);
                    border: 1px solid rgba(55, 65, 81, 0.5);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .menu-toggle:hover {
                    background: rgba(37, 99, 235, 0.2);
                    border-color: rgba(37, 99, 235, 0.5);
                }

                .menu-toggle i {
                    width: 24px;
                    height: 24px;
                    color: #9ca3af;
                    transition: all 0.3s ease;
                }

                .mobile-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: rgba(10, 10, 10, 0.95);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(55, 65, 81, 0.3);
                    padding: 1rem;
                    transform: translateY(-100%);
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .mobile-menu.open {
                    transform: translateY(0);
                    opacity: 1;
                    visibility: visible;
                }

                .mobile-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                nav-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    border-radius: 10px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                navitem-icon {
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    background: rgba(31, 41, 55, 0.3);
                    border: 1px solid rgba(55, 65, 81, 0.5);
                    transition: all 0.3s ease;
                }

                navitem-icon i {
                    width: 18px;
                    height: 18px;
                    color: #9ca3af;
                    transition: all 0.3s ease;
                }

                navitem-label {
                    font-size: 1rem;
                    color: #d1d5db;
                    transition: all 0.3s ease;
                }

                navitem:hover {
                    background: rgba(37, 99, 235, 0.1);
                }

                navitem:hover navitem-icon {
                    background: rgba(37, 99, 235, 0.2);
                    border-color: rgba(37, 99, 235, 0.5);
                }

                navitem:hover navitem-icon i,
                navitem:hover navitem-label {
                    color: #60a5fa;
                }

                navitem[active="true"] {
                    background: rgba(37, 99, 235, 0.15);
                }

                navitem[active="true"] navitem-icon {
                    background: rgba(37, 99, 235, 0.3);
                    border-color: rgba(37, 99, 235, 0.8);
                }

                navitem[active="true"] navitem-icon i {
                    color: #60a5fa;
                }

                navitem[active="true"] navitem-label {
                    color: #60a5fa;
                    font-weight: 600;
                }

                .contact-info {
                    margin-top: 2rem;
                    padding-top: 2rem;
                    border-top: 1px solid rgba(55, 65, 81, 0.3);
                }

                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.75rem;
                    color: #9ca3af;
                    text-decoration: none;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }

                .contact-item:hover {
                    background: rgba(37, 99, 235, 0.1);
                    color: #60a5fa;
                }

                .contact-item i {
                    width: 18px;
                    height: 18px;
                }
            </style>

            <div class="header-container">
                <div class="header-content">
                    <div class="logo">
                        <div class="logo-icon">JE</div>
                        <div class="logo-text">Joshua Empistan</div>
                    </div>

                    <div class="menu-toggle" id="menuToggle">
                        <i data-feather="menu"></i>
                    </div>
                </div>

                <div class="mobile-menu" id="mobileMenu">
                    <nav class="mobile-nav">
                        <nav-item href="#home">
                            <navitem-icon>
                                <i data-feather="home"></i>
                            </navitem-icon>
                            <navitem-label>Home</navitem-label>
                        </nav-item>

                        <nav-item href="#about">
                            <navitem-icon>
                                <i data-feather="user"></i>
                            </navitem-icon>
                            <navitem-label>About</navitem-label>
                        </nav-item>

                        <nav-item href="#skills">
                            <navitem-icon>
                                <i data-feather="code"></i>
                            </navitem-icon>
                            <navitem-label>Skills</navitem-label>
                        </nav-item>

                        <nav-item href="#projects">
                            <navitem-icon>
                                <i data-feather="briefcase"></i>
                            </navitem-icon>
                            <navitem-label>Projects</navitem-label>
                        </nav-item>

                        <nav-item href="#contact">
                            <navitem-icon>
                                <i data-feather="mail"></i>
                            </navitem-icon>
                            <navitem-label>Contact</navitem-label>
                        </nav-item>
                    </nav>

                    <div class="contact-info">
                        <a href="mailto:alex@example.dev" class="contact-item">
                            <i data-feather="mail"></i>
                            <span>alex@example.dev</span>
                        </a>
                        <a href="https://github.com" target="_blank" class="contact-item">
                            <i data-feather="github"></i>
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        setTimeout(() => {
            if (window.feather) {
                window.feather.replace({
                    'stroke-width': 1.5
                });
            }
        }, 100);

        const menuToggle = this.shadowRoot.getElementById('menuToggle');
        const mobileMenu = this.shadowRoot.getElementById('mobileMenu');

        menuToggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        const navItems = this.shadowRoot.querySelectorAll('nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    this.toggleMenu();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        setTimeout(() => {
                            window.scrollTo({
                                top: targetElement.offsetTop - 80,
                                behavior: 'smooth'
                            });
                        }, 300);
                    }
                }
            });
        });


        const contactLinks = this.shadowRoot.querySelectorAll('.contact-item');
        contactLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.toggleMenu();
            });
        });


        document.addEventListener('click', (e) => {
            if (this.menuOpen && !this.shadowRoot.contains(e.target)) {
                this.toggleMenu();
            }
        });
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
        const menuToggle = this.shadowRoot.getElementById('menuToggle');
        const mobileMenu = this.shadowRoot.getElementById('mobileMenu');
        const icon = menuToggle.querySelector('i');

        if (this.menuOpen) {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
            icon.setAttribute('data-feather', 'x');
        } else {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
            icon.setAttribute('data-feather', 'menu');
        }
        if (window.feather) {
            window.feather.replace();
        }
    }
}

customElements.define('mobile-header', MobileHeader);