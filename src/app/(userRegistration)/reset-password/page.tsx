import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export default function ResetPassword() {
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="max-w-[350px]">
        <div className="space-y-2 text-center mb-4">
          <h1 className="text-3xl font-bold">Update your password</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your new password to update your account
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
}
