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
    getEmptyEmail,
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
                return getEmailsToDisplay()
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
    return query().then(
        emails => {
            if (filter.status !== 'All') {
                if (filter.status === 'Starred') emails = emails.filter(email => email.isStared)
                else emails = emails.filter(email => email.status === filter.status)
            }
            if(filter.status === 'All'){
                emails = emails.filter(email => email.status !== 'Trash')
            }

            if (!filter.txt) return emails
            return emails.filter(email => {
                var checkDatas =
                    [email.subject,
                    email.body,
                    email.to,
                    email.from]

                checkDatas = checkDatas.filter(data => { if (data) return data })
                checkDatas = checkDatas.map(data => data.toLowerCase())

                if (checkDatas.some(str => str.includes(filter.txt.toLowerCase()))) return email
            })
        }
    )
}

function _createEmails() {
    let emails = []
    for (var i = 0; i < 40; i++)emails.unshift(_createEmail())
    return emails
}

function _createEmail(isRandEmail = true, id, to, subject, body, status) {

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

}

function getEmptyEmail() {
    const newEmail =  {
        id: utilService.makeId(),
        subject: '',
        body: '',
        isRead: false,
        sentAt: Date.now(),
        to: '',
        status: 'Drafts',//Inbox/Sent/Trash/Draft
        isStared: false,
        from: 'Me'
    }

    return Promise.resolve(newEmail)
}

function addComposeEmail(email) {
return email.then(email => {
    return storageService.get(EMAIL_KEY, email.id)
    .then( res => {
       if(!res)  return storageService.post(EMAIL_KEY, email).then(newEntiti => getEmailsToDisplay())
       
       return storageService.put(EMAIL_KEY, email).then(newEntiti => getEmailsToDisplay())
     }
    )
})
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
