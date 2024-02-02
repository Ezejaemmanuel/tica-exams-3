"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDropzone } from 'react-dropzone';
import Image from "next/image";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface UploadResponse {
    data: { Key: string };
    error: Error | null;
}

interface PublicUrlResponse {
    publicURL: string | null;
}

export default function PaymentProofUploader({ examId_ }: { examId_?: string }) {
    console.log("this is the exam id ooooo", examId_);
    const router = useRouter();
    const searchParams = useSearchParams();
    const examId = searchParams.get("examId") ?? examId_;
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

    const mutation = useMutation<string, Error, string>({
        mutationFn: async (imageUrl: string) => {
            const response = await fetch(`/api/payment-proof?examId=${examId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            return response.json();
        },
        onError(error, variables, context) {
            toast.error('Failed to process payment proof: ' + error.message);
        },
        onSuccess(data, variables, context) {
            toast.loading(` redirecting to confirmattion page `, { duration: 1000, important: true })
            setTimeout(() => {
                router.push(`/waiting-for-confirmation`);
            }, 1000);
        },
    });
    if (!examId) {
        throw new Error("exam id for the payment is not provided");
    }
    const handleUpload = async () => {
        if (uploadedImage) {
            // Generate a unique file name
            const filename = `proof-of-payment-${uploadedImage.name}-${examId}`;

            try {
                // Start the upload and show the toast for upload progress


                // Await the upload result
                const fromSupabase = supabase.storage
                    .from('tica-payments')
                    .upload(filename, uploadedImage, {
                        cacheControl: '3600',
                        upsert: true,
                    });
                toast.promise(
                    fromSupabase,
                    {
                        loading: 'Processing payment proof...',
                        success: 'Proof of payment processed successfully!',
                        error: 'Failed to process proof of payment!',
                    }
                );
                const { data, error } = await fromSupabase;
                console.log("this is the data from supabase", data);
                if (error) {
                    toast.error('Failed to upload image: ' + error.message);
                    return;
                }

                // Get the public URL of the uploaded image
                const publicUrlResponse = supabase.storage.from('tica-payments').getPublicUrl(filename);
                const publicURL = publicUrlResponse.data.publicUrl;

                // Start the mutation and show the toast for processing payment proof
                toast.promise(
                    mutation.mutateAsync(publicURL),
                    {
                        loading: 'Processing payment proof...',
                        success: 'Proof of payment processed successfully!',
                        error: 'Failed to process proof of payment!',
                    }
                );

                // Await the mutation result
            } catch (error) {
                const message = (error as Error).message;
                toast.error(message);
            }
        } else {
            toast.error('Please select an image to upload.');
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center p-6">
                <div className="mb-4 text-center">
                    <p>Please make a transfer of 1500 Naira and drop the image here as proof.</p>
                </div>
                <div {...getRootProps()} className="flex flex-col items-center justify-center p-10 border-2 border-dashed">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the image here...</p>
                    ) : (
                        <p>Drag and drop an image here, or click to select a file</p>
                    )}
                </div>
                {imagePreviewUrl && (
                    <div className="mt-4  w-full h-auto "> {/* Adjust width and height as needed */}
                        <Image
                            src={imagePreviewUrl}
                            alt="Uploaded"
                            className="" // Use the class from your CSS module
                            width={300} // Set a specific width or use 100% for full width
                            height={500} // Set a specific height
                        />
                    </div>
                )}
                {imagePreviewUrl && (
                    <Button onClick={handleUpload} disabled={mutation.isPending} className="mt-4 disabled:bg-pink-400 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Upload Proof of Payment
                    </Button>
                )}
            </div>
        </>
    );
}
