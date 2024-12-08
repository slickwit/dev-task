"use client";
import { useEffect, useLayoutEffect, useRef } from "react";

// ----------------------------------------------------------------------

type UseEventListenerOptions = boolean | AddEventListenerOptions;

interface ElementRef<T extends EventTarget = HTMLElement> { current: T | null }

const useIsomorphicLayoutEffect = typeof document !== "undefined" ? useLayoutEffect : useEffect;

export function useEventListener<K extends keyof HTMLElementEventMap>(
	eventName: K,
	handler: (event: HTMLElementEventMap[K]) => void,
	element?: ElementRef,
	options?: UseEventListenerOptions,
) {
	const savedHandler = useRef<typeof handler>(handler);

	useIsomorphicLayoutEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		const targetElement = element?.current || document;
		if (!(targetElement && targetElement.addEventListener)) {
			return;
		}

		const eventListener = (event: Event) => savedHandler.current(event as HTMLElementEventMap[K]);

		targetElement.addEventListener(eventName, eventListener, options);

		return () => {
			targetElement.removeEventListener(eventName, eventListener);
		};
	}, [eventName, element, options]);
}
