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

const thesisFormSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  statement: z.string().min(1, "El enunciado es requerido"),
  bibliography: z.string().min(1, "La bibliografía es requerida"),
});

export function ThesisForm({ onSubmit }) {
  const form = useForm({
    resolver: zodResolver(thesisFormSchema),
    defaultValues: {
      title: "",
      statement: "",
      bibliography: "",
    },
  });

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información de la Tesis</CardTitle>
        <CardDescription>Ingresa los detalles iniciales de tu tesis</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título de la Tesis</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa el título de tu tesis" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enunciado de la Tesis</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe el enunciado de tu tesis" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bibliography"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bibliografía</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ingresa la bibliografía (un autor por línea)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Comenzar a escribir</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}