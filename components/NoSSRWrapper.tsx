import dynamic from 'next/dynamic'
import React from 'react'


const NoSSRWrapper = ({ children }: { children: React.ReactNode }) => (
    <>{typeof window !== "undefined" ? children : <></>}</>
)
export default dynamic(() => Promise.resolve(NoSSRWrapper), {
    ssr: false,
    loading: () => <p>Loading...</p>,
})
