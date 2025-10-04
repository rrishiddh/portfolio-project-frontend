"use client";

import { motion } from "motion/react";
import {
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Database,
  Layout,
  Server,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const skills = {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Motion.Dev"],
    backend: ["Node.js", "Express", "Prisma", "PostgreSQL", "REST API"],
    tools: ["Git", "VS Code", "Postman", "Figma"],
  };

  const experience = [
    {
      role: "Web Developer",
      company: "Zorg IT Group.",
      period: "May 2025 - Present",
      description:
        "Development of scalable web applications using modern technologies.",
      achievements: [
        "Reduced page load times by 40%",
        "Collaborate team of 4 developers",
        "Implemented CI/CD pipelines",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Science in EEE",
      institution: "AUST, Dhaka",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-8 flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary to-purple-600 p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/assets/about/my-img.jpg"
                    alt="My Image"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            About Me
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6">
            On a journey to become a Full-Stack Developer | Passionate about
            exploring the tech landscape!
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button variant="outline" size="lg" asChild>
              <a
                href="mailto:rrishiddh@gmail.com"
                className="flex items-center"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Me
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link
                href="https://github.com/rrishiddh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link
                href="https://linkedin.com/in/rrishiddh/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              CTG, BD
            </div>
            <div className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              Available for Remote Work
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Content */}
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Bio */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Professional Summary</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I am a dedicated full-stack developer with a strong foundation
                  in both frontend and backend technologies. My expertise lies
                  in building scalable, user-friendly web applications using
                  modern JavaScript frameworks and cloud technologies. I am
                  passionate about writing clean, maintainable code and staying
                  up-to-date with the latest industry trends.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  Throughout my career, I have successfully delivered numerous
                  projects ranging from e-commerce platforms to real-time
                  collaboration tools. I thrive in agile environments and enjoy
                  working collaboratively with cross-functional teams to deliver
                  high-quality solutions.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Code className="mr-2 h-6 w-6" />
                  Technical Skills
                </CardTitle>
                <CardDescription>
                  Technologies and tools I work with
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900 dark:text-gray-100">
                    <Layout className="mr-2 h-5 w-5 text-blue-600" />
                    Frontend Development
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.frontend.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-3 py-1 text-sm"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900 dark:text-gray-100">
                    <Server className="mr-2 h-5 w-5 text-green-600" />
                    Backend Development
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-3 py-1 text-sm"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900 dark:text-gray-100">
                    <Database className="mr-2 h-5 w-5 text-purple-600" />
                    Tools & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-3 py-1 text-sm"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Experience */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Briefcase className="mr-2 h-6 w-6" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-primary pl-4 pb-6 last:pb-0"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {exp.role}
                    </h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {exp.period}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {exp.description}
                    </p>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-600 dark:text-gray-400 flex items-start"
                        >
                          <span className="mr-2">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <GraduationCap className="mr-2 h-6 w-6" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-primary pl-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {edu.degree}
                    </h3>
                    <p className="text-primary font-medium">
                      {edu.institution}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-primary to-purple-600 text-white">
              <CardContent className="py-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Let&apos;s Work Together
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Have a project in mind? I&apos;d love to hear about it.
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <a href="mailto:john.doe@email.com">
                    <Mail className="mr-2 h-5 w-5" />
                    Get in Touch
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
