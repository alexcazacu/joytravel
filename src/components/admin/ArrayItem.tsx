import { Icon } from '@iconify/react';

type ArrayItemProps = {
  onDelete: () => void;
  children: React.ReactNode;
};

export default function ArrayItem({ onDelete, children }: ArrayItemProps) {
  return (
    <div className="bg-gray-100 p-5 rounded-lg border border-gray-200 flex gap-4">
      <div className="flex-1">{children}</div>
      <button
        type="button"
        onClick={onDelete}
        className="mt-7 p-2 h-fit rounded hover:bg-red-50 transition-colors"
        title="Delete"
      >
        <Icon icon="mdi:delete" className="w-5 h-5 text-red-600" />
      </button>
    </div>
  );
}
