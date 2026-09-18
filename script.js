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
            <div class="entry-main">
                <span class="entry-action">${entry.action}</span>
                <span class="entry-time">${entry.timestamp}</span>
            </div>
            <span class="entry-status status-${entry.status}">${entry.status}</span>
        `

        entriesContainer.appendChild(entryDiv)
    })
}

logBtn.addEventListener('click',function(){
    if(actionInput.value == ""){
        formMessage.innerText = "Enter a task"
        formMessage.classList.add('form-error')
        return
    }
    pendingEntry.push({
        action:actionInput.value,
        timestamp:new Date().toLocaleString()
    })
        formMessage.innerHTML = "Submit status next, action successfully logged"
        formMessage.classList.add('form-confirmation')
})

stBtn.addEventListener('click',function(){

    if(statusInput.value == ""){
        statusMessage.innerText = "Enter a task status"
        statusMessage.classList.add("status-error")
        return
    }

     if(pendingEntry.length === 0){
    statusMessage.innerText = "Submit a task first"
    statusMessage.classList.add("status-error")
    return
}

    let entry = pendingEntry.shift()

    history.push({
        action: entry.action,
        timestamp: entry.timestamp,
        status: statusInput.value.toLowerCase().trim()
    })

    

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




renderEntries()