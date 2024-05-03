import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password);
    }
  return (
    <>
      <h2 className="text-[#FFC55A] flex justify-center items-center font-bold text-xl">Log In</h2>
      <div className="flex justify-center mt-3">
        <form className="" onSubmit={handleSubmit}>
          <div className="form-control max-w-xl">
            <label className="label">
              <span className="label-text text-[#FFC55A] text-lg font-bold">Email</span>
            </label>
            <input type="email" className="input w-[320px] md:w-[500px]" required onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>
          <div className="form-control max-w-xl">
            <label className="label">
              <span className="label-text text-[#FFC55A] text-lg font-bold">Password</span>
            </label>
            <input type="password" className="input md:w-[500px]" required onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>
          <div className="form-control mt-6 w-full md:w-[500px]">
            <button disabled={isLoading} className="btn bg-[#FFC55A] border-[#FFC55A] hover:bg-black text-black hover:text-white font-bold text-base hover:border-[#FFC55A]">Log In</button>
          </div>
          {error && <div className='text-white flex mt-4 justify-center items-center border-[#FFC55A] border-2 py-2 text-lg md:text-2xl bg-black/75 rounded'>{error}</div>}
        </form>
      </div>
    </>
  )
}

export default Login