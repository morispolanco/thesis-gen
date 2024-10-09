"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { generateChapterContent } from '@/lib/openrouter';

const chapterFormSchema = z.object({
  chapterTitle: z.string().min(1, "El título del capítulo es requerido"),
  centralIdea: z.string().min(1, "La idea central es requerida"),
});

export function ChapterWriter({ thesisData }) {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm({
    resolver: zodResolver(chapterFormSchema),
    defaultValues: {
      chapterTitle: "",
      centralIdea: "",
    },
  });

  const handleSubmit = async (data) => {
    setIsGenerating(true);
    try {
      const content = await generateChapterContent({
        thesisTitle: thesisData.title,
        thesisStatement: thesisData.statement,
        bibliography: thesisData.bibliography,
        chapterNumber: currentChapter,
        chapterTitle: data.chapterTitle,
        centralIdea: data.centralIdea,
      });
      setGeneratedContent(content);
      setCurrentChapter(currentChapter + 1);
    } catch (error) {
      console.error("Error generating chapter content:", error);
      setGeneratedContent("Error al generar el contenido del capítulo. Por favor, intenta de nuevo.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Capítulo {currentChapter}</CardTitle>
          <CardDescription>Ingresa los detalles del capítulo</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="chapterTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título del Capítulo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresa el título del capítulo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="centralIdea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idea Central</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe la idea central del capítulo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? "Generando..." : "Generar Capítulo"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card>
          <CardHeader>
            <CardTitle>Contenido Generado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap">{generatedContent}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}