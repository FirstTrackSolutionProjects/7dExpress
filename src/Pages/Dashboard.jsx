import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
const Dashboard = () => {
    const { authState } = useAuth()
    useEffect(() => {
      console.log(authState)
    }, [authState])
  return (
    <div>
      {authState.name}
      {authState.admin}
    </div>
  )
}

export default Dashboard
