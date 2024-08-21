import { CardHeader, Divider, CardBody } from '@nextui-org/react';
import EditForm from './EditForm';
import { getAuthUserId } from '@/app/actions/authActions';
import { getMemberByUseId } from '@/app/actions/membersActions';
import { notFound } from 'next/navigation';

export default async function MemberEditPage() {
  const userId = await getAuthUserId();

  const member = await getMemberByUseId(userId);

  if (!member) return notFound();

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <EditForm member={member} />
      </CardBody>
    </>
  );
}
