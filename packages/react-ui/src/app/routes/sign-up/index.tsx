import { FullLogo } from '@/components/ui/full-logo';
import { AuthFormTemplate } from '@/features/authentication/components/auth-form-template';

const SignUpPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2 mx-auto">
      <FullLogo />
      <AuthFormTemplate form={'signup'} />
    </div>
  );
};

SignUpPage.displayName = 'SignUpPage';

export { SignUpPage };
