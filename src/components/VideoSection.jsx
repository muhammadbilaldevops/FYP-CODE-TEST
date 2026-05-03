/**
 * VIDEO SECTION COMPONENT
 * 
 * Reusable video section with YouTube video player.
 * 
 * Student Note: This component provides:
 * - YouTube video embedding with IFrame API
 * - Play/pause controls
 * - Responsive video sizing
 * - Thumbnail overlay when paused
 * - Mobile-optimized video display
 * 
 * Key Features:
 * - YouTube IFrame API integration
 * - Custom play/pause button
 * - Responsive iframe sizing
 * - Error handling for API loading
 * 
 * Technical Concepts:
 * - useState: Manages play/pause state
 * - useEffect: Loads YouTube API and initializes player
 * - useRef: Stores player reference for control
 * - Regular expressions: Extract video ID from URL
 * - Dynamic iframe styling for responsive display
 */

import React, { useState, useEffect, useRef } from 'react';
import { FiPlay, FiPause } from 'react-icons/fi';

/**
 * Extract YouTube Video ID from URL
 * 
 * Student Note: This helper function extracts the video ID from various
 * YouTube URL formats. It uses regular expressions to match different patterns.
 * 
 * Supported formats:
 * - https://youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://youtube.com/embed/VIDEO_ID
 * - Direct video ID (11 characters)
 * 
 * @param {string} url - YouTube URL or video ID
 * @returns {string} - Extracted video ID or empty string
 */
const getYouTubeVideoId = (url) => {
  if (!url) return '';
  
  // Handle different YouTube URL formats
  // Student Note: Regular expressions match different YouTube URL patterns
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID (11 characters)
  ];
  
  // Try each pattern until one matches
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1]; // Return captured group (video ID)
  }
  
  return ''; // Return empty if no match
};

/**
 * VideoSection Component
 * 
 * Renders a YouTube video player with custom controls.
 * 
 * @param {string} videoUrl - YouTube video URL (default: installation video)
 * @returns {JSX.Element|null} The video section component or null if no video ID
 */
