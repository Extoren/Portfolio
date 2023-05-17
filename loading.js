const loadingTexts = [
    'Thanks For Waiting!',
  ];
  
  let currentIndex = 0;
  
  function typeWriter(text, index, interval) {
    if (index < text.length) {
      const loadingText = document.getElementById('loading-text');
      loadingText.textContent += text.charAt(index);
      setTimeout(() => {
        typeWriter(text, index + 1, interval);
      }, interval);
    }
  }
  
  function changeLoadingText() {
    const loadingText = document.getElementById('loading-text');
    loadingText.textContent = '';
    const currentText = loadingTexts[currentIndex];
    typeWriter(currentText, 0, 100);
  
    currentIndex = (currentIndex + 1) % loadingTexts.length;
  
    if (currentIndex === 0) {
      setTimeout(function() {
        const loadingContainer = document.querySelector('.loading-container');
        loadingContainer.style.display = 'none';
  
        const portfolioContainer = document.getElementById('portfolio-container');
        portfolioContainer.style.visibility = 'visible';
      }, 3000);
    }
  }
  
  setInterval(changeLoadingText, 5000);

  