import { ImmersiveShowcase } from './ImmersiveShowcase';
import type { ShowcaseItem } from '../types/search.types';

interface ShowcaseListProps {
  showcases: ShowcaseItem[];
}

export const ShowcaseList = ({ showcases }: ShowcaseListProps) => {
  return (
    <div className="mt-8">
      <ImmersiveShowcase showcases={showcases} />
    </div>
  );
};
