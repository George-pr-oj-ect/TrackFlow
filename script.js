let actionInput = document.querySelector(".action-input")
let logBtn = document.querySelector(".log-btn")
let formMessage = document.querySelector(".form-message")
let entriesContainer = document.querySelector(".entries")
let entryCount = document.querySelector(".entry-count")
let stBtn = document.querySelector(".status-btn")
let statusInput = document.querySelector(".status-input")
let statusMessage = document.querySelector(".status-message")
let undoBtn = document.querySelector(".undo-btn")
let redoBtn = document.querySelector(".redo-btn")
let undoRedoError = document.querySelector(".undo-redo-error")
let modalOverlay = document.querySelector(".modal-overlay")
let modalAvatar = document.querySelector(".modal-avatar")
let modalUsername = document.querySelector(".modal-username")
let modalAction = document.querySelector(".modal-action")
let modalTime = document.querySelector(".modal-time")
let modalStatus = document.querySelector(".modal-status")
let modalPrev = document.querySelector(".modal-prev")
let modalNext = document.querySelector(".modal-next")
let modalClose = document.querySelector(".modal-close") 
let loggedByInput = document.querySelector(".logged-by-input")
let actionMessage = document.querySelector(".action-message")
let loggedByMessage = document.querySelector(".logged-by-message")


let history = []

let pendingEntry = []

let undoRedoHolder = []

function renderEntries(){
    entriesContainer.innerHTML = ""
    entryCount.innerText = `${history.length} ${history.length === 1 ? "entry" : "entries"}`

    if(history.length === 0){
        entriesContainer.innerHTML = `<p class="empty-state">No activity logged yet</p>`
        return
    }

    history.forEach(entry => {
        let entryDiv = document.createElement("div")
        entryDiv.classList.add("entry")

       entryDiv.innerHTML = `
    <div class="entry-left">
        <img class="entry-avatar" src="https://ui-avatars.com/api/?name=${entry.loggedBy}" alt="avatar">
        <div class="entry-main">
            <span class="entry-action">${entry.action}</span>
            <span class="entry-time">${entry.timestamp}</span>
        </div>
    </div>
    <span class="entry-status status-${entry.status}">${entry.status}</span>
`

        entriesContainer.appendChild(entryDiv)
        entryDiv.addEventListener('click',function(){
            let currentHead = buildLinkedList(history)
            let node = currentHead
            while(node.data !== entry){
                node = node.next
            }
            showEntryDetail(node)
        })
    })
}

logBtn.addEventListener('click',function(){
    if(actionInput.value == ""){
        actionMessage.innerText = "Enter a task"
        return
    }
    if( loggedByInput.value == ""){
        loggedByMessage.innerText = "Enter username"
        return
    }
    pendingEntry.push({
        action:actionInput.value,
        timestamp:new Date().toLocaleString(),
        loggedBy: loggedByInput.value
    })
        formMessage.innerHTML = "Submit status next, action successfully logged"
        formMessage.classList.add('form-confirmation')

        actionMessage.innerText = ""
        loggedByMessage.innerText = ""
})

stBtn.addEventListener('click',function(){

    if(statusInput.value == ""){
        statusMessage.innerText = "Enter a task status"
        statusMessage.classList.add("status-error")
        return
    }

     if(pendingEntry.length === 0){
    statusMessage.innerText = "Submit a task and username first"
    statusMessage.classList.add("status-error")
    return
}

    let entry = pendingEntry.shift()

    history.push({
        action: entry.action,
        timestamp: entry.timestamp,
        status: statusInput.value.toLowerCase().trim(),
        loggedBy: entry.loggedBy
        
    })

    
    loggedByInput.value = ""
    actionInput.value = ""
    statusInput.value = ""

    formMessage.innerText = ""
    statusMessage.innerText = ""
    undoRedoError.innerText = ""

    renderEntries()
    })

let timedFunc;
undoBtn.addEventListener('click',function(){
    if(history.length === 0){
        undoRedoError.innerText = "There is no log to undo"
    }else{
        let unsureAction = history.pop()
        undoRedoHolder.push(unsureAction)
        undoRedoError.innerText = `You removed ${unsureAction.action} from log`
        undoRedoError.classList.remove("undo-redo-conf")

        clearTimeout(timedFunc)
        
        timedFunc = setTimeout(function(){
         undoRedoError.innerText = ""
            }, 2000)
        
        renderEntries()
    }
})

redoBtn.addEventListener('click',function(){
    if(undoRedoHolder.length === 0){
        undoRedoError.innerText = "There is no action to redo"
    }else{
    let redidAction  = undoRedoHolder.pop()
    undoRedoError.innerText = `${redidAction.action} was returned to the log`
    undoRedoError.classList.add("undo-redo-conf")
    history.push(redidAction)

    clearTimeout(timedFunc)

    timedFunc = setTimeout(function(){
        undoRedoError.innerText = ""
    }, 2000)

    renderEntries()
    }
})

function createNode(data){
    return {
        data:data,
        next:null,
        prev:null
    }
}

function buildLinkedList(historyLinkedList){
    let previousNode = null
     let head = previousNode
    historyLinkedList.forEach(entry => {
        let newNode = createNode(entry)
       
        if(previousNode){
            newNode.prev = previousNode
            previousNode.next = newNode
        }else{
            head = newNode
        }
        previousNode = newNode
        
    })
    return head
}

let currentEntryNode = null
function showEntryDetail(node){
    currentEntryNode = node
    modalOverlay.classList.add("open")
    modalAction.innerText = `${node.data.action}`
    modalTime.innerText = `${node.data.timestamp}`
    modalStatus.innerText = `${node.data.status}`
    modalStatus.className = "modal-status"
    modalStatus.classList.add(`status-${node.data.status}`)
    modalUsername.innerText = `${node.data.loggedBy}`
    modalAvatar.src = `https://ui-avatars.com/api/?name=${node.data.loggedBy}`
}

 modalClose.addEventListener('click',function(){
        modalOverlay.classList.remove("open")
})

modalNext.addEventListener('click',function(){
    if(currentEntryNode.next){
        currentEntryNode = currentEntryNode.next
        showEntryDetail(currentEntryNode)
    }
})

modalPrev.addEventListener('click',function(){
    if(currentEntryNode.prev){
        currentEntryNode = currentEntryNode.prev
        showEntryDetail(currentEntryNode)
    }
})

renderEntries()