import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Avatar, Box, IconButton, styled, Typography } from '@mui/material';

export const StyledAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  fontSize: 30
});

export const StyledIconButton = styled(IconButton)({
  position: 'relative',
  top: -130,
  left: 110
});

export const StyledFileUploadIcon = styled(FileUploadIcon)({
  marginRight: 1
});

export const StyledBox = styled(Box)({
  display: 'flex',
  gap: '60px',
  alignItems: 'center'
});

export const StyledDragDrop = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0
});

export const StyledTypography = styled(Typography)({
  display: 'flex',
  alignItems: 'center'
});

export const StyledForm = styled('form')({
  position: 'relative'
});
