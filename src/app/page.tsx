'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const session = useSession();

  console.log(session)

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