let currentSlide = 0;
let slideInterval;
const slideDuration = 5000;

let progressBarIntervals = [];

function showVideo(videoIndex) {
  // Detener todas las actualizaciones de la barra de progreso si están en curso
  progressBarIntervals.forEach(interval => clearInterval(interval));
  progressBarIntervals = [];

  // Ocultar el botón correspondiente al video reproducido
  const button = document.getElementById(`play-button-${videoIndex}`);
  button.style.display = 'none';

  // Mostrar el video correspondiente
  const video = document.getElementById(`video${videoIndex}`);
  video.style.display = 'block';
  video.play();

  // Obtener la barra de progreso del video
  const progressBar = document.getElementById(`progress${videoIndex}`);

  // Actualizar la barra de progreso mientras se reproduce el video
  const updateProgressBar = () => {
    const duration = video.duration;
    const currentTime = video.currentTime;
    const progress = (currentTime / duration) * 100;
    progressBar.style.width = `${progress}%`;

    // Detener la actualización cuando el video termina
    if (currentTime >= duration) {
      clearInterval(progressBarIntervals[videoIndex]);
      progressBar.style.width = '100%'; // Asegurar que la barra llegue al final
    }
  };

  // Iniciar la actualización de la barra de progreso
  progressBarIntervals[videoIndex] = setInterval(updateProgressBar, 100);

  // Detener la reproducción automática de diapositivas
  clearInterval(slideInterval);
  resetProgressBar(currentSlide);
}

function changeSlide(n) {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  slides[currentSlide].style.display = 'none';
  resetProgressBar(currentSlide);

  currentSlide = (currentSlide + n + totalSlides) % totalSlides;
  slides[currentSlide].style.display = 'block';
  startProgressBar(currentSlide);
  stopAllVideos();
}

function stopAllVideos() {
  const videos = document.querySelectorAll('.video');
  videos.forEach(video => {
    video.pause();
    video.currentTime = 0;
    video.style.display = 'none';
  });
}

function autoSlide() {
  changeSlide(1);
}

function startProgressBar(index) {
  const progressBar = document.getElementById(`progress${index}`);
  progressBar.style.transition = 'none';
  progressBar.style.width = '0';
  setTimeout(() => {
    progressBar.style.transition = `width ${slideDuration}ms linear`;
    progressBar.style.width = '100%';
  }, 10);
  slideInterval = setTimeout(autoSlide, slideDuration);
}

function resetProgressBar(index) {
  const progressBar = document.getElementById(`progress${index}`);
  progressBar.style.transition = 'none';
  progressBar.style.width = '0';
  clearTimeout(slideInterval);
}

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide, index) => {
    slide.style.display = index === 0 ? 'block' : 'none';
  });

  startProgressBar(currentSlide);
});
