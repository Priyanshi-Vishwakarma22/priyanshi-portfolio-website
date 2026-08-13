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