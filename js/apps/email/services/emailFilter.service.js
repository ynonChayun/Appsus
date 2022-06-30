export const emailFilter = {
    setStatus,
    getFilter,
    setTxt
}

function setStatus(status) {
    filter.status = status
}

function setTxt(txt){
    filter.txt = txt
}

function getFilter(){
    return filter
}

const filter = {
    status: 'Inbox',
    txt: '',
    lables: [] 
}
