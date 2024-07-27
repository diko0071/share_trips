'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    LoaderCircle,
    Sparkles,
    SendHorizontal
  } from "lucide-react"
import ApiService from '../../services/apiService';

interface PromptWindowProps {
    onSubmit: (response: any) => void;
    onClose: () => void;
    action: string;
}

export default function PromptWindow({ onSubmit, onClose, action }: PromptWindowProps) {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const formDataToSend = JSON.stringify({ prompt, action });
            const data = await ApiService.post_auth('/api/trip/generate/', formDataToSend);
            onSubmit(data);
        } catch (error) {
            console.error("Error submitting prompt:", error);
        } finally {
            setLoading(false);
            setPrompt('');
            onClose();
        }
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
            <Button variant="outline" size="icon" onClick={handleSubmit} disabled={loading}>
                {loading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <SendHorizontal className="w-4 h-4" />}
            </Button>
        </div>
    )
}