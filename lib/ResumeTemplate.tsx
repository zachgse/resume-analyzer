import { Resume } from "@/app/utils/types"

export const ResumeTemplate = ({props}:{props:Resume}) => {
    return (
        <div className="bg-white text-black text-sm resume-text flex flex-col gap-2">
            <section className="flex flex-col items-center gap-2"> 
                <p className="text-3xl font-bold">{props.name}</p>
                {props.info && (
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {props.info.map((info,index)=>(
                        <p key={index}>{info}</p>
                    ))}
                </div>
                )}
            </section>
            <section className="flex flex-col gap-2">
                <p className="text-lg text-uppercase font-semibold">Summary</p>
                <hr className="border border-black"/>
                <p className="text-justify text-sm/6">
                    {props.summary}
                </p>
            </section>
            <section className="flex flex-col gap-2">
                <p className="text-lg text-uppercase font-semibold">Experience</p>
                <hr className="border border-black"/>
                {props.work_experience && props.work_experience.map((work,index) => (
                    <div key={index} className="flex flex-col gap-1">
                        <div className="flex font-semibold">
                            <p className=" me-auto">{work.company}</p>
                            <p>{work.date_start} - {work.date_end}</p>
                        </div>
                        <p>{work.position}</p>
                        <ul className="list-disc pl-6 space-y-1"> 
                            {work.highlights && work.highlights.length > 0 && work.highlights.map((highlight,index) => (
                                <li key={index}>{highlight}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
            <section className="flex flex-col gap-2">
                <p className="text-lg text-uppercase font-semibold">Skills</p>
                <hr className="border border-black"/>
                <div className="flex flex-col gap-1">
                    {props.skills.categorized_skills ? props.skills.categorized_skills.map((skill,index)=>(
                        <div key={index} className="flex flex-wrap gap-1">
                            <p className="font-semibold">{skill.category}:</p>
                            {skill.info.map((skillInfo,index2)=>(
                                <p key={index2}>{skillInfo}</p>
                            ))}
                            
                        </div>
                    ))
                    : props.skills.flat_skills?.map((skill,index)=>(
                        <div className="flex flex-wrap gap-1">
                            <p key={index}>{skill}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="flex flex-col gap-2">
                <p className="text-lg text-uppercase font-semibold">Education</p>
                <hr className="border border-black"/>
                {props.education.map((education,index)=>(
                    <div key={index} className="flex flex-col gap-1">
                        <div className="flex font-semibold">
                            <p className=" me-auto">{education.university}</p>
                            <p>{education?.date}</p>
                        </div>
                        <p>{education.course}</p>
                    </div>
                ))}
            </section>
            {props.licenses && props.licenses.length > 0  && (
            <section className="flex flex-col gap-2">
                <p className="text-lg text-uppercase font-semibold">Licenses and Certifications</p>
                <hr className="border border-black"/>
                {props.licenses.map((license,index)=>(
                    <div key={index} className="flex flex-col gap-1">
                        <div className="flex font-semibold">
                            <p className=" me-auto">{license.title}</p>
                            <p>{license.date_issued}</p>
                        </div>
                    </div>
                ))}
            </section>
            )}
            {props.trainings && props.trainings?.length > 0 && (
            <section className="flex flex-col gap-2">
                <p className="text-lg text-uppercase font-semibold">Trainings and Seminars</p>
                <hr className="border border-black"/>
                {props.trainings.map((training,index)=>(
                    <div key={index} className="flex flex-col gap-1">
                        <div className="flex font-semibold">
                            <p className=" me-auto">{training.title}</p>
                            <p>{training.date}</p>
                            <p>{training.location}</p>
                        </div>
                    </div>
                ))}
            </section>
            )}
            {props.projects && props.projects.length > 0 && (
            <section className="flex flex-col gap-2">
                <p className="text-lg text-uppercase font-semibold">Projects</p>
                <hr className="border border-black"/>
                <div className="flex flex-col gap-1">
                    {props.projects.map((project,index)=>(
                        <div key={index} className="flex flex-col">
                            <p className="font-semibold">{index+1}. {project.title}</p>
                            <div className="flex gap-1">
                                <p className="font-semibold">Tools:</p>
                                <p>{project.tools}</p>
                            </div>
                            <p className="text-justify">
                                {project.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            )}
        </div>
    )
}

