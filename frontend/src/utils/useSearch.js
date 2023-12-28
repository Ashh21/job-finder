import { useEffect, useState } from "react"
import { API_URL } from "./utils"


const useSearch = (skillsFilter, positionFilter) => {
    const [searchJobs, setSearchJobs] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/api/job?skillsRequired=${skillsFilter}&jobPosition=${positionFilter}`)
            const data = await response?.json();
            setSearchJobs(data);
        }
        catch (err) { console.log('error fetching jobs : ', err) }
    }
console.log(searchJobs)

    useEffect(() => {
        fetchData()
    }, [])


    return { searchJobs, fetchData, }

}
export { useSearch }
