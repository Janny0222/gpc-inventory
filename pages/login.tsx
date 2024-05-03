import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import { lato } from '@/styles/font'
 
export default function LoginPage() {
  const router = useRouter()
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
 
    if (response.ok) {
      router.push('/profile')
    } else {
      // Handle errors
    }
  }
 
  return (
    <div className={`flex justify-center items-center ${lato.className} h-screen bg-gradient-to-r from-green-600`}>
        <div className='border shadow-lg rounded-lg -top-48 bg-white shadow-black p-5 relative w-96'>
            <div className='bg-gray-100 p-5 rounded-md'>
                <h2 className='text-2xl'>Login</h2>
            </div>
            <form onSubmit={handleSubmit}>
            <div className='p-2 flex flex-col'>
                <label htmlFor="email">Enter Email:</label>
                <input type="email" name="email" placeholder="Email" required className='focus:border-black p-2 border rounded-md'/>
            </div>
            <div className='p-2 flex flex-col'>
                <label htmlFor="password">Enter Password:</label>
                <input type="password" name="password" placeholder="Password" required  className='p-2 border rounded-md'/>
            </div>
            <div className='flex items-end justify-end'>
                <button className='border hover:shadow-black hover:shadow-md rounded-lg p-2' type="submit">
                    Login
                </button>
                </div>
            </form>
        </div>
    </div>
  )
}