const observerScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.15 // Dispara a animação apenas quando 15% do elemento estiver visível
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observerScroll.observe(el));


const typingText = document.querySelector('.typing-text');

if (typingText) {
    const observerTyping = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('erasing');
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
                entry.target.classList.add('erasing');
            }
        });
    });
    observerTyping.observe(typingText);
}

const themeBtn = document.getElementById('theme-toggle');
const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
const body = document.body;

const updateIcon = () => {
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
};

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    if (themeIcon) updateIcon();
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        updateIcon();
        
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Efeito Parallax no Scroll para as formas de fundo (Blobs)
const blobs = document.querySelectorAll('.moving-blob');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (blobs.length > 0) {
        blobs[0].style.transform = `translateY(${scrollY * 0.4}px)`; // Acompanha o scroll descendo
        if (blobs[1]) blobs[1].style.transform = `translateY(${scrollY * -0.3}px)`; // Vai na direção oposta
    }
});

// Scroll suave forçado para links de navegação interno
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            
            // Calcula a posição exata da seção, descontando 100px para a Navbar não cobrir o título
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            
            // Scroll suave garantido via JavaScript (funciona em todos os navegadores)
            const startPosition = window.scrollY;
            const distance = offsetPosition - startPosition;
            let startTime = null;
            const duration = 800; // Tempo do deslize em ms (0.8 segundos)

            // Função de suavização (Ease In Out)
            const ease = (t, b, c, d) => {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            };

            const animation = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            };

            requestAnimationFrame(animation);
        }
    });
});