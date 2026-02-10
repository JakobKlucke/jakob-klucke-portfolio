const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
const sidebar = document.querySelector('[data-sidebar]');

const selectBtn = document.querySelector('[data-select]');
const selectList = document.querySelector('.select-list');
const selectValueDisplay = document.querySelector('[data-select-value]');
const selectItems = document.querySelectorAll('[data-select-item]');
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const projectItems = document.querySelectorAll('[data-filter-item]');

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');
const filmProjectItems = document.querySelectorAll('.project-item-film');
const projectModal = document.querySelector('[data-project-modal]');
const projectModalOverlay = document.querySelector('[data-project-modal-overlay]');
const projectModalCloseBtn = document.querySelector('[data-project-modal-close]');
const projectModalLink = document.querySelector('[data-project-modal-link]');
const projectModalImage = document.querySelector('[data-project-modal-image]');
const projectModalTitle = document.querySelector('[data-project-modal-title]');
const projectModalDescription = document.querySelector('[data-project-modal-description]');
const projectModalRole = document.querySelector('[data-project-modal-role]');

const filmProjectDetails = {
  sugar: {
    title: 'Sugar',
    description:
      '"SUGAR" setzt sich mit der Hook-Up-Culture der Generation Z und dem Aufstieg des "Sugar-Daddy"-Konzeptes auseinander. Inspiriert ist der Film von wahren Erlebnissen junger Frauen in Berlin. Erzählt wird eine Nacht von FIADH (19) im Berliner Nachtleben bei ihrem Sugar Daddy MARCEL (54) und ihrem Freund MICHA (20).',
    role: 'Mischtonmeister, ADR / Synchrontonmeister',
    link: 'https://www.crew-united.com/de/Sugar__314513.html',
  },
  'dating-history': {
    title: 'Dating History',
    description:
      '"Dating History" ist eine filmische Zeitreise durch verschiedene Epochen, vom Flirt in der Vorzeit bis zu den wilden 1920er-Jahren. Inspiriert von der immersiven Ausstellung im Deutschlandmuseum bringt der Film Geschichte auf moderne, unterhaltsame Weise auf den Bildschirm.',
    role: 'Mischtonmeister, 1. Tonassistent',
    link: 'https://www.crew-united.com/de/Deutschlandmuseum-Dating-History-Eine-Zeitreise-der-Liebe__340337.html',
  },
  'falsches-leben': {
    title: 'Falsches Leben',
    description: 'Kurzfilmprojekt mit Fokus auf dialogorientierter und szenischer Tonarbeit.',
    role: 'Tonmeister, Mischtonmeister',
    link: 'https://www.crew-united.com/de/Falsches-Leben__351716.html',
  },
  liebesbesuch: {
    title: 'Liebesbesuch',
    description:
      'Die Kellnerin Natalie ist aufgeregt vor dem ersten Treffen mit ihrem neuen Freund Marc, den sie bisher nur online kennt. Auf dem Weg zum Kennenlernen wird sie mit Anspannung und Ängsten konfrontiert, und bei der Begegnung prallen Erwartung und Realität, Nähe und Fremdheit aufeinander.',
    role: '1. Tonassistenz, Dialog Editing',
    link: 'https://www.crew-united.com/de/Liebesbesuch__345644.html',
  },
  'zwischen-beethoven-und-tute': {
    title: 'Zwischen Beethoven und Tute',
    description: 'Portraitfilm mit Schwerpunkt auf Sprachverständlichkeit, Atmosphäre und klanglicher Dramaturgie.',
    role: 'Tonmeister, Sounddesign, Mischtonmeister',
    link: 'https://youtu.be/UUBlweyV51A?si=tvEOdCNCobSmqg8g',
  },
};

const categoryLabels = {};
selectItems.forEach((item) => {
  const category = item.getAttribute('data-category');
  if (category) {
    categoryLabels[category] = item.textContent.trim();
  }
});

