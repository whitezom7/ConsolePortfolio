document.addEventListener('DOMContentLoaded', function() {
  var terminalInput = document.getElementById('terminal-input');
  var outputDiv = document.getElementById('output');
  var usernameElement = document.getElementById('username');
  var username = 'taylor@whitewood'; // Default username

  // Set default command
  terminalInput.value = 'help';

  terminalInput.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      processCommand(terminalInput.value);
      terminalInput.value = '';
    }
  });

  function processCommand(command) {
    // Append user command to the output
    var commandElement = document.createElement('p');
    commandElement.innerHTML = `<span style="color: green;" id="username">${username}:$</span> ${command}`;
    outputDiv.appendChild(commandElement);

    let userInput = command.toLowerCase();
    // Process the command
      if (userInput === 'cat about.md' || userInput === '-cat about.md') {
        outputDiv.innerHTML += loadMarkdownFile('Markdowns/aboutme.md', 'output');
      } else if (userInput === 'cat contact.md' || userInput === '-cat contact.md') {
        outputDiv.innerHTML += loadMarkdownFile('Markdowns/contact.md', 'output');
      } else if (userInput === 'clear' || userInput === '-clear') {
        clear();
      } else if (userInput === 'cat') {
        showCat();
      } else if (userInput === 'help' || userInput === 'cat help.md' || userInput === '-cat help.md') {
        showHelp();
      } else {
        outputDiv.innerHTML += '<p>Invalid command!</p>';
    }

    // Scroll to the bottom of the terminal
    window.scrollTo(0, document.body.scrollHeight);
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
});

function showHelp() {
  // Access the outputDiv element by its id
  var outputDiv = document.getElementById('output');

  // Create the help content as a single HTML string
  var helpContent = '';
  helpContent += '<p>Commands:</p>';
  helpContent += '<p>- cat about.md: Displays information about me!</p>';
  helpContent += '<p>- cat contact.md: You can contact me here!</p>';
  helpContent += '<p>- clear: Clears the terminal output!</p>';
  helpContent += '<p>- cat: displays a ascii cat image</p>';
  helpContent += '<h2>- Suggest more terminal commands on my <a href="https://github.com/whitezom7/ConsolePortfolio" target="none">github</a></h2>';

  // Append the help content to the outputDiv
  outputDiv.innerHTML += helpContent;
}

function showCat() {
  // Access the outputDiv element by its id
  var outputDiv = document.getElementById('output');

  // Create the cat ASCII art content as a string
  var catContent = '';
  catContent += '<pre>';
  catContent += '      /\\_/\\  \n';
  catContent += '     ( o.o ) \n';
  catContent += '      > ^ <  \n';
  catContent += '</pre>';

  // Append the cat content to the outputDiv
  outputDiv.innerHTML += catContent;
}
