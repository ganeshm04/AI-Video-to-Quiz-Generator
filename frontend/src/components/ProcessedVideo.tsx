import React, { useState } from 'react';
import { Download, FileText, File, Video, Clock, Database, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';

// Type definitions
interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

interface Segment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  questions: Question[];
}

interface VideoData {
  _id: string;
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  status: string;
  progress: number;
  currentStep: string;
  uploadDate: string;
  transcript: string;
  segments: Segment[];
  createdAt: string;
  updatedAt: string;
  duration: number;
}

type TabType = 'overview' | 'transcript' | 'questions';

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ProcessedVideoProps {
  videoData: VideoData | null;
  loading: boolean;
  error: string | null;
}

const ProcessedVideo: React.FC<ProcessedVideoProps> = ({ videoData, loading, error }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
 


  // Sample data structure for fallback (keeping original structure)
  const sampleVideoData: VideoData = {
    "_id": "6831b558b4dee3410d3142eb",
    "id": "6ab9b5c0-9acd-4479-a0f2-74e30c3e093a",
    "filename": "video-1748088151484-122418722.mp4",
    "originalName": "Video Editing Demo - Made with Clipchamp.mp4",
    "mimetype": "video/mp4",
    "size": 62955908,
    "status": "completed",
    "progress": 100,
    "currentStep": "Processing completed successfully!",
    "uploadDate": "2025-05-24T12:02:32.577Z",
    "transcript": "Hi there, my name is Ganesh and this is my walkthrough of my video editor backend project. This is ExpressJS, WordPress SQL, with this over M and FM and PG for video processing. The goal of this application is to provide a scalable backend services for web-based video editor. Following the given assignment structure, it supports uploading videos, trimming, trimming and adding subtitles, rendering final of and downloading the result all by a few interesting APIs. So let me show you the GitHub repository. And here is the GitHub repository and readme file which includes the structured format of the application. So let me get through our project. So I have to build it. So let's start with the upload feature. So I have built a basic intent to interact with the backend here. Here I will select a sample file and upload it. So this is a basic intent to interact with the backend. So I will choose a video to... I will take this. So I will upload now. When I upload the video gets saved into the database and the server extracts metadata, like duration, size and file name using FM, FF, MP, and all of this is auditing database via Prisma. So when I take upload... So I will show the entry. So here is the entry of the new video product. So I will copy the idea of the video and I will upload it. So you can see the new entry made in database. And I am using super-based support presses 12 for database. So I selected the video ID. So let's go to the next part of the video, trimming the video. So in the front end, I will enter the video ID and I will like a wide to 15 seconds. So I will take a trim. So this ends the request to the AAS-Videos-ID slash trimming and what which was the FFM-BG to cut them that portion and save it to the directory. So the trimmer video gets a lot of... Here you can see the... As it ends successfully trim the video. So you can see the video is trimmed too. So the video is like one minute. Now we can see only 5 to 15 seconds of the... 10 seconds duration is trimmer term. So now let's go to the next part of the video. That is adding subtitles. So I will... Using the subtitle form, I can add a line of text and specify the start and intent. Correctly. This stores the subtitle into the database. And although the SAT file is not yet implemented. So the saving converting to SAT file is not working functionally. That's some... So the... When I enter the video ID and this is the... Triter... Start signal, let me give it to like 3 to 10 seconds. And I will add subtitles. So we can see that back and responded with success. So I will show... And since the subtitle is stored in the database, you can see the new entry in the database. Subtitle... See, this is the subtitle. We can see the new entry made in... And you can also see the ID to be made. It is also implemented in the database. We can see the start time file to 5 to 15 seconds. The video is streamed. And now let's go to the... Finally, we render the video. Like we select the ID. So... I will render this. So after rendering, I will download this video. So now let's go to our... I have implemented this locally. So I can see the final video of... I will show you. So you can see the successful accepted title has been laid on the video. And the video trimming has got down to... It's my part where I am matching with the postlates as well. And... I used it as a... Which was the routing. It's my overm for connection to... So the postlates as well database. So I created various functions for... To use fm. You can see the video pressing library. And here's the function secreted. So we can... So for trimming the video, it is the function like... The service has... And here is for creating a subtitle. And finally, adding text to the video. Which... It takes a subtitle from the database. And we'll always find out the video. And final render. And... Let's... So... The video panel which was the services of the fm.bj video. Processing library. Here it is the... Control of various controllers for uploading video. Trim video. And... Adding subtitles. The rendering video. And... Download video. So I am adding this controller to the... My router is as mentioned in the assignment. So the first... The uploadout. And second one is the... Trim route. And the one subtitle route. And fourth is render. And download. So... You can see the server is set up. And using express... For routing. And... This is the code for a security server. I... Basically... I use WilliamQ and... It is... It is implemented at the final stage. It is not working properly. But I tried my best to implement it for... Performing background tasks. So here is the code you can see. And... By now, I implemented local storage for... Floating and downloading videos. You can further scale it to... Make it... Getable by using Amazon history or like that. So... I also used the basic simple index arrangement too. So... The... The backend works. And the functioning of the backend. And... Here is the red memory file port. So... Thank you for taking the time to leave with this project. This was great tension challenge combining backend APIs. Video processing time for you. The full source code will be... In the GitHub repo. You can see this in my GitHub repo. You can visit and I will be posted in the... Assignment. Watch the meeting. Thank you.",
    "segments": [
      {
        "id": "cc0c2bff-92d8-4fab-b256-067ef9cf6639",
        "startTime": 0,
        "endTime": 300,
        "text": "Hi there, my name is Ganesh and this is my walkthrough of my video editor backend project...",
        "questions": [
          {
            "id": "8a1dd040-4df7-4845-85aa-8d2d0bf6c0f0",
            "question": "What is the main purpose of the application discussed in this walkthrough?",
            "options": [
              "To build a simple video player",
              "To create a scalable backend for a web-based video editor",
              "To develop a photo editing software",
              "To design a database management system"
            ],
            "correctAnswer": 1,
            "difficulty": "medium",
            "topic": "Application Purpose"
          },
          {
            "id": "d0fb88fc-32cf-473c-ba7c-a804fa1832b9",
            "question": "Which tool is used for video processing in the application?",
            "options": [
              "M and FM",
              "WordPress SQL",
              "PG",
              "FF, MP"
            ],
            "correctAnswer": 3,
            "difficulty": "easy",
            "topic": "Video Processing"
          },
          {
            "id": "54cbe356-2240-41a7-a364-607a8ee62684",
            "question": "Which database system is used for auditing in the application?",
            "options": [
              "PostgreSQL",
              "MySQL",
              "MongoDB",
              "SQLite"
            ],
            "correctAnswer": 1,
            "difficulty": "medium",
            "topic": "Database"
          },
          {
            "id": "6822db19-c2b6-4983-bcbf-59f220593a9a",
            "question": "What does the trimming feature allow in the video editor application?",
            "options": [
              "Allows users to add effects to videos",
              "Allows users to edit audio tracks of a video",
              "Allows users to split videos into multiple clips",
              "Allows users to adjust video resolution"
            ],
            "correctAnswer": 2,
            "difficulty": "hard",
            "topic": "Trimming Feature"
          }
        ]
      }
    ],
    "createdAt": "2025-05-24T12:02:32.586Z",
    "updatedAt": "2025-05-24T12:09:32.565Z",
    "duration":3000
  };

  // Use fetched data or fallback to sample data
  const currentVideoData: VideoData = videoData || sampleVideoData;

  const formatFileSize = (bytes: number): string => {
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i: number = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  const exportToJSON = (): void => {
    const exportData = {
      originalName: currentVideoData.originalName,
      size: formatFileSize(currentVideoData.size),
      transcript: currentVideoData.transcript,
      segments: currentVideoData.segments.map(segment => ({
        text: segment.text,
        questions: segment.questions
      }))
    };
    
    const dataStr: string = JSON.stringify(exportData, null, 2);
    const dataBlob: Blob = new Blob([dataStr], { type: 'application/json' });
    const url: string = URL.createObjectURL(dataBlob);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = `video-data-${currentVideoData.originalName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToPDF = (): void => {
    let pdfContent: string = `
VIDEO DATA EXPORT
================

Basic Information:
- ID: ${currentVideoData.id}
- Original Name: ${currentVideoData.originalName}
- File Name: ${currentVideoData.filename}
- Size: ${formatFileSize(currentVideoData.size)}
- Status: ${currentVideoData.status}
- Progress: ${currentVideoData.progress}%
- Upload Date: ${formatDate(currentVideoData.uploadDate)}
- Created: ${formatDate(currentVideoData.createdAt)}
- Updated: ${formatDate(currentVideoData.updatedAt)}

TRANSCRIPT:
===========
${currentVideoData.transcript}

QUIZ QUESTIONS:
===============
`;

    // Loop through all segments to include all questions
    currentVideoData.segments.forEach((segment, segmentIndex) => {
      segment.questions.forEach((q: Question, index: number) => {
        pdfContent += `
Segment ${segmentIndex + 1}:
Question ${index + 1}: ${q.question}
Topic: ${q.topic}
Difficulty: ${q.difficulty}
Options:
${q.options.map((opt: string, i: number) => `  ${i + 1}. ${opt}`).join('\n')}
Correct Answer: ${q.options[q.correctAnswer]}

`;
      });
    });

    const element: HTMLAnchorElement = document.createElement('a');
    const file: Blob = new Blob([pdfContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `video-data-${currentVideoData.originalName}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getDifficultyColor = (difficulty: Question['difficulty']): string => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tabConfigs: TabConfig[] = [
    { id: 'overview', label: 'Overview', icon: File },
    { id: 'transcript', label: 'Transcript', icon: FileText },
    { id: 'questions', label: 'Quiz Questions', icon: Database }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <h3 className="text-sm font-medium text-red-800">Error fetching video data</h3>
            </div>
            <p className="mt-1 text-sm text-red-700">{error}</p>
            <p className="mt-2 text-xs text-red-600">
              Make sure your backend server is running on http://localhost:5000 and the video ID is correct.
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-12 mb-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-gray-600">Fetching video data...</p>
            </div>
          </div>
        )}

        {/* Main Content - Only show if we have data and not loading */}
        {!loading && currentVideoData && (
          <>
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Video className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-gray-600">File Information</p>
                <h1 className="text-2xl font-bold text-gray-900">{currentVideoData.originalName}</h1>
              </div>
            </div>
            <div className="flex flex-col space-x-3 border border-2 solid rounded-lg">
              <div className='items-center m-3 text-xl'>
              <p>Export Transcript and MCQ's</p>
              </div>
              <div className='flex flex-row gap-5 m-auto mb-2'>
              <button
                onClick={exportToJSON}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                <Download className="h-5 w-5" />
                <span>JSON</span>
              </button>
              <button
                onClick={exportToPDF}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                <File className="h-5 w-5" />
                <span>TXT</span>
              </button>
              </div>
              
            </div>
          </div>

          {/* Status Bar */}
          {/* <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              {currentVideoData.status === 'completed' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span className="font-medium text-gray-900">{currentVideoData.currentStep}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Progress: {currentVideoData.progress}%</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentVideoData.progress}%` }}
                ></div>
              </div>
            </div> 
          </div> */}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabConfigs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">File Size</p>
                        <p className="text-2xl font-bold">{formatFileSize(currentVideoData.size)}</p>
                      </div>
                      <File className="h-8 w-8 text-blue-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Duration</p>
                        <p className="text-2xl font-bold">
                          {currentVideoData.segments.reduce((total, segment) => total + (segment.endTime - segment.startTime) / 60, 0)} min
                        </p>
                      </div>
                      <Clock className="h-8 w-8 text-green-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Questions</p>
                        <p className="text-2xl font-bold">
                          {currentVideoData.segments.reduce((total, segment) => total + segment.questions.length, 0)}
                        </p>
                      </div>
                      <Database className="h-8 w-8 text-purple-200" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Video Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Number of Segments:</span>
                        <span className="text-gray-900">{currentVideoData.segments.length}</span>
                      </div>
                      {currentVideoData.segments.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Segment Duration:</span>
                          <span className="text-gray-900">{((currentVideoData.segments[0].endTime - currentVideoData.segments[0].startTime))} seconds</span>
                        </div>
                      )}
                      {/* <div className="flex justify-between">
                        <span className="text-gray-600">Total Video Duration:</span>
                        <span className="text-gray-900">{currentVideoData.duration ? (currentVideoData.duration / 1000).toFixed(2) + ' seconds' : 'N/A'}</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transcript Tab */}
            {activeTab === 'transcript' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Video Transcript</h3>
                <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto space-y-4">
                  {currentVideoData.segments.map((segment, index) => (
                    <div key={segment.id} className="border p-4 mb-2 rounded-lg bg-gray-50">
                      <p className="font-semibold text-gray-800 mb-1">{`${(segment.startTime / 60)} min - ${(segment.endTime / 60)} min`}</p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {segment.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Questions Tab */}
            {activeTab === 'questions' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Questions</h3>
                <div className="space-y-6">
                  {currentVideoData.segments.map((segment) => (
                    <div key={segment.id}>
                      <h4 className="text-lg font-semibold text-white mb-4 border p-4 mb-2 rounded-lg bg-gray-500">{`Questions for Segment ${(segment.startTime / 60)} min - ${(segment.endTime / 60)} min`}</h4>
                      <div className="space-y-6">
                        {segment.questions.map((question: Question, index: number) => (
                          <div key={question.id} className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                                    Question {index + 1}
                                  </span>
                                  <span className={`text-xs font-medium px-2 py-1 rounded ${getDifficultyColor(question.difficulty)}`}>
                                    {question.difficulty}
                                  </span>
                                  <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                                    {question.topic}
                                  </span>
                                </div>
                                <h4 className="text-lg font-medium text-gray-900 mb-4">{question.question}</h4>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              {question.options.map((option: string, optionIndex: number) => (
                                <div
                                  key={optionIndex}
                                  className={`p-3 rounded-lg border ${
                                    optionIndex === question.correctAnswer
                                      ? 'bg-green-300 border-green-200 text-green-800'
                                      : 'bg-white border-gray-200 text-gray-700'
                                  }`}
                                >
                                  <div className="flex items-center space-x-3">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                                      optionIndex === question.correctAnswer
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-600'
                                    }`}>
                                      {String.fromCharCode(65 + optionIndex)}
                                    </span>
                                    <span>{option}</span>
                                    {optionIndex === question.correctAnswer && (
                                      <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default ProcessedVideo;