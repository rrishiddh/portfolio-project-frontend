'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Eye } from 'lucide-react';
import { Card,  CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Blog } from '@/types';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link href={`/blog/${blog.slug}`}>
      <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden group">
        {blog.coverImage && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {blog.featured && (
              <Badge className="absolute top-3 right-3 bg-yellow-500 hover:bg-yellow-600">
                Featured
              </Badge>
            )}
          </div>
        )}
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-2">
            {blog.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {blog.tags.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{blog.tags.length - 2}
              </Badge>
            )}
          </div>
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {blog.title}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {blog.excerpt}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col gap-3">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 w-full">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
            </div>
            {blog.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{blog.readTime} min</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between w-full text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold">
                {blog.author.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {blog.author.name}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Eye className="h-4 w-4" />
              <span>{blog.views}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}