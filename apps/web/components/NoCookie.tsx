"use server"
import { v4 } from 'uuid'
import styles from '../app/page.module.css'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function NoCookie() {
  const token = v4()
  return <div className={styles.page}>
    <main className={styles.main}>
      <div className={styles.ctas}>
        <Link
          className={styles.primary}
          href={`https://www.bilibili.com?token=${token}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to bilibili
        </Link>
        <form style={{ display: "none" }} action={(formData) => {
          "use server"
          const cookie = formData.get('cookie') as string
          cookies().set('bilibili', cookie)
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
