'use client';
import { ImagePreviewDialog } from '../ImagePreviewDialog';
import axios from 'axios';
import React, { forwardRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Alert,
  Backdrop,
  Box,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
  type AlertColor,
} from '@mui/material';

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
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

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

    setUploading(true);
    setProgress(0);
    setAlertMessage(null);

    try {
      const token = localStorage.getItem('token');
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/diagnosis';

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: event => {
          if (!event.total) return;

          const progress = Math.round((event.loaded * 100) / event.total);

          setProgress(progress);
        },
      });

      setAlertMessage('アップロード成功');
      SetAlertSeverity('success');

      router.push(`/mypage/diagnoses/${response.data.id}`);
    } catch (error) {
      console.error(error);

      setAlertMessage('アップロードに失敗しました。');

      SetAlertSeverity('error');
    } finally {
      setUploading(false);
    }
  };

  const onConfirm = () => {
    if (selectedFile) {
      uploadImage(selectedFile);
      handleClose();
    }
  };

  const backDropLabel = uploading
    ? progress < 100
      ? `アップロード中... ${progress}%`
      : '送信完了。解析中...'
    : '';

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

      <Backdrop open={uploading} sx={{ color: '#fff', zIndex: '9999' }}>
        <Stack spacing={2} alignItems="center" sx={{ width: '80%', maxWidth: 360 }}>
          <CircularProgress />
          <Typography>{backDropLabel}</Typography>
          {progress < 100 ? (
            <LinearProgress variant="determinate" value={progress} />
          ) : (
            <LinearProgress variant="indeterminate" />
          )}
        </Stack>
      </Backdrop>
    </>
  );
});

ImageCaptureUploader.displayName = 'ImageCaptureUploader';
