import { useMutation } from '@apollo/client';

import Preloader from '@components/Preloader';
import ProfileLayout from '@components/ProfileLayout';
import UserProfileForm from '@components/UserProfileForm';
import UserProfileHeader from '@components/UserProfileHeader';
import { IFormInput } from '@graphql/user/IFormInput';
import {
  DELETE_AVATAR,
  UPDATE_USER,
  UPLOAD_AVATAR
} from '@graphql/user/mutation';
import { USER } from '@graphql/user/query';
import { useBreadcrumbs } from '@hooks/useBreadcrumbs';
import useUserData from '@hooks/useUserData';
import isAbleToEdit from '@utils/isAbleToEdit';

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
  const { user, loggedUser, loading, error } = useUserData();

  const ableToEdit = isAbleToEdit(loggedUser, user);

  useBreadcrumbs({
    [`employees/${user?.id}`]: {
      text: user?.profile.full_name || user?.email,
      to: `cvs/${user?.id}`
    }
  });

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

  const uploadAvatar = async (files: FileList | null) => {
    const file = files?.[0];
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

  const isLoading =
    loading || updateUserLoading || deleteAvatarLoading || uploadAvatarLoading;

  return (
    <Preloader loading={isLoading} error={error}>
      <ProfileLayout>
        <UserProfileHeader
          user={user}
          ableToEdit={ableToEdit}
          deleteAvatar={deleteAvatar}
          uploadAvatar={uploadAvatar}
        />
        <UserProfileForm
          key={user?.id}
          user={user}
          ableToEdit={ableToEdit}
          updateUser={updateUser}
        />
      </ProfileLayout>
    </Preloader>
  );
};

export default EmployeeProfilePage;
