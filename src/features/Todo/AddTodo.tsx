import DatePicker from "../../utils/DatePicker"
import { useState } from 'react'
import { addTodo } from './toDoSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectUser } from "../User/userSlice"
import { useNavigate } from 'react-router-dom'


function AddTodo() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const user = useAppSelector(selectUser)
  const [title, setTitle] = useState<string>('')
  const [time, setTime] = useState('12:00')
  const dispatch = useAppDispatch()
  const [disabled, setDisabled] = useState(false)
  const nav = useNavigate()
  const [titleError, setTitleError] = useState('')

  const handleTimeChange = (value: string) => {
    var h = value.split(":")
    selectedDate.setHours(Number(h[0]))
    selectedDate.setMinutes(Number(h[1]))
    setTime(`${value}:00`)
  }
  const handleCreate = async () => {
    setDisabled(true)
    if (title.length < 4) {
      setTitleError('Todo should at least be 4 char long')
    }
    else {
      const reminder = new Date(selectedDate).toISOString()
      const userId = user.uid
      await dispatch(addTodo({ title, reminder, userId }))
      nav('/home')
    }
    setDisabled(false)
  }
  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-cyan-200 to-yellow-100 h-screen">
        <div className="flex justify-center flex-col items-center p-5 rounded-lg shadow-lg bg-gray-600 max-w-lg w-[22rem]">
          <h5 className="text-white text-xl leading-tight font-medium mb-2">
            Add Todo
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
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="text-sm text-red-500 mt-1">{titleError}</div>
          <DatePicker setSelectedDate={setSelectedDate} />
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

            onClick={() => handleCreate()}
            disabled={disabled}
          >
            {
              disabled ? <div className="flex items-center justify-center">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                </div>
              </div> : `Create`
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddTodo