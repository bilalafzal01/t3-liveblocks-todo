import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect } from 'react'
import { useStore } from './store'
import './App.css'

function WhoIsHere() {
  const othersUsersCount = useStore((state) => state.liveblocks.others.length)

  return (
    <div className="who_is_here">
      There are {othersUsersCount} other users online
    </div>
  )
}

function SomeoneIsTyping() {
  const others = useStore((state) => state.liveblocks.others)
  const someoneIsTyping = others.some((user) => user.presence?.isTyping)

  return someoneIsTyping ? (
    <div className="someone_is_typing">Someone is typing</div>
  ) : null
}

function App() {
  const [listParent] = useAutoAnimate()

  const {
    liveblocks: { enterRoom, leaveRoom, isStorageLoading },
    draft,
    setDraft,
    todos,
    addTodo,
    deleteTodo,
  } = useStore()

  useEffect(() => {
    enterRoom('zustand-todo-app', {
      todos: [],
    })

    return () => {
      leaveRoom('zustand-todo-app')
    }
  }, [])

  // if (isStorageLoading) {
  //   return <div>Loading...</div>
  // }

  return (
    <div className="container">
      <WhoIsHere />
      <input
        className="input"
        type="text"
        placeholder="What needs to be done?"
        value={draft}
        disabled={isStorageLoading}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTodo()
          }
        }}
      ></input>
      <SomeoneIsTyping />
      <ul ref={listParent}>
        {todos.map((todo, index) => {
          return (
            <li className="todo_container" key={index}>
              <div className="todo">{todo.text}</div>
              <button
                className="delete_button"
                onClick={() => {
                  deleteTodo(index)
                }}
              >
                ✕
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
