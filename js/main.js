//worked with Maureen and Shawn

document.getElementById('palindromeForm').addEventListener('submit', function (e) {
  // Prevent the page from reloading
  e.preventDefault();

  // Get the text the user typed in
  const text = document.getElementById('textInput').value;

  // Send that text to the server via a GET request
  fetch(`/api?text=${encodeURIComponent(text)}`)
    // Convert the server response to JSON
    .then(res => res.json())
    //parse response as JSON
    .then(data => {
      if (data.palindrome) {
        console.log(`O "${data.text}" is a palindrome!`);
      } else {
        console.log(`X "${data.text}" is NOT a palindrome.`);
      }
    })
    // errors that might happen
    .catch(error => {
      console.error('Error:', error);
    });
});
