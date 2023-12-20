import { useEffect, useState } from 'react'

const useViewJob = (jobId) => {
    const [jobDetails, setJobDetails] = useState("")

    useEffect(() => {
        try {
            const fetchData = async () => {
                const data = await fetch(`http://localhost:4000/api/job/${jobId}`)
                const json = await data.json()
                setJobDetails(json?.job)
                console.log(json?.job)
            }
            fetchData()
        } catch (err) { }
    }, [jobId])
    return jobDetails

}

export { useViewJob }