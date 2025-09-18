import { Box } from '@mui/material';

import ImagePreview from './ImagePreview';
const ImagePreviewList = ({ images }) => {
  return (
    <Box mb={2} display='flex' flexWrap='wrap' gap={1}>
      {images.map(({ url, public_id }, index) => {
        if (!url) return null;
        return <ImagePreview key={index} url={url} public_id={public_id} />;
      })}
    </Box>
  );
};

export default ImagePreviewList;

// import { Box, IconButton, CircularProgress } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { useState } from 'react';
// const ImagePreviewList = ({ images, onRemove }) => {
//   const [deletingIds, setDeletingIds] = useState([]);
//   const handleDelete = async (public_id) => {
//     setDeletingIds((prev) => [...prev, public_id]);
//     await onRemove(public_id);
//     setDeletingIds((prev) => prev.filter((id) => id !== public_id));
//   };

//   return (
//     <Box mb={2} display='flex' flexWrap='wrap' gap={1}>
//       {images.map(({ url, public_id }, index) => {
//         if (!url) return null;
//         return (
//           <Box
//             key={index}
//             sx={{
//               width: 80,
//               height: 80,
//               position: 'relative',
//               borderRadius: 2,
//               overflow: 'hidden',
//               border: '1px solid #ddd',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               backgroundColor: '#f9f9f9',
//             }}
//           >
//             {/* Delete button */}
//             <IconButton
//               onClick={() => handleDelete(public_id)}
//               size='small'
//               sx={{
//                 position: 'absolute',
//                 top: 4,
//                 right: 4,
//                 backgroundColor: 'rgba(240,0,0,0.9)',
//                 color: '#fff',
//                 width: 22,
//                 height: 22,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 '&:hover': { backgroundColor: 'rgba(200,0,0,1)' },
//               }}
//             >
//               {deletingIds.includes(public_id) ? (
//                 <CircularProgress size={16} sx={{ color: '#fff' }} />
//               ) : (
//                 <CloseIcon sx={{ fontSize: 16 }} />
//               )}
//             </IconButton>

//             {/* Image */}
//             <img
//               src={url}
//               alt={`uploaded-${index}`}
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover',
//               }}
//             />
//           </Box>
//         );
//       })}
//     </Box>
//   );
// };

// export default ImagePreviewList;
