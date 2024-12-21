document.addEventListener('DOMContentLoaded', () => {
    const scriptList = document.getElementById('script-list');
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('category-filter');
    const addScriptButton = document.getElementById('add-script-button');
    const addScriptModal = document.getElementById('add-script-modal');
    const closeModal = document.getElementById('close-modal');
    const addScriptForm = document.getElementById('add-script-form');

    // Load scripts from Local Storage or initialize with sample data
    let scripts = JSON.parse(localStorage.getItem('scripts')) || [
        { id: 1, title: "Script One", description: "This is a utility script.", code: "print('Hello, World!')", category: "Fisch" },
        { id: 2, title: "Script Two", description: "This is a game script.", code: "alert('Hello, World!')", category: "bloxfruit" },
        { id: 3, title: "Script Three", description: "This is a web script.", code: "console.log('Hello, World!')", category: "Web" },
        { id: 4, title: "Script Three", description: "This is a web script.", code: "console.log('Hello, World!')", category: "other" }
    ];

    const saveScriptsToLocalStorage = () => {
        localStorage.setItem('scripts', JSON.stringify(scripts));
    };

    const displayScripts = (scriptsToShow) => {
        scriptList.innerHTML = scriptsToShow.map(script => `
            <div class="script-item">
                <h3>${script.title}</h3>
                <p>${script.description}</p>
                <p><strong>Category:</strong> ${script.category}</p>
                <pre>${script.code}</pre>
            </div>
        `).join('');
        
        document.addEventListener('DOMContentLoaded', () => {
            var links = JSON.parse(localStorage.getItem('links')) || [];
            var linksContainer = document.getElementById('links');
            linksContainer.innerHTML = links.map(link => `
              <div class="script-item">
                <h3>${script.title}</h3>
                    <a href="${link.url}" target="_blank">${link.text}</a>
                    </h3>
                </div>
            `).join('');
        });

    };

    const filterScripts = () => {
        const keyword = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const filteredScripts = scripts.filter(script =>
            (script.title.toLowerCase().includes(keyword) || script.category.toLowerCase().includes(keyword)) &&
            (category === 'all' || script.category === category)
        );
        displayScripts(filteredScripts);
    };

    searchInput.addEventListener('input', filterScripts);
    categoryFilter.addEventListener('change', filterScripts);

    addScriptButton.addEventListener('click', () => {
        addScriptModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        addScriptModal.style.display = 'none';
    });

    addScriptForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newScript = {
            id: scripts.length + 1,
            title: document.getElementById('script-title').value,
            description: document.getElementById('script-description').value,
            code: document.getElementById('script-code').value,
            category: document.getElementById('script-category').value
        };

        scripts.push(newScript);
        saveScriptsToLocalStorage();
        filterScripts();
        addScriptModal.style.display = 'none';
        addScriptForm.reset();
    });

    // Initial display
    displayScripts(scripts);
});
document.addEventListener("DOMContentLoaded", function() {
    var popup = document.getElementById("popup");
    var closeBtn = document.querySelector(".popup .close");

    // Show the popup after 2 seconds
    setTimeout(function() {
        popup.style.display = "block";
    }, 20000);

    // Close the popup when the close button is clicked
    closeBtn.onclick = function() {
        popup.style.display = "none";
    }

    // Close the popup when clicking outside of the popup content
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }
});
// Discord Webhook URL
const kDISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1312291518844895402/bb3_juC1DUlK9nW2Yvdcl9QcE553rQ9cctDkgjD1mYwfFadcZ5eZqbp4ZwUkBRLqXGxu";

// ฟังก์ชันส่งความคิดเห็นไปยัง Discord
const sendFeedbackToDiscord = (feedback) => {
    const message = {
        content: `📝 **New Feedback**\n${feedback}\n🕒 **Date**: ${new Date().toLocaleString()}`
    };

    fetch(kDISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    }).then(response => {
        if (response.ok) {
            console.log("Feedback sent to Discord successfully.");
        } else {
            console.error("Failed to send feedback to Discord.");
        }
    }).catch(error => {
        console.error("Error sending feedback to Discord:", error);
    });
};

// ฟังก์ชันบันทึกความคิดเห็นใน LocalStorage
const saveFeedback = (feedback) => {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push({
        feedback: feedback,
        date: new Date().toLocaleString()
    });
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    // ส่งความคิดเห็นไปยัง Discord
    sendFeedbackToDiscord(feedback);
};

