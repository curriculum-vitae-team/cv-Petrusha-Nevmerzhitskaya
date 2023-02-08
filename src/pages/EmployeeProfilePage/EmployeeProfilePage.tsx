import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { Box } from '@mui/material';
import { ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';

import EmployeeTabs from '../../components/EmployeeTabs';
import Loader from '../../components/Loader';
import UserProfileForm from '../../components/UserProfileForm';
import UserProfileHeader from '../../components/UserProfileHeader';
import { authService } from '../../graphql/auth/authService';
import { IFormInput } from '../../graphql/user/IFormInput';
import { IUserResult } from '../../graphql/user/IUserResult';
import {
  DELETE_AVATAR,
  UPDATE_USER,
  UPLOAD_AVATAR
} from '../../graphql/user/mutation';
import { USER } from '../../graphql/user/query';
import { IUser } from '../../interfaces/IUser';
import isAdmin from '../../utils/isAdmin';

const isAbleToEdit = (loggedUser: IUser | null, user?: IUser) =>
  user?.id === loggedUser?.id || isAdmin(loggedUser);

const convertBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const EmployeeProfilePage: React.FC = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];

  const { loading, error, data } = useQuery<IUserResult>(USER, {
    variables: { id: userId }
  });
  const user = data?.user;

  const loggedUser = useReactiveVar(authService.user$);

  const ableToEdit = isAbleToEdit(loggedUser, user);

  const [updateUserMutation, { loading: updateUserLoading }] = useMutation(
    UPDATE_USER,
    {
      refetchQueries: [{ query: USER, variables: { id: user?.id } }]
    }
  );
  const [uploadAvatarMutation, { loading: uploadAvatarLoading }] = useMutation(
    UPLOAD_AVATAR,
    {
      refetchQueries: [{ query: USER, variables: { id: user?.id } }]
    }
  );
  const [deleteAvatarMutation, { loading: deleteAvatarLoading }] = useMutation(
    DELETE_AVATAR,
    {
      refetchQueries: [{ query: USER, variables: { id: user?.id } }]
    }
  );

  const updateUser = async (updatedUser: IFormInput) => {
    await updateUserMutation({
      variables: {
        id: user?.id,
        user: {
          profile: {
            first_name: updatedUser.firstName,
            last_name: updatedUser.lastName
          },
          departmentId: updatedUser.department,
          positionId: updatedUser.position
        }
      }
    });
  };

  const deleteAvatar = async () => {
    await deleteAvatarMutation({
      variables: {
        id: user?.profile.id
      }
    });
  };

  const uploadAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await convertBase64(file);

      await uploadAvatarMutation({
        variables: {
          id: user?.profile.id,
          avatar: {
            base64,
            size: file.size,
            type: file.type
          }
        }
      });
    }
  };

  if (
    loading ||
    updateUserLoading ||
    deleteAvatarLoading ||
    uploadAvatarLoading
  ) {
    return <Loader />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <EmployeeTabs />
      <Box width="50%" margin="auto" marginY={6}>
        <UserProfileHeader
          user={user}
          ableToEdit={ableToEdit}
          deleteAvatar={deleteAvatar}
          uploadAvatar={uploadAvatar}
        />
        <UserProfileForm
          user={user}
          ableToEdit={ableToEdit}
          updateUser={updateUser}
        />
      </Box>
    </>
  );
};

export default EmployeeProfilePage;
