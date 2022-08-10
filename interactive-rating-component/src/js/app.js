const rates = document.querySelectorAll('ul li a');
const button = document.querySelector('section .card-body button');
const rateButton = document.querySelector('section .card-body2 button');  
const rated = document.querySelector('section .card-body2 #rated'); 
const cardBody = document.querySelector('section .card-body2');

rates.forEach(function(rate, idx) {
    rate.addEventListener('click', function(e) {
      const current = document.querySelector('.rate');
      // If class rate exists
          if(current !== null) {
            current.classList.remove('rate');
          }
          //If class rate does not exist
          e.target.classList.add('rate');

        const finalRate = idx + 1;
        const totalRates = rates.length;
       const rateText = `You selected ${finalRate} out of ${totalRates}`;
       // Once button is clicked, input the rateText into #rated
       // and display the second body, the thank you page.
       button.addEventListener('click', () => {
        rated.innerText = rateText;
        cardBody.classList.add('show');

       }) 
       // once the back button on the thank you page is clicked,
       // hide the thank you page and remove the style of the selected
       // rate.
       rateButton.addEventListener('click', () => {
        cardBody.classList.remove('show');
        e.target.classList.remove('rate');
    
       }) 
    })
  }) 