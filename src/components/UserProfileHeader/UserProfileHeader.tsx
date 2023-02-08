import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';
import { ChangeEvent, useRef } from 'react';

import { IUser } from '../../interfaces/IUser';
import theme from '../../themes/theme';
import {
  StyledAvatar,
  StyledBox,
  StyledFileUploadIcon,
  StyledIconButton,
  StyledTypography
} from './UserProfileHeader.styles';

interface Props {
  user?: IUser;
  ableToEdit: boolean;
  deleteAvatar: () => void;
  uploadAvatar: (event: ChangeEvent<HTMLInputElement>) => void;
}

const getUserInitials = (user?: IUser) => {
  if (!user) {
    return '';
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { first_name, last_name } = user.profile;

  if (first_name && last_name) {
    return `${first_name[0].toUpperCase()}${last_name[0].toUpperCase()}`;
  }

  return user.email[0].toUpperCase();
};

const formatCreateDate = (createDate?: string) => {
  if (!createDate) {
    return '';
  }

  return `A member since ${new Date(+createDate).toDateString()}`;
};

const EmployeeProfileHeader: React.FC<Props> = ({
  user,
  ableToEdit,
  deleteAvatar,
  uploadAvatar
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileInputClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <>
      <StyledBox marginY={3}>
        <Box height={120}>
          <StyledAvatar src={user?.profile.avatar} alt="user avatar">
            {getUserInitials(user)}
          </StyledAvatar>
          {user?.profile.avatar && ableToEdit && (
            <StyledIconButton onClick={deleteAvatar}>
              <CloseIcon />
            </StyledIconButton>
          )}
        </Box>
        {ableToEdit && (
          <Box onClick={fileInputClick}>
            <StyledTypography variant="button" fontSize={20}>
              <StyledFileUploadIcon />
              Upload avatar image
            </StyledTypography>
            <Typography color={theme.palette.lightGrey.dark}>
              png, jpg or gif no more than 0.5MB
            </Typography>
            <input
              hidden
              type="file"
              ref={fileInputRef}
              onChange={uploadAvatar}
            />
          </Box>
        )}
      </StyledBox>
      <Typography fontSize={25}>{`${user?.profile.first_name || ''} ${user
        ?.profile.last_name || ''}`}</Typography>
      <Typography>{user?.email}</Typography>
      <Typography>{formatCreateDate(user?.created_at)}</Typography>
    </>
  );
};

export default EmployeeProfileHeader;
