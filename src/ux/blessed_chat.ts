import blessed from 'blessed';

// Create a screen object.
const screen = blessed.screen({
  smartCSR: true
});

// Create a box for the chat output.
const outputBox = blessed.box({
  top: '0',
  left: '0',
  width: '100%',
  height: '90%',
  content: '',
  tags: true,
  scrollable: true,
  scrollbar: {
    ch: ' '
  },
  style: {
    fg: 'white',
    bg: 'black'
  }
});

// Create a box for the input.
const inputBox = blessed.textbox({
  bottom: '0',
  left: '0',
  width: '100%',
  height: '10%',
  inputOnFocus: true,
  style: {
    fg: 'white',
    bg: 'black'
  }
});

// Append our boxes to the screen.
screen.append(outputBox);
screen.append(inputBox);

// Handle submitting messages.
inputBox.key('enter', function() {
  const message = inputBox.getValue();
  outputBox.insertBottom(message);
  screen.render();
  inputBox.clearValue();
  inputBox.focus();
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Focus the input box.
inputBox.focus();

// Render the screen.
screen.render();