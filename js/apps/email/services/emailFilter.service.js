export const emailFilter = {
    setStatus,
    getFilter
}

function setStatus(status) {
    filter.status = status
    
}

function getFilter(){
    return filter
}

const filter = {
    status: 'Inbox',
    txt: '',
    lables: [] 
}
