export function getDroppedFiles(e){
  if (e.dataTransfer.items) {
    return [...e.dataTransfer.items]
    .filter(f => f.kind === 'file' && "audio/mp3")
    .map(f => f.getAsFile());
  } else {
      return e.dataTransfer.files;
  } 
}

export function removeDragData(e) {
  if (e.dataTransfer.items) {
    e.dataTransfer.items.clear();
  } else {
    e.dataTransfer.clearData();
  }
}

export function beautifyfileName(name) {
  return name.substr(0, name.lastIndexOf('.')) || name;
}