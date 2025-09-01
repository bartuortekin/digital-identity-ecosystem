import { useState, useEffect, ChangeEvent } from 'react'
import { supabase } from '../lib/supabaseClient'

interface Profile {
  id: string
  user_id: string
  name: string
  type: string
  bio?: string
}

export default function Dashboard() {
  const [user, setUser] = useState<any | null>(null)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [newProfileName, setNewProfileName] = useState<string>('')

  // Get current user and listen for auth changes
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) fetchProfiles(user.id)
    }
    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfiles(session.user.id)
      else setProfiles([])
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // Signup
  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) alert(error.message)
    else alert(`Signed up as ${data.user?.email}`)
  }

  // Login
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
  }

  // Logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error(error)
  }

  // Fetch profiles for user
  const fetchProfiles = async (userId: string) => {
    const { data, error } = await supabase
      .from<Profile>('profiles')
      .select('*')
      .eq('user_id', userId)
    if (error) console.error(error)
    else setProfiles(data)
  }

  // Create new profile
  const handleCreateProfile = async () => {
    if (!newProfileName || !user) return
    const { data, error } = await supabase
      .from<Profile>('profiles')
      .insert([{ user_id: user.id, type: 'real', name: newProfileName }])
    if (error) alert(error.message)
    else {
      setProfiles([...profiles, data![0]])
      setNewProfileName('')
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Login / Signup</h2>
        <input
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleLogin}>Login</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Create Profile</h3>
      <input
        placeholder="Profile Name"
        value={newProfileName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewProfileName(e.target.value)}
      />
      <button onClick={handleCreateProfile}>Create</button>

      <h3>Your Profiles</h3>
      <ul>
        {profiles.map(p => (
          <li key={p.id}>{p.name} ({p.type})</li>
        ))}
      </ul>
    </div>
  )
}