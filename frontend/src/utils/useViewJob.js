import { useEffect, useState } from 'react'
import { API_URL } from './utils'

const useViewJob = (jobId) => {
    const [jobDetails, setJobDetails] = useState("")

    useEffect(() => {
        try {
            const fetchData = async () => {
                const data = await fetch(`${API_URL}/api/job/${jobId}`)
                const json = await data.json()
                setJobDetails(json?.job)
            }
            fetchData()
        } catch (err) { }
    }, [jobId])
    return { jobDetails, jobId }

}

export { useViewJob }