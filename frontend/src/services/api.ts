// frontend/src/services/api.ts
import axios from 'axios';
import type { VideoData, UploadResponse } from '../types';
import { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, // 5 minutes for file upload
});

export const uploadVideo = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('video', file);

  const response = await api.post<UploadResponse>('/videos/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      const progress = progressEvent.total
        ? Math.round((progressEvent.loaded / progressEvent.total) * 100)
        : 0;
      console.log(`Upload progress: ${progress}%`);
    },
  });

  return response.data;
};

export const getVideoStatus = async (videoId: string): Promise<VideoData> => {
  const response = await api.get<VideoData>(`/videos/${videoId}`);
  return response.data;
};

export const getAllVideos = async (): Promise<VideoData[]> => {
  const response = await api.get<VideoData[]>('/videos');
  return response.data;
};

export const exportQuiz = async (videoId: string, format: 'json' | 'csv') => {
  const response = await api.get(`/videos/${videoId}/export`, {
    params: { format },
    responseType: 'blob',
  });

  const blob = new Blob([response.data]);
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `quiz-${videoId}.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export function useUserProfileAndVideos(isAuthenticated: boolean) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [videos, setVideos] = useState<{ id: string; originalName: string }[]>([]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const token = localStorage.getItem('token');
    if (!token) return;
    axios.get(`${API_BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setUser({ name: res.data.name, email: res.data.email }))
      .catch(() => setUser(null));
    axios.get(`${API_BASE_URL}/videos/my`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        // Ensure each video has id and originalName
        const mapped = res.data.map((v: { id?: string; _id?: string; originalName?: string; filename?: string }) => ({
          id: v.id || v._id || '',
          originalName: v.originalName || v.filename || '',
        }));
        setVideos(mapped);
      })
      .catch(() => setVideos([]));
  }, [isAuthenticated]);

  return { user, videos };
}