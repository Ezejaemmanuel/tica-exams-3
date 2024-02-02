// ProfilePhotoUploader.tsx
import { useState } from "react";
import { useDropzone } from 'react-dropzone';
import Image from "next/image";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/supabase";
import { Button } from "@/components/ui/button";

interface ProfilePhotoUploaderProps {
    onUploadSuccess: (url: string) => void; // Callback prop for successful upload
}

export default function ProfilePhotoUploader({ onUploadSuccess }: ProfilePhotoUploaderProps) {
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles: File[]) => {
            setUploadedImage(acceptedFiles[0]);
            setImagePreviewUrl(URL.createObjectURL(acceptedFiles[0]));
        },
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".bmp", ".gif", ".tif", ".tiff", ".webp"]
        },
        multiple: false,
    });

    const handleUpload = async () => {
        if (uploadedImage) {
            const filename = `profile-photos/${new Date().toISOString()}-${uploadedImage.name}`;

            try {
                const { data, error } = await supabase.storage
                    .from('tica-payments')
                    .upload(filename, uploadedImage, {
                        cacheControl: '3600',
                        upsert: false,
                    });

                if (error) throw new Error(error.message);

                const publicURL = supabase.storage.from('profile-photos').getPublicUrl(filename);

                if (!publicURL) throw new Error("Failed to get the public URL of the uploaded image");

                toast.success('Profile photo uploaded successfully!');
                onUploadSuccess(publicURL.data.publicUrl); // Invoke the callback with the public URL

            } catch (error) {
                toast.error('Upload failed: ');
            }
        } else {
            toast.error('Please select an image to upload.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
            <div {...getRootProps()} className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer">
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-gray-500 dark:text-gray-300">Drop the image here...</p>
                ) : (
                    <p className="text-gray-500 dark:text-gray-300">Drag and drop a profile image here, or click to select a file</p>
                )}
            </div>
            {imagePreviewUrl && (
                <div className="mt-4">
                    <Image
                        src={imagePreviewUrl}
                        alt="Uploaded Profile"
                        width={200}
                        height={200}
                        className="rounded-full"
                    />
                </div>
            )}
            {imagePreviewUrl && (
                <Button onClick={handleUpload} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Upload Profile Photo
                </Button>
            )}
        </div>
    );
}
