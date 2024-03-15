"use strict";
// import blessed from 'blessed';
Object.defineProperty(exports, "__esModule", { value: true });
// // Sample tree data
// interface TreeNode {
//     label: string;
//     nodes?: TreeNode[];
//     expanded?: boolean;
// }
// const treeData: TreeNode = {
//     label: 'Root',
//     nodes: [
//         {
//             label: 'Node 1',
//             expanded: true,
//             nodes: [
//                 { label: 'Node 1.1' },
//                 { label: 'Node 1.2' }
//             ]
//         },
//         {
//             label: 'Node 2',
//             nodes: [
//                 { label: 'Node 2.1' },
//                 { label: 'Node 2.2' }
//             ]
//         }
//     ]
// };
// // Recursive function to render tree nodes
// function renderTreeNodes(parentNode: blessed.Widgets.BoxElement, data: TreeNode[], level: number) {
//     data.forEach(nodeData => {
//         const node = blessed.box({
//             parent: parentNode,
//             content: `${'  '.repeat(level)}${nodeData.label}`,
//             top: level,
//             left: 0,
//             height: 1,
//             width: '100%',
//             style: {
//                 fg: 'white'
//             }
//         });
//         if (nodeData.nodes && nodeData.expanded) {
//             renderTreeNodes(node, nodeData.nodes, level + 1);
//         }
//         node.on('click', () => {
//             if (nodeData.nodes) {
//                 nodeData.expanded = !nodeData.expanded;
//                 if (nodeData.expanded) {
//                     // If expanded, render child nodes
//                     renderTreeNodes(node, nodeData.nodes, level + 1);
//                 } else {
//                     // If collapsed, remove child nodes
//                     node.children.forEach(child => child.detach());
//                     screen.render();
//                 }
//             }
//         });
//     });
// }
// // Create a screen
// const screen = blessed.screen({
//     smartCSR: true,
// });
// // Create a container for the tree
// const treeContainer = blessed.box({
//     parent: screen,
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     scrollable: true,
// });
// // Render the tree
// renderTreeNodes(treeContainer, treeData.nodes!, 0);
// // Handle keypresses
// screen.key(['escape', 'q', 'C-c'], function(ch, key) {
//     return process.exit(0);
// });
// // Render the screen
// screen.render();
//# sourceMappingURL=blessed_tree.js.map