// Select the form element by its ID and attach a 'submit' event listener
// This will run the function whenever the form is submitted
document.getElementById('palindromeForm').addEventListener('submit', function(e) {
  
  // Prevent the default form submission behavior (page reload)
  e.preventDefault();
  
  // Get the value entered by the user in the text input field
  const text = document.getElementById('textInput').value;

  // Send a GET request to the server API with the text as a query parameter
  fetch(`/api?text=${encodeURIComponent(text)}`)
    
    // Convert the server response to JSON format
    .then(response => response.json())
    
    // Handle the JSON data returned from the server
    .then(data => {
      
      // Select the div where the result will be displayed
      const resultDiv = document.getElementById('result');
      
      // Check the 'palindrome' property from the server response
      // Display a message depending on whether it is a palindrome or not
      if (data.palindrome) {
        resultDiv.textContent = `"${data.text}" is a palindrome!`;
      } else {
        resultDiv.textContent = `"${data.text}" is NOT a palindrome.`;
      }
    });
});
