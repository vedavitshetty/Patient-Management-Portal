import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import { CreateAccountForm } from "../components/CreateAccountForm";
import { UnauthenticatedFormType } from "../common/types";

export const LoginPage: React.FC = () => {
    const [formType, setFormType] = useState<UnauthenticatedFormType>('login');
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {formType === 'login' && <LoginForm setFormType={setFormType} />}
          {formType === 'forgotPassword' && <ForgotPasswordForm setFormType={setFormType} />}
          {formType === 'createAccount' && <CreateAccountForm setFormType={setFormType} />}
        </div>
      </div>
    );
  };
