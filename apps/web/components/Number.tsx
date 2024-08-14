import { HTMLAttributes } from 'react'
import { getLocale } from '../locale'

export default function NumberFormat({ number, ...props }: {
  number: number
} & HTMLAttributes<HTMLSpanElement>) {
  return <span {...props}>
    {new Intl.NumberFormat(getLocale(), { notation: "compact" }).format(number)}
  </span>
}
