const btn = document.querySelector('.j-btn-test'),
      scrWidth = window.screen.width,
      scrHeight = window.screen.height;

btn.addEventListener('click', () => {
    alert(`Размеры экрана вашего устройства: ${scrWidth} x ${scrHeight} пикселей`)
     
   });