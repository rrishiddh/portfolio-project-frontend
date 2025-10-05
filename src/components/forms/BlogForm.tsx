'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { CreateBlogInput } from '@/types';

interface BlogFormProps {
  onSubmit: (data: CreateBlogInput) => void;
  initialData?: Partial<CreateBlogInput>;
  isLoading?: boolean;
}

export default function BlogForm({ onSubmit, initialData, isLoading = false }: BlogFormProps) {
  const [formData, setFormData] = useState<CreateBlogInput>({
    title: initialData?.title || '',
    content: initialData?.content || '',
    excerpt: initialData?.excerpt || '',
    coverImage: initialData?.coverImage || '',
    published: initialData?.published || false,
    featured: initialData?.featured || false,
    tags: initialData?.tags || [],
    seoTitle: initialData?.seoTitle || '',
    seoDescription: initialData?.seoDescription || '',
  });

  const [currentTag, setCurrentTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (formData.excerpt && formData.excerpt.length > 500) {
      newErrors.excerpt = 'Excerpt must be less than 500 characters';
    }

    if (formData.seoTitle && formData.seoTitle.length > 60) {
      newErrors.seoTitle = 'SEO title must be less than 60 characters';
    }

    if (formData.seoDescription && formData.seoDescription.length > 160) {
      newErrors.seoDescription = 'SEO description must be less than 160 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags?.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), currentTag.trim()],
      });
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((tag) => tag !== tagToRemove) || [],
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                setErrors({ ...errors, title: '' });
              }}
              required
            />
            {errors.title && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              placeholder="Brief summary of the blog post"
              rows={3}
              value={formData.excerpt}
              onChange={(e) => {
                setFormData({ ...formData, excerpt: e.target.value });
                setErrors({ ...errors, excerpt: '' });
              }}
            />
            {errors.excerpt && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.excerpt}</p>
            )}
            <p className="text-xs text-gray-500">
              {formData.excerpt?.length || 0}/500 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              placeholder="Write your blog content here..."
              rows={12}
              value={formData.content}
              onChange={(e) => {
                setFormData({ ...formData, content: e.target.value });
                setErrors({ ...errors, content: '' });
              }}
              required
            />
            {errors.content && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.content}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add a tag"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button type="button" onClick={addTag} variant="outline">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input
              id="seoTitle"
              placeholder="SEO optimized title"
              value={formData.seoTitle}
              onChange={(e) => {
                setFormData({ ...formData, seoTitle: e.target.value });
                setErrors({ ...errors, seoTitle: '' });
              }}
            />
            {errors.seoTitle && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.seoTitle}</p>
            )}
            <p className="text-xs text-gray-500">
              {formData.seoTitle?.length || 0}/60 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea
              id="seoDescription"
              placeholder="SEO optimized description"
              rows={3}
              value={formData.seoDescription}
              onChange={(e) => {
                setFormData({ ...formData, seoDescription: e.target.value });
                setErrors({ ...errors, seoDescription: '' });
              }}
            />
            {errors.seoDescription && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.seoDescription}</p>
            )}
            <p className="text-xs text-gray-500">
              {formData.seoDescription?.length || 0}/160 characters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Publishing Options */}
      <Card>
        <CardHeader>
          <CardTitle>Publishing Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="published">Publish Blog</Label>
              <p className="text-sm text-gray-500">Make this blog visible to the public</p>
            </div>
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, published: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="featured">Featured Blog</Label>
              <p className="text-sm text-gray-500">Show this blog in featured section</p>
            </div>
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, featured: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={isLoading} className="w-full" size="lg">
        {isLoading ? 'Saving...' : 'Save Blog'}
      </Button>
    </form>
  );
}