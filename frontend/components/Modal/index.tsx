'use client';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { forwardRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = object;

export const ImageCaptureUploader = forwardRef<HTMLInputElement, Props>((_props, ref) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const router = useRouter();

  const isFromCamera = (file: File): boolean => {
    const now = Date.now();
    return now - file.lastModified < 10_000;
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const token = localStorage.getItem('token');
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/diagnosis';
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      await axios
        .post(url, { formData }, { headers })
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isFromCamera(file)) {
      uploadImage(file);
    } else {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsPreviewOpen(true);
    }
  };

  const confirmUpload = () => {
    if (selectedFile) {
      uploadImage(selectedFile);
      setIsPreviewOpen(false);
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
      <Modal open={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            textAlign: 'center',
            width: 320,
          }}
        >
          <Typography variant="subtitle1">この写真をアップロードしますか？</Typography>
          {previewUrl && (
            <Box
              component="img"
              src={previewUrl}
              alt="プレビュー"
              sx={{ width: '100%', borderRadius: 2, mt: 2 }}
            />
          )}
          <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
            <Button variant="outlined" onClick={() => setIsPreviewOpen(false)}>
              キャンセル
            </Button>
            <Button variant="contained" onClick={confirmUpload}>
              アップロード
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
});

ImageCaptureUploader.displayName = 'ImageCaptureUploader';
