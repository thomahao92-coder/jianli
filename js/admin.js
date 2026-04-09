let siteData = null;

async function init() {
    const adminCache = getAdminData();
    if (adminCache) {
        siteData = adminCache;
    } else {
        siteData = await loadSiteData();
    }
    renderWorksList();
    renderWorkflowsList();
    renderAboutForm();
    renderContactForm();
}

// ===== 作品管理 =====
function renderWorksList() {
    const list = document.getElementById('works-list');
    if (siteData.works.length === 0) {
        list.innerHTML = '<div class="empty-hint">暂无作品，点击下方按钮添加</div>';
        return;
    }
    list.innerHTML = siteData.works.map((w, i) => `
        <div class="item-card">
            <div class="item-header">
                <h3>作品 ${i + 1}</h3>
                <div class="item-actions">
                    <button class="btn btn-danger" onclick="removeWork(${i})">删除</button>
                </div>
            </div>
            ${w.img ? `<img class="item-preview" src="${w.img}">` : ''}
            <div class="img-upload">
                <label class="upload-btn" for="work-img-${i}">选择图片</label>
                <input type="file" id="work-img-${i}" accept="image/*" onchange="uploadWorkImg(${i}, this)">
                ${w.img ? '<span style="color:var(--success)">已上传</span>' : '<span style="color:var(--text-light)">未上传</span>'}
            </div>
            <div class="form-group" style="margin-top:0.8rem">
                <label>标题</label>
                <input type="text" value="${w.title}" onchange="siteData.works[${i}].title=this.value">
            </div>
            <div class="form-group">
                <label>描述</label>
                <input type="text" value="${w.desc}" onchange="siteData.works[${i}].desc=this.value">
            </div>
            <div class="form-group">
                <label>分类</label>
                <input type="text" value="${w.category}" onchange="siteData.works[${i}].category=this.value">
            </div>
        </div>
    `).join('');
}

function addWork() {
    const id = Date.now();
    siteData.works.push({ id, title: '新作品', desc: '描述', category: '分类', img: '' });
    renderWorksList();
}

function removeWork(i) {
    siteData.works.splice(i, 1);
    renderWorksList();
}

function uploadWorkImg(i, input) {
    const file = input.files[0];
    if (!file) return;
    siteData.works[i].img = 'images/works/' + file.name;
    renderWorksList();
}

// ===== 工作流管理 =====
function renderWorkflowsList() {
    const list = document.getElementById('workflows-list');
    if (siteData.workflows.length === 0) {
        list.innerHTML = '<div class="empty-hint">暂无工作流，点击下方按钮添加</div>';
        return;
    }
    list.innerHTML = siteData.workflows.map((wf, i) => `
        <div class="item-card">
            <div class="item-header">
                <h3>工作流 ${i + 1}</h3>
                <div class="item-actions">
                    <button class="btn btn-danger" onclick="removeWorkflow(${i})">删除</button>
                </div>
            </div>
            ${wf.img ? `<img class="item-preview" src="${wf.img}">` : ''}
            <div class="img-upload">
                <label class="upload-btn" for="wf-img-${i}">选择图片</label>
                <input type="file" id="wf-img-${i}" accept="image/*" onchange="uploadWfImg(${i}, this)">
                ${wf.img ? '<span style="color:var(--success)">已上传</span>' : '<span style="color:var(--text-light)">未上传</span>'}
            </div>
            <div class="form-group" style="margin-top:0.8rem">
                <label>标题</label>
                <input type="text" value="${wf.title}" onchange="siteData.workflows[${i}].title=this.value">
            </div>
            <div class="form-group">
                <label>描述</label>
                <textarea onchange="siteData.workflows[${i}].desc=this.value">${wf.desc}</textarea>
            </div>
            <div class="form-group">
                <label>标签</label>
                <div class="tag-container" id="wf-tags-${i}">
                    ${wf.tags.map((t, ti) => `<span class="tag-item">${t}<span class="tag-remove" onclick="removeWfTag(${i},${ti})"> ×</span></span>`).join('')}
                </div>
                <div class="tag-input-group">
                    <input type="text" id="wf-tag-input-${i}" placeholder="添加标签">
                    <button class="btn btn-outline" onclick="addWfTag(${i})">添加</button>
                </div>
            </div>
        </div>
    `).join('');
}

function addWorkflow() {
    const id = Date.now();
    siteData.workflows.push({ id, title: '新工作流', desc: '描述', img: '', tags: [] });
    renderWorkflowsList();
}

function removeWorkflow(i) {
    siteData.workflows.splice(i, 1);
    renderWorkflowsList();
}

function uploadWfImg(i, input) {
    const file = input.files[0];
    if (!file) return;
    siteData.workflows[i].img = 'images/workflows/' + file.name;
    renderWorkflowsList();
}

function addWfTag(i) {
    const input = document.getElementById(`wf-tag-input-${i}`);
    const val = input.value.trim();
    if (!val) return;
    siteData.workflows[i].tags.push(val);
    input.value = '';
    renderWorkflowsList();
}

function removeWfTag(wi, ti) {
    siteData.workflows[wi].tags.splice(ti, 1);
    renderWorkflowsList();
}

// ===== 关于我 =====
function renderAboutForm() {
    document.getElementById('about-title').value = siteData.about.title;
    document.getElementById('about-p1').value = siteData.about.paragraphs[0] || '';
    document.getElementById('about-p2').value = siteData.about.paragraphs[1] || '';
    renderSkillsTags();
}

function renderSkillsTags() {
    const container = document.getElementById('skills-tags');
    container.innerHTML = siteData.about.skills.map((s, i) =>
        `<span class="tag-item">${s}<span class="tag-remove" onclick="removeSkill(${i})"> ×</span></span>`
    ).join('');
}

function addSkill() {
    const input = document.getElementById('skill-input');
    const val = input.value.trim();
    if (!val) return;
    siteData.about.skills.push(val);
    input.value = '';
    renderSkillsTags();
}

function removeSkill(i) {
    siteData.about.skills.splice(i, 1);
    renderSkillsTags();
}

// ===== 联系方式 =====
function renderContactForm() {
    document.getElementById('contact-email').value = siteData.contact.email;
    document.getElementById('contact-wechat').value = siteData.contact.wechat;
    document.getElementById('contact-phone').value = siteData.contact.phone;
}

// ===== 保存 =====
function collectFormData() {
    siteData.about.title = document.getElementById('about-title').value;
    siteData.about.paragraphs = [
        document.getElementById('about-p1').value,
        document.getElementById('about-p2').value
    ];
    siteData.contact.email = document.getElementById('contact-email').value;
    siteData.contact.wechat = document.getElementById('contact-wechat').value;
    siteData.contact.phone = document.getElementById('contact-phone').value;
}

function saveAll() {
    collectFormData();
    try {
        saveAdminData(siteData);
        showToast('已暂存到浏览器');
    } catch (e) {
        showToast('暂存失败，请直接导出 config.json');
    }
}

function exportAll() {
    collectFormData();
    saveAdminData(siteData);
    exportConfig(siteData);
    showToast('config.json 已导出，请替换项目文件夹中的同名文件');
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg || '操作成功';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// 回车添加标签
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        if (e.target.id === 'skill-input') { addSkill(); e.preventDefault(); }
        if (e.target.id && e.target.id.startsWith('wf-tag-input-')) {
            const i = parseInt(e.target.id.split('-').pop());
            addWfTag(i);
            e.preventDefault();
        }
    }
});

init();