const VideoSection = ({ videoUrl = 'https://youtu.be/LQRn3lGw9G4' }) => {
  // State to track if video is playing
  // Student Note: false = paused, true = playing
  const [isPlaying, setIsPlaying] = useState(false);
  
  // State to store YouTube player instance
  // Student Note: Player object from YouTube IFrame API
  const [player, setPlayer] = useState(null);
  
  // Ref to store player reference for direct access
  // Student Note: useRef persists across re-renders without causing re-renders
  const playerRef = useRef(null);
  
  // State to detect mobile devices
  // Student Note: Used for responsive video sizing
  const [isMobile, setIsMobile] = useState(false);
  
  // Extract video ID from URL
  const youtubeId = getYouTubeVideoId(videoUrl);

  /**
   * Check if device is mobile
   * 
   * Student Note: This effect:
   * 1. Checks screen width on mount
   * 2. Listens for window resize events
   * 3. Updates isMobile state accordingly
   * 4. Cleanup removes event listener
   */
  useEffect(() => {
    const checkMobile = () => {
      // Mobile if width < 1024px (lg breakpoint)
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    // Cleanup: remove listener when component unmounts
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * Load YouTube IFrame API and Initialize Player
   * 
   * Student Note: This effect:
   * 1. Loads YouTube IFrame API script if not already loaded
   * 2. Creates YouTube player instance when API is ready
   * 3. Sets up event handlers for play/pause
   * 4. Handles errors gracefully
   * 
   * How YouTube API works:
   * - Script tag loads API from YouTube
   * - onYouTubeIframeAPIReady callback fires when API is ready
   * - new YT.Player() creates player instance
   * - Events (onReady, onStateChange) provide player state
   */
  useEffect(() => {
    if (youtubeId) {
      try {
        // Load YouTube IFrame API script if not already loaded
        // Student Note: Checks window.YT to avoid loading script multiple times
        if (!window.YT) {
          const tag = document.createElement('script');
          tag.src = 'https://www.youtube.com/iframe_api';
          tag.onerror = () => {
            // Only log errors in development mode
            if (import.meta.env.DEV) {
              console.error('Failed to load YouTube IFrame API');
            }
          };
          // Insert script tag before first existing script
          const firstScriptTag = document.getElementsByTagName('script')[0];
          if (firstScriptTag && firstScriptTag.parentNode) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          }
        }

        /**
         * Initialize Player When API is Ready
         * 
         * Student Note: This callback is called by YouTube API when it's loaded.
         * It creates a new player instance with specific configuration.
         */
        window.onYouTubeIframeAPIReady = () => {
          try {
            // Create YouTube player instance
            // Student Note: new YT.Player() creates embedded player
            // - videoId: The YouTube video to play
            // - playerVars: Configuration options
            // - events: Callbacks for player events
            const ytPlayer = new window.YT.Player(`youtube-video-player-${youtubeId}`, {
              videoId: youtubeId,
              // Player Configuration
              // Student Note: These options control player behavior
              playerVars: {
                autoplay: 0,        // Don't autoplay (user must click)
                mute: 1,           // Muted by default (required for autoplay in some browsers)
                loop: 1,           // Loop video
                playlist: youtubeId, // Required for looping
                controls: 0,        // Hide YouTube controls (we use custom button)
                rel: 0,            // Don't show related videos
                modestbranding: 1,  // Minimal YouTube branding
                playsinline: 1,     // Play inline on mobile
                iv_load_policy: 3,  // Hide video annotations
                cc_load_policy: 0,  // Hide captions by default
                fs: 0,             // Disable fullscreen
                disablekb: 1,      // Disable keyboard controls
                start: 10,         // Start at 10 seconds
                autohide: 1,       // Auto-hide controls
                showinfo: 0,       // Don't show video info
                wmode: 'opaque'    // For proper z-index handling
              },
              // Event Handlers
              events: {
                // Called when player is ready
                onReady: (event) => {
                  try {
                    setPlayer(event.target);
                    playerRef.current = event.target;
                    event.target.pauseVideo(); // Start paused
                    setIsPlaying(false);
                  } catch (error) {
                    if (import.meta.env.DEV) {
                      console.error('Error in YouTube player onReady:', error);
                    }
                  }
                },
                // Called when player state changes
                // Student Note: event.data values:
                // -1 = unstarted, 0 = ended, 1 = playing, 2 = paused, 3 = buffering, 5 = cued
                onStateChange: (event) => {
                  try {
                    if (event.data === 1) { // Playing
                      setIsPlaying(true);
                    } else if (event.data === 2) { // Paused
                      setIsPlaying(false);
                    }
                  } catch (error) {
                    if (import.meta.env.DEV) {
                      console.error('Error in YouTube player onStateChange:', error);
                    }
                  }
                }
              }
            });
          } catch (error) {
            if (import.meta.env.DEV) {
              console.error('Error initializing YouTube player:', error);
            }
          }
        };

        // If API is already loaded, initialize player immediately
        // Student Note: setTimeout gives DOM time to render iframe element
        if (window.YT && window.YT.Player) {
          setTimeout(() => {
            try {
              // Same player initialization as above
              const ytPlayer = new window.YT.Player(`youtube-video-player-${youtubeId}`, {
                videoId: youtubeId,
                playerVars: {
                  autoplay: 0,
                  mute: 1,
                  loop: 1,
                  playlist: youtubeId,
                  controls: 0,
                  rel: 0,
                  modestbranding: 1,
                  playsinline: 1,
                  iv_load_policy: 3,
                  cc_load_policy: 0,
                  fs: 0,
                  disablekb: 1,
                  start: 10,
                  autohide: 1,
                  showinfo: 0,
                  wmode: 'opaque'
                },
                events: {
                  onReady: (event) => {
                    try {
                      setPlayer(event.target);
                      playerRef.current = event.target;
                      event.target.pauseVideo();
                      setIsPlaying(false);
                    } catch (error) {
                      if (import.meta.env.DEV) {
                        console.error('Error in YouTube player onReady (already loaded):', error);
                      }
                    }
                  },
                  onStateChange: (event) => {
                    try {
                      if (event.data === 1) {
                        setIsPlaying(true);
                      } else if (event.data === 2) {
                        setIsPlaying(false);
                      }
                    } catch (error) {
                      if (import.meta.env.DEV) {
                        console.error('Error in YouTube player onStateChange (already loaded):', error);
                      }
                    }
                  }
                }
              });
            } catch (error) {
              if (import.meta.env.DEV) {
                console.error('Error initializing YouTube player (already loaded):', error);
              }
            }
          }, 1000); // Wait 1 second for DOM to be ready
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Error loading YouTube API:', error);
        }
      }
    }
  }, [youtubeId]); // Re-run if video URL changes

  /**
   * Toggle Play/Pause
   * 
   * Student Note: This function controls video playback
   * - Checks if player is available via playerRef
   * - Calls playVideo() or pauseVideo() based on current state
   * - Updates isPlaying state accordingly
   */
  const togglePlayPause = () => {
    try {
      if (playerRef.current) {
        if (isPlaying) {
          playerRef.current.pauseVideo();
          setIsPlaying(false);
        } else {
          playerRef.current.playVideo();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error toggling play/pause:', error);
      }
    }
  };

  // Get YouTube thumbnail URL for overlay
  // Student Note: YouTube provides thumbnail URLs in format:
  // https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg
  const thumbnailUrl = youtubeId 
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : '/logo.jpg';

  // Don't render if no valid video ID
  if (!youtubeId) return null;

  return (
    // Video Section
    // Student Note: Section with dark gradient background
    // - section-padding: Consistent padding with other sections
    // - bg-gradient-to-br: Diagonal gradient for visual appeal
    <section className="section-padding bg-gradient-to-br from-slate-900 to-slate-800 py-12 sm:py-16">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          {/* Section Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Watch Our Installation Process
          </h2>
          {/* Section Description */}
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
            See how we install solar systems with precision and care
          </p>
        </div>
        
        {/* Video Container */}
        {/* Student Note: Responsive video container
            - max-w-5xl: Maximum width constraint
            - Responsive heights: 400px mobile, 600px desktop
            - Rounded corners and shadow for depth
            - Border for visual definition */}
        <div className="relative w-full max-w-5xl mx-auto h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 border-green-500/20">
          {/* Video Container */}
          <div 
            className="relative w-full h-full group cursor-pointer"
            onClick={togglePlayPause}
          >
            {/* YouTube iframe */}
            {/* Student Note: YouTube embedded player
                - pointerEvents: 'none' prevents iframe from capturing clicks
                - Dynamic transform: Scales video for proper aspect ratio
                - Mobile: Normal size, Desktop: Scaled up to fill container
                - enablejsapi=1: Enables JavaScript API for control */}
            <iframe
              className="absolute inset-0 w-full h-full"
              style={{
                pointerEvents: 'none', // Allows clicks to pass through to button
                objectFit: 'cover',
                // Responsive scaling: larger scale on desktop for better fill
                transform: isMobile ? 'scale(1)' : 'scale(1.79)',
                transformOrigin: 'center center',
                width: isMobile ? '100%' : '179%',
                height: isMobile ? '100%' : '179%',
                left: isMobile ? '0%' : '-39.5%', // Center scaled video
                top: isMobile ? '0%' : '-32%'      // Center scaled video
              }}
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&mute=1&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&start=10&iv_load_policy=3&cc_load_policy=0&fs=0&disablekb=1&vq=hd1080&quality=high&autohide=1&wmode=opaque&origin=${window.location.origin}`}
              title="Solar Installation Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen={false}
              id={`youtube-video-player-${youtubeId}`}
            ></iframe>

            {/* Thumbnail Overlay - Shows when paused */}
            {/* Student Note: Shows YouTube thumbnail when video is paused
                - Provides visual preview before playing
                - Dark overlay improves button visibility */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 bg-cover bg-center z-10"
                style={{
                  backgroundImage: `url(${thumbnailUrl}), url(/logo.jpg)`, // Fallback to logo
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Dark overlay for better button visibility */}
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
            )}

            {/* Play/Pause Button - Center */}
            {/* Student Note: Custom control button
                - Positioned absolutely in center
                - z-20: Appears above video and thumbnail
                - Touch-friendly size (min 44x44px)
                - Shows play icon when paused, pause icon when playing
                - Hides when playing but reappears on hover */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full p-3 sm:p-4 shadow-2xl transition-all duration-300 transform min-w-[56px] min-h-[56px] flex items-center justify-center ${
                isPlaying 
                  ? 'bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-110' 
                  : 'bg-white/90 hover:bg-white opacity-100 scale-110'
              }`}
            >
              {/* Conditional icon rendering */}
              {isPlaying ? (
                <FiPause className="text-2xl sm:text-3xl md:text-4xl text-blue-600" />
              ) : (
                <FiPlay className="text-2xl sm:text-3xl md:text-4xl text-blue-600 ml-0.5 sm:ml-1" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

