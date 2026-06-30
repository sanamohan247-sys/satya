document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
    }

    // --- Section/Tab Switching ---
    const sections = document.querySelectorAll('.app-section');
    const navTabs = document.querySelectorAll('.nav-tab');

    function showSection(targetId) {
        let found = false;
        sections.forEach(sec => {
            if (sec.id === targetId) {
                sec.classList.add('active');
                found = true;
            } else {
                sec.classList.remove('active');
            }
        });

        if (found) {
            // Update active navbar tab
            navTabs.forEach(tab => {
                if (tab.getAttribute('data-target') === targetId) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });

            // Close mobile menu if open
            if (menuBtn && navLinks) {
                menuBtn.classList.remove('open');
                navLinks.classList.remove('open');
            }

            // Scroll smoothly to top of content
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Handle clicks on standard nav tabs
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                e.preventDefault();
                showSection(targetId);
                window.location.hash = targetId;
            }
        });
    });

    // Handle clicks on logo navigation tab
    const logoTab = document.querySelector('.logonav-tab');
    if (logoTab) {
        logoTab.addEventListener('click', function(e) {
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                e.preventDefault();
                showSection(targetId);
                window.location.hash = targetId;
            }
        });
    }

    // Handle other trigger links (e.g. catalog discover links, footer links, quote buttons)
    const triggerLinks = document.querySelectorAll('.nav-tab-trigger');
    triggerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                e.preventDefault();
                showSection(targetId);
                window.location.hash = targetId;

                // Handle pre-filling contact form if it links to contact section
                const formSubject = this.getAttribute('data-form-subject');
                if (formSubject) {
                    const subjectInput = document.getElementById('formSubject');
                    if (subjectInput) {
                        subjectInput.value = formSubject;
                    }

                    const equipSelect = document.getElementById('formEquipment');
                    if (equipSelect) {
                        const lowerSubject = formSubject.toLowerCase();
                        if (lowerSubject.includes('yuvo') || lowerSubject.includes('tiger') || lowerSubject.includes('deere') || lowerSubject.includes('tractor')) {
                            equipSelect.value = 'Tractor Modification';
                        } else if (lowerSubject.includes('double axle') || lowerSubject.includes('tipper')) {
                            equipSelect.value = 'Hydraulic Trolley';
                        } else if (lowerSubject.includes('single axle') || lowerSubject.includes('standard trolley') || lowerSubject.includes('trolley')) {
                            equipSelect.value = 'Standard Trolley';
                        } else if (lowerSubject.includes('rotavator') || lowerSubject.includes('tillage') || lowerSubject.includes('tiller')) {
                            equipSelect.value = 'Rotavator Tillage';
                        } else if (lowerSubject.includes('service') || lowerSubject.includes('overhauling') || lowerSubject.includes('repair')) {
                            equipSelect.value = 'Repairs';
                        } else {
                            equipSelect.value = 'Other';
                        }
                    }
                }
            }
        });
    });

    // Check URL hash on load to open direct links (e.g., website.com/#about)
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        showSection(initialHash);
    }

    // --- Product Catalog Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --- Gallery Lightbox Modal ---
    const workItems = document.querySelectorAll('.work-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    workItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img-src') || this.querySelector('img').getAttribute('src');
            if (imgSrc && lightboxImg && lightboxModal) {
                lightboxImg.setAttribute('src', imgSrc);
                lightboxModal.classList.add('show');
            }
        });
    });

    if (lightboxClose && lightboxModal) {
        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('show');
        });

        // Close on clicking background backdrop outside the image
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('show');
            }
        });
    }

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');
    const successToast = document.getElementById('successToast');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Display Toast Msg
            if (successToast) {
                successToast.classList.add('show');
                setTimeout(() => {
                    successToast.classList.remove('show');
                }, 4000);
            }

            // Reset form
            contactForm.reset();
        });
    }
});
