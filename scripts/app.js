
// How many items total
const TOTAL_ITEMS = 8;

// How many are currently selected
let selectedCount = 0;

// Grab everything we need from the DOM
let allThumbs = document.querySelectorAll('.thumb');
let counterText = document.querySelector('#counterText');
let goCampingBtn = document.querySelector('#goCampingBtn');

// On page load, store the original src for each image
for (let i = 0; i < allThumbs.length; i++) {
  let thumb = allThumbs[i];
  // Save the original src in a data attribute
  thumb.dataset.originalSrc = thumb.getAttribute('src');

  // OPTIONAL: if you have separate "checked" images, you can derive the name here.
  // This assumes your checked image is like "pic1checked.png"
  
  let originalSrc = thumb.dataset.originalSrc;
  let dotIndex = originalSrc.lastIndexOf('.');
  let checkedSrc = originalSrc.slice(0, dotIndex) + 'checked' + originalSrc.slice(dotIndex);
  thumb.dataset.checkedSrc = checkedSrc;
}

// Attach click listeners to each thumb
for (let i = 0; i < allThumbs.length; i++) {
  let thumb = allThumbs[i];

  thumb.addEventListener('click', function () {
    // Is this thumb currently checked?
    let isChecked = thumb.classList.contains('checked');

    if (!isChecked) {
      // Mark as checked
      thumb.classList.add('checked');

      // Swap to the "checked" image (if you have these files)
      if (thumb.dataset.checkedSrc) {
        thumb.setAttribute('src', thumb.dataset.checkedSrc);
      }

      // Increase counter
      selectedCount++;
    } else {
      // Mark as unchecked
      thumb.classList.remove('checked');

      // Swap back to original image
      if (thumb.dataset.originalSrc) {
        thumb.setAttribute('src', thumb.dataset.originalSrc);
      }

      // Decrease counter (keep it from going below 0 just in case)
      if (selectedCount > 0) {
        selectedCount--;
      }
    }

    // After any click, update the counter text + button label
    updateCounter();
  });
}

// Update the "X of 8 items ready!" text and the button label
function updateCounter() {
  counterText.textContent = selectedCount + ' of ' + TOTAL_ITEMS + ' items ready!';

  // If all 8 items are checked, change button text to "Go Camping"
  if (selectedCount === TOTAL_ITEMS) {
    goCampingBtn.value = 'Go Camping';
  } else {
    // Otherwise, it should just say "Reset"
    goCampingBtn.value = 'Reset';
  }
}

// This is called from the HTML: onclick="ResetPrep(this.value);"
function ResetPrep(val) {
  // If all items are ready and the button says "Go Camping", redirect
  if (val === 'Go Camping') {
    window.location.href = 'camping.html';
    return;
  }

  // Otherwise, it's a normal reset:
  // 1. Clear all selections
  for (let i = 0; i < allThumbs.length; i++) {
    let thumb = allThumbs[i];

    // Remove "checked" class
    thumb.classList.remove('checked');

    // Reset image back to original
    if (thumb.dataset.originalSrc) {
      thumb.setAttribute('src', thumb.dataset.originalSrc);
    }
  }

  // 2. Reset count and counter text
  selectedCount = 0;
  updateCounter();
}

