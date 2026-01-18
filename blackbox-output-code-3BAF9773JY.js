// Mock initial files (in a real app, fetch from server)
let files = JSON.parse(localStorage.getItem('files')) || [
    { name: 'Sample Image.jpg', type: 'image', url: 'https://via.placeholder.com/150' }, // Placeholder
    { name: 'Sample App.apk', type: 'apk', url: '#' },
    { name: 'Sample Document.pdf', type: 'pdf', url: '#' }
];

// Admin password (demo only)
const adminPassword = 'admin123';

// DOM elements
const adminBtn = document.getElementById('admin-btn');
const adminSection = document.getElementById('admin-section');
const uploadForm = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const filesGrid = document.getElementById('files-grid');

// Display files as cards
function displayFiles() {
    filesGrid.innerHTML = '';
    files.forEach((file, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        
        let media;
        if (file.type === 'image') {
            media = `<img src="${file.url}" alt="${file.name}">`;
        } else {
            const icon = file.type === 'apk' ? '📱' : '📄';
            media = `<div class="icon">${icon}</div>`;
        }
        
        card.innerHTML = `
            ${media}
            <h3>${file.name}</h3>
            <p>Type: ${file.type.toUpperCase()}</p>
            <button class="download-btn" onclick="downloadFile(${index})">Download</button>
        `;
        filesGrid.appendChild(card);
    });
}

// Simulate download (in real app, link to actual file)
function downloadFile(index) {
    const file = files[index];
    alert(`Downloading ${file.name}... (Simulated)`);
    // For real: window.open(file.url, '_blank');
}

// Admin login
adminBtn.addEventListener('click', () => {
    const password = prompt('Enter admin password:');
    if (password === adminPassword) {
        adminSection.classList.remove('hidden');
        adminBtn.style.display = 'none';
    } else {
        alert('Incorrect password.');
    }
});

// Handle upload
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const file = fileInput.files[0];
    if (file) {
        const fileType = file.name.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'apk', 'pdf'].includes(fileType)) {
            // In real app, upload to server and get URL
            const newFile = {
                name: file.name,
                type: fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png' ? 'image' : fileType,
                url: URL.createObjectURL(file) // Temporary for demo
            };
            files.push(newFile);
            localStorage.setItem('files', JSON.stringify(files));
            displayFiles();
            fileInput.value = '';
        } else {
            alert('Unsupported file type.');
        }
    }
});

// Initial display
displayFiles();