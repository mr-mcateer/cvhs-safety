/* =====================================================================
   CVHS Engineering Hub – Shop Spotlight
   Rotating photo showcase from Google Drive.

   HOW TO ADD PHOTOS:
   1. Upload image to the shared Google Drive "Images" folder
   2. Right-click → Share → set to "Anyone with the link"
   3. Copy the file ID from the URL (the long string after /d/)
   4. Add an entry to SHOP_PHOTOS below

   Images are served via Google's lh3 CDN at the requested width.
   ===================================================================== */

var SHOP_PHOTOS = [
  {
    id: '1uheeV97N9eZgvL6tzxDVYlSQf8XsxMzC',
    alt: 'Metalwork fixture on welding table',
    caption: 'Precision metalwork in the welding shop'
  },
  {
    id: '1pJsNPrfCaHMujJDg3K5HwMaGst_-ouyc',
    alt: 'Student project on workbench',
    caption: 'Student projects in progress'
  },
  {
    id: '1iIiCG0VN0d9vt4qgWvxe7KKI-5R0y7bJ',
    alt: 'Welding in the metals shop',
    caption: 'Welding practice in the metals shop'
  },
  {
    id: '1ExvGfVF29-DOPSWbxISZ3OKbSO4omOH7',
    alt: 'CNC and digital fabrication area',
    caption: 'CNC and digital fabrication'
  },
  {
    id: '19pHhZdDvjr9QsiHciTraMkjaqOtDtxgE',
    alt: 'Woodworking project',
    caption: 'Woodworking in the power tools shop'
  },
  {
    id: '1u3Xqpza5WZPkw7lDEua8mgy5yFOwIQKi',
    alt: 'Shop life at CVHS Engineering',
    caption: 'Daily life in the CVHS shop'
  },
  {
    id: '1kdv5rwPSeK8feR9FthxYYLCJQoirqugD',
    alt: 'Student-made tool',
    caption: 'Student-crafted metalwork'
  },
  {
    id: '1pthUTzDxycmKMj_pJYg8kmf5BMarrm19',
    alt: 'Engineering project in progress',
    caption: 'Engineering projects underway'
  },
  {
    id: '1IYzTxN0p0-a_bxRIXnxII7OOlplehoM1',
    alt: 'Shop equipment and student work',
    caption: 'Hands-on learning in the shop'
  },
  {
    id: '1Srie8vJiYV6xdwiAWkb6dFjfDo1HZTnF',
    alt: 'Student with Solidworks certification',
    caption: 'Solidworks certification earned'
  },
  {
    id: '1FWVE21nYjZP6gksrxKsA41IUUzHQC_EX',
    alt: 'Student in the engineering lab',
    caption: 'Students in the engineering lab'
  },
  {
    id: '13jpWqH_VWXdoS1yP0LyCvBb9MoX8vw4V',
    alt: 'Student with 3D printed project',
    caption: 'CTE student showcase'
  }
];

/* -------------------------------------------------------------------
   Spotlight Engine
   Crossfade carousel with Ken Burns zoom. Zero dependencies.
   ------------------------------------------------------------------- */
(function() {
  'use strict';

  var INTERVAL  = 7000;   // ms between slides
  var FADE_MS   = 1200;   // crossfade duration
  var IMG_WIDTH = 900;    // px requested from Google CDN

  function imgUrl(fileId) {
    return 'https://lh3.googleusercontent.com/d/' + fileId + '=w' + IMG_WIDTH;
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function initSpotlight() {
    var container = document.getElementById('shop-spotlight');
    if (!container || !window.SHOP_PHOTOS || SHOP_PHOTOS.length === 0) return;

    var photos = shuffle(SHOP_PHOTOS);
    var current = 0;

    // Build DOM
    var viewport = document.createElement('div');
    viewport.className = 'spotlight-viewport';

    // Two layers for crossfade
    var layerA = document.createElement('div');
    layerA.className = 'spotlight-slide spotlight-active';
    var imgA = document.createElement('img');

    var layerB = document.createElement('div');
    layerB.className = 'spotlight-slide';
    var imgB = document.createElement('img');

    layerA.appendChild(imgA);
    layerB.appendChild(imgB);
    viewport.appendChild(layerA);
    viewport.appendChild(layerB);

    // Caption
    var captionEl = document.createElement('div');
    captionEl.className = 'spotlight-caption';

    // Navigation dots
    var dotsEl = document.createElement('div');
    dotsEl.className = 'spotlight-dots';
    var dots = [];
    for (var d = 0; d < photos.length; d++) {
      var dot = document.createElement('button');
      dot.className = 'spotlight-dot' + (d === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Photo ' + (d + 1));
      dot.dataset.index = d;
      dot.onclick = function() {
        var idx = parseInt(this.dataset.index, 10);
        if (idx !== current) {
          goTo(idx);
          resetTimer();
        }
      };
      dots.push(dot);
      dotsEl.appendChild(dot);
    }

    container.appendChild(viewport);
    container.appendChild(captionEl);
    container.appendChild(dotsEl);

    // Load first image
    showSlide(photos[0], imgA, layerA, captionEl);

    // Preload next
    preload(photos[1]);

    var activeLayer = 'A';
    var timer;

    function showSlide(photo, imgEl, layerEl, capEl) {
      imgEl.src = imgUrl(photo.id);
      imgEl.alt = photo.alt;
      if (capEl && photo.caption) {
        capEl.textContent = photo.caption;
        capEl.style.opacity = '1';
      }
    }

    function preload(photo) {
      if (!photo) return;
      var img = new Image();
      img.src = imgUrl(photo.id);
    }

    function goTo(idx) {
      current = idx;
      var photo = photos[current];
      var fromLayer, toLayer, fromImg, toImg;

      if (activeLayer === 'A') {
        fromLayer = layerA; toLayer = layerB;
        fromImg = imgA;     toImg = imgB;
        activeLayer = 'B';
      } else {
        fromLayer = layerB; toLayer = layerA;
        fromImg = imgB;     toImg = imgA;
        activeLayer = 'A';
      }

      // Set new image on hidden layer
      toImg.src = imgUrl(photo.id);
      toImg.alt = photo.alt;

      // Crossfade
      toLayer.classList.add('spotlight-active');
      fromLayer.classList.remove('spotlight-active');

      // Update caption
      captionEl.style.opacity = '0';
      setTimeout(function() {
        captionEl.textContent = photo.caption || '';
        captionEl.style.opacity = '1';
      }, FADE_MS / 2);

      // Update dots
      dots.forEach(function(dt, i) {
        dt.classList.toggle('active', i === current);
      });

      // Preload next
      var next = (current + 1) % photos.length;
      preload(photos[next]);
    }

    function advance() {
      goTo((current + 1) % photos.length);
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(advance, INTERVAL);
    }

    // Start auto-rotation
    timer = setInterval(advance, INTERVAL);

    // Pause on hover
    container.addEventListener('mouseenter', function() {
      clearInterval(timer);
    });
    container.addEventListener('mouseleave', function() {
      timer = setInterval(advance, INTERVAL);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpotlight);
  } else {
    initSpotlight();
  }
})();
