import React from 'react'
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const JobDetails = ({ jobDetails }) => {
    const createdAt = jobDetails?.createdAt;
    return (
        <div style={{ padding: "1rem 2rem", }} >
            <p style={{ fontSize: "0.8rem", color: "#999999" }}>  {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}   {jobDetails?.jobType}</p>

            <div style={{ display: 'flex', justifyContent: "space-between", padding: "0.5rem 0" }}>
                <div >
                    <h1 style={{ fontSize: "1.75rem" }}>{jobDetails?.companyName}</h1>
                    <p style={{ color: "#ED5353", fontSize: "0.8rem" }}>{jobDetails?.location}</p>
                </div>
                <button style={{
                    background: "#ED5353", border: "none", borderRadius: "0.35rem", width: "5rem",
                    outline: "none", color: '#fff', height: "2rem",
                }}>Edit job</button>
            </div>

            <div style={{ display: 'inline-block' }}>
                {/* <img src='' alt='logo'  /> */}
                <p style={{ fontSize: "0.8rem", color: "#595959" }}>Rs {jobDetails?.salary}/month</p>
            </div>

            <div >
                <h3 style={{ padding: "0.85rem 0", fontSize: "1rem" }}>About company</h3>
                <p style={{ fontSize: '0.9rem', color: "#595959" }}>{jobDetails?.aboutCompany}</p>
            </div>

            <div >
                <h3 style={{ padding: "0.85rem 0", fontSize: "1rem" }}>About the job/internship</h3>
                <p style={{ fontSize: '0.9rem', color: "#595959" }}>{jobDetails?.jobDescription}</p>
            </div>

            <div style={{ padding: "0.85rem 0" }}>
                <h3 style={{ padding: "0 0 0.25rem 0", fontSize: "1rem" }}>Skills's required</h3>
                <div style={{ display: "flex", textAlign: "center" }}>
                    {
                        jobDetails?.skillsRequired?.map(skills => <p style={{
                            margin: "0 0.5rem 0 0",
                            padding: '0.25rem 0.5rem',
                            color: "#595959", backgroundColor: "#FFEEEE", borderRadius: '1rem'
                        }} key={skills.id}>
                            {skills}
                        </p>)
                    }
                </div>
            </div>

            <div>
                <h3 style={{ fontSize: "1rem", paddingBottom: "0.5rem" }}>Additional Information</h3>
                <p style={{ fontSize: '0.9rem', color: "#595959" }}>{jobDetails?.information}</p>
            </div>
        </div>
    )
}

export { JobDetails }