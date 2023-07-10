export function uuidv4() {
    return 'uuid' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function onDragStart(event: any) {
    console.log(' > onDrag_START() ');

    event
        .dataTransfer
        .setData('text/plain', event.target.id);

    event
        .currentTarget
        .style
        .backgroundColor = 'yellow';
}

export function onDragEnd(event: any) {
    
    console.log(' > onDrag_END() ');

    let elems = document.getElementsByClassName('dotted-border');

    for (let i = 0; i < elems.length; i++) {
        elems[i].classList.remove('dotted-border');
    } 
        
    event
        .dataTransfer
        .setData('text/plain', event.target.id);

    event
        .currentTarget
        .style
        .backgroundColor = '#4AAE9B';
}

export function onDragOver(event: any) {

    console.log(' > onDrag_OVER() ');

    event.target.classList.add('dotted-border');
    event.preventDefault();
}

export function onDrop(event: any) {

    console.log(' > on_DROP() ');

    const id = event.dataTransfer.getData('text');
    
    console.log(' > CONTAINER: ' + event.target.id );
    console.log(' > Component: ' + event.target.id );

    let editableComponent = <HTMLElement>document.getElementById(id)!.cloneNode(true);

    console.log(' > CONTAINER: ' + event.target.id );
    console.log(' > Component: ' + editableComponent.dataset.type );
    
    // Customization
    editableComponent.id = uuidv4();
    //editableComponent.innerHTML += editableComponent.id;
    editableComponent.classList.remove( 'draggable' );
    editableComponent.classList.add( 'component' );
    editableComponent.removeAttribute('draggable');    

    // Make the component editable 
    editableComponent.addEventListener('click', (event) => { onClick( event ); });

    // Inject component in the builder
    //const dropzone = <HTMLElement>document.querySelector('#dropzone');
    //dropzone.appendChild(editableComponent);
    event.target.appendChild(editableComponent);

    // Done with this event
    event.dataTransfer.clearData();
}

export function onClick(event: any) {

    if ( !event.target.classList.contains("component") ) {
        return;
    }
    
    console.log(' > ACTIVE Component: ' + event.target.id);

    // Remove previous 
    remClassProcessor('border-dotted');

    // Update CSS
    event.target.classList.add('border-dotted');

    // In place edit
    //event.target.contentEditable = 'true';

    // Bind Quil'
    //var quill = new Quill( event.target, {});

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

export function remClassProcessor(aClass: string) {
    
    let elems = document.getElementsByClassName( aClass );

    if ( elems ) {
        for (let i = 0; i < elems.length; i++) {
            elems[i].classList.remove( aClass );
        }    
    }        
}
