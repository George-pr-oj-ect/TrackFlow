# TrackFlow — Activity & Audit Log Dashboard 📋

An internal tracking tool applying three core data structures to a real workflow: undo functionality (stack), pending approvals (queue), and a navigable activity history (linked list).

## How it works

**Queue — logging an action:**
An action is first pushed into a `pendingEntry` queue when logged. Once its status is confirmed, it's `shift()`ed out (first logged, first confirmed) and pushed into the final `history`.

```javascript
pendingEntry.push({ action, timestamp, loggedBy })
// later, on status confirmation:
let entry = pendingEntry.shift()
history.push({ ...entry, status })
```

**Stack — undo/redo:**
The last entry added to `history` can be undone (`pop()`), moving it to a redo stack, and redone (`pop()` from there, `push()` back to history).

```javascript
let unsureAction = history.pop()
undoRedoHolder.push(unsureAction)
```

**Doubly Linked List — activity detail viewer:**
Clicking any entry converts the current `history` array into a doubly linked list, walks to the clicked entry's node, and opens a detail modal with avatar, name, status, and full timestamp. Next/Previous buttons step through the chain in either direction.

```javascript
function createNode(data){
    return { data, next: null, prev: null }
}
```

## Features
- Two-step logging flow: log an action, then confirm its status (models a real approval workflow)
- Per-field validation with dedicated error messages
- Undo/redo with auto-clearing confirmation messages
- Clickable activity feed entries opening a detail modal
- Auto-generated avatars per person (via ui-avatars.com) based on who logged the action
- Next/Previous navigation through the full activity history using linked list traversal
- Dark dashboard styled UI with a blurred backdrop modal

## Tech Stack
- HTML5
- CSS3 (backdrop blur, animations, responsive layout)
- JavaScript (stacks, queues, doubly linked lists, DOM manipulation)

## What I Learned
Building TrackFlow showed how multiple data structures naturally combine in one real application instead of existing in isolation. A queue models a real-world approval pipeline, a stack gives undo/redo its correct "last action first" behavior, and a linked list makes stepping through history sequential and efficient rather than needing to search an entire array each time.