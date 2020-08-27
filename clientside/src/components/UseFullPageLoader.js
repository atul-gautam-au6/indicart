import React, { useState } from 'react'
import FullScreenLoader from './FullScreenLoader'

const useFullPageLoader = () => {
    const [loading,setLoading] =useState(false)
    return [
        loading ? <FullScreenLoader />:null,
        () =>setLoading(true),
        ()=>setLoading(false)
    ]
}

export default useFullPageLoader
