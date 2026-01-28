class PortfolioApp {
    constructor() {
        this.specialties = [
            {
                id: 'graphic-design',
                title: 'Graphic design',
                hashtags: [
                    '#бренд',
                    '#логотипы', 
                    '#постеры',
                    '#соц_сети',
                    '#мокапы',
                    '#иллюстрации',
                    '#3D_&_motion_graphic'
                ],
                color: '#000000',
                boardImage: 'assets/images/design-board.png',
                titleSVG: 'assets/icons/graphic-design-text.svg'
            },
            {
                id: 'uiux-design',
                title: 'UI/UX Design',
                hashtags: [
                    '#ux_research',
                    '#user_flow',
                    '#wireframes',
                    '#prototyping',
                    '#ui_design',
                    '#design_systems',
                    '#mobile_apps'
                ],
                color: '#8338ec',
                boardImage: 'assets/images/uiux-board.png',
                titleSVG: 'assets/icons/uiux-design-text.svg'
            },
            {
                id: 'web-development',
                title: 'Web Development',
                hashtags: [
                    '#frontend',
                    '#react',
                    '#vue',
                    '#javascript',
                    '#html_css',
                    '#responsive',
                    '#web_apps'
                ],
                color: '#3a86ff',
                boardImage: 'assets/images/webdev-board.png',
                titleSVG: 'assets/icons/webdev-text.svg'
            }
        ];
        
        this.currentSpecialty = 'graphic-design';
        this.isAnimating = false;
        
        this.init();
    }

    init() {
        this.renderApp();
        this.setupEventListeners();
    }

    renderApp() {
        const app = document.getElementById('app');
        
        app.innerHTML = `
            <header class="header">
                <div class="container">
                    <nav class="navbar">
                        <div class="pen-icon">
                            <!-- SVG иконка пера -->
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 19L19 12L22 15L15 22L12 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18 13L16.5 5.5L2 2L5.5 16.5L13 18L18 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2 2L9.58579 9.58579" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <path d="M11 13C12.1046 13 13 12.1046 13 11C13 9.89543 12.1046 9 11 9C9.89543 9 9 9.89543 9 11C9 12.1046 9.89543 13 11 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        
                        <div class="specialty-menu">
                            <button class="specialty-btn ${this.currentSpecialty === 'graphic-design' ? 'active' : ''}" 
                                    data-specialty="graphic-design">
                                график design
                            </button>
                            <button class="specialty-btn ${this.currentSpecialty === 'uiux-design' ? 'active' : ''}" 
                                    data-specialty="uiux-design">
                                ui/ux design
                            </button>
                            <button class="specialty-btn ${this.currentSpecialty === 'web-development' ? 'active' : ''}" 
                                    data-specialty="web-development">
                                web development
                            </button>
                        </div>
                        
                        <div class="username">
                            @yourusername
                        </div>
                    </nav>
                </div>
            </header>
            
            <main class="hero">
                <div class="container">
                    <div class="hero-content">
                        <!-- Левая часть - хэштеги -->
                        <div class="hashtags-container">
                            <div class="hashtags" id="hashtags-container">
                                ${this.renderHashtags(this.currentSpecialty)}
                            </div>
                        </div>
                        
                        <!-- Центральная часть - картинка доски -->
                        <div class="board-container">
                            <img src="${this.getCurrentSpecialty().boardImage}" 
                                 alt="${this.getCurrentSpecialty().title}" 
                                 class="board-image"
                                 id="board-image">
                        </div>
                        
                        <!-- Правая часть - надпись специальности -->
                        <div class="specialty-title-container">
                            <div class="specialty-title" id="specialty-title">
                                <!-- SVG будет загружено динамически -->
                            </div>
                        </div>
                        
                        <!-- Фоновая надпись PORTFOLIO -->
                        <div class="portfolio-title">
                            <!-- SVG надпись PORTFOLIO -->
                            <svg width="800" height="200" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 50L150 150L250 50L350 150L450 50L550 150L650 50L750 150" stroke="currentColor" stroke-width="4"/>
                                <!-- Ваш SVG код для PORTFOLIO -->
                            </svg>
                        </div>
                    </div>
                </div>
            </main>
        `;
        
        // Загружаем SVG специальности
        this.loadSpecialtySVG();
    }

    renderHashtags(specialtyId) {
        const specialty = this.specialties.find(s => s.id === specialtyId);
        return specialty.hashtags.map(tag => 
            `<span class="hashtag ${this.currentSpecialty === specialtyId ? '' : 'hidden'}" 
                   data-specialty="${specialtyId}">${tag}</span>`
        ).join('');
    }

    getCurrentSpecialty() {
        return this.specialties.find(s => s.id === this.currentSpecialty);
    }

    async loadSpecialtySVG() {
        const specialty = this.getCurrentSpecialty();
        const container = document.getElementById('specialty-title');
        
        try {
            const response = await fetch(specialty.titleSVG);
            const svgText = await response.text();
            container.innerHTML = svgText;
            
            // Устанавливаем цвет
            const svgElement = container.querySelector('svg');
            if (svgElement) {
                svgElement.style.fill = specialty.color;
            }
        } catch (error) {
            console.error('Error loading SVG:', error);
            container.innerHTML = `<h2 style="color: ${specialty.color}">${specialty.title}</h2>`;
        }
    }

    setupEventListeners() {
        // Обработчики кнопок переключения специальностей
        document.querySelectorAll('.specialty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (this.isAnimating) return;
                
                const newSpecialty = e.currentTarget.dataset.specialty;
                if (newSpecialty !== this.currentSpecialty) {
                    this.switchSpecialty(newSpecialty);
                }
            });
        });
    }

    async switchSpecialty(newSpecialtyId) {
        this.isAnimating = true;
        
        const oldSpecialty = this.currentSpecialty;
        const newSpecialty = this.specialties.find(s => s.id === newSpecialtyId);
        
        // Анимация исхода старого контента
        const hashtagsContainer = document.getElementById('hashtags-container');
        const boardImage = document.getElementById('board-image');
        const specialtyTitle = document.getElementById('specialty-title');
        
        // Определяем направление анимации
        const leftOut = oldSpecialty === 'graphic-design' ? 'animate-left-out' : 'animate-right-out';
        const rightOut = oldSpecialty === 'graphic-design' ? 'animate-right-out' : 'animate-left-out';
        
        // Добавляем анимации исхода
        hashtagsContainer.classList.add(leftOut);
        boardImage.classList.add('animate-left-out');
        specialtyTitle.classList.add(rightOut);
        
        // Ждем завершения анимации исхода
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Обновляем контент
        this.currentSpecialty = newSpecialtyId;
        
        // Обновляем хэштеги
        hashtagsContainer.innerHTML = this.renderHashtags(newSpecialtyId);
        
        // Обновляем картинку
        boardImage.src = newSpecialty.boardImage;
        boardImage.alt = newSpecialty.title;
        
        // Обновляем активную кнопку в меню
        document.querySelectorAll('.specialty-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.specialty === newSpecialtyId) {
                btn.classList.add('active');
            }
        });
        
        // Загружаем новое SVG
        await this.loadSpecialtySVG();
        
        // Убираем старые классы анимации
        hashtagsContainer.classList.remove(leftOut);
        boardImage.classList.remove('animate-left-out');
        specialtyTitle.classList.remove(rightOut);
        
        // Добавляем новые классы для анимации входа
        const leftIn = newSpecialtyId === 'graphic-design' ? 'animate-left-in' : 'animate-right-in';
        const rightIn = newSpecialtyId === 'graphic-design' ? 'animate-right-in' : 'animate-left-in';
        
        hashtagsContainer.classList.add(leftIn);
        boardImage.classList.add('animate-right-in');
        specialtyTitle.classList.add(rightIn);
        
        // Ждем завершения анимации входа
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Убираем классы анимации
        hashtagsContainer.classList.remove(leftIn);
        boardImage.classList.remove('animate-right-in');
        specialtyTitle.classList.remove(rightIn);
        
        this.isAnimating = false;
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});