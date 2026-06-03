'use client';

import axios from 'axios';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { ImagePreviewDialog } from '../ImagePreviewDialog';
import { CaptureGuide, HIDE_GUIDE_KEY } from '../CaptureGuide';
import { DiagnosisProgress } from '../DiagnosisProgress';

/** 親から uploader.open() を呼んで撮影フローを開始する。 */
export type ImageCaptureUploaderHandle = {
  open: () => void;
};

type ErrorState = {
  title: string;
  message: string;
  /** 同じファイルで再送できるか（一時的なエラー） */
  retryable: boolean;
};

type Props = object;

export const ImageCaptureUploader = forwardRef<ImageCaptureUploaderHandle, Props>((_, ref) => {
  const router = useRouter();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const albumInputRef = useRef<HTMLInputElement>(null);

  const [guideOpen, setGuideOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<ErrorState | null>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      // 「次回から表示しない」が選ばれていればガイドを飛ばしてカメラ起動
      if (typeof window !== 'undefined' && localStorage.getItem(HIDE_GUIDE_KEY) === '1') {
        cameraInputRef.current?.click();
      } else {
        setGuideOpen(true);
      }
    },
  }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // 同じファイル再選択を許可
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setPreviewOpen(true);
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/v1/diagnosis';
      const response = await axios.post(url, formData, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: event => {
          if (!event.total) return;
          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      });
      router.push(`/mypage/diagnoses/${response.data.id}`);
    } catch (err) {
      console.error(err);
      setError(toErrorState(err));
    } finally {
      setUploading(false);
    }
  };

  const handleConfirmPreview = () => {
    setPreviewOpen(false);
    if (selectedFile) uploadImage(selectedFile);
  };

  const handleRetry = () => {
    setError(null);
    if (selectedFile) uploadImage(selectedFile);
  };

  const handleRetake = () => {
    setError(null);
    setGuideOpen(true);
  };

  return (
    <>
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={albumInputRef}
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <CaptureGuide
        open={guideOpen}
        onClose={() => setGuideOpen(false)}
        onPickCamera={() => {
          setGuideOpen(false);
          cameraInputRef.current?.click();
        }}
        onPickAlbum={() => {
          setGuideOpen(false);
          albumInputRef.current?.click();
        }}
      />

      {previewOpen && (
        <ImagePreviewDialog
          open={previewOpen}
          previewUrl={previewUrl}
          onConfirm={handleConfirmPreview}
          onClose={() => setPreviewOpen(false)}
        />
      )}

      <DiagnosisProgress open={uploading} progress={progress} />

      <Dialog open={!!error} onClose={() => setError(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800 }}>{error?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'text.secondary' }}>{error?.message}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setError(null)} color="inherit">
            閉じる
          </Button>
          {error?.retryable ? (
            <Button variant="contained" onClick={handleRetry}>
              もう一度送信
            </Button>
          ) : (
            <Button variant="contained" onClick={handleRetake}>
              撮り直す
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
});

ImageCaptureUploader.displayName = 'ImageCaptureUploader';

// バックエンドのステータスに応じてユーザー向けの案内を組み立てる
const toErrorState = (err: unknown): ErrorState => {
  const status = axios.isAxiosError(err) ? err.response?.status : undefined;
  if (status === 400 || status === 422) {
    return {
      title: 'うまく読み取れませんでした',
      message: '雑草がはっきり写るように、もう一度撮ってみてください。',
      retryable: false,
    };
  }
  if (status === 429) {
    return {
      title: '少し時間をおいてください',
      message: 'アクセスが集中しています。しばらくしてからもう一度お試しください。',
      retryable: true,
    };
  }
  return {
    title: '送信に失敗しました',
    message: '通信環境を確認して、もう一度お試しください。',
    retryable: true,
  };
};
