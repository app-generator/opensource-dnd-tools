import './style.css'
import { onDragStart, onDragEnd, onDragOver, onDrop, onClick, onClear, onSave, onRestore } from './dnd.ts'

let builderContainer = document.querySelector('#layout')!.innerHTML;
document.querySelector<HTMLDivElement>('#app')!.innerHTML = builderContainer;

document.querySelector('#draggable')!.addEventListener('dragstart', (event) => { onDragStart( event )    });
document.querySelector('#draggable')!.addEventListener('dragend'  , (event) => { onDragEnd  ( event )    });
document.querySelector('#draggable')!.addEventListener('click'    , (event) => { onClick    ( event )    });

document.querySelector('#dropzone')!.addEventListener('dragover', (event) => { onDragOver( event ) });
document.querySelector('#dropzone')!.addEventListener('drop'    , (event) => { onDrop    ( event ) });

document.querySelector('#action_clear')!.addEventListener('click'   , (event) => { onClear   ( event )    });
document.querySelector('#action_save')!.addEventListener('click'    , (event) => { onSave    ( event )    });
document.querySelector('#action_restore')!.addEventListener('click' , (event) => { onRestore ( event )    });