import { Box, Button, Dialog, DialogContent, DialogTitle, Modal } from '@mui/material';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './style.css';
import { DialogActions } from '@mui/material';

function generateDownload(canvas, crop, setFieldValue, cropFieldValue, handleCloseDialog) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob) => {
      if (blob === null) {
        return;
      }
      // eslint-disable-next-line no-undef
      let file = new File([blob], 'image');
      setFieldValue(cropFieldValue, file);
    },
    'image/png',
    1
  );

  handleCloseDialog();
}

function setCanvasImage(image, canvas, crop) {
  if (!crop || !canvas || !image) {
    return;
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext('2d');
  // refer https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio

    // eslint-disable-next-line no-undef
  window.devicePixelRatio = 1;

  // eslint-disable-next-line no-undef
  const pixelRatio = window.devicePixelRatio;

  canvas.width = crop.width * pixelRatio * scaleX;
  canvas.height = crop.height * pixelRatio * scaleY;

  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  );
}

export default function ImageCropDialog({ open, handleCloseDialog, upImg, setFieldValue, cropFieldValue }) {
  // const [upImg, setUpImg] = useState();

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const [crop, setCrop] = useState({
    unit: 'px',
    width:600,
    height: 600,
    x: 0,
    y: 0,
    aspect: 1/1
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    setCanvasImage(imgRef.current, previewCanvasRef.current, completedCrop);
  }, [completedCrop]);

  return (
    <Dialog open={open} onClose={handleCloseDialog} sx={{
      '& .MuiDialog-container': {
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: '80%', 
        },
      },
    }}>
      <DialogTitle>
        <p>Crop Image</p>
      </DialogTitle>
      <DialogContent>
        <ReactCrop
          src={upImg}
          onImageLoaded={onLoad}
          crop={crop}
          minHeight={600}
          minWidth={600}
          onChange={(c) => {
            setCrop(c);
          }}
          onComplete={(c) => setCompletedCrop(c)}
        />
  
      <div>
        {/* Canvas to display cropped image */}
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0),
          }}
        />
      </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            generateDownload(previewCanvasRef.current, completedCrop, setFieldValue, cropFieldValue, handleCloseDialog)
          }
          disabled={!completedCrop?.width || !completedCrop?.height}>
          Crop
        </Button>
        <Button onClick={handleCloseDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
