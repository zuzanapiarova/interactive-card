const form = document.querySelector('form');
const inputs = [...document.querySelectorAll('input')];
const submitButton = document.querySelector('input[type="submit"]');

const cardholder = document.querySelector('input[name="cardholder-name"]');
const cardNumber = document.querySelector('input[name="card-number"]');
const expiryMM = document.querySelector('input[name="expiry-date-MM"]');
const expiryYY = document.querySelector('input[name="expiry-date-YY"]');
const cvc = document.querySelector('input[name="cvc"]');

const cardholderInteractive = document.querySelector('.card-cardholder');
const cardNumberInteractive = document.querySelector('.card-card-number');
const mmInteractive = document.querySelector('.card-expiry-date-MM');
const yyInteractive = document.querySelector('.card-expiry-date-YY');
const cvcInteractive = document.querySelector('.card-cvc');

// render details on the card in real time -- COMPLETE
function setInteractiveDetails(e){
    let interactiveElement;

    if(this == cardholder){
        interactiveElement = cardholderInteractive
    } else if(this == cardNumber){
        interactiveElement = cardNumberInteractive;
        let regex1 = /(\d{4} ?)(\d{4} ?)(\d{4} ?)(\d{4})/; // /(?=(?:\d{4})+(?:\.|$))/g;  //this formats the number from the back, not working well
        this.value = this.value.replace(regex1, '$1 $2 $3 $4');
    } else if(this == expiryMM){
        interactiveElement = mmInteractive
    } else if(this == expiryYY){
        interactiveElement = yyInteractive
    } else if(this == cvc){
        interactiveElement = cvcInteractive
    }

    if(this.value.trim() == ''){
        interactiveElement.textContent = this.placeholder;
    } else {
        interactiveElement.textContent = this.value;
    }
}

//handle empty inputs and correct formatting
function setError(element, message){
    const parentEl = element.parentElement;
    const errorMessage = parentEl.querySelector('.alert-message');
    //console.log(element) 

    parentEl.classList.remove('success');
    parentEl.classList.add('error');
    errorMessage.textContent = message;
}

// handling successful inputs
function setSuccess(element){
    const parentEl = element.parentElement;
    const errorMessage = parentEl.querySelector('.alert-message'); 

    parentEl.classList.remove('error');
    parentEl.classList.add('success');
    errorMessage.textContent = '';
}

// check if inputs are not empty and are in required formats
function checkInputs(){

    inputs.forEach(input => {
        let regex;
        let string = this.value;
        console.log(this.pattern)
        //regex = this.pattern;
        if( this == cardholder){
            //regex = /[^a-zA-Z ]/giu; // does not allow umlauts and special letters etc
            regex = /[^\p{Letter} {1}]/giu; //allows all letter characters from many languages
        } else if(this == cardNumber){
            regex = /[^0-9]/gi;
        } else if(this == expiryMM || this == expiryYY){
            regex = /[^0-9]/gi;
        } else if(this == cvc){
            regex = /[^0-9]/gi;
        };
        this.value = string.replace(regex, '');

        if(this.value.trim() == ''){ 
            setError(this, 'Cannot be empty')
        } else {
            setSuccess(this);
        };
    })
}

function checkForm(){
    //same logic than checkInputs, but takes in different parameters
    inputs.forEach(input => {
        //different error messages depending on whats wrong with inputs
        if(input.value.trim() == ''){ 
            setError(input, 'Cannot be empty')
        } else if (input == cardholder && !input.value.match(input.pattern)){
            setError(input, 'Must contain only letters')

        } else if ( input == cardNumber && !input.value.match(input.pattern)) {
            setError(input, 'Must be in format xxxx xxxx xxxx xxxx')

        } else if ( input == expiryMM && !input.value.match(/[0-9]{2}/)) {
            setError(input, 'Must be in format MM YY')
        } else if ( input == expiryMM && !input.value.match(input.pattern)){
            setError(input, 'Must be a correct month')

        } else if ( input == expiryYY && !input.value.match(input.pattern)) {
            setError(input, 'Must be in format MM YY')

        } else if ( input == cvc && !input.value.match(input.pattern)) {
            setError(input, 'Must be in format xxx')
        };
    })
}

function submitForm(e){
    e.preventDefault();
    checkForm();
    const isAllOK = form.reportValidity(); //reportValidity() returns true if all html required fields and html conditions are OK

    if(isAllOK){
        document.querySelector('.form-container').style.display = 'none';
        document.querySelector('.thank-container').style.display = 'flex';
    } 
}

// event listeners 
inputs.forEach(input => input.addEventListener('input', checkInputs));
inputs.forEach(input => input.addEventListener('invalid', (e) => e.preventDefault())); // prevent default browser error messages
inputs.forEach(input => input.addEventListener('input', setInteractiveDetails));
form.addEventListener('submit', submitForm);


//add: date message in mm is > 12
//add next: add automatic formatting right as user types
//change: move between input fields with arrows/enter