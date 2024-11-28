import { Suspense } from 'react'; 
import RegisterPage from './register-page';

export default function RegisterPageWrapper() {
  return (
    <Suspense fallback={<div className='w-full h-full flex items-center justify-center'><div className="loader"></div></div>}>
      <RegisterPage />
    </Suspense>
  );
}
