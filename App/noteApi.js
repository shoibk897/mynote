export default class NoteApi {
    static getAllNotes() {
        const note = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
        
    }

    static saveNote(noteToSave){

    }

    static deleteNote(id){

    }
}