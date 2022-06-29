'use strict'
import { utilService } from './utils.servics.js'
import { storageService } from './email-storage.js'
import { emailFilter } from "../services/emailFilter.service.js"

export const emailService = {
    _createEmails,
    query,
    getEmailsToDisplay,
    setEmailAs
}

const EMAIL_KEY = 'emailDB'

function setEmailAs({ mode, id }) {
    storageService.get(EMAIL_KEY, id)
        .then(email => {
            if (mode === 'Trash') {
                email.status = mode
                email.isStared = false
            }
            else email.isStared = true

            storageService.put(EMAIL_KEY, email)
        }
        )
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

function _createEmail() {
    return {
        id: utilService.makeId(),
        subject: utilService.makeLorem(2),
        body: utilService.makeLorem(14),
        isRead: false,
        sentAt: Date.now(),
        to: loggedinUser.email,
        status: 'Inbox',//Inbox/Sent/Trash/Draft
        isStared: false
    }
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}