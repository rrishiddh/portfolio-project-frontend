'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, Github, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs,  TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';
  featured: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [allTechnologies, setAllTechnologies] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    fetchProjects();
    fetchTechnologies();
  }, []);

  useEffect(() => {
    filterProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedTech, statusFilter, projects]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
      const data = await response.json();

      if (data.success) {
        setProjects(data.data);
        setFilteredProjects(data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTechnologies = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/technologies`);
      const data = await response.json();

      if (data.success) {
        setAllTechnologies(data.data.technologies);
      }
    } catch (error) {
      console.error('Error fetching technologies:', error);
    }
  };

  const filterProjects = () => {
    let filtered = [...projects];

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTech) {
      filtered = filtered.filter((project) => project.technologies.includes(selectedTech));
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((project) => project.status === statusFilter);
    }

    setFilteredProjects(filtered);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      COMPLETED: { variant: 'default' as const, label: 'Completed' },
      IN_PROGRESS: { variant: 'secondary' as const, label: 'In Progress' },
      ARCHIVED: { variant: 'outline' as const, label: 'Archived' },
    };
    return variants[status as keyof typeof variants] || variants.COMPLETED;
  };

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
      <section className="bg-gradient-to-r from-primary to-purple-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Projects</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Explore my portfolio of web applications and development projects
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search projects..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Status Tabs */}
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
              <TabsTrigger value="IN_PROGRESS">In Progress</TabsTrigger>
              <TabsTrigger value="ARCHIVED">Archived</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Technologies Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTech === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTech(null)}
            >
              All Technologies
            </Button>
            {allTechnologies.slice(0, 8).map((tech) => (
              <Button
                key={tech.name}
                variant={selectedTech === tech.name ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTech(tech.name === selectedTech ? null : tech.name)}
              >
                {tech.name} ({tech.count})
              </Button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4 pb-16 max-w-6xl">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-48 w-full rounded-lg mb-4" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No projects found. Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col">
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
                      <CardTitle className="line-clamp-2">{project.title}</CardTitle>
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
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 mt-auto">
                    {project.liveUrl && (
                      <Button variant="default" size="sm" className="flex-1" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}