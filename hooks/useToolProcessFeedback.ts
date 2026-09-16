"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type ToolProcessStage =
    | "idle"
    | "starting"
    | "processing"
    | "generating"
    | "success"
    | "error";

export type ToolProgressCallbacks = {
    onStarting?: () => void;
    onProcessing?: () => void;
    onGenerating?: () => void;
    onSuccess?: (triggerDownload?: () => void) => Promise<void>;
    onError?: () => void;
};

type ToolFeedbackMessages = {
    starting: string;
    processing: string;
    generating: string;
    success: string;
};

type ToolFeedbackState = {
    stage: ToolProcessStage;
    message: string;
};

const IDLE_STATE: ToolFeedbackState = {
    stage: "idle",
    message: "",
};

const SUCCESS_VISIBLE_MS = 2100;
const DOWNLOAD_TRIGGER_DELAY_MS = 320;
const DIALOG_DETECTION_MS = 450;
const NO_DIALOG_FALLBACK_MS =
    SUCCESS_VISIBLE_MS - DOWNLOAD_TRIGGER_DELAY_MS - DIALOG_DETECTION_MS;
const RETURN_SETTLE_MS = 240;

const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

export function useToolProcessFeedback(messages: ToolFeedbackMessages) {
    const [state, setState] = useState<ToolFeedbackState>(IDLE_STATE);
    const completionCycleRef = useRef(0);
    const activeCompletionCleanupRef = useRef<(() => void) | null>(null);

    const cancelActiveCompletion = useCallback(() => {
        completionCycleRef.current += 1;
        activeCompletionCleanupRef.current?.();
        activeCompletionCleanupRef.current = null;
    }, []);

    useEffect(() => cancelActiveCompletion, [cancelActiveCompletion]);

    const setStage = useCallback(
        (stage: ToolProcessStage, message: string) => {
            setState({ stage, message });
        },
        []
    );

    const start = useCallback(() => {
        cancelActiveCompletion();
        setStage("starting", messages.starting);
    }, [cancelActiveCompletion, messages.starting, setStage]);

    const processing = useCallback(
        () => setStage("processing", messages.processing),
        [messages.processing, setStage]
    );

    const generating = useCallback(
        () => setStage("generating", messages.generating),
        [messages.generating, setStage]
    );

    const waitForSaveDialogReturn = useCallback(
        (triggerDownload: () => void, cycle: number) =>
            new Promise<void>((resolve, reject) => {
                let lostFocus = false;
                let finished = false;
                let detectionTimer: ReturnType<typeof setTimeout> | null = null;
                let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
                let settleTimer: ReturnType<typeof setTimeout> | null = null;

                const cleanup = () => {
                    window.removeEventListener("blur", handleBlur);
                    window.removeEventListener("focus", handleFocus);

                    if (detectionTimer) clearTimeout(detectionTimer);
                    if (fallbackTimer) clearTimeout(fallbackTimer);
                    if (settleTimer) clearTimeout(settleTimer);

                    if (activeCompletionCleanupRef.current === finish) {
                        activeCompletionCleanupRef.current = null;
                    }
                };

                const finish = () => {
                    if (finished) return;
                    finished = true;
                    cleanup();
                    resolve();
                };

                const handleBlur = () => {
                    lostFocus = true;
                    if (fallbackTimer) {
                        clearTimeout(fallbackTimer);
                        fallbackTimer = null;
                    }
                };

                const handleFocus = () => {
                    if (!lostFocus || finished) return;
                    if (settleTimer) clearTimeout(settleTimer);
                    settleTimer = setTimeout(finish, RETURN_SETTLE_MS);
                };

                activeCompletionCleanupRef.current = finish;
                window.addEventListener("blur", handleBlur);
                window.addEventListener("focus", handleFocus);

                detectionTimer = setTimeout(() => {
                    if (cycle !== completionCycleRef.current || finished) {
                        finish();
                        return;
                    }

                    if (!document.hasFocus()) {
                        lostFocus = true;
                        return;
                    }

                    fallbackTimer = setTimeout(finish, NO_DIALOG_FALLBACK_MS);
                }, DIALOG_DETECTION_MS);

                try {
                    triggerDownload();
                } catch (error) {
                    cleanup();
                    finished = true;
                    reject(error);
                }
            }),
        []
    );

    const succeed = useCallback(
        async (triggerDownload?: () => void) => {
            cancelActiveCompletion();
            const cycle = completionCycleRef.current;

            setStage("success", messages.success);
            await sleep(DOWNLOAD_TRIGGER_DELAY_MS);

            if (cycle !== completionCycleRef.current) return;

            if (!triggerDownload) {
                await sleep(SUCCESS_VISIBLE_MS - DOWNLOAD_TRIGGER_DELAY_MS);
                if (cycle === completionCycleRef.current) {
                    setState(IDLE_STATE);
                }
                return;
            }

            try {
                await waitForSaveDialogReturn(triggerDownload, cycle);
            } catch (error) {
                if (cycle === completionCycleRef.current) {
                    setState(IDLE_STATE);
                }
                throw error;
            }

            if (cycle === completionCycleRef.current) {
                setState(IDLE_STATE);
            }
        },
        [cancelActiveCompletion, messages.success, setStage, waitForSaveDialogReturn]
    );

    const fail = useCallback(() => {
        cancelActiveCompletion();
        setState(IDLE_STATE);
    }, [cancelActiveCompletion]);

    const reset = useCallback(() => {
        cancelActiveCompletion();
        setState(IDLE_STATE);
    }, [cancelActiveCompletion]);

    const callbacks = useMemo<ToolProgressCallbacks>(
        () => ({
            onStarting: start,
            onProcessing: processing,
            onGenerating: generating,
            onSuccess: succeed,
            onError: fail,
        }),
        [fail, generating, processing, start, succeed]
    );

    return {
        ...state,
        callbacks,
        start,
        processing,
        generating,
        succeed,
        fail,
        reset,
    };
}
