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
    onSuccess?: () => void;
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

export function useToolProcessFeedback(messages: ToolFeedbackMessages) {
    const [state, setState] = useState<ToolFeedbackState>(IDLE_STATE);
    const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearDismissTimer = useCallback(() => {
        if (dismissTimerRef.current) {
            clearTimeout(dismissTimerRef.current);
            dismissTimerRef.current = null;
        }
    }, []);

    useEffect(() => clearDismissTimer, [clearDismissTimer]);

    const setStage = useCallback(
        (stage: ToolProcessStage, message: string) => {
            clearDismissTimer();
            setState({ stage, message });
        },
        [clearDismissTimer]
    );

    const start = useCallback(
        () => setStage("starting", messages.starting),
        [messages.starting, setStage]
    );

    const processing = useCallback(
        () => setStage("processing", messages.processing),
        [messages.processing, setStage]
    );

    const generating = useCallback(
        () => setStage("generating", messages.generating),
        [messages.generating, setStage]
    );

    const succeed = useCallback(() => {
        setStage("success", messages.success);
        dismissTimerRef.current = setTimeout(() => {
            dismissTimerRef.current = null;
            setState(IDLE_STATE);
        }, SUCCESS_VISIBLE_MS);
    }, [messages.success, setStage]);

    const fail = useCallback(() => {
        clearDismissTimer();
        setState(IDLE_STATE);
    }, [clearDismissTimer]);

    const reset = useCallback(() => {
        clearDismissTimer();
        setState(IDLE_STATE);
    }, [clearDismissTimer]);

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
