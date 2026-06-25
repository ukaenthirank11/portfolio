const skills = Array.from({ length: 20 }, (_, index) => ({
  src: `assets/skills/tool-${String(index + 1).padStart(2, "0")}.png`,
  alt: `Tool logo ${index + 1}`,
}));

const projects = [
  {
    title: "BrainBlitz Quiz",
    category: "Web Apps",
    description: "Interactive quiz app with rounds, timer, scoring, streaks, review, and leaderboard.",
    url: "https://ukaenthirank11.github.io/BRAINBLITS/",
  },
  {
    title: "Event Portal",
    category: "Web Apps",
    description: "Event management portal with management and student login plus a calendar-based flow.",
    url: "https://eventportal-4qoo.onrender.com/",
  },
  {
    title: "WaveChat",
    category: "Web Apps",
    description: "Chat onboarding experience with phone login, country selector, and name setup.",
    url: "https://wave-chat-1.onrender.com/",
  },
  {
    title: "Valour Digital Agency",
    category: "Business Websites",
    description: "Agency website covering SEO, social media, web design, content, video, and ads.",
    url: "https://www.valourdigitalagency.com/",
  },
  {
    title: "Namma Ooru Namma Poruppu",
    category: "Campaign",
    description: "Bottle recycling campaign site with QR scan submission and certificate milestone flow.",
    url: "http://www.nammaoorunammaporuppu.org/",
  },
  {
    title: "Sample Clinic 1",
    category: "Clinic",
    description: "Responsive clinic layout built for healthcare services and appointment discovery.",
    url: "https://valourdigitalagency.github.io/Sample-Clininc-1/",
  },
  {
    title: "Sample Clinic 2",
    category: "Clinic",
    description: "Second clinic concept focused on service clarity and professional presentation.",
    url: "https://valourdigitalagency.github.io/Sample-Clininc-2/",
  },
  {
    title: "Sample College 1",
    category: "College",
    description: "College website concept with academic structure, sections, and responsive navigation.",
    url: "https://valourdigitalagency.github.io/Sample-College-1/",
  },
  {
    title: "Sample College 2",
    category: "College",
    description: "Alternative college landing page with a modern content hierarchy.",
    url: "https://valourdigitalagency.github.io/Sample-College-2/",
  },
  {
    title: "Sample Ecommerce 1",
    category: "Ecommerce",
    description: "Ecommerce UI concept designed for product browsing and purchase flow.",
    url: "https://valourdigitalagency.github.io/Sample-Ecommerce-1/",
  },
  {
    title: "Sample Ecommerce 2",
    category: "Ecommerce",
    description: "Second ecommerce layout with a sharp sales-oriented structure.",
    url: "https://valourdigitalagency.github.io/Sample-Ecommerce-2/",
  },
  {
    title: "Sample Real Estate 1",
    category: "Real Estate",
    description: "Real estate site concept for property showcasing and lead generation.",
    url: "https://valourdigitalagency.github.io/Sample-Realestate-1/",
  },
  {
    title: "Sample Real Estate 2",
    category: "Real Estate",
    description: "Alternative property showcase layout with premium card styling.",
    url: "https://valourdigitalagency.github.io/Sample-Realestate-2/",
  },
  {
    title: "Sample Nursery 1",
    category: "Nursery",
    description: "Nursery website concept with warm presentation and family-friendly layout.",
    url: "https://valourdigitalagency.github.io/Sample-Nursery-1/",
  },
  {
    title: "Sample Nursery 2",
    category: "Nursery",
    description: "Second nursery concept with playful but professional visual balance.",
    url: "https://valourdigitalagency.github.io/Sample-Nursery-2/",
  },
];

const certificates = [
  {
    title: "Microsoft Azure Essentials Professional Certificate",
    issuer: "Microsoft and LinkedIn",
    date: "May 10, 2026",
  },
  {
    title: "Leveraging AI in Your Nonprofit Organization",
    issuer: "Microsoft and NetHope",
    date: "May 11, 2026",
  },
  {
    title: "Microsoft Copilot Essentials",
    issuer: "Microsoft Press",
    date: "May 12, 2026",
  },
  {
    title: "Microsoft 365 Copilot Essentials Professional Certificate",
    issuer: "Microsoft and LinkedIn",
    date: "May 13, 2026",
  },
  {
    title: "Microsoft Security Essentials Professional Certificate",
    issuer: "Microsoft and LinkedIn",
    date: "May 14, 2026",
  },
];

