//

// ----------------------------------------------------------------------

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number = 250): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function debounceAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number = 250,
): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  let isPending = false;

  return (...args: Parameters<T>) => {
    // If there's already an ongoing call, cancel it and wait for the new one
    if (timerId !== null) {
      clearTimeout(timerId);
    }

    // Set a new timeout
    timerId = setTimeout(async () => {
      // Only invoke the function if there is no pending invocation
      if (!isPending) {
        isPending = true;
        try {
          await fn(...args); // Await the result of the async function
        }
        finally {
          isPending = false; // Reset the pending flag after execution
        }
      }
    }, delay);
  };
}
