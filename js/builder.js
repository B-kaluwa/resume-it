let currentTemplate = 'modern';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    resumeData.loadFromStorage();
    loadFormData();
    renderExperienceItems();
    renderEducationItems();
    renderSkillsUI();
    renderCertificationsUI();
    renderLanguagesUI();
    updatePreview();
});

// Load form data from resume data
function loadFormData() {
    const personal = resumeData.data.personal;
    document.getElementById('fullName').value = personal.fullName || '';
    document.getElementById('email').value = personal.email || '';
    document.getElementById('phone').value = personal.phone || '';
    document.getElementById('location').value = personal.location || '';
    document.getElementById('summary').value = personal.summary || '';
}

// Update personal information
document.addEventListener('change', function(e) {
    if (e.target.id === 'fullName' || e.target.id === 'email' || 
        e.target.id === 'phone' || e.target.id === 'location') {
        resumeData.updatePersonal({
            [e.target.id]: e.target.value
        });
    }
    if (e.target.id === 'summary') {
        resumeData.updatePersonal({ summary: e.target.value });
    }
});

// Add Experience
function addExperience() {
    resumeData.addExperience({
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        description: ''
    });
    renderExperienceItems();
}

// Render Experience Items
function renderExperienceItems() {
    const container = document.getElementById('experienceContainer');
    container.innerHTML = '';
    resumeData.data.experience.forEach(exp => {
        const div = document.createElement('div');
        div.className = 'item-container';
        div.innerHTML = `
            <button type="button" class="btn btn-danger" onclick="removeExperience(${exp.id})">✕</button>
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" value="${escapeHtml(exp.jobTitle)}" onchange="updateExperienceField(${exp.id}, 'jobTitle', this.value)">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" value="${escapeHtml(exp.company)}" onchange="updateExperienceField(${exp.id}, 'company', this.value)">
            </div>
            <div class="form-group">
                <label>Start Date</label>
                <input type="text" placeholder="MM/YYYY" value="${escapeHtml(exp.startDate)}" onchange="updateExperienceField(${exp.id}, 'startDate', this.value)">
            </div>
            <div class="form-group">
                <label>
                    <input type="checkbox" ${exp.currentlyWorking ? 'checked' : ''} onchange="updateExperienceField(${exp.id}, 'currentlyWorking', this.checked)">
                    Currently Working Here
                </label>
            </div>
            ${!exp.currentlyWorking ? `
                <div class="form-group">
                    <label>End Date</label>
                    <input type="text" placeholder="MM/YYYY" value="${escapeHtml(exp.endDate)}" onchange="updateExperienceField(${exp.id}, 'endDate', this.value)">
                </div>
            ` : ''}
            <div class="form-group">
                <label>Description</label>
                <textarea onchange="updateExperienceField(${exp.id}, 'description', this.value)">${escapeHtml(exp.description)}</textarea>
            </div>
        `;
        container.appendChild(div);
    });
}

// Update Experience Field
function updateExperienceField(id, field, value) {
    const exp = resumeData.data.experience.find(e => e.id === id);
    if (exp) {
        exp[field] = value;
        resumeData.saveToStorage();
        renderExperienceItems();
        updatePreview();
    }
}

// Remove Experience
function removeExperience(id) {
    if (confirm('Remove this experience?')) {
        resumeData.removeExperience(id);
        renderExperienceItems();
        updatePreview();
    }
}

// Add Education
function addEducation() {
    resumeData.addEducation({
        school: '',
        degree: '',
        field: '',
        graduationDate: '',
        description: ''
    });
    renderEducationItems();
}

// Render Education Items
function renderEducationItems() {
    const container = document.getElementById('educationContainer');
    container.innerHTML = '';
    resumeData.data.education.forEach(edu => {
        const div = document.createElement('div');
        div.className = 'item-container';
        div.innerHTML = `
            <button type="button" class="btn btn-danger" onclick="removeEducation(${edu.id})">✕</button>
            <div class="form-group">
                <label>School/University</label>
                <input type="text" value="${escapeHtml(edu.school)}" onchange="updateEducationField(${edu.id}, 'school', this.value)">
            </div>
            <div class="form-group">
                <label>Degree</label>
                <input type="text" value="${escapeHtml(edu.degree)}" onchange="updateEducationField(${edu.id}, 'degree', this.value)">
            </div>
            <div class="form-group">
                <label>Field of Study</label>
                <input type="text" value="${escapeHtml(edu.field)}" onchange="updateEducationField(${edu.id}, 'field', this.value)">
            </div>
            <div class="form-group">
                <label>Graduation Date</label>
                <input type="text" placeholder="MM/YYYY" value="${escapeHtml(edu.graduationDate)}" onchange="updateEducationField(${edu.id}, 'graduationDate', this.value)">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea onchange="updateEducationField(${edu.id}, 'description', this.value)">${escapeHtml(edu.description)}</textarea>
            </div>
        `;
        container.appendChild(div);
    });
}

// Update Education Field
function updateEducationField(id, field, value) {
    const edu = resumeData.data.education.find(e => e.id === id);
    if (edu) {
        edu[field] = value;
        resumeData.saveToStorage();
        renderEducationItems();
        updatePreview();
    }
}

// Remove Education
function removeEducation(id) {
    if (confirm('Remove this education?')) {
        resumeData.removeEducation(id);
        renderEducationItems();
        updatePreview();
    }
}

// Add Skill
function addSkill() {
    const input = document.getElementById('skillInput');
    const skill = input.value.trim();
    if (skill) {
        resumeData.addSkill(skill);
        input.value = '';
        renderSkillsUI();
        updatePreview();
    }
}

