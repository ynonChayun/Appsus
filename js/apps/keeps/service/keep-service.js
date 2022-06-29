import { utilsService } from './note-utils.js'
import { storageService } from './note-storage.js'

export const keepService = {
    getNotes,
    createNote,
    updateNote,
    removeTodo
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

function _createExampleNotes() {
    const notes = [{
            id: utilsService.makeId(),
            type: 'noteText',
            noteType: 'txt',
            isPinned: false,
            info: {
                title: 'First Note',
                txt: 'Hi everyone!'
            },
            style: {
                backgroundColor: '#b32850',
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteImg',
            noteType: 'txt',
            isPinned: false,
            info: {
                title: 'Third Note',
                img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            },
            style: {
                backgroundColor: '#3b8beb',
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
                backgroundColor: '#e7e3d4'
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteImg',
            noteType: 'txt',
            isPinned: false,
            info: {
                title: 'Third Note',
                img: 'https://images.unsplash.com/photo-1626025437642-0b05076ca301?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=534&q=80'
            },
            style: {
                backgroundColor: '#c4dbf6',
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteImg',
            noteType: 'txt',
            isPinned: false,
            info: {
                title: 'Third Note',
                img: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
            },
            style: {
                backgroundColor: '#41b3a3',
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteImg',
            noteType: 'txt',
            isPinned: false,
            info: {
                title: 'Third Note',
                img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            },
            style: {
                backgroundColor: '#b32850',
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
                backgroundColor: '#3bbeb'
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteImg',
            noteType: 'txt',
            isPinned: false,
            info: {
                title: 'Third Note',
                img: 'https://images.unsplash.com/photo-1626025437642-0b05076ca301?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=534&q=80'
            },
            style: {
                backgroundColor: '#8590aa',
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteImg',
            noteType: 'txt',
            isPinned: false,
            info: {
                title: 'Third Note',
                img: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
            },
            style: {
                backgroundColor: '#c4dbf6',
            }
        },

    ]
    utilsService.saveToStorage(NOTE_KEY, notes)
    return notes
}