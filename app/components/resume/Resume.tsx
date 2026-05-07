export default function Resume(){
    return (
        <div className="bg-white text-black text-sm resume-text flex flex-col gap-6 p-16">
            {/* personal information */}
            <section className="flex flex-col items-center gap-2"> 
                <p className="text-3xl font-bold">Zach Estrella</p>
                <div className="flex justify-center gap-1">
                    <p>Manila</p>
                    <p>|</p>
                    <p>0976-618-3244</p>
                    <p>|</p>
                    <a className="text-blue-500 underline" href="mailto:zachgabriel.estrella@gmail.com">
                        zachgabriel.estrella@gmail.com
                    </a>
                    <p>|</p>
                    <a className="text-blue-500 underline" href="https://zachgse.vercel.app">
                        https://zachgse.vercel.app
                    </a>
                </div>
            </section>
            {/* Summarry */}
            <section className="flex flex-col gap-2">
                <p className="text-lg text-uppercase font-semibold">Summary</p>
                <hr />
                <p className="text-justify text-sm/6">
                    Full-Stack Web Developer with a strong backend focus using PHP (Laravel), experienced in building scalable,
                    maintainable applications. Proficient in designing RESTful APIs, implementing secure authentication, and managing
                    relational databases such as MySQL. Capable of delivering end-to-end features across the stack and translating business
                    requirements into robust technical solutions. Exposed to React.js through personal projects and internal tools.
                    Recognized for clean, efficient code, strong problem-solving skills, and effective collaboration within cross-functional
                    teams.
                </p>
            </section>
            {/* Experience */}
            <section className="flex flex-col gap-2">
                <p className="text-lg text-uppercase font-semibold">Experience</p>
                <hr />
                <div className="flex flex-col gap-1">
                    <div className="flex font-semibold">
                        <p className=" me-auto">Ziaplex Inc.</p>
                        <p>Aug 2022 - Oct 2025</p>
                    </div>
                    <p>Web Developer</p>
                    <ul className="list-disc pl-6 space-y-1"> 
                        <li>
                            Led end-to-end development of 5+ Laravel-based web and back-office applications and contributed to 10+
                            internal systems across finance, logistics, and healthcare, supporting 100+ daily active users.
                        </li>
                        <li>
                            Designed and implemented custom RESTful APIs to enable cross-application communication between internal
                            systems, improving data flow efficiency and reducing manual reconciliation by up to 40%. 
                        </li>
                        <li>
                            Integrated 20+ internal services and proprietary APIs, including webhook consumption from an in-house
                            payment system, improving transaction reliability and reducing operational delays.
                        </li>
                        <li>
                            Refactored and stabilized legacy systems by resolving recurring defects and improving code structure, reducing
                            user-reported issues by 30% and increasing overall system stability.
                        </li>
                        <li>
                            Mentored junior developers through structured code reviews,
                        </li>
                    </ul>
                </div>
            </section>
            {/* Skills */}
            <section className="flex flex-col gap-2">
                <p className="text-lg text-uppercase font-semibold">Skills</p>
                <hr /> 
                <div className="flex flex-col gap-1">
                    <div className="flex gap-1">
                        <p className="font-semibold">Backend & Programming:</p>
                        <p>PHP, Java, Python, JavaScript</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold">Databases:</p>
                        <p>MySQL</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold">Frontend Development:</p>
                        <p>HTML5, CSS3 (Bootstrap, Tailwind), ReactJS</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold">APIs & Integration:</p>
                        <p>RESTful APIs</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold">Tools & Platforms:</p>
                        <p>Git (GitHub, Bitbucket), JIRA, Postman</p>
                    </div>
                </div>

            </section>
            {/* Education */}
            <section className="flex flex-col gap-2">
                <p className="text-lg text-uppercase font-semibold">Education</p>
                <hr />
                <div className="flex flex-col gap-1">
                    <div className="flex font-semibold">
                        <p className=" me-auto">De La Salle – College of Saint Benilde</p>
                        <p>Oct 2022</p>
                    </div>
                    <p>Web Developer</p>
                </div>
            </section>
            {/* Licenses */}
            <section className="flex flex-col gap-2">
                <p className="text-lg text-uppercase font-semibold">Licenses and Certifications</p>
                <hr />
                <div className="flex flex-col gap-1">
                    <div className="flex font-semibold">
                        <p className=" me-auto">AWS Practicioner</p>
                        <p>Oct 2025</p>
                    </div>
                    <p>Amazon Web Services</p>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex font-semibold">
                        <p className=" me-auto">SQL</p>
                        <p>Aug 2025</p>
                    </div>
                    <p>Oracle</p>
                </div>
            
            </section>
            {/* Projects */}
            <section className="flex flex-col gap-2">
                <p className="text-lg text-uppercase font-semibold">Projects</p>
                <hr />
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col">
                        <p className="font-semibold">1. Sublime</p>
                        <div className="flex gap-1">
                            <p className="font-semibold">Tech stack:</p>
                            <p>HTML,</p>
                            <p>Tailwind CSS,</p>
                            <p>JavaScript</p>
                        </div>
                        <p className="text-justify">
                            A modern web application for Sublime Cafe, built with Next.js, Supabase, and Tailwind CSS. It features a 
                            scalable CMS architecture for managing products, menu items, and content, along with secure authentication 
                            and database handling powered by Supabase. The platform also includes S3-like storage for media uploads and 
                            a polished, responsive UI crafted with Radix UI and modern React tooling—delivering a seamless experience 
                            for both customers and administrators.
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold">2. E-commerce</p>
                        <div className="flex gap-1">
                            <p className="font-semibold">Tech stack:</p>
                            <p>HTML,</p>
                            <p>Tailwind CSS,</p>
                            <p>JavaScript</p>
                        </div>
                        <p className="text-justify">
                            Engineered a high-performance e-commerce platform with role-based access control (RBAC) and token-based 
                            authentication (Laravel Sanctum) for secure user management. Implemented a repository-service architecture 
                            with Redis caching (Docker) to optimize backend performance. Developed checkout session generation, 
                            webhook-based payment synchronization, and real-time payment status notifications using WebSockets for 
                            seamless transaction handling. Built a type-safe React frontend with Redux state management, lazy loading, 
                            and optimized cart computations for fast, interactive shopping experiences. Additional features include dynamic 
                            product listings, user-specific dashboards, and scalable architecture ready for high traffic.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
