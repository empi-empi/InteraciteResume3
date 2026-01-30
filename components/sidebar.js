class VerticalSidebar extends HTMLElement {
    constructor() {
        super();
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
                    display: block;
                    position: fixed;
                    left: 0;
                    top: 0;
                    height: 100vh;
                    width: 5rem;
                    z-index: 40;
                    background: rgba(10, 10, 10, 0.7);
                    backdrop-filter: blur(10px);
                    border-right: 1px solid rgba(55, 65, 81, 0.3);
                }

                @media (max-width: 768px) {
                    :host {
                        display: none;
                    }
                }

                .sidebar-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 2rem 0;
                    height: 100%;
                }

                .logo {
                    margin-bottom: 3rem;
                }

                .logo-icon {
                    width: 27px;
                    height: 27px;
                    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 11px;
                    color: white;
                    text-decoration: none;
                }

                nav {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.125rem;
                    flex: 1;
                }

                nav-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-decoration: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                    padding: 0.5rem;
                }

                navitem-icon {
                    width: 33px;
                    height: 33px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 9px;
                    background: rgba(31, 41, 55, 0.3);
                    border: 1px solid rgba(55, 65, 81, 0.5);
                    transition: all 0.3s ease;
                }

                navitem-icon i {
                    width: 15px;
                    height: 15px;
                    color: #9ca3af;
                    transition: all 0.3s ease;
                }

                navitem-label {
                    position: absolute;
                    left: calc(100% + 12px);
                    white-space: nowrap;
                    background: rgba(17, 24, 39, 0.9);
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    font-size: 0.875rem;
                    opacity: 0;
                    transform: translateX(-10px);
                    transition: all 0.3s ease;
                    pointer-events: none;
                    border: 1px solid rgba(55, 65, 81, 0.5);
                }

                navitem-label::before {
                    content: '';
                    position: absolute;
                    left: -6px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 0;
                    height: 0;
                    border-top: 6px solid transparent;
                    border-bottom: 6px solid transparent;
                    border-right: 6px solid rgba(17, 24, 39, 0.9);
                }

                navitem:hover navitem-icon {
                    background: rgba(37, 99, 235, 0.2);
                    border-color: rgba(37, 99, 235, 0.5);
                    transform: translateY(-2px);
                }

                navitem:hover navitem-icon i {
                    color: #60a5fa;
                }

                navitem:hover navitem-label {
                    opacity: 1;
                    transform: translateX(0);
                }

                navitem[active="true"] navitem-icon {
                    background: rgba(37, 99, 235, 0.3);
                    border-color: rgba(37, 99, 235, 0.8);
                }

                navitem[active="true"] navitem-icon i {
                    color: #60a5fa;
                }

                .sidebar-footer {
                    margin-top: auto;
                    padding-top: 2rem;
                }

                .theme-toggle {
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    background: rgba(31, 41, 55, 0.3);
                    border: 1px solid rgba(55, 65, 81, 0.5);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .theme-toggle:hover {
                    background: rgba(37, 99, 235, 0.2);
                    border-color: rgba(37, 99, 235, 0.5);
                }

                .theme-toggle i {
                    width: 13px;
                    height: 13px;
                    color: #9ca3af;
                }
            </style>

            <div class="sidebar-container">
                <div class="logo">
                    <a href="#home" class="logo-icon">JE</a>
                </div>

                <nav>
                    <nav-item href="#home">
                        <navitem-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        </navitem-icon>
                        <navitem-label>Home</navitem-label>
                    </nav-item>

                    <nav-item href="#about">
                        <navitem-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </navitem-icon>
                        <navitem-label>About</navitem-label>
                    </nav-item>

                    <nav-item href="#skills">
                        <navitem-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                        </navitem-icon>
                        <navitem-label>Skills</navitem-label>
                    </nav-item>

                    <nav-item href="#projects">
                        <navitem-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 4h-2V2h-4v2H8"></path></svg>
                        </navitem-icon>
                        <navitem-label>Projects</navitem-label>
                    </nav-item>

                    <nav-item href="#education">
                        <navitem-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path><polyline points="16 5 22 5 22 11"></polyline><line x1="7" y1="12" x2="17" y2="12"></line></svg>
                        </navitem-icon>
                        <navitem-label>Education</navitem-label>
                    </nav-item>

                    <nav-item href="#seminars">
                        <navitem-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </navitem-icon>
                        <navitem-label>Seminars</navitem-label>
                    </nav-item>

                    <nav-item href="#contact">
                        <navitem-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                        </navitem-icon>
                        <navitem-label>Contact</navitem-label>
                    </nav-item>
                </nav>

                <div class="sidebar-footer">
                    <div class="theme-toggle" id="themeToggle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const themeToggle = this.shadowRoot.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const svg = themeToggle.querySelector('svg');
            if (document.documentElement.classList.contains('dark')) {
            } else {
                svg.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
            }
        });

        const navItems = this.shadowRoot.querySelectorAll('nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const rect = targetElement.getBoundingClientRect();
                        const elementTop = window.scrollY + rect.top;
                        const offset = Math.max(0, elementTop - (window.innerHeight / 2) + (rect.height / 2));
                        window.scrollTo({
                            top: offset,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

class NavItem extends HTMLElement {
    static get observedAttributes() {
        return ['active'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.style.display = 'flex';
        this.style.flexDirection = 'column';
        this.style.alignItems = 'center';
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'active') {
            this.updateActiveState(newValue === 'true');
        }
    }

    updateActiveState(isActive) {
        const icon = this.querySelector('navitem-icon');
        if (icon) {
            if (isActive) {
                icon.style.background = 'rgba(37, 99, 235, 0.3)';
                icon.style.borderColor = 'rgba(37, 99, 235, 0.8)';
            } else {
                icon.style.background = 'rgba(31, 41, 55, 0.3)';
                icon.style.borderColor = 'rgba(55, 65, 81, 0.5)';
            }
        }
    }
}

customElements.define('vertical-sidebar', VerticalSidebar);
customElements.define('nav-item', NavItem);