export function uuidv4() {
    return 'uuid' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function onDragStart(event: any) {
event
    .dataTransfer
    .setData('text/plain', event.target.id);

event
    .currentTarget
    .style
    .backgroundColor = 'yellow';
}

export function onDragEnd(event: any) {
event
    .dataTransfer
    .setData('text/plain', event.target.id);

event
    .currentTarget
    .style
    .backgroundColor = '#4AAE9B';
}

export function onDragOver(event: any) {
    console.log(' > element dragged over ');
    event.preventDefault();
}

export function onDrop(event: any) {

    event;

    console.log(' > element dropped ');
    const id = event.dataTransfer.getData('text');
    
    let elementCopy = <HTMLElement>document.getElementById(id)!.cloneNode(true);
    
    // Customization
    elementCopy.id = uuidv4();
    elementCopy.innerHTML += elementCopy.id;

    // Make the component editable 
    elementCopy.addEventListener('click', (event) => { onClick( event ); });

    // Inject component in the builder
    const dropzone = <HTMLElement>document.querySelector('#dropzone');
    dropzone.appendChild(elementCopy);
    
    // Done with this event
    event.dataTransfer.clearData();
}

export function onClick(event: any) {

    event;

    // In place edit
    //event.target.contentEditable = 'true';

    let propsPanel_title   = <HTMLElement>document.querySelector('#builder-props-title'  );
    let propsPanel_content = <HTMLElement>document.querySelector('#builder-props-content');

    propsPanel_title.innerHTML = 'Props for ' + event.target.id;

    propsPanel_content.innerHTML = '<input id="props_text" data-target="'+event.target.id+'" value="' + event.target.innerHTML + '" />';

    let propsPanel_input = <HTMLElement>document.querySelector('input#props_text'  );
    propsPanel_input.addEventListener('keyup', (event) => { onKeyUp( event ); });

    event.preventDefault();
}

export function onKeyUp(event: any) {
    event;
    //if (event.key === 'Enter' || event.keyCode === 13) {
        const target_id = event.target.dataset.target;
        //console.log(' > Save TEXT for ' + target_id);

        let activeComponent = document.querySelector( '#' + target_id );
        if (activeComponent) {
            activeComponent.innerHTML = event.target.value;
        } else {
            console.log( ' > NULL target:' + target_id );
        }
    //}    
}

export function onClear(event: any) {
    event;
    console.log( ' > ACTION: clear');
    let content = <HTMLElement>document.querySelector('#dropzone');
    // clear
    content.innerHTML = 'dropzone';
    window.localStorage.clear();
    //let builderContainer = document.querySelector('#layout')!.innerHTML;
    //document.querySelector<HTMLDivElement>('#app')!.innerHTML = builderContainer;    
}

export function onSave(event: any) {
    event;
    console.log( ' > ACTION: save');
    let content = <HTMLElement>document.querySelector('#dropzone');
    window.localStorage.setItem("editME", content.innerHTML);
}

export function onRestore(event: any) {
    event;
    console.log( ' > ACTION: restore');
    let content = <HTMLElement>document.querySelector('#dropzone');

    let saved_content = <string>window.localStorage.getItem("editME");

    // Check that we have data to restore
    if ( !saved_content ) {
        return; 
    }
 
    // update
    content.innerHTML = saved_content; 

    let elems = content.getElementsByClassName("draggable");
    
    if ( elems ) {
        //console.log(' > LEN: ' + elems.length );

        for (let i = 0; i < elems.length; i++) {
            elems[i].addEventListener('click', (event) => { onClick( event ) });
        }    
    } else {
        console.log(' > NULL ELEMs ');
    }
}

