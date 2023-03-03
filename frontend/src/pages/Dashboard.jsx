import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import GoalItem from '../components/GoalItem'

import { getGoals, reset } from '../features/goals/goalSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const {goals, isLoading, isError, message} = useSelector((state) =>
  state.goals)

  useEffect(() => {
    if(isError){
      console.log(message)
    }
    if(!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    // To unmount
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

     <GoalForm/>
     <section clasName='content'>
      {console.log("goals", goals)}
      {goals.length > 0 ?(
      <div className='goals'>
          {goals.map((goal) => (
          <GoalItem key={goal._id} goal={goal}/>
          ))}
        </div>
      ) :
      ( <h3>You have not set any goals</h3>)
      }
     </section>
    </>
  )
}

export default Dashboard