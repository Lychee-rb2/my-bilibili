import { cookies } from 'next/headers'
import { Me } from '../components/Me'
import { NoCookie } from '../components/NoCookie'

export default function Home() {
  const cookie = cookies().get('bilibili')?.value
  if (cookie) {
    return <Me/>
  }
  return (
    <NoCookie/>
  );
}
