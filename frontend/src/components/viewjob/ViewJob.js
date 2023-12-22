import React from 'react'
import '../viewjob/ViewJob.css'
import { Header } from '../header/Header'
import { useParams } from 'react-router-dom'
import { useViewJob } from '../../utils/useViewJob'
import { JobDetails } from './JobDetails'

const ViewJob = () => {
    const { jobId } = useParams();
    const {jobDetails} = useViewJob(jobId);
    
    return (
        <div className='view-job'>
            <Header />
            <div style={{
                display: "flex", flexDirection: "column",
                justifyContent: "center", alignItems: "center"
            }}>

                <div className='view-job-card-1'>
                    <h3 style={{ paddingTop: "1rem" }}>
                        {jobDetails.companyName}
                    </h3>
                </div>

                <div className='view-job-card-2'>
                    <JobDetails jobDetails={jobDetails} />
                </div>
            </div>

        </div>
    )
}

export { ViewJob }
