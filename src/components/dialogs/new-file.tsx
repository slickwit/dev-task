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

export default function NewFile({ open = false, onClose }: { open: boolean; onClose: () => void }) {
  const addFile = useFileStore(state => state.addFile);
  const [error, setError] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileName.trim() !== '') {
      const success = addFile(fileName.trim());
      if (success) {
        onClose();
        setFileName('');
        return;
      }
      setError(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New File</DialogTitle>
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
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
