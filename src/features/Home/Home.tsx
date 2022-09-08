import {useNavigate} from 'react-router-dom'
import ToDos from '../Todo/Todo'
import {useState} from 'react'
import Reminders from '../Todo/Reminders'
import {selectTodo} from '../Todo/toDoSlice'
import { useAppSelector } from '../../app/hooks'

function Home() {
  const nav = useNavigate()
  const [sort, setSort] = useState("0")
  const todos = useAppSelector(selectTodo)
  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-cyan-200 to-yellow-100 h-screen">
      <h2 className='font-bold mt-12'>ToDos</h2>
      <button
        type="button"
        className="
            my-5
            w-32
            inline-block
            px-6 py-2.5
            bg-orange-600
            text-white
            font-medium
            text-xs
            leading-normal
            rounded
            shadow-md
            hover:bg-blue-70
            hover:shadow-lg
            focus:bg-orange-700
            focus:shadow-lg
            focus:outline-none
            focus:ring-0
            active:bg-orange-800
            active:shadow-lg
            transition duration-150 ease-in-out"
            onClick={()=>{nav('/add')}}
      >
        Add Todo
      </button>
      <Reminders toDos={todos} />
      <div className='w-full '>
        <div className='flex items-center mr-3'>
        <label className='mx-5'>Sort By</label>
        <select className="
        block
        w-50
        px-1.5
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
        onChange={(e)=> setSort(e.target.value)}
        defaultValue={sort}>
          <option value="0">Created Date</option>
          <option value="1">Completed First</option>
          <option value="2">Incomplete First</option>
          <option value="3">Reminder Date</option>
        </select>
        </div>
      </div>
      <ToDos sortBy= {sort} />
    </div>
  )
}

export default Home