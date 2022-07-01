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

                if (mode === 'Trash' && email.status === 'Trash') emails.splice(idx, 1)

                else {
                    if (mode === 'Trash') {
                        email.status = 'Trash'
                        email.isStared = false
                    }
                    else if (mode === 'star') email.isStared = !email.isStared
                    else if (mode === 'read') email.isRead = !email.isRead
                    else email.status = mode
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
    const filterLevel = emailFilter.getLevelFilter()

    if (filterLevel === 'light') return _lightFilter()
    else if (filterLevel === 'multi') return _multyFilter()
}

function _multyFilter() {
    const filter = emailFilter.getMultiFilter()
    return query().then(
        emails => {
            if (filter.from) {
                let regex = new RegExp(filter.from, "i")
                emails = emails.filter(email => regex.test(email.from))
            }
            if (filter.to) {
                let regex = new RegExp(filter.to, "i")
                emails = emails.filter(email => regex.test(email.to))
            }
            if (filter.subject) {
                let regex = new RegExp(filter.subject, "i")
                emails = emails.filter(email => regex.test(email.subject))
            }
            if (filter.has) {
                let regex = new RegExp(filter.has, "i")
                emails = emails.filter(email =>
                    regex.test(email.subject) ||
                    regex.test(email.to) ||
                    regex.test(email.from) ||
                    regex.test(email.body))
            }
            if (filter.doesnt) {
                let regex = new RegExp(filter.doesnt, "i")
                emails = emails.filter(email =>
                    !regex.test(email.subject) &&
                    !regex.test(email.to) &&
                    !regex.test(email.from) &&
                    !regex.test(email.body))
            }
            if (filter.status) {
                if (filter.status !== 'All') {
                    if (filter.status === 'Starred') emails = emails.filter(email => email.isStared)
                    else emails = emails.filter(email => email.status === filter.status)
                }
            }
            if (filter.dateTxt) {
                // 7200 is 2 houres
                // 86400 is day
                // new Date return me a timestemp of 2 pm
                const dateAsTimestemp = new Date(filter.dateTxt).getTime()
                const thatDate = new Date(dateAsTimestemp).setHours(0, 0, 0, 0);
                console.log(thatDate);
                emails = emails.filter(email =>{
                    const currDate = new Date(email.sentAt).setHours(0, 0, 0, 0);
                    if(thatDate === currDate)return email
                })
            }

            else if (filter.dateSelect) {
                const t = filter.dateSelect
                const HOUR = 60 * 60 * 1000
                const DAY =  24 * HOUR
                if (t !== 'Always') {
                   
                    if (t === '1 Hour') emails = emails.filter(email => (Date.now() - email.sentAt  ) < HOUR)
                    if (t === '1 Day') emails = emails.filter(email => (Date.now() - email.sentAt  ) < DAY)
                    if (t === '3 Days') emails = emails.filter(email => (Date.now() - email.sentAt  ) < 3 * DAY)
                    if (t === '1 Week') emails = emails.filter(email => (Date.now() - email.sentAt  ) < 7 * DAY)
                    if (t === '2 Weeks') emails = emails.filter(email => (Date.now() - email.sentAt  ) < 14 * DAY)
                    if (t === '1 Month') emails = emails.filter(email => (Date.now() - email.sentAt  ) < 30 * DAY)
                    if (t === '2 Months') emails = emails.filter(email => (Date.now() - email.sentAt  ) < 60 * DAY)
                    if (t === '6 Months') emails = emails.filter(email => (Date.now() - email.sentAt  ) < 180 * DAY)
                    if (t === '1 year') emails = emails.filter(email => (Date.now() - email.sentAt  ) < 365 * DAY)
                }
            }
            return emails
        })
}

function _lightFilter() {
    const filter = emailFilter.getFilter()
    return query().then(
        emails => {
            if (filter.status !== 'All') {
                if (filter.status === 'Starred') emails = emails.filter(email => email.isStared)
                else emails = emails.filter(email => email.status === filter.status)
            }
            if (filter.status === 'All') {
                emails = emails.filter(email => email.status !== 'Trash' && email.status !== 'Archive')
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
    for (var i = 0; i < 160; i++)emails.unshift(_createEmail())
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
        status: utilService.randStatus(),//Inbox/Sent/Trash/Draft
        isStared: false,
        from: utilService.randName()
    }

}

function getEmptyEmail() {
    const newEmail = {
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
            .then(res => {
                if (!res) return storageService.post(EMAIL_KEY, email).then(newEntiti => getEmailsToDisplay())

                return storageService.put(EMAIL_KEY, email).then(newEntiti => getEmailsToDisplay())
            }
            )
    })
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
