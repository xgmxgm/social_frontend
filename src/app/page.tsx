'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const session = useSession();

  console.log(session)

  return (
    <div>
      <h2>Main</h2>
      <div>
        <Link href="/auth">Log In</Link>
      </div>
      <div>
        <Link href='#' onClick={() => signOut({ callbackUrl: "/auth" })}>Sign out</Link>
      </div>
      <div>
        <Link href="/register">Sing In</Link>
      </div>
    </div>
  )
}