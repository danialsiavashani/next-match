import { getAuthUserId } from '@/app/actions/authActions';
import {
  getMemberByUseId,
  getMemberPhotosByUserId,
} from '@/app/actions/membersActions';
import DeleteButton from '@/components/DeleteButto';
import ImageUploadButton from '@/components/ImageUploadButton';
import StarButton from '@/components/StarButton';
import { CardHeader, Divider, CardBody, Image } from '@nextui-org/react';
import MemberPhotoUpload from './MemberPhotoUpload';
import MemberImage from '@/components/navbar/MemberImage';
import MemberPhotos from '@/components/MemberPhotos';

export default async function PhotosPage() {
  const userId = await getAuthUserId();
  const member = await getMemberByUseId(userId);
  const photos = await getMemberPhotosByUserId(userId);
  return (
    <>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="text-2xl font-semibold text-secondary">Edit Photo</div>

        <MemberPhotoUpload />
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotos
          photos={photos}
          editing={true}
          mainImageUrl={member?.image}
        />
      </CardBody>
    </>
  );
}
