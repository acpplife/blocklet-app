import { Button } from '@/components/ui/button';
import { useProfile } from '../contexts/profile';

interface FooterActionsProps {
  onCancel: () => void;
}

export function FooterActions({ onCancel }: FooterActionsProps) {
  const {
    state: { isEditing, loading },
    dispatch,
  } = useProfile();

  const toggleEditMode = () => {
    dispatch({ type: 'TOGGLE_EDIT_MODE' });
  };

  const handleCancel = () => {
    onCancel();
    toggleEditMode();
  };

  return (
    <div className="flex justify-end gap-4">
      {isEditing ? (
        <>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            Save
          </Button>
        </>
      ) : (
        <Button type="button" onClick={toggleEditMode}>
          Edit
        </Button>
      )}
    </div>
  );
}
