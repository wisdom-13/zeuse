import { FullScreenSpinner } from '@/components/ui/spinner';
import { useLoading } from '@/context/LoadingContext';

const LoadingIndicator = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <FullScreenSpinner />
  );
}


export default LoadingIndicator;