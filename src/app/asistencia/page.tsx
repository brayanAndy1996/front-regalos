'use client'

import UserApi from "@/apis/Users"
import { useEffect } from "react"

const pagAsistencia = () => {
    useEffect(() => {
        try {
            UserApi.fetchUsers({
                from: 0,
                limit: 3
            })
            .then((res)=> console.log('res111',res))
            .catch(err => console.log(err))
            UserApi.fetchAllUsers()
            .then((res)=> console.log('res2res2',res))
            .catch(err => console.log(err))
        } catch (error) {
            
        }
    }, [])

    return (
        <div>pageAsistencia</div>
    )
}

export default pagAsistencia
