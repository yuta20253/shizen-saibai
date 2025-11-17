'use client';
import { ImagePreviewDialog } from '../ImagePreviewDialog';
import axios from 'axios';
import React, { forwardRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Box, type AlertColor } from '@mui/material';

type Props = object;

export const ImageCaptureUploader = forwardRef<HTMLInputElement, Props>((_, ref) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, SetAlertSeverity] = useState<AlertColor | null>(null);

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
          router.push(process.env.NEXT_PUBLIC_FRONT_BASE_URL + `/mypage/diagnoses/${res.data.id}`);
        })
        .catch(err => console.log(err));
      setAlertMessage('アップロード成功');
      SetAlertSeverity('success');
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

      {alertMessage && alertSeverity && (
        <Box
          sx={{
            position: 'fixed',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1300,
            width: '90%',
            maxWidth: 400,
          }}
        >
          <Alert severity={alertSeverity} onClose={() => setAlertMessage(null)}>
            {alertMessage}
          </Alert>
        </Box>
      )}

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

ImageCaptureUploader.displayName = 'ImageCaptureUploader';
