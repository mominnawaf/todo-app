import { useEffect } from 'react'
import DatePicker from "../../utils/DatePicker"
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectTodo, updateTodo } from './toDoSlice'
import { selectUser } from '../User/userSlice'
import { ToDo } from "./toDo.types"
import { useNavigate } from 'react-router-dom'

function EditTodo() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [time, setTime] = useState(new Date().getHours() + ":" + new Date().getMinutes())
  const user = useAppSelector(selectUser)
  const { state } = useLocation();
  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectTodo)
  const todoId = todos.findIndex(todo => todo.id === state)
  const [title, setTitle] = useState(todos[todoId].title)
  const [check, setCheck] = useState(todos[todoId].completed)
  const [disabled, setDisabled] = useState(false)
  const nav = useNavigate()
  const [titleError, setTitleError] = useState('')

  const handleTimeChange = (value: string) => {
    var h = value.split(":")
    selectedDate.setHours(Number(h[0]))
    selectedDate.setMinutes(Number(h[1]))
    setTime(`${value}:00`)
  }

  const handelSubmit = async () => {
    setDisabled(true)
    if (title.length < 4) {
      setTitleError('Todo should at least be 4 char long')
    }
    else {
      const updatedTodo: ToDo = {
        id: todos[todoId].id,
        title: title,
        createdAt: todos[todoId].createdAt,
        completed: check,
        remindAt: selectedDate.toISOString()
      }
      const body = {
        userId: user.uid,
        toDo: updatedTodo
      }
      await dispatch(updateTodo(body))
      nav('/home')
    }
    setDisabled(true)
  }
  useEffect(() => {
    let remindAt = todos[todoId].remindAt
    const h = ("0" + new Date(remindAt).getHours()).slice(-2);
    const m = ("0" + new Date(remindAt).getMinutes()).slice(-2);
    setTime(`${h}:${m}:00`)
  }, [todoId, todos])
  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-cyan-200 to-yellow-200 h-screen">
        <div className="flex justify-center flex-col items-center p-5 rounded-lg shadow-lg bg-gray-600 max-w-lg w-[22rem]">
          <h5 className="text-white text-xl leading-tight font-medium mb-2">
            Edit Todo
          </h5>
          <input
            type="text"
            className="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-2
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
            placeholder="Todo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="text-sm text-red-500 mt-1">{titleError}</div>
          <DatePicker setSelectedDate={setSelectedDate} defaultDate={todos[todoId].remindAt} />
          <div className="w-full">
            <label
              className="font-bold mb-2 text-white"
            >
              Select Reminder Time *
            </label>
            <input
              type="time"
              value={time}
              className="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
              placeholder="Todo"
              onChange={(e) => handleTimeChange(e.target.value)}
            />
          </div>
          <div className="form-check mt-5">
            <input checked={check} onChange={(e) => setCheck(!check)} 
            className="
            form-check-input 
            appearance-none 
            h-4 w-4 border 
            border-gray-300 
            rounded-sm 
            bg-white 
            checked:bg-blue-600
            checked:border-blue-600
            focus:outline-none transition duration-200 mt-1 
            align-top 
            bg-no-repeat bg-center bg-contain 
            float-left mr-2 cursor-pointer" 
            type="checkbox" value="" id="flexCheckDefault" />
            <label className="form-check-label inline-block text-white" htmlFor="flexCheckDefault">
              Completed
            </label>
          </div>
          <button
            type="button"
            className={disabled ? `my-5
            w-full
            inline-block
            px-6 py-2.5
            bg-blue-600
            text-white
            font-medium
            text-xs
            leading-normal
            uppercase
            rounded
            shadow-md
            hover:bg-blue-70
            hover:shadow-lg
            focus:bg-blue-700
            focus:shadow-lg
            focus:outline-none
            focus:ring-0
            active:bg-blue-800
            active:shadow-lg
            transition duration-150 ease-in-out pointer-events-none opacity-60` : `my-5
            w-full
            inline-block
            px-6 py-2.5
            bg-blue-600
            text-white
            font-medium
            text-xs
            leading-normal
            uppercase
            rounded
            shadow-md
            hover:bg-blue-70
            hover:shadow-lg
            focus:bg-blue-700
            focus:shadow-lg
            focus:outline-none
            focus:ring-0
            active:bg-blue-800
            active:shadow-lg
            transition duration-150 ease-in-out`}

            onClick={() => handelSubmit()}
            disabled={disabled}
          >
            {
              disabled ? <div className="flex items-center justify-center">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                </div>
              </div> : `Edit`
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditTodo