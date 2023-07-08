import './style.css'
import { onDragStart, onDragEnd, onDragOver, onDrop, onClick } from './dnd.ts'

let builderContainer = document.querySelector('#layout')!.innerHTML;
document.querySelector<HTMLDivElement>('#app')!.innerHTML = builderContainer;

document.querySelector('#draggable-1')!.addEventListener('dragstart', (event) => { onDragStart( event )    });
document.querySelector('#draggable-1')!.addEventListener('dragend'  , (event) => { onDragEnd  ( event )    });
document.querySelector('#draggable-1')!.addEventListener('click'    , (event) => { onClick    ( event )    });

document.querySelector('#example-dropzone')!.addEventListener('dragover', (event) => { onDragOver( event ) });
document.querySelector('#example-dropzone')!.addEventListener('drop'    , (event) => { onDrop    ( event ) });
