/* =====================================================================
   CVHS Engineering Hub – Navigation Component
   Minimal bar: brand + search icon + hamburger.
   Mobile nav = full category accordion.
   ===================================================================== */

(function() {
  'use strict';

  function getBasePath() {
    var path = window.location.pathname;
    var depth = (path.match(/\//g) || []).length - 1;
    return depth <= 0 ? '.' : '..';
  }

  var BASE = getBasePath();

  function buildNav() {
    var container = document.getElementById('nav-container');
    if (!container || !window.NAV_DATA) return;

    var currentPath = window.location.pathname;

    // ---- Navbar ----
    var nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Main navigation');

    // Brand
    var brand = document.createElement('a');
    brand.className = 'nav-brand';
    brand.href = BASE + '/index.html';
    brand.textContent = 'CVHS Engineering Hub';

    // Right-side cluster
    var right = document.createElement('div');
    right.className = 'nav-right';

    // Search button
    var searchBtn = document.createElement('button');
    searchBtn.className = 'nav-search-btn';
    searchBtn.setAttribute('aria-label', 'Search');
    searchBtn.innerHTML = '<svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8.5" cy="8.5" r="6"/><line x1="13" y1="13" x2="18" y2="18"/></svg>';
    searchBtn.onclick = function() {
      var overlay = document.querySelector('.search-overlay');
      if (overlay) {
        overlay.classList.add('open');
        var inp = overlay.querySelector('input');
        if (inp) inp.focus();
      }
    };

    // Hamburger (mobile)
    var hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Menu');
    hamburger.innerHTML = '&#9776;';
    hamburger.onclick = function() {
      var mobileNav = document.querySelector('.mobile-nav');
      if (mobileNav) {
        var isOpen = mobileNav.classList.toggle('open');
        hamburger.innerHTML = isOpen ? '&#10005;' : '&#9776;';
        document.body.style.overflow = isOpen ? 'hidden' : '';
      }
    };

    right.appendChild(searchBtn);
    right.appendChild(hamburger);

    nav.appendChild(brand);
    nav.appendChild(right);

    // ---- Mobile nav (full category tree) ----
    var mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';

    NAV_DATA.forEach(function(cat) {
      if (cat.slug === 'index') {
        var homeLink = document.createElement('a');
        homeLink.href = BASE + '/index.html';
        homeLink.textContent = 'Home';
        homeLink.style.cssText = 'display:block;padding:14px 4px;font-weight:600;border-bottom:1px solid var(--border-light);color:var(--ink)';
        mobileNav.appendChild(homeLink);
        return;
      }

      var catDiv = document.createElement('div');
      catDiv.className = 'mobile-nav-category';
      if (currentPath.includes('/' + cat.folder + '/')) {
        catDiv.classList.add('expanded');
      }

      var catBtn = document.createElement('button');
      catBtn.innerHTML = cat.icon + ' ' + cat.name + ' <span class="expand-icon">&#9662;</span>';
      catBtn.onclick = function() { catDiv.classList.toggle('expanded'); };
      catDiv.appendChild(catBtn);

      if (cat.children && cat.children.length > 0) {
        var subUl = document.createElement('ul');
        subUl.className = 'mobile-nav-sublinks';

        // Overview link
        var overviewLi = document.createElement('li');
        var overviewA = document.createElement('a');
        overviewA.href = BASE + '/' + cat.folder + '/index.html';
        overviewA.textContent = 'Overview';
        overviewA.style.fontWeight = '600';
        overviewLi.appendChild(overviewA);
        subUl.appendChild(overviewLi);

        cat.children.forEach(function(child) {
          var li = document.createElement('li');
          var a = document.createElement('a');
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

    // ---- Breadcrumb ----
    buildBreadcrumb(currentPath);
  }

  function buildBreadcrumb(currentPath) {
    var bc = document.querySelector('.breadcrumb');
    if (!bc) return;

    var parts = ['<a href="' + BASE + '/index.html">Home</a>'];

    NAV_DATA.forEach(function(cat) {
      if (cat.slug === 'index') return;
      if (!currentPath.includes('/' + cat.folder + '/')) return;

      parts.push('<span>›</span>');
      parts.push('<a href="' + BASE + '/' + cat.folder + '/index.html">' + cat.name + '</a>');

      cat.children.forEach(function(child) {
        if (currentPath.includes(child.slug + '.html')) {
          parts.push('<span>›</span>');
          parts.push('<strong>' + child.name + '</strong>');
        }
      });
    });

    bc.innerHTML = parts.join('');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    buildNav();
  }
})();
