// Automatically update the copyright year
function initializeSite() {
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // CONTACT FORM
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        const submitButton = contactForm.querySelector(".contact-submit");

        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const originalButtonText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            try {
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        "Accept": "application/json"
                    }
                });

                if (response.ok) {
                    contactForm.innerHTML = `
                        <div class="contact-success">
                            <h3>Message Received!</h3>
                            <p>Your message has found its way to me. Thanks for stopping by! I'll be in touch soon.</p>
                        </div>
                    `;
                } else {
                    throw new Error("Form submission failed.");
                }

            } catch (error) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;

                let errorMessage = contactForm.querySelector(".form-error");

                if (!errorMessage) {
                    errorMessage = document.createElement("p");
                    errorMessage.className = "form-error";
                    errorMessage.setAttribute("role", "alert");
                    contactForm.insertBefore(errorMessage, submitButton);
                }

                errorMessage.textContent = "Something went wrong while sending your message. Please try again.";
            }
        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSite);
} else {
    initializeSite();
}
