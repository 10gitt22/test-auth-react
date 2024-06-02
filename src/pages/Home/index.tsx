import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "~/ui/Button"

export const Home = () => {
  const navigate = useNavigate()

  const tryAgain = useCallback(() => {
    navigate('/')
  }, [navigate])

  return (
    <div className="flex justify-center items-center p-4 w-full min-h-screen font-bold">
      <Button type='button' onClick={tryAgain}>Sign up</Button>
    </div>
  )
}
