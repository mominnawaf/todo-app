import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchTodo, selectTodo, deleteTodo, updateTodo } from './toDoSlice'
import { selectUser } from '../User/userSlice'
import { useNavigate } from 'react-router-dom'
import { MdOutlineEditCalendar, MdDelete } from 'react-icons/md'
import { ToDo } from './toDo.types'
import moment from 'moment'

function ToDos({ sortBy }: { sortBy: string }) {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const todos = useAppSelector(selectTodo)
  const [sortedTodo, setSortedToDo] = useState(todos)
  const nav = useNavigate()
  useEffect(() => {
    dispatch(fetchTodo(user.uid))
  }, [dispatch, user.uid])

  useEffect(() => {
    if(todos.length> 0){
    var temp = [...todos]
    if (sortBy === "0") { // sort by creation Date
      temp.sort((a, b) => {
        return (a.createdAt > b.createdAt) ? -1 : ((a.createdAt < b.createdAt) ? 1 : 0);
      });
      setSortedToDo(temp)
    }
    else if(sortBy === "1"){   // sort by complete
      temp.sort((a, b) => {
        return (a.completed === b.completed)? 0 : a.completed? -1 : 1;
      });
      setSortedToDo(temp)
    }
    else if(sortBy === "2"){ // sort by incomplete
      temp.sort((a, b) => {
        return (a.completed < b.completed) ? -1 : ((a.completed < b.completed) ? 1 : 0);
      });
      setSortedToDo(temp)
    }
    else if (sortBy === "3") { // sort by remindAt Date
      temp.sort((a, b) => {
        return (a.remindAt < b.remindAt) ? -1 : ((a.remindAt > b.remindAt) ? 1 : 0);
      });
      setSortedToDo(temp)
    }
  }
    
  }, [sortBy, todos])

  const handelCompletedChange = (todo: ToDo) => {
    const updatedTodo: ToDo = {
      id: todo.id,
      title: todo.title,
      createdAt: todo.createdAt,
      completed: !todo.completed,
      remindAt: todo.remindAt
    }
    const body = {
      userId: user.uid,
      toDo: updatedTodo
    }
    dispatch(updateTodo(body))
  }
  const handleDelete = (toDo: ToDo) => {
    let data = {
      userId: user.uid,
      toDo: toDo
    }
    dispatch(deleteTodo(data))
  }
  const editTodo = (todo: ToDo) => {
    nav('/edit', { state: todo.id })
  }
  const formatTime =(time : string)=>{
    return moment(time).calendar()
  }
  return (
    <div className='w-full'>
      {
        sortedTodo[0] ?
          <>
            {
              sortedTodo.map(todo => {
                var c = "flex p-6 justify-between items-center rounded-lg shadow-lg mx-5 my-5"
                return (
                  <div className={todo.completed ? c + " bg-green-300" : c + " bg-red-300"} key={todo.id}>
                    <h5 className="text-gray-900 leading-tight font-medium mb-2">{todo.title}</h5>
                    <div className='flex items-center'>
                      <span className='text-xs text-gray-400 mr-2'>{formatTime(todo.remindAt)}</span>
                      <input checked={todo.completed} onChange={() => handelCompletedChange(todo)} 
                      className="
                      form-check-input 
                      appearance-none 
                      h-4 w-4 border
                      border-gray-300
                      rounded-sm
                      bg-white
                      checked:bg-blue-600 
                      checked:border-blue-600 
                      focus:outline-none 
                      transition 
                      duration-200 
                      mt-1 
                      align-top 
                      bg-no-repeat 
                      bg-center 
                      bg-contain 
                      float-left 
                      mr-2 
                      cursor-pointer"
                      type="checkbox" value="" id="flexCheckDefault" />
                       <span className='font-small text-gray-600'>Completed</span>
                      <button onClick={() => editTodo(todo)}>
                        <MdOutlineEditCalendar size={24} className="ml-2" />
                      </button>
                      <button onClick={() => handleDelete(todo)}>
                        <MdDelete size={24} className="ml-2" />
                      </button>
                    </div>
                  </div>
                )
              })
            }
          </>
          :
          <p className='flex justify-center'>No Todo found.</p>
      }

    </div>
  )
}

export default ToDos