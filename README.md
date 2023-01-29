# Frontend Mentor - Interactive card details form solution
This is a solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

### My solution
- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

So far my most challenging project. Any feedback is welcome!

!!! NOTE - as this project is working with sensitive information, if this project was real-life, I would use some PCI compliant API for handling credit card information, but my solution is for practice, and I learned a lot about regex in this challenge (also as of now I have no experience with APIs yet)

# Challenge:
Users should be able to:
- Fill in the form and see the card details update in real-time
- Receive error messages when the form is submitted if:
  - Any input field is empty
  - The card number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page

# I added
- its not possible for the user to type numbers in cardholder name input, and letters in card number, date and cvc inputs
- if month is not between 1-12 error message will pop up saying 'Must be a valid month'
- all letter characters from different languages are allowed, like umlauts, íéôšč etc.

### Built with
- Semantic HTML5 markup
- CSS custom properties
- css flexbox
- Vanilla Javascript
- regular expressions

### What I learned and practiced in this project: 
- practiced using this keyword
- practiced forEach loop
- learned regex for this exercise
- learned new things for form validations: 
    a. method .reportValidity() - returns true if all constraints for a field in html are fulfilled;
    b. pattern html attribute - matches the input to a regex expression, does not work with type number - use type text instead;
    --> when there is a pattern attribute on an input and .reportValidity() on that input, form won't submit if the input does not match the pattern (and other html form validations)
    c. prevent default browser error messages: inputs.forEach(input => input.addEventListener('invalid', (e) => e.preventDefault()));
    d. pattern for all letter characters, even special ones: pattern="(\p{L} ?)*", or in regex regex = /[^\p{Letter} {1}]/giu - include flag u for unicode

## What I need to work on
1. The date is two fields but when one is incorrect, both have error border and message because their parent has an error class
2. Functions checkInputs() and checkForm() have basically the same functionality, but they fire on different events with different targets - checkInputs() fires on key-up events on input elements, checkForm() fires on submit on form element, so 'this' keyword from checkInputs() means something different when fired on form, and the logic can no be used. I tried to combine this logic into one function but unsuccessfully, does anyone have any idea how to do it? Thanks for the help.
3. I feel like I used a lot of divs in my HTML, but I like using flexbox in css and I could not reduce the divs if I wanted to keep the layout. Are there any downsides of using a lot of divs, like slow load times etc?

## what could be added
- check if the date is in future
- check if the card number is indeed valid card using the Luhn algorithm
- allow for card types that have different formats - like AMEX, that has 15 digit card number and 4 digit cvc
- automatic formatting(masking) the credit card number with a space after every 4 digits, now it happens only after the whole number is typed in - I know it can be done with Vue but I do not have knowledge of it yet
