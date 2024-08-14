'use client'
import { loginAction } from '../action/login'
import { useActionState } from "react";

export default function Login({ token }: { token: string }) {
  const [state, action, pending] = useActionState(loginAction, { message: "" })
  return <>
    <form className="hidden" action={action}>
      <label>
        <span>Cookie: </span>
        <input id="token" type="hidden" value={token}/>
        <input id="cookie" type="password" name="cookie"/>
      </label>
      <button id="login"/>
    </form>
    {!pending && state.message && <p className="text-red-500">
      {state.message}
    </p>}
  </>
}
