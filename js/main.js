// Create New Resume
function createNewResume() {
    resumeData.clearData();
    window.location.href = 'builder.html';
}

// Trigger File Upload
function triggerFileUpload() {
    document.getElementById('fileInput').click();
}

// Upload Resume
function uploadResume(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const content = e.target.result;
            if (resumeData.loadFromJSON(content)) {
                window.location.href = 'builder.html';
            } else {
                alert('Error: Invalid resume file. Please upload a valid JSON file.');
            }
        } catch (error) {
            alert('Error reading file: ' + error.message);
        }
    };
    reader.readAsText(file);
}
