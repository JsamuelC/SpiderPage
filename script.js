// Navegación entre secciones
document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.content-section');
    
    // Función para mostrar/ocultar secciones
    function showSection(category) {
        sections.forEach(section => {
            if (category === 'all') {
                section.classList.remove('hidden');
            } else {
                if (section.dataset.category === category) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            }
        });
    }
    
    // Event listeners para los botones
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Obtener la categoría
            const category = this.dataset.section;
            
            // Mostrar/ocultar secciones
            showSection(category);
            
            // Scroll suave al inicio de las secciones visibles
            setTimeout(() => {
                const firstVisibleSection = document.querySelector('.content-section:not(.hidden)');
                if (firstVisibleSection && category !== 'all') {
                    firstVisibleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else if (category === 'all') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 100);
        });
    });
    
    // Animación de entrada para las tarjetas
    const cards = document.querySelectorAll('.poster-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Reobservar tarjetas cuando cambian las secciones visibles
    const originalObserver = observer;
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(() => {
                const visibleCards = document.querySelectorAll('.content-section:not(.hidden) .poster-card');
                visibleCards.forEach(card => {
                    if (card.style.opacity === '0' || card.style.opacity === '') {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        originalObserver.observe(card);
                    }
                });
            }, 100);
        });
    });
    
    // Manejo de errores de carga de imágenes con placeholder mejorado
    const images = document.querySelectorAll('.poster-image img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #c41e3a 0%, #1a237e 100%);
                color: white;
                font-size: 14px;
                text-align: center;
                padding: 20px;
                font-weight: 500;
            `;
            placeholder.textContent = this.alt || 'Imagen no disponible';
            this.style.display = 'none';
            this.parentElement.appendChild(placeholder);
        });
    });
});
