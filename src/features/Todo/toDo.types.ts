export type ToDos = ToDo[]

export interface ToDo {
  title: string
  completed: boolean
  createdAt: string
  id: string
  remindAt: string
}
