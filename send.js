const loadingTexts = [
    'Loading successful',
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
 
 
 
 // Get the button element by its ID
 const send = document.getElementById('unit');

 // Add a click event listener to the button
 send.addEventListener('click', function() {
   // Redirect to the specified href
   window.location.href = '3D_English.html';
 });