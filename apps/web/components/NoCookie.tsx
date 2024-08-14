"use server"
import { v4 } from 'uuid'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { login } from '../util/cookie'

export async function NoCookie() {
  const token = v4()
  return <div>
    <main>
      <div>
        <Link
          href={`https://www.bilibili.com?token=${token}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to bilibili
        </Link>
        <form className="hidden" action={(formData) => {
          "use server"
          const cookie = formData.get('cookie') as string
          login(cookie)
          redirect("/")
        }}>
          <label>
            <span>Cookie: </span>
            <input id="token" type="hidden" value={token}/>
            <input id="cookie" type="password" name="cookie"/>
          </label>
          <button id="login">Submit</button>
        </form>
      </div>
    </main>
  </div>
}
