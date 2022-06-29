import { utilsService } from './note-utils.js'
import { storageService } from './note-storage.js'

export const noteService = {
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
            type: 'txt',
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
            type: 'txt',
            isPinned: false,
            info: {
                title: 'Second Note',
                txt: 'By everyone!'
            },
            style: {
                backgroundColor: '#FFFFFF',
            }
        },
        {
            id: utilsService.makeId(),
            type: 'txt',
            isPinned: false,
            info: {
                title: 'Third Note',
                txt: 'Hi again!'
            },
            style: {
                backgroundColor: '#FFFFFF',
            }
        },

    ]
    utilsService.saveToStorage(NOTE_KEY, notes)
    return notes
}