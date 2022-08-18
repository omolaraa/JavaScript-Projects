const formData = {}; // object that will store bill, tip, and people values for calculated tip and total amount to be calculated.
const tips = document.querySelectorAll('.tip');
const inputs = document.querySelectorAll('.input');
const messages = document.querySelectorAll('.label-input p');
const customTip = document.querySelector('#custom');
const resetBtn = document.querySelector('.reset');
const calculatedTip = document.querySelector('.tip-amount .calculated-price');
const totalAmount = document.querySelector('.total .calculated-price');

// Wnen input is out of focus (listen to a change in an input field), destructure target to get the name and value of the input the current input.
// After that call validate and pass input, name, value, and input's index.
   inputs.forEach((input, idx) => {
    input.addEventListener('change', ({target}) => { // target is also being destructred from (e). {target} instead of e.target.
        const {name, value} = target;
      
        validate(input, name, value, idx);
    });
   });

// Loop through the tip buttons of type button because since values are not being inputted, the values will
// be gotten from listening to a click and so addEventListener (click) will be used instead of 'change/ input'.
// After  that destructure the name and value of the input button that was clicked from target. And call clearCustomTip.
    for(let tip of tips){
        if(tip.type !== 'text'){
            tip.addEventListener('click', ({target}) => {
                const {name, value} = target;
                clearCustomTip(name, value); // arguments - name and value of the tip button are being passed into clearCustomTip function for it to be
                // used inside the function (since the clearCustomTip is outside this finction).
        })
        }
    }  

// This only runs if/when the tip button is clicked.
// This function checks if the custom tip input field is empty, if not it clears the custom input field and stores the value of the clicked button. 
// It then call the function calculate().
// Else - if the custom input is already empty, it simply stores the value of the clicked button and calls calculate().
const clearCustomTip = (name, value) => { // parameters for arguments to be passed through
    if(customTip.value !== ''){ // is there a value in the input field?
        customTip.value = ''; // if yes, clear it.
            formData[name] = value; // store the name and value of the clicked button's value inside the object formData.
             calculate(); // call this function.
       }
       else{
        formData[name] = value; // if it is already clear, simply simply store the value of the clicked button.
        calculate(); //  call calculate().
       }
   }

   // This function checks if the input values are valid for calculation, if not, it returns an error message, else it clears
   // the error message for the current input field if it exists (clearMessage()) and stores the input value and calls calculate().
   const validate = (input, name, value, idx) => { // parameters are used for arguments - each input's name, value, and index number- to be used
    messages.forEach((message, messIdx) => { // loop through the messages on the HTML page. For each message/ check each message,
    if(isNaN(value) || value == '0'){ // if the value inputted in any of the input fields is either not a number or is 0,
        
            if(messIdx === idx) { // and if the index for the error message and input field that are affected are the same, 
                message.innerText = 'Must be a number and can`t be zero.' // print the error message in the HTML content,
                message.classList.remove('message'); // remove the class .message which is styled display:none,
                input.classList.add('input-message'); // add this class which styles the border of the input field red.
            }
        }
        else{ // if the inputted values are valid,
              clearMessage(message, messIdx, idx); // clear error message of the current input field
            formData[name] = value;       // store the input name and value 
         calculate(); 
        }
    })   
};

//This clears the error message of the current/ target input field if there's any and if inputted values are valid.
   const clearMessage = (message, messIdx, idx) => {
        if(messIdx === idx && message.innerText !== '')  {// if the index for the current input field and an error message (in the HTML page) are the same,
            message.innerText = ''; // clear the error message,
            message.classList.add('message'); // hide the .message element on the web page. .message displays none.
            for(let input of inputs){ // for each input,
                input.classList.remove('input-message'); //remove the class with style of red border.
            }
        }
   }

// This calculates the final value of tip and final amount to be paid per person after tip is added.
const calculate = () => {
    const {bill, tips, people} = formData; // destructure formData to access the values of bill, tips, and people.
    if(bill && tips && people !== undefined || null) { // if  bill, tips, and people are defined or not null/ if they have all been added into formData,
        const tipAmount = ((bill * (tips/100))) / people; //calcualte tip amount per person with  their values
        calculatedTip.innerText = `$${Math.round((tipAmount + Number.EPSILON) * 100)/100}`; // input the calculated value into the HTML element for calculated tip.

        // calculate the total amount that each person will pay.
        const billPerPerson = bill / people;
        const total = billPerPerson + tipAmount;
        totalAmount.innerText = `$${Math.round((total + Number.EPSILON) * 100)/100}`; // round the final amount to 2 decimal places.
    }
    // This else statement is unnecessary as it would not be dispaly on the webpage. This was added for personal purposes, to
    // ensure that the correct values were being added to the formData while this app was being built.
    else{ //else, if bill, tips, and people are undefined or null/ if they do not exist/ have not been added in/into formData,
        console.log(formData); // do this
    }
}

// This resets everything on the webpage.
resetBtn.addEventListener('click', () => { // When the reset button is clicked,
    inputs.forEach((input, idx) => {// for each class of input 
        input.value = ''; // clear the input value
        messages.forEach((message, messIdx) => { // check every error message,
            clearMessage(message, messIdx, idx); // and clear each one.
        })               
    })
    // reset the textContent for the calculated elements on the webpage (visible in the HTML page) to $0.00.
    calculatedTip.textContent = '$0.00'; 
    totalAmount.textContent = '$0.00';
});
