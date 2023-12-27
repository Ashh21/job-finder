import { useEffect, useState } from "react"
import { API_URL } from "./utils"


const useSearch = (skillsFilter, positionFilter) => {
    const [searchJobs, setSearchJobs] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/api/job?skillsRequired=${skillsFilter}&jobPosition=${positionFilter}`)
            const data = await response.json()
            setSearchJobs(data)
        }
        catch (err) { console.log('error fetching jobs : ', err) }
    }


    useEffect(() => {
        fetchData()
    }, [])


    return { searchJobs, fetchData, }

}
export { useSearch }



// useEffect(() => {

//     const filterjobs = searchJobs?.filter((job) => {
//         const skills = job.skillsFilter?.every((skill) =>
//             job.skillsRequired.includes(skill))

//         const positions = !positionFilter || job.jobPosition?.toLowerCase().includes(positionFilter)

//         return skills && positions
//     })
//     setFilteredJobs(filterjobs)
//     console.log(filterjobs)
// }, [searchJobs, skillsFilter, positionFilter])