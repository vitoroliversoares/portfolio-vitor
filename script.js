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

// =========================================
// TRADUÇÃO DO PORTFÓLIO (i18n)
// =========================================

const translations = {
    pt: {
        nav_about: "Sobre",
        nav_experience: "Experiência",
        nav_stack: "Stack",
        nav_projects: "Projetos",
        nav_contact: "Contato",
        hero_typing: "Engenharia e Análise de Dados | Backend Python | Automação.",
        btn_cv: '<i class="fas fa-download"></i> Baixar CV',
        btn_projects: "Ver Projetos",
        about_title: "Sobre Mim",
        about_text: "Atualmente sou Estagiário de Dados na Autoglass, atuando na frente técnica de Governança de Dados. Meu foco é garantir a <strong>qualidade, automação e integridade</strong> das informações. Tenho experiência prática construindo pipelines (Python/Airflow), estruturando dados em Data Warehouse (Snowflake) e transformando dados brutos em insights estratégicos (Tableau).",
        about_card1_title: "Arquitetura de Dados",
        about_card1_desc: "Experiência prática em integração Supabase (Cloud) e PostgreSQL local.",
        about_card2_title: "Automação de processos",
        about_card2_desc: "Redução drástica de tempo manual através de scripts Python e SQL.",
        about_card3_title: "Melhoria Contínua",
        about_card3_desc: "Foco constante em otimização de processos.",
        exp_title: "Experiência Profissional",
        exp1_role: "Estagiário de Dados",
        exp1_date: "Mar 2026 - Atual",
        exp1_comp: "Autoglass (Programa de Estágio DataTeam)",
        exp1_desc1: "Atuação na governança de dados em frente técnica, com foco em automação e qualidade.",
        exp1_desc2: "Desenvolvimento de automações com <strong>Python</strong> e orquestração de pipelines com <strong>Airflow (DAGs)</strong> e Jenkins.",
        exp1_desc3: "Análise e modelagem de dados no Data Warehouse (<strong>Snowflake</strong>) e catalogação no <strong>OpenMetadata</strong>.",
        exp1_desc4: "Criação de dashboards e análises para stakeholders utilizando <strong>Tableau</strong>.",
        exp2_role: "Assistente de Suporte Técnico Pleno",
        exp2_date: "Ago 2025 - Mar 2026",
        exp2_desc1: "Otimização do tempo de resposta de 12h para 4h (Redução de 66% no SLA) através da reestruturação de processos.",
        exp2_desc2: "Desenvolvimento de scripts <strong>Python</strong> e arquitetura <strong>PostgreSQL</strong> para automação de backups e cadastro de ativos.",
        exp2_desc3: "Integração via JavaScript para eliminação de gargalos manuais no suporte.",
        exp3_role: "Auxiliar Administrativo",
        exp3_date: "Jan 2025 - Jul 2025",
        exp3_desc1: "Emissão e conferência de NF-e utilizando sistema ERP Automatiza, garantindo conformidade fiscal.",
        exp3_desc2: "Apoio no controle de fluxo de caixa e geração de relatórios de vendas via <strong>Excel</strong> para tomada de decisão.",
        skills_title: "Tech Stack",
        edu_title: '<i class="fas fa-graduation-cap"></i> Formação',
        edu1_course: "Sistemas de Informação",
        edu1_degree: "FAESA (Bacharelado)",
        edu2_course: "Fundamentos Python 1",
        edu_link: "Ver Certificado",
        proj_title: "Projetos em Destaque",
        proj1_title: "Automação ETL",
        proj1_desc: "Sincronização segura entre Supabase (Cloud) e Postgres Local.",
        proj_btn: "Ver Código",
        proj2_title: "Sistema de Help Desk",
        proj2_desc: "Gestão de tickets de suporte com Backend Java e POO.",
        contact_title: "Vamos Conversar?",
        ai_disclaimer: "Este portfólio foi desenvolvido com auxílio de Inteligência Artificial Generativa. Como meu foco principal é em <strong>Dados e Backend</strong>, utilizei a IA para acelerar e aprimorar a construção deste Frontend interativo."
    },
    en: {
        nav_about: "About",
        nav_experience: "Experience",
        nav_stack: "Stack",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_typing: "Data Engineering & Analytics | Python Backend | Automation.",
        btn_cv: '<i class="fas fa-download"></i> Download CV',
        btn_projects: "View Projects",
        about_title: "About Me",
        about_text: "I am currently a Data Intern at Autoglass, working on the technical front of Data Governance. My focus is to ensure the <strong>quality, automation, and integrity</strong> of information. I have hands-on experience building pipelines (Python/Airflow), structuring data in Data Warehouses (Snowflake), and transforming raw data into strategic insights (Tableau).",
        about_card1_title: "Data Architecture",
        about_card1_desc: "Practical experience integrating Supabase (Cloud) and local PostgreSQL.",
        about_card2_title: "Process Automation",
        about_card2_desc: "Drastic manual time reduction through Python and SQL scripts.",
        about_card3_title: "Continuous Improvement",
        about_card3_desc: "Constant focus on process optimization.",
        exp_title: "Professional Experience",
        exp1_role: "Data Intern",
        exp1_date: "Mar 2026 - Present",
        exp1_comp: "Autoglass (DataTeam Internship Program)",
        exp1_desc1: "Worked on technical data governance, focusing on automation and data quality.",
        exp1_desc2: "Developed automations using <strong>Python</strong> and orchestrated pipelines with <strong>Airflow (DAGs)</strong> and Jenkins.",
        exp1_desc3: "Data analysis and modeling in Data Warehouse (<strong>Snowflake</strong>) and cataloging in <strong>OpenMetadata</strong>.",
        exp1_desc4: "Created dashboards and analysis for stakeholders using <strong>Tableau</strong>.",
        exp2_role: "Mid-Level Technical Support Assistant",
        exp2_date: "Aug 2025 - Mar 2026",
        exp2_desc1: "Optimized response time from 12h to 4h (66% SLA reduction) by restructuring processes.",
        exp2_desc2: "Developed <strong>Python</strong> scripts and <strong>PostgreSQL</strong> architecture to automate backups and asset registration.",
        exp2_desc3: "JavaScript integration to eliminate manual bottlenecks in support workflow.",
        exp3_role: "Administrative Assistant",
        exp3_date: "Jan 2025 - Jul 2025",
        exp3_desc1: "Issuance and verification of electronic invoices using Automatiza ERP, ensuring tax compliance.",
        exp3_desc2: "Supported cash flow control and generated sales reports via <strong>Excel</strong> for decision making.",
        skills_title: "Tech Stack",
        edu_title: '<i class="fas fa-graduation-cap"></i> Education',
        edu1_course: "Information Systems",
        edu1_degree: "FAESA (Bachelor's Degree)",
        edu2_course: "Python Fundamentals 1",
        edu_link: "View Certificate",
        proj_title: "Featured Projects",
        proj1_title: "ETL Automation",
        proj1_desc: "Secure synchronization between Supabase (Cloud) and local Postgres.",
        proj_btn: "View Code",
        proj2_title: "Help Desk System",
        proj2_desc: "Support ticket management using Java Backend and OOP.",
        contact_title: "Let's Talk?",
        ai_disclaimer: "This portfolio was developed with the help of Generative Artificial Intelligence. Since my main focus is on <strong>Data and Backend</strong>, I used AI to accelerate and enhance the creation of this interactive Frontend."
    }
};

let currentLang = localStorage.getItem('lang') || 'pt';
const langToggle = document.getElementById('lang-toggle');
const langText = langToggle ? langToggle.querySelector('.lang-text') : null;

const setLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    // Troca o texto do botão (Se a linguagem atual é PT, ele sugere EN e vice-versa)
    if (langText) langText.textContent = lang === 'pt' ? 'EN' : 'PT';
    
    // Altera todos os textos com a classe de tradução
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
};

if (langToggle) {
    langToggle.addEventListener('click', () => {
        setLanguage(currentLang === 'pt' ? 'en' : 'pt');
    });
}

// Inicia com a linguagem correta quando a página carrega
setLanguage(currentLang);