// ฟังก์ชันจัดการฟอร์มความคิดเห็น
const feedbackForm = document.getElementById('feedback-form');
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const feedbackText = document.getElementById('feedback-text').value;

    // ตรวจสอบว่ามีการกรอกข้อความหรือไม่
    if (feedbackText.trim() !== '') {
        saveFeedback(feedbackText);  // บันทึกความคิดเห็น
        alert("Thank you for your feedback!"); // แจ้งเตือนผู้ใช้
        feedbackForm.reset();  // รีเซ็ตฟอร์ม
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const scriptList = document.getElementById('script-list');

    // ฟังก์ชันคัดลอกข้อความไปยังคลิปบอร์ด
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert('คัดลอกข้อความสำเร็จ!'))
            .catch(err => alert('เกิดข้อผิดพลาดในการคัดลอก: ' + err));
    };

    // แสดงสคริปต์และเพิ่มปุ่ม Copy
    const displayScripts = (scriptsToShow) => {
        scriptList.innerHTML = scriptsToShow.map(script => `
            <div class="script-item">
                <h3>${script.title} 
                    
                </h3>
                <p>${script.description} 
                    <button onclick="copyToClipboard('${script.description}')">Copy</button>
                </p>
                <p><strong>Category:</strong> ${script.category} 
                   
                </p>
                <pre>${script.code} 
                    
                </pre>
            </div>
        `).join('');
    };

    // เรียกแสดงผลครั้งแรก
    const scripts = JSON.parse(localStorage.getItem('scripts')) || [];
    displayScripts(scripts);

    // ทำให้ฟังก์ชัน copyToClipboard ใช้ได้ทุกที่
    window.copyToClipboard = copyToClipboard;
});

document.addEventListener('DOMContentLoaded', function () {
    // ตรวจสอบว่า sessionStorage เก็บจำนวนผู้เข้าชมหรือไม่
    let visitCount = sessionStorage.getItem('visitCount');

    if (!visitCount) {
        // ถ้ายังไม่มีค่าใน sessionStorage (ยังไม่เคยเข้ามาในเซสชันนี้)
        visitCount = 1;
        // บันทึกจำนวนผู้เข้าชมใน sessionStorage
        sessionStorage.setItem('visitCount', visitCount);
    }

    // แสดงจำนวนผู้เข้าชม
    document.getElementById('userCount').innerText = 'จำนวนผู้เข้าชม: ' + visitCount;
});
addScriptForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newScript = {
        id: scripts.length + 1,
        title: document.getElementById('script-title').value,
        description: document.getElementById('script-description').value,
        code: document.getElementById('script-code').value,
        category: document.getElementById('script-category').value,
        action: document.getElementById('script-action').value // เก็บ action
    };

    scripts.push(newScript);
    saveScriptsToLocalStorage();
    filterScripts();
    addScriptModal.style.display = 'none';
    addScriptForm.reset();
});

document.addEventListener('DOMContentLoaded', () => {
    const scriptList = document.getElementById('script-list');
    const scripts = JSON.parse(localStorage.getItem('scripts')) || [];

    const displayScripts = (scriptsToShow) => {
        scriptList.innerHTML = scriptsToShow.map(script => `
            <div class="script-item">
                <h3>${script.title}</h3>
                <p class="script-description">${script.description}</p>
                <p><strong>Category:</strong> ${script.category}</p>
                <pre>${script.code}</pre>
                ${script.action === 'copy' ? `<button onclick="copyToClipboard('${script.code}')">Copy Code</button>` : `<a href="${script.code}" target="_blank">Go to Link</a>`}
            </div>
        `).join('');
    };

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            alert('Code copied to clipboard!');
        });
    };

    // Load and display scripts on page load
    displayScripts(scripts);

    // Filtering scripts by category
    const categoryFilter = document.getElementById('category-filter');
    categoryFilter.addEventListener('change', (e) => {
        const selectedCategory = e.target.value;
        if (selectedCategory === 'all') {
            displayScripts(scripts);
        } else {
            const filteredScripts = scripts.filter(script => script.category === selectedCategory);
            displayScripts(filteredScripts);
        }
    });
});
