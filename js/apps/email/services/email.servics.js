'use strict'
import { utilService } from './utils.servics.js'

export const emailService = {
    _createEmails
}


function _createEmails() {
    utilService.makeLorem()
}

function _createEmail() { 
    return {
        id:utilService.makeId(),
        subject:utilService.makeLorem(2),
        body:utilService.makeLorem(14),
        isRead
    }
}