document.addEventListener('DOMContentLoaded', function () {
    var terminalInput = document.getElementById('terminal-input');
    var outputDiv = document.getElementById('output');
    var usernameElement = document.getElementById('username');
    var username = 'taylor@whitewood'; // Default username
  
    // Set default command
    terminalInput.value = 'cat help.md';
  
    terminalInput.addEventListener('keyup', function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        processCommand(terminalInput.value);
        terminalInput.value = '';
      }
    });
  
    function processCommand(command) {
      // Append user command to the output
      var commandElement = document.createElement('p');
      commandElement.textContent = username + ':$ ' + command;
      outputDiv.appendChild(commandElement);
  
      // Process the command
      if (command === 'cat aboutme.md') {
        outputDiv.innerHTML += loadMarkdownFile(`Markdowns/aboutme.md`, `output`);
    
     // } else if (command === 'cat projects.md') {
        outputDiv.innerHTML += loadMarkdownFile(`Markdowns/projects.md`, `output`);
    } else if (command === 'cat contact.md') {
        outputDiv.innerHTML += loadMarkdownFile(`Markdowns/contact.md`, `output`);
    } else if (command === 'clear') {
        clear();
      } else if (command === 'cat help.md') {
        outputDiv.innerHTML += '<p>Commands:</p>';
        outputDiv.innerHTML += '<p>- cat aboutme.md: Displays my about me! .</p>';
        // outputDiv.innerHTML += '<p>- cat projects.md: Shows my projects!.</p>';
        outputDiv.innerHTML += '<p>- cat contact.md: You can contact me here!.</p>';
        
        outputDiv.innerHTML += `<p>- clear : Clears the terminal output.</p>`;
      } else {
        outputDiv.innerHTML += '<p>Invalid command!</p>';
      }
  
      // Scroll to the bottom of the terminal
      outputDiv.scrollTop = outputDiv.scrollHeight;
    }
  
  

  function loadMarkdownFile(filename, targetId) {
    // Fetch the Markdown file
    fetch(filename)
      .then(response => response.text())
      .then(data => {
        // Convert the Markdown to HTML
        const converter = new showdown.Converter();
        const html = converter.makeHtml(data);

        // Display the HTML in the output div
        const targetElement = document.getElementById(targetId);
        targetElement.innerHTML = html;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function clear() {
    const targetElement = document.getElementById('output');
    targetElement.innerHTML = '';
  }

  function cat(message) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML += `${message}<br>`;
  }
})