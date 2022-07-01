export const emailFilter = {
    setStatus,
    getFilter,
    setTxt,
    setMultiFilter,
    getMultiFilter,
    setLevelFilter,
    getLevelFilter
}
function setMultiFilter(multiFilter) {
    return multiFilter.then(res =>
        gMultiFilter = res)
}

function setStatus(status) {
    filter.status = status
}

function setTxt(txt) {
    filter.txt = txt
}

function getFilter() {
    return filter
}

function getMultiFilter() {
    return gMultiFilter
}

const filter = {
    status: 'Inbox',
    txt: '',
    lables: []
}

let gMultiFilter = {
    multiFilter: {
        from: '',
        to: '',
        subject: '',
        has: '',
        doesnt: '',
        dateSelect: null,
        dateTxt: '',
        status: '',
    }
}
let levelFilter = 'light'

function setLevelFilter(level) {
    levelFilter = level
}

function getLevelFilter() {
    return levelFilter
}