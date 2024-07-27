import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons"
import ApiService from "../../services/apiService";
import Image from 'next/image'

interface GalleryImage {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: {
        original: string;
        large2x: string;
        large: string;
        medium: string;
        small: string;
    };
    liked: boolean;
    alt: string;
}

interface GalleryPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectImage: (imageUrl: string) => void;
    defaultSearchQuery?: string;
}

export default function GalleryPopup({ isOpen, onClose, onSelectImage, defaultSearchQuery = '' }: GalleryPopupProps) {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setSearchQuery(defaultSearchQuery);
            if (defaultSearchQuery) {
                fetchImages(defaultSearchQuery);
            }
        }
    }, [isOpen, defaultSearchQuery]);

    const handleImageClick = (image: GalleryImage) => {
        setSelectedImage(prevSelected => prevSelected?.id === image.id ? null : image);
    }

    const fetchImages = async (query: string) => {
        if (!query.trim()) {
            setError("Please enter a search term");
            setImages([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await ApiService.get(`/api/trip/image/search/?query=${encodeURIComponent(query)}`);
            setImages(Array.isArray(response.photos) ? response.photos : []);
        } catch (error) {
            console.error('Error fetching images:', error);
            setError("Failed to fetch images. Please try again.");
            setImages([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchImages(searchQuery);
    };

    const handleSelectImage = () => {
        if (selectedImage) {
            onSelectImage(selectedImage.src.original);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Select an Image</DialogTitle>
                    <DialogDescription>Choose an image from the gallery to use in your trip.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                    <Input
                        type="text"
                        placeholder="Search for images..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" disabled={isLoading}>
                        <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                        {isLoading ? 'Searching...' : 'Search'}
                    </Button>
                </form>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto max-h-[50vh]">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="relative cursor-pointer rounded-md"
                            onClick={() => handleImageClick(image)}
                        >
                            <img
                                src={image.src.large}
                                alt={image.alt}
                                className="w-full h-full object-cover rounded-md"
                            />
                            {selectedImage?.id === image.id && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                                    <CheckIcon className="w-8 h-8 text-white" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button onClick={handleSelectImage} disabled={!selectedImage}>
                        Select Image
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}