'use strict'
import { utilService } from './utils.servics.js'
import { storageService } from './email-storage.js'
import { emailFilter } from "../services/emailFilter.service.js"

export const emailService = {
    _createEmails,
    query,
    getEmailsToDisplay,
    toggleMode,
    addComposeEmail,
}

const EMAIL_KEY = 'emailDB'

function toggleMode({ mode, id }) {
    return query().then(emails =>
        storageService.get(EMAIL_KEY, id)
            .then(email => {
                const idx = emails.findIndex(currEmail => currEmail.id === email.id);

                if (mode === 'Trash' && email.status === 'Trash') {
                    emails.splice(idx, 1)
                }
                else {
                    if (mode === 'Trash') {
                        email.status = 'Trash'
                        email.isStared = false
                    } else email.isStared = !email.isStared

                    emails.splice(idx, 1, email)
                }
                storageService.save(EMAIL_KEY, emails)
                return Promise.resolve(emails)
            }))


}

function query() {
    let emails

    return storageService.query(EMAIL_KEY)
        .then(resEmails => {
            if (!resEmails.length) {
                emails = _createEmails()
                storageService.save(EMAIL_KEY, emails)
                return emails
            }
            return resEmails
        })
}

function getEmailsToDisplay() {
    const filter = emailFilter.getFilter()
    console.log(filter);
    return query().then(
        emails => {
            if (filter.status == 'All') return emails
            if (filter.status === 'Starred') return emails.filter(email => email.isStared)
            return emails.filter(email => email.status === filter.status)
        }
    )
}

function _createEmails() {
    let emails = []
    for (var i = 0; i < 20; i++)emails.unshift(_createEmail())
    return emails
}

function _createEmail(isRandEmail = true, to, subject, body) {

    if (isRandEmail) return {
        id: utilService.makeId(),
        subject: utilService.makeLorem(2),
        body: utilService.makeLorem(14),
        isRead: false,
        sentAt: Date.now(),
        to: loggedinUser.email,
        status: 'Inbox',//Inbox/Sent/Trash/Draft
        isStared: false,
        from: utilService.randName()
    }

    return {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        to,
        status: 'Sent',//Inbox/Sent/Trash/Draft
        isStared: false,
        from: 'Me'
    }
}

function addComposeEmail({ to, subject, body }) {
    const newEmail = _createEmail(false, to, subject, body)
    storageService.post(EMAIL_KEY, newEmail)
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}