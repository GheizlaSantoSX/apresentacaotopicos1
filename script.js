document.addEventListener('DOMContentLoaded', () => {

    const navigationControls = document.querySelector('.navigation');
    const slides = document.querySelectorAll('.slide');

    if (navigationControls && slides.length > 0) {
        let currentSlideIndex = 0;
        const totalSlides = slides.length;

        const currentSlideEl = document.getElementById('currentSlide');
        const totalSlidesEl = document.getElementById('totalSlides');
        const progressBarEl = document.getElementById('progressBar');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');

            if (currentSlideEl) currentSlideEl.textContent = index + 1;
            if (progressBarEl) progressBarEl.style.width = ((index + 1) / totalSlides * 100) + '%';


            if (nextBtn) nextBtn.disabled = index === totalSlides - 1;
        }


        window.changeSlide = function(direction) {
            const newIndex = currentSlideIndex + direction;


            if (newIndex < 0) {
                window.location.href = 'index.html';
                return; // Para a execução
            }


            if (newIndex < totalSlides) {
                currentSlideIndex = newIndex;
                showSlide(currentSlideIndex);
            }
        }

        // Adiciona os listeners de clique diretamente aqui para mais controle
        if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));

        // Navegação por teclado e toque
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') changeSlide(-1);
            if (e.key === 'ArrowRight') changeSlide(1);
        });

        let touchStartX = 0;
        document.addEventListener('touchstart', (e) => touchStartX = e.changedTouches[0].screenX);
        document.addEventListener('touchend', (e) => {
            let touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) changeSlide(1);
            if (touchEndX - touchStartX > 50) changeSlide(-1);
        });

        // Inicialização
        if (totalSlidesEl) totalSlidesEl.textContent = totalSlides;
        showSlide(0);
    }


    // --- LÓGICA DO MODAL DE IMAGEM ---
    const screenImages = document.querySelectorAll('.screen-image');
    if (screenImages.length > 0) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeModal = document.querySelector('.close-modal');

        if (modal && modalImg) {
            screenImages.forEach(image => {
                image.addEventListener('click', () => {
                    modal.classList.add('show');
                    modalImg.src = image.src;
                });
            });

            const hideModal = () => {
                modal.classList.remove('show');
            }

            if (closeModal) closeModal.addEventListener('click', hideModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    hideModal();
                }
            });
        }
    }
});