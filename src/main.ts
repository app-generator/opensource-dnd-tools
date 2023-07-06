import './style.css'
//import typescriptLogo from './typescript.svg'
//import viteLogo from '/vite.svg'
//import { setupCounter } from './counter.ts'
import { onDragStart, onDragEnd } from './dnd.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="example-parent">
  <div class="example-origin">
    <div
      id="draggable-1"
      class="example-draggable"
      draggable="true"
    >
      draggable
    </div>
  </div>

  <div
    class="example-dropzone"
  >
    dropzone
  </div>
</div>
`

document.querySelector('#draggable-1')!.addEventListener('dragstart', (event) => { onDragStart( event ) });
document.querySelector('#draggable-1')!.addEventListener('dragend'  , (event) => { onDragEnd( event ) });
