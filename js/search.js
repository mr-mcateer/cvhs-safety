/* =====================================================================
   CVHS Engineering Hub – Search Component
   Client-side full-text search built from NAV_DATA.
   Ctrl/Cmd + K to open.
   ===================================================================== */

(function() {
  'use strict';

  function getBasePath() {
    var path = window.location.pathname;
    var depth = (path.match(/\//g) || []).length - 1;
    return depth <= 0 ? '.' : '..';
  }

  var BASE = getBasePath();
  var searchIndex = [];
  var overlay, input, resultsContainer;

  function buildSearchIndex() {
    if (!window.NAV_DATA) return;

    NAV_DATA.forEach(function(cat) {
      if (cat.slug === 'index') return;

      searchIndex.push({
        name: cat.name,
        category: '',
        href: BASE + cat.href,
        keywords: cat.name.toLowerCase(),
        icon: cat.icon
      });

      if (cat.children) {
        cat.children.forEach(function(child) {
          searchIndex.push({
            name: child.name,
            category: cat.name,
            href: BASE + '/' + cat.folder + '/' + child.slug + '.html',
            keywords: (child.name + ' ' + cat.name).toLowerCase(),
            icon: cat.icon
          });
        });
      }
    });
  }

  function createSearchOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'search-overlay';

    var container = document.createElement('div');
    container.className = 'search-container';

    var inputWrapper = document.createElement('div');
    inputWrapper.className = 'search-input-wrapper';

    var svgNS = 'http://www.w3.org/2000/svg';
    var searchIcon = document.createElementNS(svgNS, 'svg');
    searchIcon.setAttribute('width', '16');
    searchIcon.setAttribute('height', '16');
    searchIcon.setAttribute('viewBox', '0 0 20 20');
    searchIcon.setAttribute('fill', 'none');
    searchIcon.setAttribute('stroke', 'currentColor');
    searchIcon.setAttribute('stroke-width', '2');
    var circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', '8.5');
    circle.setAttribute('cy', '8.5');
    circle.setAttribute('r', '6');
    var line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', '13');
    line.setAttribute('y1', '13');
    line.setAttribute('x2', '18');
    line.setAttribute('y2', '18');
    searchIcon.appendChild(circle);
    searchIcon.appendChild(line);

    input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search equipment, tools, software...';
    input.setAttribute('aria-label', 'Search');

    var closeBtn = document.createElement('button');
    closeBtn.className = 'search-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close search');
    closeBtn.onclick = closeSearch;

    inputWrapper.appendChild(searchIcon);
    inputWrapper.appendChild(input);
    inputWrapper.appendChild(closeBtn);

    resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';

    container.appendChild(inputWrapper);
    container.appendChild(resultsContainer);
    overlay.appendChild(container);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeSearch();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeSearch();
      }
    });

    var debounceTimer;
    input.addEventListener('input', function() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function() {
        performSearch(input.value.trim());
      }, 120);
    });
  }

  function closeSearch() {
    if (overlay) {
      overlay.classList.remove('open');
      if (input) input.value = '';
      if (resultsContainer) resultsContainer.innerHTML = '';
    }
  }

  function performSearch(query) {
    if (!resultsContainer) return;

    if (!query || query.length < 2) {
      resultsContainer.innerHTML = '<div class="search-results-empty">Type to search across all equipment...</div>';
      return;
    }

    var q = query.toLowerCase();
    var matches = searchIndex.filter(function(item) {
      return item.keywords.indexOf(q) !== -1;
    });

    if (matches.length === 0) {
      resultsContainer.innerHTML = '<div class="search-results-empty">No results for "' + escapeHtml(query) + '"</div>';
      return;
    }

    var groups = {};
    matches.forEach(function(item) {
      var groupName = item.category || 'Categories';
      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(item);
    });

    var html = '';
    Object.keys(groups).forEach(function(groupName) {
      html += '<div class="search-result-group">';
      html += '<div class="search-result-group-title">' + escapeHtml(groupName) + '</div>';
      groups[groupName].forEach(function(item) {
        html += '<a class="search-result-item" href="' + item.href + '">';
        html += '<span class="result-name">' + highlightMatch(item.name, query) + '</span>';
        if (item.category) {
          html += '<span class="result-category">' + escapeHtml(item.category) + '</span>';
        }
        html += '</a>';
      });
      html += '</div>';
    });

    resultsContainer.innerHTML = html;
  }

  function highlightMatch(text, query) {
    var idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return escapeHtml(text);
    return escapeHtml(text.substring(0, idx)) +
      '<strong>' + escapeHtml(text.substring(idx, idx + query.length)) + '</strong>' +
      escapeHtml(text.substring(idx + query.length));
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay) {
        overlay.classList.add('open');
        if (input) input.focus();
      }
    }
  });

  function init() {
    buildSearchIndex();
    createSearchOverlay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
