'use client';

import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getStatusBadge = (status: string) => {
    const variants = {
      COMPLETED: { variant: 'default' as const, label: 'Completed' },
      IN_PROGRESS: { variant: 'secondary' as const, label: 'In Progress' },
      ARCHIVED: { variant: 'outline' as const, label: 'Archived' },
    };
    return variants[status as keyof typeof variants] || variants.COMPLETED;
  };

  return (
    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group flex flex-col">
      {project.thumbnail && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {project.featured && (
            <Badge className="absolute top-3 right-3 bg-yellow-500 hover:bg-yellow-600">
              Featured
            </Badge>
          )}
        </div>
      )}
      <CardHeader className="flex-grow">
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <Badge {...getStatusBadge(project.status)}>
            {getStatusBadge(project.status).label}
          </Badge>
        </div>
        <CardDescription className="line-clamp-3">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Technologies:
            </p>
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{project.technologies.length - 4}
                </Badge>
              )}
            </div>
          </div>
          {project.features && project.features.length > 0 && (
            <div>
              <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Features:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {project.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 mt-auto">
        {project.liveUrl && (
          <Button variant="default" size="sm" className="flex-1" asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <Github className="mr-2 h-4 w-4" />
              Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}