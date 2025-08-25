import { forwardRef, useState } from 'react';
import { ImagePreviewDialog } from '../ImagePreviewDialog';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type Props = {};

export const ImageCaptureUploader = forwardRef<HTMLInputElement, Props>((_, ref) => {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const isFromCamera = (file: File): boolean => {
    const now = Date.now();
    return now - file.lastModified < 10_000;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isFromCamera(file)) {
      uploadImage(file);
    } else {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      handleOpen();
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const token = localStorage.getItem('token');
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/diagnosis';
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      };
      await axios
        .post(url, formData, { headers })
        .then(res => {
          console.log(res.data);
          router.push(`http://localhost:3000/mypage/diagnoses/${res.data.id}`);
        })
        .catch(err => console.log(err));
      alert('アップロード成功');
    } catch (error) {
      console.error(error);
      alert('アップロードに失敗しました。');
    }
  };

  const onConfirm = () => {
    if (selectedFile) {
      uploadImage(selectedFile);
      handleClose();
    }
  };

  return (
    <>
      <input
        type="file"
        ref={ref}
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {open && (
        <ImagePreviewDialog
          open={open}
          previewUrl={previewUrl}
          onConfirm={onConfirm}
          onClose={handleClose}
        />
      )}
    </>
  );
});
