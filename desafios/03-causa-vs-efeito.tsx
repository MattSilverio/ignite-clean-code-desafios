// Causa vs Efeito
import { useEffect, useState } from "react"

interface User {
  name: string;
  githubUrl: string;
}

function fetchUser() {
  return {
    data: {
      user: {
        name: 'Joseph Oliveira',
        githubUrl: 'https://github.com/josepholiveira'
      }
    }
  }
}

export function UserProfile() {
  const [isPageBlank, setIsPageBlank] = useState(false)
  const [userData, setUserData] = useState<User>()

  useEffect(() => {
    function loadUserData() {
      setIsPageBlank(true)

      const fetchUserResponse = fetchUser()

      setUserData(fetchUserResponse.data.user)
      
      setIsPageBlank(false)
    }

    loadUserData()
  })

  if (isPageBlank) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <img src={`${userData?.githubUrl}.png`} alt="" />
      <a href={userData?.githubUrl}>{userData?.name}</a>
    </div>
  )
}


