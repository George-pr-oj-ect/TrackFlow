let actionInput = document.querySelector(".action-input")
let logBtn = document.querySelector(".log-btn")
let formError = document.querySelector(".form-error")
let entriesContainer = document.querySelector(".entries")
let entryCount = document.querySelector(".entry-count")
let stBtn = document.querySelector(".status-btn")
let statusInput = document.querySelector(".status-input")
let statusError = document.querySelector(".status-error")

let history = []

let pendingEntry = []

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
        formError.innerText = "Enter a task"
        return
    }
    pendingEntry.push({
        action:actionInput.value,
        timestamp:new Date().toLocaleString()
    })
        formError.innerHTML = "Task requires status"
})

stBtn.addEventListener('click',function(){

    if(statusInput.value == ""){
        statusError.innerText = "Enter a task status"
        return}

     if(pendingEntry.length === 0){
    statusError.innerText = "Enter a task first"
    return
}

    let entry = pendingEntry.shift()

    history.push({
        action: entry.action,
        timestamp: entry.timestamp,
        status: statusInput.value
    })

    actionInput.value = ""
    statusInput.value = ""

    formError.innerText = ""
    statusError.innerText = ""

    renderEntries()
    })

renderEntries()