import create from 'zustand'
import { createClient } from '@liveblocks/client'
import { middleware } from '@liveblocks/zustand'

const client = createClient({
  publicApiKey: 'pk_test_Khm0Y0LMGFeobLCIhuCu_FPD',
})

export const useStore = create(
  middleware(
    (set) => ({
      // state and action will be added here
      draft: '',
      isTyping: false,
      todos: [],
      setDraft: (draft) => set({ draft, isTyping: draft !== '' }),
      addTodo: () =>
        set((state) => ({
          todos: state.todos.concat({ text: state.draft }),
          draft: '',
        })),
      deleteTodo: (index) =>
        set((state) => ({
          todos: state.todos.filter((todo, i) => index !== i),
        })),
    }),
    {
      client,
      presenceMapping: { isTyping: true },
      storageMapping: { todos: true },
    }
  )
)
