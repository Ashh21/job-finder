import { useEffect, useState } from "react"

const useGetAllJobs = () => {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await fetch('http://localhost:4000/api/jobs')
                const json = await response?.json()
                console.log(json?.jobs)
                setJobs(json?.jobs)
            }
            fetchData()
        } catch (err) { console.log(err) }
    }, [])

    return jobs
}

export { useGetAllJobs }