const categories = ["All", "Web Apps", "Business Websites", "Clinic", "College", "Ecommerce", "Real Estate", "Nursery", "Campaign"];
const skillGridTop = document.getElementById("skillsGridTop");
const skillGridBottom = document.getElementById("skillsGridBottom");
const projectFilters = document.getElementById("projectFilters");
const projectGrid = document.getElementById("projectGrid");
const certificateGrid = document.getElementById("certificateGrid");
const nav = document.querySelector(".nav");
const navLinks = Array.from(document.querySelectorAll(".nav a"));
const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
const menuToggle = document.querySelector(".menu-toggle");
const contactForm = document.getElementById("contactForm");
const contactEmail = document.getElementById("contactEmail");
const formStatus = document.getElementById("formStatus");
const revealItems = document.querySelectorAll("[data-reveal]");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

const renderSkills = () => {
  const buildRow = (items) => {
    const markup = items.map((skill) => `
      <article class="tool-card" aria-label="${skill.alt}">
        <img src="${skill.src}" alt="${skill.alt}" loading="lazy" />
      </article>
    `).join("");

    return `${markup}${markup}`;
  };

  const topRow = skills.slice(0, 10);
  const bottomRow = skills.slice(10, 20);

  if (skillGridTop) skillGridTop.innerHTML = buildRow(topRow);
  if (skillGridBottom) skillGridBottom.innerHTML = buildRow(bottomRow);
};

const renderProjects = (filter = "All") => {
  const visible = filter === "All" ? projects : projects.filter((project) => project.category === filter);

  projectGrid.innerHTML = visible.map((project) => `
    <article class="project-card" data-reveal>
      <div class="card-label">${project.category}</div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-links">
        <a class="link-button primary" href="${project.url}" target="_blank" rel="noreferrer">Live Demo</a>
      </div>
    </article>
  `).join("");

  observeNewCards();
};

const renderFilters = () => {
  projectFilters.innerHTML = categories.map((category, index) => `
    <button class="filter-btn${index === 0 ? " active" : ""}" type="button" data-filter="${category}">${category}</button>
  `).join("");

  projectFilters.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects(filter);
  });
};

const renderCertificates = () => {
  certificateGrid.innerHTML = certificates.map((certificate) => {
    return `
      <article class="certificate-card" data-reveal>
        <div class="card-label">Certificate</div>
        <h3>${certificate.title}</h3>
        <p>${certificate.issuer}</p>
        <p class="muted">${certificate.date}</p>
      </article>
    `;
  }).join("");

  observeNewCards();
};

const observeNewCards = () => {
  document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((item) => observer.observe(item));
};

const contactEmailLink = document.querySelector(".contact-email-link");
if (contactEmailLink && contactEmail) {
  contactEmailLink.addEventListener("click", (event) => {
    event.preventDefault();
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      contactEmail.focus({ preventScroll: true });
    }, 450);
  });
}

renderSkills();
renderFilters();
renderProjects();
renderCertificates();

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
  observer.observe(item);
});

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 760) {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
);

sections.forEach((section) => activeObserver.observe(section));

const handleScroll = () => {
  const header = document.querySelector(".site-header");
  if (!header) return;
  header.style.boxShadow = window.scrollY > 10 ? "0 10px 30px rgba(0, 0, 0, 0.14)" : "none";
};

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please fill in all fields before sending.";
    return;
  }

  if (!isValidEmail(email)) {
    formStatus.textContent = "Please enter a valid email address.";
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formData = new FormData(contactForm);
  formData.set("name", name);
  formData.set("email", email);
  formData.set("message", message);
  formData.set("_replyto", email);
  formData.set("_subject", "New portfolio message from ukaenthiran2005@gmail.com");
  formData.set("_captcha", "false");
  formData.set("_template", "table");

  formStatus.textContent = "Sending your message...";
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  fetch("https://formsubmit.co/ajax/ukaenthiran2005@gmail.com", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Failed to send");
      }
      return response.json();
    })
    .then(() => {
      formStatus.textContent = "Message sent successfully.";
      contactForm.reset();
    })
    .catch(() => {
      formStatus.textContent = "Could not send right now. Please try again.";
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
    });
});
