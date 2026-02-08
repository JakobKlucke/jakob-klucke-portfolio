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
