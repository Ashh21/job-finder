import React from 'react'

const JobCard = ({ job }) => {
    return (
        <div className='job-card-div'>
            <div className='job-card-left-div'>
                <div style={{ display: "flex" }}>
                    <img src={job?.logoUrl} alt='pic' />
                    <h3 style={{ paddingLeft: "1rem" }}>{job?.companyName}</h3>
                </div>

                <div style={{ display: "flex" }}>
                    {job?.skillsRequired.map(skills => (
                        <p className='skills' key={skills.id}>{skills}</p>
                    ))}
                </div>
            </div>

            <div style={{ padding: "0.35rem 0 0.35rem 3.25rem", display: 'flex' }}>
                <p>{job?.salary}</p>
                <p style={{ padding: " 0 0.5rem " }}>{job?.location}</p>
            </div>

            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                <div style={{ display: "flex", padding: "0.35rem 0 0.35rem 3.25rem" }}>
                    <p>{job?.jobPref}</p>
                    <p style={{ padding: " 0 0.5rem " }}>{job?.jobType}</p>
                </div>
                <button className='details-btn'>View Details</button>
            </div>

        </div>
    )
}

export { JobCard }