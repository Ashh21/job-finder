import { useEffect, useState } from "react"

const useGetAllJobs = () => {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/jobs')
            const json = await response?.json()
            setJobs(json?.jobs)
        } catch (err) { console.log("Error while fetching data:", err) }
    }
    return jobs
}

export { useGetAllJobs }