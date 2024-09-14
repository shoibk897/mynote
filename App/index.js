


document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebar = document.getElementById('sidebar');

    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
});

function getAllNotes() {
    const note = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
    return note.sort((a, b) => {
        return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
}

function saveNote(noteToSave) {
    const notes = getAllNotes();

    const existing = notes.find((note) => note.id === noteToSave.id)
    //EIDT OR UPDATED
    if(existing){
        existing.tittle = noteToSave.tittle;
        existing.body = noteToSave.body;
        existing.updated = new Date().toISOString();
    } else {
        noteToSave.id = Math.floor(Math.random() * 1000000);
        noteToSave.updated = new Date().toISOString();
        notes.push(noteToSave);
    }

    localStorage.setItem("notesapp-notes",JSON.stringify(notes)); 
}

function deleteNote(id) {
    const notes = getAllNotes();
    const newNote = notes.filter((note) => note.id != id);
    localStorage.setItem("notesapp-notes",JSON.stringify(newNote)); 
}


function render() {

}
render()
