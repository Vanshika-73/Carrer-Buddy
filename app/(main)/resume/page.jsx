import { getResume } from "@/actions/resume";
import React from "react";
import ResumeBuilder from "./_components/resume-builder";
import ResumeUpload from "./_components/resume-upload";
// import ResumeUpload from "./_components/resume-upload";

const ResumePage = async () => {
    const resume = await getResume();
    return (
        <div >
            <h1 className='text-5xl font-bold gradient-title mb-5'>Resume</h1>
            <ResumeUpload />
            {/* <ResumeBuilder initialContent={resume}/> */}
        </div>
    )
}


export default ResumePage;