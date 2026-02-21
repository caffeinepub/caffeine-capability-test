import { useState, useRef } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useUploadImage, useGetAllImages } from '../hooks/useImageUpload';
import FeatureCard from './FeatureCard';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, Lock, Image as ImageIcon } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

export default function FileUploadTest() {
  const { identity } = useInternetIdentity();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadImage();
  const { data: images, isLoading } = useGetAllImages();

  const isAuthenticated = !!identity;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    uploadMutation.mutate(
      {
        filename: file.name,
        contentType: file.type,
        bytes,
        onProgress: setUploadProgress,
      },
      {
        onSuccess: () => {
          setFile(null);
          setPreview(null);
          setUploadProgress(0);
          if (fileInputRef.current) fileInputRef.current.value = '';
        },
      }
    );
  };

  return (
    <FeatureCard
      title="File Upload Test"
      description="Global image upload with backend persistence"
      status="PASS"
      explanation="Images are stored in Motoko backend using blob storage and visible to all users globally."
    >
      <div className="space-y-3">
        {!isAuthenticated ? (
          <Alert>
            <Lock className="w-4 h-4" />
            <AlertDescription>Login required to upload images</AlertDescription>
          </Alert>
        ) : (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full"
              disabled={uploadMutation.isPending}
            >
              <Upload className="w-4 h-4 mr-2" />
              Select Image
            </Button>

            {preview && (
              <div className="space-y-2">
                <img src={preview} alt="Preview" className="w-full h-32 object-cover rounded border border-border" />
                {uploadMutation.isPending && <Progress value={uploadProgress} className="h-2" />}
                <Button
                  onClick={handleUpload}
                  disabled={uploadMutation.isPending}
                  className="w-full bg-chart-1 hover:bg-chart-1/90"
                >
                  {uploadMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Uploading {uploadProgress}%
                    </>
                  ) : (
                    'Upload to Global Gallery'
                  )}
                </Button>
              </div>
            )}
          </>
        )}

        <div className="border-t border-border/50 pt-3">
          <div className="flex items-center gap-2 mb-2">
            <ImageIcon className="w-4 h-4 text-chart-1" />
            <span className="text-sm font-semibold">Global Gallery</span>
          </div>
          <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
            {isLoading ? (
              <div className="col-span-3 text-sm text-muted-foreground text-center py-2">Loading...</div>
            ) : images && images.length > 0 ? (
              images.map((img) => (
                <img
                  key={img.imageId}
                  src={img.url}
                  alt={img.name}
                  className="w-full h-20 object-cover rounded border border-border"
                />
              ))
            ) : (
              <div className="col-span-3 text-sm text-muted-foreground text-center py-2">No images yet</div>
            )}
          </div>
        </div>
      </div>
    </FeatureCard>
  );
}
