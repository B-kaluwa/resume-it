// Resume Data Management Class
class ResumeData {
    constructor() {
        this.data = {
            personal: {
                fullName: '',
                email: '',
                phone: '',
                location: '',
                summary: ''
            },
            experience: [],
            education: [],
            skills: [],
            certifications: [],
            languages: []
        };
    }

    // Load data from localStorage
    loadFromStorage() {
        const stored = localStorage.getItem('resumeData');
        if (stored) {
            this.data = JSON.parse(stored);
        }
        return this.data;
    }

    // Save data to localStorage
    saveToStorage() {
        localStorage.setItem('resumeData', JSON.stringify(this.data));
    }

    // Load from JSON file
    loadFromJSON(jsonString) {
        try {
            this.data = JSON.parse(jsonString);
            this.saveToStorage();
            return true;
        } catch (error) {
            console.error('Error loading JSON:', error);
            return false;
        }
    }

    // Export data as JSON
    exportToJSON() {
        return JSON.stringify(this.data, null, 2);
    }

    // Add experience
    addExperience(job) {
        this.data.experience.push({
            id: Date.now(),
            jobTitle: job.jobTitle || '',
            company: job.company || '',
            startDate: job.startDate || '',
            endDate: job.endDate || '',
            currentlyWorking: job.currentlyWorking || false,
            description: job.description || ''
        });
        this.saveToStorage();
    }

    // Remove experience
    removeExperience(id) {
        this.data.experience = this.data.experience.filter(exp => exp.id !== id);
        this.saveToStorage();
    }

    // Update experience
    updateExperience(id, job) {
        const index = this.data.experience.findIndex(exp => exp.id === id);
        if (index !== -1) {
            this.data.experience[index] = { id, ...job };
            this.saveToStorage();
        }
    }

    // Add education
    addEducation(edu) {
        this.data.education.push({
            id: Date.now(),
            school: edu.school || '',
            degree: edu.degree || '',
            field: edu.field || '',
            graduationDate: edu.graduationDate || '',
            description: edu.description || ''
        });
        this.saveToStorage();
    }

    // Remove education
    removeEducation(id) {
        this.data.education = this.data.education.filter(edu => edu.id !== id);
        this.saveToStorage();
    }

    // Update education
    updateEducation(id, edu) {
        const index = this.data.education.findIndex(e => e.id === id);
        if (index !== -1) {
            this.data.education[index] = { id, ...edu };
            this.saveToStorage();
        }
    }

    // Add skill
    addSkill(skill) {
        if (skill && !this.data.skills.includes(skill)) {
            this.data.skills.push(skill);
            this.saveToStorage();
        }
    }

    // Remove skill
    removeSkill(skill) {
        this.data.skills = this.data.skills.filter(s => s !== skill);
        this.saveToStorage();
    }

    // Add certification
    addCertification(cert) {
        this.data.certifications.push({
            id: Date.now(),
            title: cert.title || '',
            issuer: cert.issuer || '',
            issueDate: cert.issueDate || '',
            expiryDate: cert.expiryDate || ''
        });
        this.saveToStorage();
    }

    // Remove certification
    removeCertification(id) {
        this.data.certifications = this.data.certifications.filter(cert => cert.id !== id);
        this.saveToStorage();
    }

    // Update certification
    updateCertification(id, cert) {
        const index = this.data.certifications.findIndex(c => c.id === id);
        if (index !== -1) {
            this.data.certifications[index] = { id, ...cert };
            this.saveToStorage();
        }
    }

    // Add language
    addLanguage(lang) {
        this.data.languages.push({
            id: Date.now(),
            language: lang.language || '',
            proficiency: lang.proficiency || 'Intermediate'
        });
        this.saveToStorage();
    }

    // Remove language
    removeLanguage(id) {
        this.data.languages = this.data.languages.filter(lang => lang.id !== id);
        this.saveToStorage();
    }

    // Update language
    updateLanguage(id, lang) {
        const index = this.data.languages.findIndex(l => l.id === id);
        if (index !== -1) {
            this.data.languages[index] = { id, ...lang };
            this.saveToStorage();
        }
    }

    // Update personal info
    updatePersonal(personal) {
        this.data.personal = { ...this.data.personal, ...personal };
        this.saveToStorage();
    }

    // Clear all data
    clearData() {
        this.data = {
            personal: {
                fullName: '',
                email: '',
                phone: '',
                location: '',
                summary: ''
            },
            experience: [],
            education: [],
            skills: [],
            certifications: [],
            languages: []
        };
        localStorage.removeItem('resumeData');
    }
}

// Create global instance
const resumeData = new ResumeData();
