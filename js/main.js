// 数据驱动渲染
async function renderSite() {
    const data = await loadSiteData();
    renderGallery(data.works);
    renderWorkflows(data.workflows);
    renderAbout(data.about);
    renderContact(data.contact);
}

function renderGallery(works) {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    grid.innerHTML = works.map(w => `
        <div class="gallery-item" data-category="${w.category}">
            <img src="${w.img || 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22><rect fill=%22%23667eea%22 width=%22400%22 height=%22400%22/><text fill=%22white%22 font-size=%2220%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22>${encodeURIComponent(w.title)}</text></svg>'}" alt="${w.title}" class="gallery-img">
            <div class="gallery-overlay">
                <h3>${w.title}</h3>
                <p>${w.desc}</p>
            </div>
        </div>
    `).join('');
    bindLightbox();
}

function renderWorkflows(workflows) {
    const grid = document.getElementById('workflow-grid');
    if (!grid) return;
    grid.innerHTML = workflows.map(wf => `
        <div class="workflow-item">
            <img src="${wf.img || 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22200%22><rect fill=%22%23764ba2%22 width=%22600%22 height=%22200%22/><text fill=%22white%22 font-size=%2218%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22>${encodeURIComponent(wf.title)}</text></svg>'}" alt="${wf.title}" class="workflow-img">
            <div class="workflow-content">
                <h3>${wf.title}</h3>
                <p>${wf.desc}</p>
                <div class="workflow-tags">
                    ${wf.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function renderAbout(about) {
    const container = document.getElementById('about-content');
    if (!container) return;
    container.innerHTML = `
        <div class="about-text">
            <h3>${about.title}</h3>
            ${about.paragraphs.map(p => `<p>${p}</p>`).join('')}
            <div class="skills">
                <h4>技能专长</h4>
                <div class="skill-tags">
                    ${about.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderContact(contact) {
    const container = document.getElementById('contact-info');
    if (!container) return;
    container.innerHTML = `
        <div class="contact-item">
            <div class="contact-icon">📧</div>
            <h3>邮箱</h3>
            <p>${contact.email}</p>
        </div>
        <div class="contact-item">
            <div class="contact-icon">💬</div>
            <h3>微信</h3>
            <p>${contact.wechat}</p>
        </div>
        <div class="contact-item">
            <div class="contact-icon">📱</div>
            <h3>电话</h3>
            <p>${contact.phone}</p>
        </div>
    `;
}

// 导航栏滚动效果
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// 导航链接激活状态
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// 平滑滚动
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// 移动端菜单
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 图片灯箱绑定
function bindLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.gallery-img');
            const overlay = item.querySelector('.gallery-overlay');
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
            lightboxCaption.textContent = overlay.querySelector('h3').textContent;
        });
    });
}

const lightbox = document.getElementById('lightbox');
const lightboxClose = document.querySelector('.lightbox-close');

lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// 初始化渲染
renderSite();

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});
