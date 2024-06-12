const gallery = document.getElementById('image-gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');

gallery.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'img') {
        lightboxImage.src = e.target.src;
        lightbox.classList.remove('hidden');
    }
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.add('hidden');
});

lightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden');
});