function switchPage(targetPageName) {
  if (!targetPageName) return;

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('data-page-target') === targetPageName);
  });

  pages.forEach((page) => {
    page.classList.toggle('active', page.dataset.page === targetPageName);
  });

  window.scrollTo(0, 0);
}

function setSelectLabel(category) {
  if (!selectValueDisplay) return;
  selectValueDisplay.textContent = categoryLabels[category] || categoryLabels.alle || 'Alle';
}

function closeProjectModal() {
  if (!projectModal || !projectModalOverlay) return;
  projectModal.classList.remove('active');
  projectModalOverlay.classList.remove('active');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function openProjectModal(projectItem) {
  if (
    !projectItem ||
    !projectModal ||
    !projectModalOverlay ||
    !projectModalTitle ||
    !projectModalDescription ||
    !projectModalRole ||
    !projectModalLink ||
    !projectModalImage
  ) {
    return;
  }

  const projectKey = projectItem.getAttribute('data-project-key');
  const projectData = projectKey ? filmProjectDetails[projectKey] : null;
  if (!projectData) return;

  const imageElement = projectItem.querySelector('.project-img img');
  const imageSrc = imageElement ? imageElement.getAttribute('src') : '';
  const imageAlt = imageElement ? imageElement.getAttribute('alt') : projectData.title;

  projectModalTitle.textContent = projectData.title;
  projectModalDescription.textContent = projectData.description;
  projectModalRole.textContent = projectData.role;
  projectModalLink.href = projectData.link;
  projectModalImage.src = imageSrc || '';
  projectModalImage.alt = imageAlt || projectData.title;

  projectModal.classList.add('active');
  projectModalOverlay.classList.add('active');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function filterByCategory(category) {
  const selected = category || 'alle';
  projectItems.forEach((item) => {
    item.classList.toggle('active', selected === 'alle' || item.getAttribute('data-category') === selected);
  });

  filterBtns.forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-category') === selected);
  });

  setSelectLabel(selected);
}

if (navLinks.length && pages.length) {
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      switchPage(link.getAttribute('data-page-target'));
    });
  });
}

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
}

if (selectBtn && selectList) {
  selectBtn.addEventListener('click', () => {
    selectList.classList.toggle('active');
    selectBtn.classList.toggle('active');
  });
}

if (selectList) {
  selectList.addEventListener('click', (event) => {
    const target = event.target.closest('[data-select-item]');
    if (!target) return;

    const category = target.getAttribute('data-category');
    filterByCategory(category);
    selectList.classList.remove('active');
    if (selectBtn) selectBtn.classList.remove('active');
  });
}

if (filterBtns.length) {
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterByCategory(btn.getAttribute('data-category'));
    });
  });
}

if (form && formInputs.length && formBtn) {
  form.addEventListener('input', () => {
    if (form.checkValidity()) {
      formBtn.removeAttribute('disabled');
      return;
    }
    formBtn.setAttribute('disabled', '');
  });
}

if (filmProjectItems.length) {
  filmProjectItems.forEach((item) => {
    const anchor = item.querySelector('a');
    if (!anchor) return;

    anchor.addEventListener('click', (event) => {
      const imageArea = event.target.closest('.project-img');
      if (!imageArea) return;
      event.preventDefault();
      openProjectModal(item);
    });
  });
}

if (projectModalCloseBtn) {
  projectModalCloseBtn.addEventListener('click', closeProjectModal);
}

if (projectModalOverlay) {
  projectModalOverlay.addEventListener('click', closeProjectModal);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeProjectModal();
  }
});

document.addEventListener('click', (event) => {
  const target = event.target;

  if (selectBtn && selectList && !selectBtn.contains(target) && !selectList.contains(target)) {
    selectList.classList.remove('active');
    selectBtn.classList.remove('active');
  }

  const aboutFilterLink = target.closest('[data-filter-link]');
  if (!aboutFilterLink) return;

  event.preventDefault();
  const pageTarget = aboutFilterLink.dataset.targetPage;
  const filterCategory = aboutFilterLink.dataset.filterCategory || 'alle';
  switchPage(pageTarget);
  filterByCategory(filterCategory);
});
