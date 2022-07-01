import { utilsService } from './note-utils.js'
import { storageService } from './note-storage.js'

export const keepService = {
    getNotes,
    createNote,
    updateNote,
    removeTodo,
    removeNote,
    duplicateNote,
    changeNoteColorBgc,
    toggleNotePinned
}

const NOTE_KEY = 'notesDB'
const gNotes = utilsService.loadFromStorage(NOTE_KEY) || _createExampleNotes()

function getNotes() {
    return storageService.query(NOTE_KEY)
}

function createNote(noteInfo) {
    const note = {
        id: utilsService.makeId(),
        type: noteInfo.type,
        noteType: noteInfo.noteType,
        isPinned: noteInfo.isPinned,
        info: {
            title: noteInfo.info.title,
            txt: noteInfo.info.txt,
            img: noteInfo.info.img,
            video: noteInfo.info.video,
            todos: noteInfo.info.todos,
        },
        style: {
            backgroundColor: '#FFFFFF',
        }
    }
    gNotes.unshift(note)
    utilsService.saveToStorage(NOTE_KEY, gNotes)
    return Promise.resolve()
}

function updateNote(note) {
    storageService.put(NOTE_KEY, note)
}

function removeTodo(note, todoIdx) {
    note.info.todos.splice(todoIdx, 1)
    storageService.put(NOTE_KEY, note)
    return Promise.resolve()
}

function removeNote(id) {
    storageService.remove(NOTE_KEY, id)
    return Promise.resolve()
}

function duplicateNote(note) {
    storageService.post(NOTE_KEY, note)
    return Promise.resolve()

}

function changeNoteColorBgc(note, color) {
    return storageService.get(NOTE_KEY, note.id).then((note) => {
        let newNote = JSON.parse(JSON.stringify(note))
        newNote.style.backgroundColor = '#' + color
        storageService.put(NOTE_KEY, newNote)
        return newNote
    })
}

function toggleNotePinned(note) {
    return storageService.get(NOTE_KEY, note.id).then((note) => {
        let newNote = JSON.parse(JSON.stringify(note))
        newNote.isPinned = !newNote.isPinned
        storageService.put(NOTE_KEY, newNote)
        return newNote
    })
}

function _createExampleNotes() {
    const notes = [{
            id: utilsService.makeId(),
            type: 'noteText',
            noteType: 'txt',
            isPinned: true,
            info: {
                title: 'First Note',
                txt: 'Hi everyone!'
            },
            style: {
                backgroundColor: '#f28b82',
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteImg',
            noteType: 'txt',
            isPinned: false,
            info: {
                title: '',
                img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            },
            style: {
                backgroundColor: '#fbbc04',
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteTodos',
            noteType: 'todos',
            isPinned: false,
            info: {
                title: 'Apps:',
                todos: [
                    { txt: 'Mail', isComplete: true, doneAt: null },
                    { txt: 'Keep', isComplete: false, doneAt: 187111111 },
                    { txt: 'Book', isComplete: false, doneAt: 187111 }
                ]
            },
            style: {
                backgroundColor: '#fff475'
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteImg',
            noteType: 'txt',
            isPinned: false,
            info: {
                title: 'Awesome',
                img: 'https://images.unsplash.com/photo-1626025437642-0b05076ca301?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=534&q=80'
            },
            style: {
                backgroundColor: '#a7ffeb',
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteImg',
            noteType: 'txt',
            isPinned: false,
            info: {
                title: '',
                img: 'https://media1.giphy.com/media/QpVUMRUJGokfqXyfa1/200.gif'
            },
            style: {
                backgroundColor: '#cbf0f8',
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteImg',
            noteType: 'txt',
            isPinned: false,
            info: {
                title: '',
                img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            },
            style: {
                backgroundColor: '#d7aefb',
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteTodos',
            noteType: 'todos',
            isPinned: false,
            info: {
                title: 'groceries:',
                todos: [
                    { txt: 'milk', isComplete: true, doneAt: null },
                    { txt: 'toothpaste', isComplete: false, doneAt: 187111111 },
                    { txt: 'bamba', isComplete: false, doneAt: 187111 }
                ]
            },
            style: {
                backgroundColor: '#aecbfa'
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteImg',
            noteType: 'txt',
            isPinned: true,
            info: {
                title: 'Why?',
                img: 'https://media.wired.com/photos/59326d5344db296121d6aee9/master/pass/8552.gif'
            },
            style: {
                backgroundColor: '#e8eaed',
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteImg',
            noteType: 'txt',
            isPinned: false,
            info: {
                title: 'Cool',
                img: 'https://c.tenor.com/kqixRX0zKOcAAAAd/cool.gif'
            },
            style: {
                backgroundColor: '#aecbfa',
            }
        },

    ]
    utilsService.saveToStorage(NOTE_KEY, notes)
    return notes
}