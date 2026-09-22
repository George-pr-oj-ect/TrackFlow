import { statusColors, defaultStatusColor } from "./data.js"

export function createNode(data){
    return {
        data: data,
        next: null,
        prev: null
    }
}

export function buildLinkedList(historyLinkedList){
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

export function applyStatusStyle(element, status){
    let colors = statusColors[status] || defaultStatusColor
    element.style.backgroundColor = colors.bg
    element.style.color = colors.text
}