/* ============================================
   McAteer Pitch Site — Main JavaScript
   Intersection Observer, Counter Animations, Chart.js
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     INTERSECTION OBSERVER — Scroll Animations
     ------------------------------------------ */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Counter animations
        if (entry.target.dataset.counter !== undefined) {
          animateCounter(entry.target);
        }

        // Trigger counters inside stat items
        var counters = entry.target.querySelectorAll('[data-counter]');
        counters.forEach(function (el) {
          animateCounter(el);
        });

        // Chart.js init
        var chartEl = entry.target.querySelector('[data-chart]');
        if (chartEl) {
          initChart(chartEl.dataset.chart, chartEl);
        }

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
    if (prefersReducedMotion) {
      el.classList.add('visible');
      // Still init charts and counters immediately
      var counters = el.querySelectorAll('[data-counter]');
      counters.forEach(function (c) { animateCounter(c); });
      var chartEl = el.querySelector('[data-chart]');
      if (chartEl) { initChart(chartEl.dataset.chart, chartEl); }
    } else {
      observer.observe(el);
    }
  });

  /* ------------------------------------------
     COUNTER ANIMATION
     ------------------------------------------ */
  function animateCounter(el) {
    if (el._counted) return;
    el._counted = true;

    var target = parseInt(el.dataset.counter, 10);
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    var duration = prefersReducedMotion ? 0 : 2000;

    if (duration === 0) {
      el.textContent = prefix + target.toLocaleString() + suffix;
      return;
    }

    var start = performance.now();

    function update(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  /* ------------------------------------------
     CHART.JS INITIALIZATION
     ------------------------------------------ */
  var chartsInitialized = {};

  function initChart(chartName, canvasEl) {
    if (chartsInitialized[chartName]) return;
    chartsInitialized[chartName] = true;

    var ctx = canvasEl.getContext('2d');
    var animDuration = prefersReducedMotion ? 0 : 1500;

    if (chartName === 'enrollment') {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025*'],
          datasets: [{
            label: 'Student Enrollment',
            data: [6600, 6866, 6800, 6700, 6500, 6300, 6200, 6120, 5859, 5661],
            borderColor: '#D97706',
            backgroundColor: 'rgba(217, 119, 6, 0.1)',
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: '#D97706',
            pointBorderColor: '#D97706',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          animation: { duration: animDuration, easing: 'easeOutQuart' },
          plugins: {
            legend: { display: false },
            tooltip: {
              titleFont: { family: "'JetBrains Mono', monospace", size: 12 },
              bodyFont: { family: "'DM Sans', sans-serif", size: 13 },
              callbacks: {
                label: function (context) {
                  return context.parsed.y.toLocaleString() + ' students';
                }
              }
            }
          },
          scales: {
            y: {
              min: 5000,
              max: 7200,
              grid: { color: 'rgba(148, 163, 184, 0.1)' },
              ticks: {
                font: { family: "'JetBrains Mono', monospace", size: 11 },
                color: '#6B7280'
              }
            },
            x: {
              grid: { display: false },
              ticks: {
                font: { family: "'JetBrains Mono', monospace", size: 11 },
                color: '#6B7280'
              }
            }
          }
        }
      });
    }

    if (chartName === 'budget') {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['2023-24', '2024-25', '2025-26', '2026-27*'],
          datasets: [{
            label: 'Budget Reduction ($M)',
            data: [8.2, 3.0, 2.98, 4.0],
            backgroundColor: ['#94A3B8', '#B0956B', '#D97706', '#F59E0B'],
            borderRadius: 4,
            barThickness: 32
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: true,
          animation: { duration: animDuration, easing: 'easeOutQuart' },
          plugins: {
            legend: { display: false },
            tooltip: {
              titleFont: { family: "'JetBrains Mono', monospace", size: 12 },
              bodyFont: { family: "'DM Sans', sans-serif", size: 13 },
              callbacks: {
                label: function (context) {
                  return '$' + context.parsed.x + 'M';
                }
              }
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(148, 163, 184, 0.1)' },
              ticks: {
                callback: function (val) { return '$' + val + 'M'; },
                font: { family: "'JetBrains Mono', monospace", size: 11 },
                color: '#6B7280'
              }
            },
            y: {
              grid: { display: false },
              ticks: {
                font: { family: "'JetBrains Mono', monospace", size: 11 },
                color: '#6B7280'
              }
            }
          }
        }
      });
    }
  }

})();
