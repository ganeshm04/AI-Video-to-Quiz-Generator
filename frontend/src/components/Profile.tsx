import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Video {
  id: string;
  filename: string;
  originalName: string;
  status: string;
  createdAt: string;
}

interface UserProfile {
  name: string;
  email: string;
  videos: string[];
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setUser(res.data))
      .catch(() => setError('Failed to load profile'));
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/videos/my`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setVideos(res.data))
      .catch(() => setError('Failed to load videos'))
      .finally(() => setLoading(false));  }, [videos,user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Profile</h2>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
        </div>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
      <h3 className="text-xl font-semibold mb-2">Uploaded Videos</h3>
      <ul className="space-y-2">
        {videos.length === 0 && <li>No videos uploaded yet.</li>}
        {videos.map(video => (          <li key={video.id} className="border p-2 rounded">
            <div className="font-medium">{video.originalName}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
