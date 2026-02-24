'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  PhoneOff,
  Monitor,
  MonitorOff,
  Users,
  MessageSquare,
  Settings,
  Maximize,
  Minimize,
  Hand,
  MoreVertical,
  Grid,
  LayoutGrid,
} from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isSpeaking?: boolean;
  isHost?: boolean;
  stream?: MediaStream;
}

interface VideoCallProps {
  roomId: string;
  currentUser: {
    id: string;
    name: string;
    avatar?: string;
  };
  participants?: Participant[];
  onLeave?: () => void;
  onToggleAudio?: (enabled: boolean) => void;
  onToggleVideo?: (enabled: boolean) => void;
  onShareScreen?: (sharing: boolean) => void;
  onRaiseHand?: () => void;
}

// Video Tile Component
function VideoTile({
  participant,
  isLarge = false,
  isSelf = false,
}: {
  participant: Participant;
  isLarge?: boolean;
  isSelf?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && participant.stream) {
      videoRef.current.srcObject = participant.stream;
    }
  }, [participant.stream]);

  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden bg-muted',
        isLarge ? 'aspect-video' : 'aspect-square',
        participant.isSpeaking && 'ring-2 ring-green-500'
      )}
    >
      {participant.isVideoEnabled && participant.stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={isSelf}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
          <Avatar
            src={participant.avatar}
            fallback={participant.name}
            size={isLarge ? '3xl' : 'xl'}
          />
        </div>
      )}

      {/* Participant Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-medium truncate">
              {participant.name}
              {isSelf && ' (You)'}
            </span>
            {participant.isHost && (
              <Badge variant="secondary" size="sm">
                Host
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {!participant.isAudioEnabled && (
              <div className="p-1 rounded-full bg-red-500">
                <MicOff className="h-3 w-3 text-white" />
              </div>
            )}
            {!participant.isVideoEnabled && (
              <div className="p-1 rounded-full bg-red-500">
                <VideoOff className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Speaking Indicator */}
      {participant.isSpeaking && (
        <div className="absolute top-3 left-3">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="flex gap-0.5"
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ height: ['8px', '16px', '8px'] }}
                transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                className="w-1 bg-green-500 rounded-full"
              />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export function VideoCall({
  roomId,
  currentUser,
  participants = [],
  onLeave,
  onToggleAudio,
  onToggleVideo,
  onShareScreen,
  onRaiseHand,
}: VideoCallProps) {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'spotlight'>('grid');
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  // Timer for call duration
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    onToggleAudio?.(!isAudioEnabled);
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    onToggleVideo?.(!isVideoEnabled);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    onShareScreen?.(!isScreenSharing);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const allParticipants: Participant[] = [
    {
      id: currentUser.id,
      name: currentUser.name,
      avatar: currentUser.avatar,
      isAudioEnabled,
      isVideoEnabled,
    },
    ...participants,
  ];

  // Determine grid layout based on participant count
  const getGridCols = () => {
    const count = allParticipants.length;
    if (count <= 1) return 'grid-cols-1';
    if (count <= 2) return 'grid-cols-2';
    if (count <= 4) return 'grid-cols-2';
    if (count <= 6) return 'grid-cols-3';
    return 'grid-cols-4';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-800/50">
        <div className="flex items-center gap-4">
          <h2 className="text-white font-semibold">Meeting Room</h2>
          <Badge variant="secondary" className="bg-red-500/20 text-red-400">
            <span className="h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse" />
            {formatDuration(callDuration)}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={() => setLayout(layout === 'grid' ? 'spotlight' : 'grid')}
          >
            {layout === 'grid' ? <LayoutGrid className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize className="h-5 w-5" />
            ) : (
              <Maximize className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 p-4">
          {layout === 'grid' ? (
            <div className={cn('grid gap-4 h-full', getGridCols())}>
              {allParticipants.map((participant, i) => (
                <VideoTile
                  key={participant.id}
                  participant={participant}
                  isSelf={participant.id === currentUser.id}
                />
              ))}
            </div>
          ) : (
            <div className="h-full flex gap-4">
              {/* Main Speaker */}
              <div className="flex-1">
                <VideoTile
                  participant={allParticipants[0]}
                  isLarge
                  isSelf={allParticipants[0].id === currentUser.id}
                />
              </div>
              {/* Sidebar */}
              {allParticipants.length > 1 && (
                <div className="w-48 space-y-2 overflow-y-auto">
                  {allParticipants.slice(1).map((participant) => (
                    <VideoTile
                      key={participant.id}
                      participant={participant}
                      isSelf={participant.id === currentUser.id}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Side Panels */}
        <AnimatePresence>
          {(showChat || showParticipants) && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-l border-slate-700 bg-slate-800"
            >
              {showParticipants && (
                <div className="p-4">
                  <h3 className="text-white font-medium mb-4">
                    Participants ({allParticipants.length})
                  </h3>
                  <div className="space-y-2">
                    {allParticipants.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700"
                      >
                        <Avatar src={p.avatar} fallback={p.name} size="sm" />
                        <span className="text-white text-sm flex-1 truncate">
                          {p.name}
                        </span>
                        <div className="flex gap-1">
                          {p.isAudioEnabled ? (
                            <Mic className="h-4 w-4 text-slate-400" />
                          ) : (
                            <MicOff className="h-4 w-4 text-red-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 py-6 bg-slate-800/50">
        <Button
          variant={isAudioEnabled ? 'secondary' : 'destructive'}
          size="lg"
          className="rounded-full h-14 w-14"
          onClick={toggleAudio}
        >
          {isAudioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
        </Button>

        <Button
          variant={isVideoEnabled ? 'secondary' : 'destructive'}
          size="lg"
          className="rounded-full h-14 w-14"
          onClick={toggleVideo}
        >
          {isVideoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
        </Button>

        <Button
          variant={isScreenSharing ? 'default' : 'secondary'}
          size="lg"
          className="rounded-full h-14 w-14"
          onClick={toggleScreenShare}
        >
          {isScreenSharing ? (
            <MonitorOff className="h-6 w-6" />
          ) : (
            <Monitor className="h-6 w-6" />
          )}
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="rounded-full h-14 w-14"
          onClick={onRaiseHand}
        >
          <Hand className="h-6 w-6" />
        </Button>

        <div className="w-px h-8 bg-slate-600 mx-2" />

        <Button
          variant={showParticipants ? 'default' : 'secondary'}
          size="lg"
          className="rounded-full h-14 w-14"
          onClick={() => {
            setShowParticipants(!showParticipants);
            setShowChat(false);
          }}
        >
          <Users className="h-6 w-6" />
        </Button>

        <Button
          variant={showChat ? 'default' : 'secondary'}
          size="lg"
          className="rounded-full h-14 w-14"
          onClick={() => {
            setShowChat(!showChat);
            setShowParticipants(false);
          }}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>

        <div className="w-px h-8 bg-slate-600 mx-2" />

        <Button
          variant="destructive"
          size="lg"
          className="rounded-full h-14 px-8"
          onClick={onLeave}
        >
          <PhoneOff className="h-6 w-6 mr-2" />
          Leave
        </Button>
      </div>
    </div>
  );
}
