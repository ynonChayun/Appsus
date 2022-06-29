import { utilsService } from './note-utils.js'
import { storageService } from './note-storage.js'

export const keepService = {
    getNotes,
}

const NOTE_KEY = 'notesDB'
const gNotes = utilsService.loadFromStorage(NOTE_KEY) || _createExampleNotes()

function getNotes() {
    return storageService.query(NOTE_KEY)
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
                backgroundColor: '#FFFFFF',
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteImg',
            noteType: 'txt',
            isPinned: false,
            info: {
                title: 'Third Note',
                img: 'https://images.unsplash.com/photo-1656380605767-28a92b240053?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80'
            },
            style: {
                backgroundColor: '#FFFFFF',
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
                backgroundColor: '#aaffee'
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteImg',
            noteType: 'txt',
            isPinned: false,
            info: {
                title: 'Third Note',
                img: 'https://images.unsplash.com/photo-1656380605767-28a92b240053?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80'
            },
            style: {
                backgroundColor: '#FFFFFF',
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
                backgroundColor: '#aaffee'
            }
        },
        {
            id: utilsService.makeId(),
            type: 'noteImg',
            noteType: 'txt',
            isPinned: false,
            info: {
                title: 'Third Note',
                img: 'https://images.unsplash.com/photo-1656380605767-28a92b240053?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80'
            },
            style: {
                backgroundColor: '#FFFFFF',
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
                backgroundColor: '#aaffee'
            }
        },

    ]
    utilsService.saveToStorage(NOTE_KEY, notes)
    return notes
}