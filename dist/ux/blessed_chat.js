"use strict";
// import blessed from 'blessed';
Object.defineProperty(exports, "__esModule", { value: true });
// // Create a screen object.
// const screen = blessed.screen({
//   smartCSR: true
// });
// // Create a box for the chat output.
// const outputBox = blessed.box({
//   top: '0',
//   left: '0',
//   width: '20%',
//   height: '90%',
//   content: '',
//   tags: true,
//   scrollable: true,
//   scrollbar: {
//     ch: ' '
//   },
//   style: {
//     fg: 'white',
//     bg: 'black'
//   }
// });
// // Create a box for the input.
// const inputBox = blessed.textbox({
//   bottom: '0',
//   left: '0',
//   width: '20%',
//   height: '10%',
//   inputOnFocus: true,
//   style: {
//     fg: 'white',
//     bg: 'black'
//   }
// });
// // Create a box for the chat output.
// const rightTop = blessed.box({
//   top: '0',
//   left: '20%',
//   width: '75%',
//   height: '45%',
//   content: '',
//   tags: true,
//   scrollable: true,
//   scrollbar: {
//     ch: ' '
//   },
//   style: {
//     fg: 'white',
//     bg: 'gray'
//   }
// });
// // Create a box for the input.
// const rightBottom = blessed.textbox({
//   top: '55%',
//   left: '25%',
//   width: '75%',
//   height: '45%',
//   content: '',
//   tags: true,
//   scrollable: true,
//   scrollbar: {
//     ch: ' '
//   },
//   style: {
//     fg: 'white',
//     bg: 'gray'
//   }
// });
// // Append our boxes to the screen.
// screen.append(outputBox);
// screen.append(inputBox);
// screen.append(rightTop);
// screen.append(rightBottom);
// // Handle submitting messages.
// // inputBox.key('enter', function() {
//   const message = inputBox.getValue();
//   outputBox.insertBottom(message);
//   screen.render();
//   inputBox.clearValue();
//   inputBox.focus();
// });
// // Quit on Escape, q, or Control-C.
// screen.key(['escape', 'q', 'C-c'], function(ch, key) {
//   return process.exit(0);
// });
// // Focus the input box.
// inputBox.focus();
// // Render the screen.
// screen.render();
//# sourceMappingURL=blessed_chat.js.map