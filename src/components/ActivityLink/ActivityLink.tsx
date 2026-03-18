'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ActivityLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  children: React.ReactNode
  activeClassName?: string
}

export const ActivityLink = ({
  children,
  activeClassName = 'underline',
  ...props
}: ActivityLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === props.href

  return (
    <Link {...props} className={isActive ? activeClassName : props.className}>
      {children}
    </Link>
  )
}
