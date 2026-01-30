document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    updateActiveSection();
    initializeForm();
    window.addEventListener('scroll', handleScroll);
});

function initializeAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('opacity-0');
        observer.observe(section);
    });
}

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const sidebarItems = document.querySelectorAll('vertical-sidebar nav-item');
    const mobileItems = document.querySelectorAll('mobile-header nav-item');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        if (sidebarItems.length > 0) {
            sidebarItems.forEach(item => {
                if (item.getAttribute('href')?.substring(1) === current) {
                    item.setAttribute('active', 'true');
                } else {
                    item.setAttribute('active', 'false');
                }
            });
        }
        
        if (mobileItems.length > 0) {
            mobileItems.forEach(item => {
                if (item.getAttribute('href')?.substring(1) === current) {
                    item.setAttribute('active', 'true');
                } else {
                    item.setAttribute('active', 'false');
                }
            });
        }
    });
}

function initializeForm() {
    const form = document.querySelector('form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            submitButton.classList.remove('from-blue-600', 'to-purple-600');
            submitButton.classList.add('from-green-600', 'to-green-500');

            form.reset();
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('from-green-600', 'to-green-500');
                submitButton.classList.add('from-blue-600', 'to-purple-600');

                showNotification('Message sent successfully!', 'success');
            }, 3000);
        }, 1500);
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-6 right-6 px-6 py-3 rounded-lg z-50 transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-900/90 border border-green-700' : 'bg-blue-900/90 border border-blue-700'
    }`;
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i data-feather="${type === 'success' ? 'check-circle' : 'info'}" class="w-5 h-5 ${
                type === 'success' ? 'text-green-400' : 'text-blue-400'
            }"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    if (feather) {
        feather.replace();
    }
    
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
        notification.classList.add('translate-x-0');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('translate-x-0');
        notification.classList.add('translate-x-full');
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function handleScroll() {
    const scrollY = window.scrollY;
    const heroSection = document.getElementById('home');
    
    if (heroSection) {
        const opacity = 1 - Math.min(scrollY / 500, 1);
        heroSection.style.opacity = opacity;
    }
}

async function loadProjects() {
    try {
        const response = await fetch('https://api.github.com/users/octocat/repos?per_page=6');
        const projects = await response.json();
        
        console.log('Fetched projects:', projects);
        
        return projects;
    } catch (error) {
        console.error('Error loading projects:', error);
        return [];
    }
}

loadProjects().then(projects => {
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

window.toggleMobileMenu = function() {
    const mobileHeader = document.querySelector('mobile-header');
    if (mobileHeader) {
        mobileHeader.toggleMenu();
    }
};

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const firstInput = contactSection.querySelector('input, textarea');
            if (firstInput) {
                firstInput.focus();
            } else {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

class ThreeDViewer {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.skillMarkers = [];
        this.isRotating = false;
        this.animationId = null;
        this.skillsData = [
            {
                id: 'programming',
                title: 'Programming',
                icon: 'code',
                description: 'I apply programming concepts and logical thinking to solve problems, build systems, and ensure projects run correctly.',
                level: 'Intermediate',
                color: '#3b82f6'
            },
            {
                id: 'engineering',
                title: 'Engineering',
                icon: 'monitor',
                description: 'Creating 2D/3D models and plans using AutoCAD and SketchUp. Designing efficient and effective systems.',
                level: 'Intermediate',
                color: '#8b5cf6'
            },
            {
                id: 'simulation',
                title: 'Simulation',
                icon: 'zap',
                description: 'Testing circuits and concepts using Falstad and other simulators. Validating designs before implementation.',
                level: 'Advanced',
                color: '#6366f1'
            },
            {
                id: 'microcontrollers',
                title: 'Microcontrollers',
                icon: 'cpu',
                description: 'Programming microcontrollers and embedded systems. Working with Arduino, Raspberry Pi, and other platforms.',
                level: 'Intermediate',
                color: '#06b6d4'
            },
            {
                id: 'productivity',
                title: 'Collaboration',
                icon: 'globe',
                description: 'Efficient use of Microsoft Office and Google Workspace for documentation and teamwork.',
                level: 'Advanced',
                color: '#a855f7'
            }
        ];
    }

    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupControls();
        this.setupLights();
        this.loadModel();
        this.setupEventListeners();
        this.animate();
        this.setupScrollAnimation();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0f172a);
    }

    setupCamera() {
        const container = document.getElementById('3d-viewer');
        if (!container) return;
        
        this.camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            2000
        );
        this.camera.position.set(1000, 1000, 1500);
    }

    setupRenderer() {
        const container = document.getElementById('3d-viewer');
        if (!container) return;

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.pixelRatio = window.devicePixelRatio;
        container.appendChild(this.renderer.domElement);
    }

    setupControls() {
        if (!this.renderer) return;

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.maxPolarAngle = Math.PI;
        this.controls.minPolarAngle = 0;
        this.controls.maxDistance = 250;
        this.controls.minDistance = 5;
    }

    setupLights() {
        if (!this.scene) return;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        const hemisphereLight = new THREE.HemisphereLight(0x1e40af, 0x1e1b4b, 0.4);
        this.scene.add(hemisphereLight);
    }

    loadModel() {
        const loader = new THREE.GLTFLoader();

        loader.load('office_room_15_low-poly_3d_model.glb', (gltf) => {
            this.model = gltf.scene;
            this.model.scale.set(0.26, 0.26, 0.26);
            this.model.position.y = -5;
            this.scene.add(this.model);

            this.createSkillMarkers();

            this.hideLoading();
        }, (progress) => {
            const percentComplete = (progress.loaded / progress.total) * 100;
            console.log('Loading progress:', percentComplete + '%');
        }, (error) => {
            console.error('Error loading model:', error);
            this.createPlaceholderModel();
            this.hideLoading();
        });
    }

    createPlaceholderModel() {
        if (!this.scene) return;

        const modelGroup = new THREE.Group();

        const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const cubeMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x3b82f6,
            roughness: 0.3,
            metalness: 0.6,
            emissive: 0x1e40af,
            emissiveIntensity: 0.2
        });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        cube.receiveShadow = true;
        cube.position.y = -2;
        modelGroup.add(cube);

        const ringGeometry = new THREE.TorusGeometry(2, 0.1, 16, 100);
        const ringMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8b5cf6,
            roughness: 0.4,
            metalness: 0.4
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 4;
        ring.castShadow = true;
        ring.position.y = -2;
        modelGroup.add(ring);

        const ring2 = new THREE.Mesh(ringGeometry, new THREE.MeshStandardMaterial({ 
            color: 0x06b6d4,
            roughness: 0.4,
            metalness: 0.4
        }));
        ring2.rotation.y = Math.PI / 3;
        ring2.scale.set(1.3, 1.3, 1.3);
        ring2.castShadow = true;
        ring2.position.y = -2;
        modelGroup.add(ring2);

        this.scene.add(modelGroup);
        this.model = modelGroup;

        this.ring1 = ring;
        this.ring2 = ring2;

        this.createSkillMarkers();
    }

    createSkillMarkers() {
        if (!this.scene) return;

        const spherePositions = [
            { x: 20, y: 24, z: 8 },
            { x: -28, y: 30, z: 11 },
            { x: 0, y: 20, z: -25 },
            { x: 20, y: 22, z: -28 },
            { x: -28, y: 35, z: -14 }
        ];
        
        this.skillsData.forEach((skill, index) => {
            const pos = spherePositions[index] || { x: 0, y: 8, z: 0 };

            const visibleGeometry = new THREE.SphereGeometry(2.4, 32, 32);
            const visibleMaterial = new THREE.MeshBasicMaterial({ 
                color: skill.color,
                transparent: true,
                opacity: 0.9
            });
            const visibleMarker = new THREE.Mesh(visibleGeometry, visibleMaterial);
            visibleMarker.position.set(pos.x, pos.y, pos.z);
            visibleMarker.userData = { skill };
            visibleMarker.castShadow = true;

            const clickableGeometry = new THREE.SphereGeometry(7.2, 32, 32);
            const clickableMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x000000,
                transparent: true,
                opacity: 0.0,
                visible: false
            });
            const clickableMarker = new THREE.Mesh(clickableGeometry, clickableMaterial);
            clickableMarker.position.set(pos.x, pos.y, pos.z);
            clickableMarker.userData = { skill, visibleMesh: visibleMarker };

            const markerGroup = new THREE.Group();
            markerGroup.add(visibleMarker);
            markerGroup.add(clickableMarker);
            markerGroup.position.set(pos.x, pos.y, pos.z);

            const glowGeometry = new THREE.SphereGeometry(0.9, 16, 16);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: skill.color,
                transparent: true,
                opacity: 0.2
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            visibleMarker.add(glow);

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 256;
            canvas.height = 128;
            
            context.fillStyle = 'rgba(15, 23, 42, 0.95)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.strokeStyle = skill.color;
            context.lineWidth = 2;
            context.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
            context.fillStyle = skill.color;
            context.font = 'bold 28px Arial';
            context.textAlign = 'center';
            context.fillText(skill.title, canvas.width/2, canvas.height/2);
            
            const texture = new THREE.CanvasTexture(canvas);
            const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
            const sprite = new THREE.Sprite(spriteMaterial);
            const initialLabelScale = { x: 25, y: 12.5, z: 5 };
            sprite.scale.set(initialLabelScale.x, initialLabelScale.y, initialLabelScale.z);
            sprite.userData = { initialLabelScale };
            sprite.position.y = 10;
            visibleMarker.add(sprite);

            this.scene.add(markerGroup);
            
            this.skillMarkers.push({
                visible: visibleMarker,
                clickable: clickableMarker,
                group: markerGroup,
                label: sprite
            });

            this.makeMarkerInteractive(clickableMarker, visibleMarker);
        });
    }

    makeMarkerInteractive(clickableMarker, visibleMarker) {
        if (!this.renderer) return;

        const element = this.renderer.domElement;
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        const onMouseMove = (event) => {
            const rect = element.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            raycaster.setFromCamera(mouse, this.camera);
            const intersects = raycaster.intersectObject(clickableMarker);
            
            if (intersects.length > 0) {
                element.style.cursor = 'pointer';
                gsap.to(visibleMarker.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.3 });

                const markerData = this.skillMarkers.find(m => m.visible === visibleMarker);
                if (markerData && markerData.label && markerData.label.userData.initialLabelScale) {
                    const scale = markerData.label.userData.initialLabelScale;
                    gsap.to(markerData.label.scale, { 
                        x: scale.x * 1.1,
                        y: scale.y * 1.1,
                        z: scale.z, 
                        duration: 0.3 
                    });
                }
            } else {
                element.style.cursor = 'auto';
                gsap.to(visibleMarker.scale, { x: 1, y: 1, z: 1, duration: 0.3 });

                const markerData = this.skillMarkers.find(m => m.visible === visibleMarker);
                if (markerData && markerData.label && markerData.label.userData.initialLabelScale) {
                    const scale = markerData.label.userData.initialLabelScale;
                    gsap.to(markerData.label.scale, { 
                        x: scale.x,
                        y: scale.y,
                        z: scale.z, 
                        duration: 0.3 
                    });
                }
            }
        };
        
        const onClick = (event) => {
            const rect = element.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            
            raycaster.setFromCamera(mouse, this.camera);
            const intersects = raycaster.intersectObject(clickableMarker);
            
            if (intersects.length > 0) {
                this.showSkillInfo(clickableMarker.userData.skill);

                gsap.to(visibleMarker.scale, {
                    x: 1.5,
                    y: 1.5,
                    z: 1.5,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1
                });
            }
        };
        
        element.addEventListener('mousemove', onMouseMove);
        element.addEventListener('click', onClick);

        clickableMarker.cleanup = () => {
            element.removeEventListener('mousemove', onMouseMove);
            element.removeEventListener('click', onClick);
        };
    }

    showSkillInfo(skill) {
        const content = document.getElementById('skill-content');
        if (!content) return;

        content.innerHTML = `
            <div class="animate-fadeIn">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 rounded-lg flex items-center justify-center" style="background-color: ${skill.color}20">
                        <i data-feather="${skill.icon}" class="w-6 h-6" style="color: ${skill.color}"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-white">${skill.title}</h3>
                        <span class="px-3 py-1 text-xs font-medium rounded-full" style="background-color: ${skill.color}20; color: ${skill.color}">
                            ${skill.level}
                        </span>
                    </div>
                </div>
                <p class="text-gray-300 mb-6">${skill.description}</p>
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-400">Proficiency</span>
                        <span class="text-sm font-medium" style="color: ${skill.color}">${skill.level}</span>
                    </div>
                    <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div class="h-full rounded-full" style="width: ${
                            skill.level === 'Advanced' ? '90%' : 
                            skill.level === 'Intermediate' ? '60%' : '50%'
                        }; background-color: ${skill.color}"></div>
                    </div>
                </div>
            </div>
        `;
        
        if (feather) {
            feather.replace();
        }
    }

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.style.display = 'none';
    }

    setupEventListeners() {
        const resetBtn = document.getElementById('reset-view');
        const toggleBtn = document.getElementById('toggle-rotation');

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.camera.position.set(10, 10, 15);
                this.controls.target.set(0, 0, 0);
            });
        }

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.isRotating = !this.isRotating;
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-feather', this.isRotating ? 'pause' : 'play');
                    if (feather) {
                        feather.replace();
                    }
                }
            });
        }

        window.addEventListener('resize', () => {
            const container = document.getElementById('3d-viewer');
            if (!container || !this.camera || !this.renderer) return;
            
            this.camera.aspect = container.clientWidth / container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(container.clientWidth, container.clientHeight);
        });
    }

    setupScrollAnimation() {
        const viewerContainer = document.getElementById('viewer-container');
        if (!viewerContainer) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    viewerContainer.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(viewerContainer);
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        if (this.isRotating && this.model) {
            this.model.rotation.y += 0.005;
        }

        if (this.ring1) {
            this.ring1.rotation.x += 0.002;
            this.ring1.rotation.z += 0.003;
        }
        if (this.ring2) {
            this.ring2.rotation.y += 0.0025;
            this.ring2.rotation.z += 0.002;
        }

        if (this.controls) {
            this.controls.update();
        }
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        this.skillMarkers.forEach(marker => {
            if (marker.clickable.cleanup) marker.clickable.cleanup();
        });

        if (this.scene) {
            this.scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(material => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
        }

        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

let threeDViewer = null;

document.addEventListener('DOMContentLoaded', () => {
    const viewerContainer = document.getElementById('3d-viewer');
    if (viewerContainer) {
        threeDViewer = new ThreeDViewer();
        threeDViewer.init();
    }

    // Initialize Education Coin Flip
    initEducationCoinFlip();
});

function initEducationCoinFlip() {
    const coinFlipper = document.getElementById('coinFlipper');
    const coinSide1 = document.getElementById('coin-side-1');
    const coinSide2 = document.getElementById('coin-side-2');
    const infoPanel1 = document.getElementById('info-panel-1');
    const infoPanel2 = document.getElementById('info-panel-2');

    if (!coinFlipper) return;

    // Hover on first side
    coinSide1.addEventListener('mouseenter', () => {
        stopCoinFlip();
        coinSide1.classList.add('coin-active');
        coinFlipper.style.transform = 'rotateY(0deg)';
        infoPanel1.classList.add('show');
        infoPanel2.classList.remove('show');
    });

    // Hover on second side
    coinSide2.addEventListener('mouseenter', () => {
        stopCoinFlip();
        coinSide2.classList.add('coin-active');
        coinFlipper.style.transform = 'rotateY(180deg)';
        infoPanel2.classList.add('show');
        infoPanel1.classList.remove('show');
    });

    // Hover out - resume spinning
    coinFlipper.addEventListener('mouseleave', () => {
        resumeCoinFlip();
        coinSide1.classList.remove('coin-active');
        coinSide2.classList.remove('coin-active');
        infoPanel1.classList.remove('show');
        infoPanel2.classList.remove('show');
    });

    function stopCoinFlip() {
        coinSide1.classList.add('coin-stopped');
        coinSide2.classList.add('coin-stopped');
    }

    function resumeCoinFlip() {
        coinSide1.classList.remove('coin-stopped');
        coinSide2.classList.remove('coin-stopped');
        coinFlipper.style.transform = 'rotateY(0deg)';
    }
}

window.addEventListener('beforeunload', () => {
    if (threeDViewer) {
        threeDViewer.dispose();
    }
});