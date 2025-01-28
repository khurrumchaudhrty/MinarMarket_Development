'use client'
import { useEffect,useLayoutEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocalStorage } from '@uidotdev/usehooks';

export default function RootLayout({ children }) {
    const router = useRouter()
    const [loading,setLoading] = useState(true);
    const [type,setType] = useLocalStorage ('type','buyer')

    
    useEffect(() => {
        // Check for token in local Storage

        if (type === 'seller') {
            // Redirect to signin if no token exists
            router.push('/app/dashboard')
        }
        else{
        setLoading(false)
        }
    }, [type])

    return (
        <>
            {(!!!loading) && children}
        </>
    )
}