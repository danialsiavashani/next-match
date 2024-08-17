import { CardBody, CardHeader, Divider } from '@nextui-org/react';

export default function page() {
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Chats
      </CardHeader>
      <Divider />
      <CardBody>Chats go here</CardBody>
    </>
  );
}
