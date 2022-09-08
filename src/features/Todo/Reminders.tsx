import { ToDos } from "./toDo.types"
import { useEffect, useState } from 'react'
import moment from "moment"


function Reminders({ toDos }: { toDos: ToDos }) {
    const [reminder, setReminder] = useState(toDos)
    useEffect(() => {
        var temp = [] as ToDos
        if(toDos.length > 0){
        toDos.forEach(todo => {
            var todoDate = new Date(todo.remindAt);
            var now = moment(new Date());
            var end = moment(todoDate);
            var duration = moment.duration(end.diff(now));
            var min = duration.asMinutes();
            if (min < 180 && min > 0) {
                temp.push(todo)
            }
        })
    }
        setReminder(temp)
    }, [toDos])
    const formatTime = (time: string) => {
        return moment(time).calendar()
    }
    return (
        <>
            {
                reminder[0] ? <>
                <span className="font-bold">Upcoming Reminder</span>
                    {
                        reminder.map(r => {
                            var c = "flex p-6 justify-between items-center rounded-lg shadow-lg mx-5 my-5"
                            return <div className="w-full" key={r.id}>
                                <div className={r.completed ? c + " bg-green-300" : c + " bg-red-300"} >
                                    <h5 className="text-gray-900 leading-tight font-medium mb-2">{r.title}</h5>
                                    <div className='flex items-center'>
                                        <span className='text-xs text-gray-400 mr-2'>{formatTime(r.remindAt)}</span>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </> : null

            }
        </>
    )
}

export default Reminders