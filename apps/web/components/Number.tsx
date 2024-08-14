import { HTMLAttributes } from 'react'
import { getLocale } from '../locale'
import ClientOnly from './ClientOnly'

export default function NumberFormat({ number, ...props }: {
  number: number
} & HTMLAttributes<HTMLSpanElement>) {
  return <ClientOnly>
    <span {...props}>
    {new Intl.NumberFormat(getLocale(), { notation: "compact" }).format(number)}
  </span>
  </ClientOnly>
}
