'use client';
import { UpdateMemberProfile } from '@/app/actions/userActions';
import {
  MemberEditSchema,
  memberEditSchema,
} from '@/lib/schemas/memberEditSchema';
import { handelFormServerErrors } from '@/lib/util';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@nextui-org/react';
import { Member } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
  member: Member;
};
export default function EditForm({ member }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isDirty, isSubmitting, errors },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        description: member.description,
        city: member.city,
        country: member.country,
      });
    }
  }, [member, reset]);

  const onSubmit = async (data: MemberEditSchema) => {
    const nameUpdated = data.name !== member.name;
    const result = await UpdateMemberProfile(data, nameUpdated);

    if (result.status === 'success') {
      toast.success('Profile updated');
      router.refresh();
      reset({ ...data });
    } else {
      handelFormServerErrors(result, setError);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <Input
        defaultValue={member.name}
        label="Name"
        variant="bordered"
        {...register('name')}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message as string}
      />
      <Textarea
        defaultValue={member.description}
        label="Description"
        variant="bordered"
        {...register('description')}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message as string}
        minRows={6}
      />
      <div className="flex flex-row gap-3">
        <Input
          defaultValue={member.city}
          label="City"
          variant="bordered"
          {...register('city')}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message as string}
        />
        <Input
          defaultValue={member.country}
          label="Country"
          variant="bordered"
          {...register('country')}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message as string}
        />
      </div>
      {errors.root?.serverError && (
        <p className="text-danger text-sm">{errors.root.serverError.message}</p>
      )}
      <Button
        type="submit"
        className="flex self-end"
        variant="solid"
        isDisabled={!isValid || !isDirty}
        isLoading={isSubmitting}
        color="secondary"
      >
        Update Profile
      </Button>
    </form>
  );
}
