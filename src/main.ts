import './style.css'
import { onDragStart, onDragEnd, onDragOver, onDrop, onClick, onClear, onSave, onRestore } from './dnd.ts'

let builderContainer = document.querySelector('#layout')!.innerHTML;
document.querySelector<HTMLDivElement>('#app')!.innerHTML = builderContainer;

// SETUP Navigation
document.querySelector('#action_clear')!.addEventListener('click'   , (event) => { onClear   ( event ) });
document.querySelector('#action_save')!.addEventListener('click'    , (event) => { onSave    ( event ) });
document.querySelector('#action_restore')!.addEventListener('click' , (event) => { onRestore ( event ) });
document.querySelector('#action_undo')!.addEventListener('click'    , (event) => { onRestore ( event ) });

// SETUP Components
let draggableElems = document.getElementsByClassName('draggable');

for (let i = 0; i < draggableElems.length; i++) {
    draggableElems[i].addEventListener('dragstart', (event) => { onDragStart( event ) });
    draggableElems[i].addEventListener('dragend'  , (event) => { onDragEnd  ( event ) });
    draggableElems[i].addEventListener('click'    , (event) => { onClick    ( event ) });
} 

// SETUP Master DROP Zone
document.querySelector('#dropzone')!.addEventListener('dragover', (event) => { onDragOver( event ) });
document.querySelector('#dropzone')!.addEventListener('drop'    , (event) => { onDrop    ( event ) });

// SETUP GRID Drop Zones
let dropZones = document.getElementsByClassName('dropzone-elem');
for (let i = 0; i < dropZones.length; i++) {
    dropZones[i].addEventListener('dragover', (event) => { onDragOver( event ) });
    dropZones[i].addEventListener('dragend' , (event) => { onDragEnd ( event ) });
    dropZones[i].addEventListener('drop'    , (event) => { onDrop    ( event ) });
}

onRestore( null );


// Initialize Quill editor
var options = {
    theme: 'snow',
};
new Quill('#editor', options);