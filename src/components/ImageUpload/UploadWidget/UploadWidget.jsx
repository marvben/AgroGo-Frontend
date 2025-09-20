import { useEffect, useRef } from 'react';

let cloudinary;

const UploadWidget = ({
  children,
  onUpload,
  folderName,
  resourceType = 'auto',
  maxFiles = 1,
  multiple = false,
  showUploadMoreButton = false,
  singleUploadAutoClose = true,
  showAdvancedOptions = false,
  compression = true,
}) => {
  const widget = useRef();

  useEffect(() => {
    if (!cloudinary) {
      cloudinary = window.cloudinary;
    }

    function onIdle() {
      if (!widget.current) {
        widget.current = createWidget();
      }
    }

    'requestIdleCallback' in window
      ? requestIdleCallback(onIdle)
      : setTimeout(onIdle, 1);

    return () => {
      widget.current?.destroy();
      widget.current = undefined;
    };
    // eslint-disable-next-line
  }, []);

  function createWidget() {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      console.warn(
        `⚠️ Missing Cloudinary config. Please set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET in your .env file.`
      );
    }

    const options = {
      cloudName,
      uploadPreset,
      sources: [
        'local',
        'camera',
        'url',
        'google_drive',
        'dropbox',
        'facebook',
        'instagram',
      ],
      resourceType,
      multiple,
      folder: folderName ? `Agrogo/Images/${folderName}` : 'Agrogo/Images',
      clientAllowedFormats: [
        'png',
        'jpeg',
        'jpg',
        'webp',
        'pdf',
        'mp4',
        'mov',
        'avi',
        'mkv',
      ],
      maxFiles,
      maxImageFileSize: 0.5 * 1024 * 1024, // 500KB
      maxVideoFileSize: 5 * 1024 * 1024, // 5MB
      maxFileSize: 0.2 * 1024 * 1024, // 200KB PDFs/raw
      maxImageWidth: 800,
      cropping: true,
      croppingAspectRatio: 1,
      showAdvancedOptions,
      showSkipCropButton: false,
      croppingShowDimensions: true,
      showUploadMoreButton,
      singleUploadAutoClose,
      defaultSource: 'local',
      styles: {
        palette: {
          window: '#FFFFFF',
          sourceBg: '#F4F4F5',
          windowBorder: '#90A0B3',
          tabIcon: '#0078FF',
          inactiveTabIcon: '#69778A',
          menuIcons: '#69778A',
          link: '#0078FF',
          action: '#FF620C',
          inProgress: '#0078FF',
          complete: '#20B832',
          error: '#E2574C',
          textDark: '#000000',
          textLight: '#FFFFFF',
        },
      },
    };

    // 🔥 Add compression transformations if enabled
    if (compression) {
      options.transformation = [
        { quality: 'auto', fetch_format: 'auto' }, // smart compression
      ];
    }

    return cloudinary?.createUploadWidget(options, (error, result) => {
      if (
        (error || result.event === 'success') &&
        typeof onUpload === 'function'
      ) {
        onUpload(error, result, widget);
      }
    });
  }

  function open() {
    if (!widget.current) {
      widget.current = createWidget();
    }
    widget.current?.open();
  }

  return <>{children({ cloudinary, widget, open })}</>;
};

export default UploadWidget;
