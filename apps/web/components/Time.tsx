'use client'
import dayjs from 'dayjs'
import { TimeHTMLAttributes, } from 'react'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getLocale } from '../locale'
import 'dayjs/locale/zh-cn'
import ClientOnly from './ClientOnly'

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime)

export default function Time({ time, className, ...props }: {
  time: dayjs.ConfigType
} & TimeHTMLAttributes<HTMLTimeElement>) {
  const t = dayjs(time)
  dayjs.locale(getLocale())
  return <ClientOnly>
    <time className={`group ${className}`} title={t.toISOString()} dateTime={t.toISOString()} {...props}>
      <span className="inline group-hover:hidden">{t.fromNow()}</span>
      <span className="hidden group-hover:inline">{t.format('lll')}</span>
    </time>
  </ClientOnly>
}
