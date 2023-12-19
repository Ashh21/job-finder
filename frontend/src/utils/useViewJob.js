import { useEffect, useState } from 'react'

const useViewJob = (jobId) => {
    const [jobDetails, setJobDetails] = useState("")

    useEffect(() => {
        const apiURL = `http://localhost:4000/api/job/${jobId}`
        try {
            const fetchData = async () => {
                const data = await fetch(apiURL)
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