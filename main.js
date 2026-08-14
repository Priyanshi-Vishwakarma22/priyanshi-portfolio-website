// ========== CERTIFICATE MODAL DATA ==========

const certificateData = {
    hackathon: {
        title: "Expert Labs National Hackathon Certificate",
        issuer: "IBM Expert Labs",
        date: "August 6-8, 2025",
        location: "S-Vyasa University, Bengaluru",
        details: [
            { label: "Event Name", value: "Expert Labs National Hackathon 2025" },
            { label: "Registration ID", value: "UID: 220220222" },
            { label: "Institution", value: "Chhatrapati Shivaji Maharaj University" },
            { label: "Location", value: "Navi Mumbai" }
        ],
        description: "Certificate of Participation for successfully participating in the National Level Hackathon organized by IBM Expert Labs.",
        downloadUrl: "certificates/Hackathon_Certificate.pdf"
    },
    simplilearn: {
        title: "Introduction to Data Analytics",
        issuer: "Simplilearn SkillUP",
        date: "April 25, 2025",
        location: "Online",
        details: [
            { label: "Course", value: "Introduction to Data Analytics" },
            { label: "Provider", value: "Simplilearn" },
            { label: "Completion Date", value: "25th April 2025" },
            { label: "Status", value: "Certificate of Completion" }
        ],
        description: "Successfully completed the online course with demonstrated initiative and commitment to deepening data analytics skills.",
        downloadUrl: "certificates/Simplilearn_Data_Analytics.pdf"
    },
    deloitte: {
        title: "Data Analytics Job Simulation",
        issuer: "Deloitte",
        date: "March 14, 2025",
        location: "Online",
        details: [
            { label: "Program", value: "Data Analytics Job Simulation" },
            { label: "Duration", value: "February - March 2025" },
            { label: "Skills Demonstrated", value: "Data Analysis, Forensic Technology" },
            { label: "Issued By", value: "Forage" }
        ],
        description: "Completed practical tasks in data analysis and forensic technology through Deloitte's job simulation program.",
        downloadUrl: "certificates/Deloitte_Data_Analytics.pdf"
    },
    sql: {
        title: "SQL (Basic) Certificate",
        issuer: "HackerRank",
        date: "September 8, 2025",
        location: "Online",
        details: [
            { label: "Certification", value: "SQL (Basic)" },
            { label: "Platform", value: "HackerRank" },
            { label: "Earned On", value: "08 Sep, 2025" },
            { label: "Certificate ID", value: "729E50D2D23B" }
        ],
        description: "Successfully passed the HackerRank SQL (Basic) skill certification test, demonstrating proficiency in fundamental SQL concepts and queries.",
        downloadUrl: "certificates/HackerRank_SQL.pdf"
    },
    python: {
        title: "Introduction to Python",
        issuer: "IBM",
        date: "2025",
        location: "Online",
        details: [
            { label: "Course", value: "Introduction to Python" },
            { label: "Provider", value: "IBM" },
            { label: "Type", value: "Professional Development" },
            { label: "Status", value: "Certified" }
        ],
        description: "Completed IBM's comprehensive Python fundamentals course, building strong foundations in programming with Python.",
        downloadUrl: "certificates/IBM_Python.pdf"
    },
    visualization: {
        title: "Data Visualization",
        issuer: "IBM",
        date: "2025",
        location: "Online",
        details: [
            { label: "Course", value: "Data Visualization" },
            { label: "Provider", value: "IBM" },
            { label: "Focus", value: "Data Visualization Techniques" },
            { label: "Status", value: "Certified" }
        ],
        description: "Successfully completed IBM's Data Visualization course, mastering techniques for creating compelling visual representations of data.",
        downloadUrl: "certificates/IBM_Data_Visualization.pdf"
    }
};

function openCertModal(certId) {
    const modal = document.getElementById("certModal");
    const cert = certificateData[certId];
    
    if (!cert) return;
    
    let detailsHTML = cert.details.map(detail => `
        <div class="cert-detail-row">
            <span class="cert-detail-label">${detail.label}</span>
            <span class="cert-detail-value">${detail.value}</span>
        </div>
    `).join('');
    
    const modalBody = `
        <div class="cert-modal-body-item">
            <h3>${cert.title}</h3>
            <p><strong>Issued by:</strong> ${cert.issuer}</p>
            <p><strong>Date:</strong> ${cert.date}</p>
            
            <div class="cert-details">
                ${detailsHTML}
            </div>
            
            <p>${cert.description}</p>
            
            <div class="cert-modal-buttons">
                <button class="cert-btn cert-btn-primary" onclick="downloadCertificate('${certId}')"><i class='bx bx-download'></i> Download Certificate</button>
                <button class="cert-btn" onclick="closeCertModal()"><i class='bx bx-x'></i> Close</button>
            </div>
        </div>
    `;
    
    document.getElementById("certModalBody").innerHTML = modalBody;
    modal.style.display = "block";
}

function closeCertModal() {
    const modal = document.getElementById("certModal");
    modal.style.display = "none";
}

function downloadCertificate(certId) {
    const cert = certificateData[certId];
    if (cert.downloadUrl && cert.downloadUrl !== "#") {
        // Create a link and trigger download
        const link = document.createElement('a');
        link.href = cert.downloadUrl;
        link.download = cert.downloadUrl.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert("Certificate download link will be available soon! Please add your certificate URLs.");
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById("certModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// ========== TYPED.JS INITIALIZATION ==========

// Initialize Typed.js for dynamic professional title animation
var typed = new Typed(".text", {
    strings: [
        "AI & Machine Learning Engineer",
        "Data Analytics Specialist",
        
    ],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1200,
    loop: true
});

document.addEventListener("DOMContentLoaded", function () {

    // 1. Mobile Menu Toggle
    const menuIcon = document.querySelector("#menu-icon");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".navbar a");

    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle("bx-x");
            navbar.classList.toggle("active");
        };

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                menuIcon.classList.remove("bx-x");
                navbar.classList.remove("active");
            });
        });
    }


    // 2. Active State on Scroll
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;

            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });


    // 3. REAL CONTACT FORM SUBMISSION
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", async function (e) {

            e.preventDefault();

            const submitButton =
                contactForm.querySelector("button[type='submit']");

            submitButton.disabled = true;
            submitButton.innerText = "Sending...";


            // Get form data
            const formData = {
                name: contactForm.querySelector("[name='name']").value,
                email: contactForm.querySelector("[name='email']").value,
                phone: contactForm.querySelector("[name='phone']").value,
                subject: contactForm.querySelector("[name='subject']").value,
                message: contactForm.querySelector("[name='message']").value
            };


            try {

                const response = await fetch("/api/contact", {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                });


                const result = await response.json();


                if (response.ok) {

                    alert(
                        "Message sent successfully! Thank you for contacting me."
                    );

                    contactForm.reset();

                } else {

                    alert(
                        result.message ||
                        "Unable to send message."
                    );
                }


            } catch (error) {

                console.error("Contact form error:", error);

                alert(
                    "Unable to connect to the server. Please try again."
                );

            }


            submitButton.disabled = false;
            submitButton.innerText = "Send Message";

        });
    }

});