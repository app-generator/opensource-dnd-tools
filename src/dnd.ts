export function hello() {
  console.log('hello');
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