'use client'
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    LoaderCircle,
    Sparkles,
    SendHorizontal
  } from "lucide-react"
interface PromptWindowProps {
    onSubmit: (prompt: string, action: string) => void;
    onClose: () => void;
    action: string;
}

export default function PromptWindow({ onSubmit, onClose, action }: PromptWindowProps) {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = () => {
        console.log('Submitting prompt:', prompt);
        onSubmit(prompt, action);
        setPrompt('');
        onClose();
    };

    return (
        <div className="flex items-center border px-4 py-2 shadow-md border-gray-200 rounded-lg">
            <Sparkles className="text-purple-500 w-4 h-4" />
            <Input
                type="text"
                placeholder="Ask AI to describe your trip..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 px-2 py-1 border-none outline-none text-sm focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none focus-visible:ring-offset-0 w-full" 
            />
            <Button variant="outline" size="icon" onClick={handleSubmit}>
                <SendHorizontal className="w-4 h-4" />
            </Button>
        </div>
    )
}