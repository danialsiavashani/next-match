'use client';
import { registerUser } from '@/app/actions/authActions';
import { registerSchema, RegisterSchema } from '@/lib/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ShowPassword from '@/components/form/ShowPassword';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    // resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);
    if (result.status === 'success') {
      console.log('User was created successfully');
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((e) => {
          const fieldName = e.path.join('.') as 'email' | 'name' | 'password';
          setError(fieldName, { message: e.message });
        });
      } else {
        setError('root.serverError', { message: result.error });
      }
    }
  };
  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className=" flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <p className="text-neutral-500">Register to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue="danial"
              label="Name"
              variant="bordered"
              {...register('name')}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message as string}
            />
            <Input
              defaultValue="danialsiavashani@yahoo.com"
              label="Email"
              variant="bordered"
              {...register('email')}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
            />

            <Input
              defaultValue="202122danial@A~"
              label={
                <ShowPassword
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              }
              type={showPassword ? 'text' : 'password'}
              variant="bordered"
              {...register('password')}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />

            {errors.root?.serverError && (
              <p className="text-danger text-sm">
                {errors.root.serverError.message}
              </p>
            )}
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              color="secondary"
              type="submit"
              fullWidth
            >
              Register
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
