'use client'
import { useEffect,useLayoutEffect,useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RootLayout({ children }) {
    const router = useRouter()
    const [loading,setLoading] = useState(true);

    
    useEffect(() => {
        // Check for token in local Storage
        setLoading(true)
        const token = localStorage.getItem('token')

        if (!token) {
            // Redirect to signin if no token exists
            router.push('/signin')
        }
        else{
        setLoading(false)
        }
    }, [])

    return (
        <>
            {(!!!loading) && children}
        </>
    )
}