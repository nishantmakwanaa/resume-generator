
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

interface HeaderData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  summary: string;
}

interface ResumeSectionHeaderProps {
  data: HeaderData;
  onChange: (data: HeaderData) => void;
}

const ResumeSectionHeader: React.FC<ResumeSectionHeaderProps> = ({
  data,
  onChange,
}) => {
  const updateField = (field: keyof HeaderData, value: string) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Software Engineer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="john.doe@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone
          </Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="website" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Website
          </Label>
          <Input
            id="website"
            value={data.website}
            onChange={(e) => updateField('website', e.target.value)}
            placeholder="www.johndoe.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => updateField('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={data.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          placeholder="Experienced software engineer with a passion for developing innovative solutions..."
          rows={4}
        />
      </div>
    </div>
  );
};

export default ResumeSectionHeader;
