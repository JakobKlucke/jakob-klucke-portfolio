// Seitenwechsel (Tabs)
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

if (navLinks.length && pages.length) {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('data-page-target');
      
      navLinks.forEach((l) => l.classList.remove('active'));
      
      pages.forEach((page) => {
        page.classList.toggle('active', page.getAttribute('data-page') === target);
      });
      
      link.classList.add('active');
      window.scrollTo(0, 0); // Scroll to top on page change
    });
  });
}

// Sidebar Show Contacts (Template-konform)
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
const sidebar = document.querySelector('[data-sidebar]'); // Das Haupt-Sidebar-Element

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener('click', () => {
    // Diese Zeile toggelt die 'active'-Klasse auf dem <aside class="sidebar"> Element.
    // Das CSS des Templates kümmert sich dann um die Höhenanimation und das Anzeigen
    // von .sidebar-info-more.
    sidebar.classList.toggle('active');
  });
}


// Portfolio: Dropdown-Filter
const selectBtn = document.querySelector('[data-select]');
const selectList = document.querySelector('.select-list');
const selectValueDisplay = document.querySelector('[data-select-value]'); // Renamed to avoid confusion
const selectItems = document.querySelectorAll('[data-select-item]'); // These are the <li> elements in your dropdown
const filterBtns = document.querySelectorAll('[data-filter-btn]'); // Desktop filter buttons
const projectItems = document.querySelectorAll('[data-filter-item]'); // Portfolio project <li> items

// Dropdown öffnen/schließen
if (selectBtn && selectList) {
  selectBtn.addEventListener('click', () => {
    selectList.classList.toggle('active');
    selectBtn.classList.toggle('active'); // Also toggle active on button for icon rotation
  });
}

// Auswahl aus Dropdown setzen
selectItems.forEach((item) => {
  item.addEventListener('click', () => {
    const categoryValue = item.getAttribute('data-category');
    if (selectValueDisplay) {
        // Update dropdown display text based on the clicked item's text content
        selectValueDisplay.textContent = item.textContent;
    }
    if (selectList) selectList.classList.remove('active');
    if (selectBtn) selectBtn.classList.remove('active');
    
    filterByCategory(categoryValue);
  });
});

// Filter Button Click (Desktop)
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const categoryValue = btn.getAttribute('data-category');
    filterByCategory(categoryValue);
    
    // Sync dropdown text if it exists
    if (selectValueDisplay) {
        // Find the corresponding select item text or use the button's text
        let correspondingSelectItem = Array.from(selectItems).find(si => si.getAttribute('data-category') === categoryValue);
        if (correspondingSelectItem) {
            selectValueDisplay.textContent = correspondingSelectItem.textContent;
        } else {
             selectValueDisplay.textContent = btn.textContent; // Fallback
        }
    }
  });
});

// Filter-Logik für Portfolio-Projekte
function filterByCategory(category) {
  projectItems.forEach((item) => {
    item.classList.toggle('active', category === 'alle' || item.getAttribute('data-category') === category);
  });

  // Synchronize active state of desktop filter buttons
  filterBtns.forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-category') === category);
  });

  // Update dropdown display text
  if (selectValueDisplay) {
    let displayCategoryText = 'Alle'; // Default
    if (category === 'film') {
      displayCategoryText = 'Film';
    } else if (category === 'musikproduktionen') {
      displayCategoryText = 'Musikproduktionen';
    }
    // Find the dropdown item that corresponds to the category to get its text content
    const correspondingSelectItem = Array.from(selectItems).find(si => si.getAttribute('data-category') === category);
    if (correspondingSelectItem) {
        selectValueDisplay.textContent = correspondingSelectItem.textContent;
    } else {
        // Fallback if no direct match (e.g. 'alle' might just be text)
        selectValueDisplay.textContent = displayCategoryText;
    }
  }
}

// Close Dropdown bei Klick außerhalb
document.addEventListener('click', (e) => {
  if (selectBtn && selectList && !selectBtn.contains(e.target) && !selectList.contains(e.target)) {
    selectList.classList.remove('active');
    selectBtn.classList.remove('active'); // Also remove active from button for icon
  }
});

// Optional: Initial filter call if needed, e.g. to show 'alle'
// filterByCategory('alle'); // Uncomment if you want 'alle' to be explicitly filtered on load

// Contact Form: Enable submit button logic (from template, you can add this)
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formInputs.length && formBtn) {
  // Disable button initially if you add 'disabled' attribute to it in HTML
  // formBtn.setAttribute('disabled', ''); 

  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      if (form.checkValidity()) {
        formBtn.removeAttribute('disabled');
      } else {
        formBtn.setAttribute('disabled', '');
      }
    });
  });
}

// NEUER CODE: Event Listener für Links auf der About-Seite, die zum Portfolio filtern
const filterLinksFromAbout = document.querySelectorAll('[data-filter-link]');

filterLinksFromAbout.forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Links (z.B. Sprung zu #)

    const targetPageName = this.dataset.targetPage; // z.B. "portfolio"
    const filterCategory = this.dataset.filterCategory; // z.B. "film"

    // 1. Seite wechseln
    // Navigationslinks und Seiten-Elemente (sollten bereits oben im Skript definiert sein)
    // const navLinks = document.querySelectorAll('[data-nav-link]');
    // const pages = document.querySelectorAll('[data-page]');

    let targetNavLink = null;

    navLinks.forEach(navLink => {
      // Deaktiviere alle Nav-Links und Seiten zuerst
      navLink.classList.remove('active');
      // Finde den passenden Nav-Link für die Zielseite
      if (navLink.getAttribute('data-page-target') === targetPageName) {
        targetNavLink = navLink;
      }
    });
    
    pages.forEach(page => {
      page.classList.remove('active');
      // Aktiviere die Zielseite
      if (page.dataset.page === targetPageName) {
        page.classList.add('active');
      }
    });

    // Aktiviere den Ziel-Navigationslink
    if (targetNavLink) {
      targetNavLink.classList.add('active');
    } else {
      // Fallback falls der data-page-target nicht direkt auf dem Button ist, sondern der Text übereinstimmt
      // (Wie in der ursprünglichen Logik)
       navLinks.forEach(navLink => {
           if(navLink.innerHTML.toLowerCase() === targetPageName) {
               navLink.classList.add('active');
           }
       });
    }


    window.scrollTo(0, 0); // Nach oben scrollen

    // 2. Filter auf der Portfolio-Seite anwenden
    // Die Funktion filterByCategory sollte bereits von deiner Portfolio-Logik existieren
    if (typeof filterByCategory === 'function') {
      filterByCategory(filterCategory);
    } else {
      console.error('filterByCategory function is not defined. Ensure portfolio filter logic is loaded.');
    }
  });
});