import { Navigate, Outlet } from 'react-router-dom'
import { selectUser } from '../features/User/userSlice'
import { useAppSelector } from '../app/hooks'

export default function PrivateRoutes (){
    const user = useAppSelector(selectUser)
return (
    user.uid ? <Outlet/> : <Navigate to='/login'/>
  )
}