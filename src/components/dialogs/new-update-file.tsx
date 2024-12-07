import { type FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useFileStore } from '@/store/file.store';

// ----------------------------------------------------------------------

export default function NewUpdateFile({ open = false, onClose, id, name }: { open: boolean; onClose: () => void; id?: string; name?: string | null }) {
  const addFile = useFileStore(state => state.addFile);
  const updateFileName = useFileStore(state => state.updateFileName);
  const [error, setError] = useState(false);
  const [fileName, setFileName] = useState(() => name ?? '');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileName.trim() !== '') {
      if (!id) {
        const success = addFile(fileName);
        if (success) {
          onClose();
          setFileName('');
          return;
        }
      }
      else if (fileName || fileName === null) {
        const success = await updateFileName(fileName, id);
        if (success) {
          onClose();
          setFileName('');
          return;
        }
      }
      setError(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{id ? 'Rename File' : 'New File'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              id="fileName"
              value={fileName}
              placeholder="File name"
              onChange={(e) => {
                setFileName(e.currentTarget.value);
                setError(false);
              }}
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              className={cn(error && 'border-red-600 text-red-600')}
            />
            {error && <p className="text-sm text-red-600 ml-1.5">File name already exists.</p>}
          </div>
          <DialogFooter>
            <Button type="submit">{id ? 'Update' : 'Create'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
