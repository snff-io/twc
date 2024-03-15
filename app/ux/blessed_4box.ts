// import * as blessed from 'blessed';
// import * as contrib from 'blessed-contrib';

// // Create a screen object.
// const screen = blessed.screen();

// // Create a grid layout
// const grid = new contrib.grid({ rows: 8, cols: 9, screen: screen });

// // Define the size of each cell
// const inputWidth = '20%';
// const inputHeight = '20%';
// const outputWidth = '20%';
// const outputHeight = '80%';

// // Quit on Escape, q, or Control-C.
// screen.key(['C-q',], function(ch, key) {
  
//     return process.exit(0);
// });

// // Create input text area
// const input = grid.set(7, 0, 8, 2, blessed.textarea, {
//     label: 'Input',
//     keys: true,
//     mouse: true,
//     inputOnFocus: true,
//     width: inputWidth,
//     height: inputHeight,

//     style: { fg: 'white', bg: 'black' }
// }) as blessed.Widgets.TextareaElement;

// // Create output text area
// const output = grid.set(0, 0, 7, 2, blessed.box, {
//     label: 'Output',
//     width: outputWidth,
//     height: outputHeight,
//     style: { fg: 'white', bg: 'black' }
// });

// // Create top-right box
// const rightTop = grid.set(0, 2, 4, 8, blessed.box, {
//     label: 'Right Top',
//     width: `${100 - parseFloat(inputWidth)}%`,
//     height: `${(100 - parseFloat(inputHeight)) / 2}%`,
//     style: { fg: 'white', bg: 'black' }
// });

// // Create bottom-right box
// const rightBottom = grid.set(4, 2, 8, 8, blessed.box, {
//     label: 'Right Bottom',
//     width: `${100 - parseFloat(inputWidth)}%`,
//     height: `${(100 - parseFloat(inputHeight)) / 2}%`,
//     style: { fg: 'white', bg: 'black' }
// });


// // Focus on input on startup
// input.focus();

// // Render the screen
// screen.render();


