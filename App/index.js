class NoteView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteDelete, onNoteEdit } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteDelete = onNoteDelete;
        this.onNoteEdit = onNoteEdit;
        this.root.innerHTML = `
             <div class="nav bg-white">
                <button class="nav-box bg-red notes__del"></button>
                <button class="nav-box bg-yellow toggle-btn"></button>
                <button class="nav-box bg-green notes__add"></button>
            </div>
            <div class="notes bg-white" >
                <div class="notes__sidebar " id="sidebar">
                    <div class="notes__list">
                        <div class="notes__list-item notes__list-item--selected ">
                        </div>
                    </div>
                </div>
                <div class="notes__preview">
                    <input type="text" class="notes__title" placeholder="New Note...">
                    <textarea class="notes__body">Take Note...</textarea>
                </div>
            </div>
        `;

        const btnAdd = this.root.querySelector(".notes__add")
        const btnDel = this.root.querySelector(".notes__del")
        const inpTitle = this.root.querySelector(".notes__title")
        const inpBody = this.root.querySelector(".notes__body")


        btnAdd.addEventListener("click", () => {
            this.onNoteAdd();
        });

    }
    
}

// TOOGLE SIDE BAR
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
    if (existing) {
        existing.title = noteToSave.title;
        existing.body = noteToSave.body;
        existing.updated = new Date().toISOString();
    } else {
        noteToSave.id = Math.floor(Math.random() * 1000000);
        noteToSave.updated = new Date().toISOString();
        notes.push(noteToSave);
    }

    localStorage.setItem("notesapp-notes", JSON.stringify(notes));
}

function deleteNote(id) {
    const notes = getAllNotes();
    const newNote = notes.filter((note) => note.id != id);
    localStorage.setItem("notesapp-notes", JSON.stringify(newNote));
}


function render() {
    const app = document.getElementById("app");
    const view = new NoteView(app, {
        onNoteSelect() {
            console.log("note selected");
        },
        onNoteAdd() {
            console.log("Let's add a new note");
        },
        onNoteDelete() {
            console.log("note deleted succes");
        },
        onNoteEdit(newTitle, newBody) {
            console.log(newTitle);
            console.log(newBody);
        }
    });
}
render()
