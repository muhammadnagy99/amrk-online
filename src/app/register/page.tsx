import { Suspense } from 'react'; 
import RegisterPage from './register-page';

export default function RegisterPageWrapper() {
  return (
    <Suspense fallback={<div className="loader"></div>}>
      <RegisterPage />
    </Suspense>
  );
}
