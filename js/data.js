const defaultData = {
    works: [
        { id: 1, title: "作品标题 1", desc: "人物肖像 | Stable Diffusion", category: "人物", img: "" },
        { id: 2, title: "作品标题 2", desc: "场景设计 | ControlNet", category: "场景", img: "" },
        { id: 3, title: "作品标题 3", desc: "产品渲染 | LoRA", category: "产品", img: "" }
    ],
    workflows: [
        { id: 1, title: "人物肖像生成工作流", desc: "使用 ControlNet + LoRA 实现高质量人物肖像生成。", img: "", tags: ["ControlNet", "LoRA", "人物"] },
        { id: 2, title: "产品渲染工作流", desc: "针对电商场景优化的产品图生成流程。", img: "", tags: ["产品渲染", "批量生成", "电商"] }
    ],
    about: {
        title: "从直播中控到 AI 美工",
        paragraphs: ["介绍段落1", "介绍段落2"],
        skills: ["ComfyUI", "Stable Diffusion", "ControlNet", "LoRA 训练", "Photoshop"]
    },
    contact: { email: "your.email@example.com", wechat: "your_wechat_id", phone: "138-xxxx-xxxx" }
};

async function loadSiteData() {
    try {
        const res = await fetch('config.json');
        if (!res.ok) throw new Error('fetch failed');
        return await res.json();
    } catch (e) {
        return JSON.parse(JSON.stringify(defaultData));
    }
}

function getAdminData() {
    const saved = localStorage.getItem('adminData');
    if (saved) return JSON.parse(saved);
    return null;
}

function saveAdminData(data) {
    localStorage.setItem('adminData', JSON.stringify(data));
}

function exportConfig(data) {
    const json = JSON.stringify(data, null, 4);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.json';
    a.click();
    URL.revokeObjectURL(url);
}