// Handle Skill Key Press
function handleSkillKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addSkill();
    }
}

// Render Skills UI
function renderSkillsUI() {
    const container = document.getElementById('skillsContainer');
    container.innerHTML = '';
    resumeData.data.skills.forEach(skill => {
        const span = document.createElement('span');
        span.className = 'skill-tag';
        span.innerHTML = `
            ${escapeHtml(skill)}
            <span class="remove-skill" onclick="removeSkill('${skill.replace(/'/g, "\\'")}')">✕</span>
        `;
        container.appendChild(span);
    });
}

// Remove Skill
function removeSkill(skill) {
    resumeData.removeSkill(skill);
    renderSkillsUI();
    updatePreview();
}

// Add Certification
function addCertification() {
    resumeData.addCertification({
        title: '',
        issuer: '',
        issueDate: '',
        expiryDate: ''
    });
    renderCertificationsUI();
}

// Render Certifications UI
function renderCertificationsUI() {
    const container = document.getElementById('certificationsContainer');
    container.innerHTML = '';
    resumeData.data.certifications.forEach(cert => {
        const div = document.createElement('div');
        div.className = 'item-container';
        div.innerHTML = `
            <button type="button" class="btn btn-danger" onclick="removeCertification(${cert.id})">✕</button>
            <div class="form-group">
                <label>Certification Title</label>
                <input type="text" value="${escapeHtml(cert.title)}" onchange="updateCertificationField(${cert.id}, 'title', this.value)">
            </div>
            <div class="form-group">
                <label>Issuing Organization</label>
                <input type="text" value="${escapeHtml(cert.issuer)}" onchange="updateCertificationField(${cert.id}, 'issuer', this.value)">
            </div>
            <div class="form-group">
                <label>Issue Date</label>
                <input type="text" placeholder="MM/YYYY" value="${escapeHtml(cert.issueDate)}" onchange="updateCertificationField(${cert.id}, 'issueDate', this.value)">
            </div>
            <div class="form-group">
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YYYY" value="${escapeHtml(cert.expiryDate)}" onchange="updateCertificationField(${cert.id}, 'expiryDate', this.value)">
            </div>
        `;
        container.appendChild(div);
    });
}

// Update Certification Field
function updateCertificationField(id, field, value) {
    const cert = resumeData.data.certifications.find(c => c.id === id);
    if (cert) {
        cert[field] = value;
        resumeData.saveToStorage();
        renderCertificationsUI();
        updatePreview();
    }
}

// Remove Certification
function removeCertification(id) {
    if (confirm('Remove this certification?')) {
        resumeData.removeCertification(id);
        renderCertificationsUI();
        updatePreview();
    }
}

// Add Language
function addLanguage() {
    resumeData.addLanguage({
        language: '',
        proficiency: 'Intermediate'
    });
    renderLanguagesUI();
}

// Render Languages UI
function renderLanguagesUI() {
    const container = document.getElementById('languagesContainer');
    container.innerHTML = '';
    resumeData.data.languages.forEach(lang => {
        const div = document.createElement('div');
        div.className = 'item-container';
        div.innerHTML = `
            <button type="button" class="btn btn-danger" onclick="removeLanguage(${lang.id})">✕</button>
            <div class="form-group">
                <label>Language</label>
                <input type="text" value="${escapeHtml(lang.language)}" onchange="updateLanguageField(${lang.id}, 'language', this.value)">
            </div>
            <div class="form-group">
                <label>Proficiency Level</label>
                <select onchange="updateLanguageField(${lang.id}, 'proficiency', this.value)">
                    <option value="Beginner" ${lang.proficiency === 'Beginner' ? 'selected' : ''}>Beginner</option>
                    <option value="Intermediate" ${lang.proficiency === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                    <option value="Advanced" ${lang.proficiency === 'Advanced' ? 'selected' : ''}>Advanced</option>
                    <option value="Fluent" ${lang.proficiency === 'Fluent' ? 'selected' : ''}>Fluent</option>
                    <option value="Native" ${lang.proficiency === 'Native' ? 'selected' : ''}>Native</option>
                </select>
            </div>
        `;
        container.appendChild(div);
    });
}

// Update Language Field
function updateLanguageField(id, field, value) {
    const lang = resumeData.data.languages.find(l => l.id === id);
    if (lang) {
        lang[field] = value;
        resumeData.saveToStorage();
        renderLanguagesUI();
        updatePreview();
    }
}

// Remove Language
function removeLanguage(id) {
    if (confirm('Remove this language?')) {
        resumeData.removeLanguage(id);
        renderLanguagesUI();
        updatePreview();
    }
}

// Update Preview
function updatePreview() {
    const previewDiv = document.getElementById('resumePreview');
    const templateFunc = templates[currentTemplate] || templates.modern;
    previewDiv.innerHTML = templateFunc(resumeData.data);
}

// Change Template
function changeTemplate() {
    currentTemplate = document.getElementById('templateSelect').value;
    const templateNames = {
        modern: 'Modern Template',
        classic: 'Classic Template',
        minimalist: 'Minimalist Template'
    };
    document.getElementById('templateInfo').textContent = templateNames[currentTemplate];
    updatePreview();
}

// Save Resume
function saveResume() {
    resumeData.saveToStorage();
    alert('✓ Resume saved successfully!');
}

// Download PDF
function downloadPDF() {
    const element = document.getElementById('resumePreview');
    const opt = {
        margin: 10,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}
