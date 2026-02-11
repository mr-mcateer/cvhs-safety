/* ============================================
   CVHS Safety Website - Navigation Component
   Builds nav from NAV_DATA, handles dropdowns,
   hamburger menu, and breadcrumbs.
   ============================================ */

(function() {
  'use strict';

  // Determine base path based on current page depth
  function getBasePath() {
    const path = window.location.pathname;
    // If we're in a subdirectory (e.g., /wood-power-tools/table-saws.html)
    const depth = (path.match(/\//g) || []).length - 1;
    if (depth <= 0) return '.';
    return '..';
  }

  const BASE = getBasePath();

  function buildNav() {
    const container = document.getElementById('nav-container');
    if (!container || !window.NAV_DATA) return;

    // Determine current page
    const currentPath = window.location.pathname;

    // Build navbar HTML
    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Main navigation');

    // Brand
    const brand = document.createElement('a');
    brand.className = 'nav-brand';
    brand.href = BASE + '/index.html';
    brand.innerHTML = `<img src="${BASE}/images/cvhs-logo.png" alt="CVHS Logo" onerror="this.style.display='none'"> CVHS Safety Website`;

    // Desktop nav links
    const ul = document.createElement('ul');
    ul.className = 'nav-links';

    NAV_DATA.forEach(function(cat) {
      const li = document.createElement('li');

      const a = document.createElement('a');
      a.href = BASE + cat.href;
      a.textContent = cat.name;
      if (currentPath.includes('/' + cat.folder + '/') || currentPath.endsWith('/' + cat.folder + '/index.html')) {
        a.classList.add('active');
      }

      if (cat.children && cat.children.length > 0) {
        a.innerHTML = cat.name + ' <span class="dropdown-arrow">&#9662;</span>';

        const dropdown = document.createElement('div');
        dropdown.className = 'nav-dropdown';

        cat.children.forEach(function(child) {
          const childA = document.createElement('a');
          childA.href = BASE + '/' + cat.folder + '/' + child.slug + '.html';
          childA.textContent = child.name;
          if (currentPath.includes(child.slug + '.html')) {
            childA.classList.add('active');
          }
          dropdown.appendChild(childA);
        });

        li.appendChild(a);
        li.appendChild(dropdown);
      } else {
        li.appendChild(a);
        if (currentPath.endsWith('/index.html') && cat.slug === 'index') {
          a.classList.add('active');
        }
      }

      // Skip home from main nav links (it's in the brand)
      if (cat.slug !== 'index') {
        ul.appendChild(li);
      }
    });

    // Search button
    const searchBtn = document.createElement('button');
    searchBtn.className = 'nav-search-btn';
    searchBtn.setAttribute('aria-label', 'Search');
    searchBtn.innerHTML = '&#128269;';
    searchBtn.onclick = function() {
      var overlay = document.querySelector('.search-overlay');
      if (overlay) {
        overlay.classList.add('open');
        var input = overlay.querySelector('input');
        if (input) input.focus();
      }
    };

    // Hamburger
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle navigation');
    hamburger.innerHTML = '&#9776;';
    hamburger.onclick = function() {
      var mobileNav = document.querySelector('.mobile-nav');
      if (mobileNav) {
        mobileNav.classList.toggle('open');
        hamburger.innerHTML = mobileNav.classList.contains('open') ? '&#10005;' : '&#9776;';
      }
    };

    nav.appendChild(brand);
    nav.appendChild(ul);
    nav.appendChild(searchBtn);
    nav.appendChild(hamburger);

    // Mobile nav
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';

    NAV_DATA.forEach(function(cat) {
      if (cat.slug === 'index') {
        const homeLink = document.createElement('a');
        homeLink.href = BASE + '/index.html';
        homeLink.textContent = 'Home';
        homeLink.style.display = 'block';
        homeLink.style.padding = '12px 8px';
        homeLink.style.fontWeight = '600';
        homeLink.style.borderBottom = '1px solid var(--color-border)';
        mobileNav.appendChild(homeLink);
        return;
      }

      const catDiv = document.createElement('div');
      catDiv.className = 'mobile-nav-category';
      if (currentPath.includes('/' + cat.folder + '/')) {
        catDiv.classList.add('expanded');
      }

      const catBtn = document.createElement('button');
      catBtn.innerHTML = cat.name + ' <span class="expand-icon">&#9662;</span>';
      catBtn.onclick = function() {
        catDiv.classList.toggle('expanded');
      };

      catDiv.appendChild(catBtn);

      if (cat.children && cat.children.length > 0) {
        const subUl = document.createElement('ul');
        subUl.className = 'mobile-nav-sublinks';

        // Category index link
        const catLi = document.createElement('li');
        const catLink = document.createElement('a');
        catLink.href = BASE + '/' + cat.folder + '/index.html';
        catLink.textContent = 'Overview';
        catLink.style.fontWeight = '600';
        catLi.appendChild(catLink);
        subUl.appendChild(catLi);

        cat.children.forEach(function(child) {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = BASE + '/' + cat.folder + '/' + child.slug + '.html';
          a.textContent = child.name;
          if (currentPath.includes(child.slug + '.html')) {
            a.classList.add('active');
          }
          li.appendChild(a);
          subUl.appendChild(li);
        });

        catDiv.appendChild(subUl);
      }

      mobileNav.appendChild(catDiv);
    });

    container.appendChild(nav);
    container.appendChild(mobileNav);

    // Build breadcrumb if we're on a subpage
    buildBreadcrumb(currentPath);
  }

  function buildBreadcrumb(currentPath) {
    var bcContainer = document.querySelector('.breadcrumb');
    if (!bcContainer) return;

    var parts = [];
    parts.push('<a href="' + BASE + '/index.html">Home</a>');

    // Find current category and page
    NAV_DATA.forEach(function(cat) {
      if (cat.slug === 'index') return;
      if (!currentPath.includes('/' + cat.folder + '/')) return;

      parts.push('<span>&rsaquo;</span>');
      parts.push('<a href="' + BASE + '/' + cat.folder + '/index.html">' + cat.name + '</a>');

      cat.children.forEach(function(child) {
        if (currentPath.includes(child.slug + '.html')) {
          parts.push('<span>&rsaquo;</span>');
          parts.push('<strong>' + child.name + '</strong>');
        }
      });
    });

    bcContainer.innerHTML = parts.join(' ');
  }

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    buildNav();
  }
})();
