"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThesisForm } from '@/components/ThesisForm';
import { ChapterWriter } from '@/components/ChapterWriter';

export default function Home() {
  const [thesisData, setThesisData] = useState(null);

  const handleThesisSubmit = (data) => {
    setThesisData(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tesis Writer</h1>
      {!thesisData ? (
        <ThesisForm onSubmit={handleThesisSubmit} />
      ) : (
        <ChapterWriter thesisData={thesisData} />
      )}
    </div>
  );
}