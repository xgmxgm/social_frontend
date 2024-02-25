'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {

  return (
    <div>
      <h2>Main</h2>
      <div>
        <Link href='#' onClick={() => signOut({ callbackUrl: "/auth" })}>Sign out</Link>
      </div>
      <div>
        <Link href='profile'>Profile</Link>
      </div>
    </div>
  )
}