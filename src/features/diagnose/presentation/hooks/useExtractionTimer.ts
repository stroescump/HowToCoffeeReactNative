import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";

type UseExtractionTimerOptions = {
  autoStopSeconds: number;
  initialSeconds: number;
  onAutoStop?: (seconds: number) => void;
};

type UseExtractionTimerResult = {
  seconds: number;
  setSeconds: Dispatch<SetStateAction<number>>;
  isRunning: boolean;
  hasStopped: boolean;
  start: () => void;
  stop: (autoStop?: boolean) => void;
  prepareForRecording: () => void;
};

export const useExtractionTimer = ({
  autoStopSeconds,
  initialSeconds,
  onAutoStop,
}: UseExtractionTimerOptions): UseExtractionTimerResult => {
  const [seconds, setSecondsState] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStopped, setHasStopped] = useState(initialSeconds > 0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const baseSecondsRef = useRef(initialSeconds);
  const hasUserEditedRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const computeElapsedSeconds = useCallback(() => {
    if (startTimeRef.current == null) return baseSecondsRef.current;
    const elapsedMs = Date.now() - startTimeRef.current;
    return baseSecondsRef.current + Math.floor(elapsedMs / 1000);
  }, []);

  const stop = useCallback(
    (autoStop = false) => {
      clearTimer();
      startTimeRef.current = null;
      setIsRunning(false);
      setHasStopped(true);
      if (autoStop) {
        onAutoStop?.(seconds);
      }
    },
    [clearTimer, onAutoStop, seconds]
  );

  const prepareForRecording = useCallback(() => {
    clearTimer();
    startTimeRef.current = null;
    baseSecondsRef.current = 0;
    hasUserEditedRef.current = true;
    setIsRunning(false);
    setHasStopped(false);
    setSecondsState(0);
  }, [clearTimer]);

  const start = useCallback(() => {
    if (isRunning) return;
    clearTimer();
    baseSecondsRef.current = 0;
    startTimeRef.current = Date.now();
    hasUserEditedRef.current = true;
    setSecondsState(0);
    setHasStopped(false);
    setIsRunning(true);
  }, [clearTimer, isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    timerRef.current = setInterval(() => {
      setSecondsState(() => Math.min(computeElapsedSeconds(), autoStopSeconds));
    }, 250);
    return () => clearTimer();
  }, [autoStopSeconds, clearTimer, computeElapsedSeconds, isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    if (seconds >= autoStopSeconds) {
      stop(true);
    }
  }, [autoStopSeconds, isRunning, seconds, stop]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  useEffect(() => {
    if (isRunning) return;
    if (hasUserEditedRef.current) return;
    baseSecondsRef.current = initialSeconds;
    setSecondsState(initialSeconds);
  }, [initialSeconds, isRunning]);

  const setSeconds: Dispatch<SetStateAction<number>> = useCallback((value) => {
    hasUserEditedRef.current = true;
    setSecondsState(value);
  }, []);

  return { seconds, setSeconds, isRunning, hasStopped, start, stop, prepareForRecording };
};
