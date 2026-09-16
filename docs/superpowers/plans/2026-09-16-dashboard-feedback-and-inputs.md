# Dashboard Feedback and Input Controls Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Standardize dashboard form controls and add a shared staged progress + animated success feedback flow across all five document tools.

**Architecture:** Keep existing processing hooks and download behavior, but add a small shared feedback layer that consumes explicit process stages. Tool components continue owning their file/config state. Shared dashboard CSS provides accessible custom radios/selects/uploader visuals; shared feedback components render the top-right progress toast and centered success overlay.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, CSS Modules/global dashboard CSS, Iconify, existing Sileo notifications.

**Spec:** `docs/superpowers/specs/2026-09-16-dashboard-feedback-and-inputs-design.md`

## Global Constraints

- Do not add Vitest/Jest or another test runner; user approved lint/build/manual validation for this iteration.
- Do not change PDF algorithms, backend API contracts, polling cadence, job storage semantics, or automatic download behavior.
- Primary actions remain Docivo brand blue; tool accents remain secondary only.
- Progress uses one changing toast per operation, not one toast per stage.
- Success overlay auto-dismisses after about 2 seconds and respects reduced motion.
- Errors remain toast-based and must never trigger the success overlay.

---

### Task 1: Shared process feedback primitives

**Files:**
- Create: `components/feedback/ToolProcessFeedback/ToolProcessFeedback.tsx`
- Create: `components/feedback/ToolProcessFeedback/ToolProcessFeedback.module.css`
- Create: `hooks/useToolProcessFeedback.ts`
- Modify: `app/dashboard/layout.tsx`

**Interfaces:**
- Produces: `ToolProcessStage = "idle" | "starting" | "processing" | "generating" | "success" | "error"`
- Produces: `useToolProcessFeedback({ successMessage, accent })`
- Hook returns `stage`, `message`, `start(message?)`, `processing(message)`, `generating(message)`, `succeed(message?)`, `fail()`, `reset()`.
- `ToolProcessFeedback` receives current stage/message and renders top-right progress UI or centered success overlay.

- [ ] **Step 1: Create the feedback stage hook**

```ts
export type ToolProcessStage =
  | "idle"
  | "starting"
  | "processing"
  | "generating"
  | "success"
  | "error";
```

Use a timeout ref so `succeed()` moves to `success` and automatically resets to `idle` after ~2000ms. Clear the timeout on unmount.

- [ ] **Step 2: Create the progress toast and success overlay component**

Render progress stages in a fixed top-right region with `role="status"` and `aria-live="polite"`. Render success as a centered fixed overlay with an animated SVG/CSS checkmark and `aria-live="polite"`.

- [ ] **Step 3: Add responsive/reduced-motion styling**

Desktop: `top: 24px; right: 24px; width: min(360px, calc(100vw - 32px));`.
Mobile: `top: 16px; left: 16px; right: 16px; width: auto;`.

Use theme tokens for surface/border/text and `--tool-accent` only for icon details.

- [ ] **Step 4: Mount dashboard feedback host only where needed**

Prefer per-tool component ownership rather than one global mutable singleton. Keep the dashboard layout responsible only for general toaster placement/styling.

- [ ] **Step 5: Validate structure**

Run:
```bash
pnpm lint
```
Expected: no new lint errors.

### Task 2: Standardize browser-default controls

**Files:**
- Modify: `app/dashboard/dashboard.css`
- Modify: `features/files/components/FileUploader/FileUploader.tsx`
- Modify: `features/dashboard/components/SplitTool/SplitTool.tsx`
- Modify: `features/dashboard/components/OcrTool/OcrTool.tsx`
- Modify: `features/dashboard/components/PdfToWordTool/PdfToWordTool.tsx`
- Modify: `features/dashboard/components/ImageToPdfTool/ImageToPdfTool.tsx`
- Modify: `features/dashboard/components/SettingsView/SettingsView.tsx`

**Interfaces:**
- Produces reusable CSS classes: `.dashboard-radio`, `.dashboard-select`, `.dashboard-file-input`/uploader state classes.

- [ ] **Step 1: Style native radios accessibly**

Use `appearance: none`, preserve the real input, draw selected state with `::before`, and provide `:focus-visible` ring using `var(--color-brand-display)`.

- [ ] **Step 2: Style selects consistently**

Use theme surfaces/borders, consistent height/radius, custom chevron already rendered by components, and hide browser-specific visual differences with `appearance: none`.

- [ ] **Step 3: Apply classes to all dashboard tools/settings**

Replace ad-hoc radio/select classes while preserving labels, checked/value/onChange semantics.

- [ ] **Step 4: Refine FileUploader**

Keep hidden native file input and make hover/focus-within states consistent in light/dark. Do not change accepted MIME types or callback behavior.

- [ ] **Step 5: Validate keyboard behavior manually**

Tab through radio/select/uploader controls and verify visible focus, Space/Arrow/Enter behavior where native controls support it.

### Task 3: Expose stage callbacks from processing hooks

**Files:**
- Modify: `hooks/useClientMerge.tsx`
- Modify: `hooks/useClientSplit.ts`
- Modify: `hooks/useClientImageToPdf.ts`
- Modify: `hooks/useBackendJob.ts`

**Interfaces:**
- Add optional callbacks to `run`, or return stage events without changing existing success/error semantics.
- Suggested callback shape:

```ts
type ToolProgressCallbacks = {
  onStarting?: () => void;
  onProcessing?: () => void;
  onGenerating?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
};
```

- [ ] **Step 1: Add optional progress callbacks**

Call `onStarting` immediately after validation, `onProcessing` when actual work begins, `onGenerating` immediately before blob/download generation, `onSuccess` after successful download trigger, and `onError` in catch paths.

- [ ] **Step 2: Preserve existing job status writes and download behavior**

Do not remove `jobStorage` calls or backend polling. Existing `isLoading` must continue to work.

- [ ] **Step 3: Avoid duplicate success surfaces**

Remove success Sileo notifications from successful generation paths once the shared overlay is wired. Keep validation/runtime error toasts.

- [ ] **Step 4: Align remaining Sileo errors with theme tokens**

Remove hardcoded white/slate style objects where possible and rely on the dashboard Toaster/theme configuration.

- [ ] **Step 5: Validate TypeScript through build**

Run:
```bash
pnpm build
```
Expected: compilation/type checking succeeds.

### Task 4: Wire tool-specific staged messages and success overlays

**Files:**
- Modify: `features/dashboard/components/MergeTool/MergeTool.tsx`
- Modify: `features/dashboard/components/SplitTool/SplitTool.tsx`
- Modify: `features/dashboard/components/OcrTool/OcrTool.tsx`
- Modify: `features/dashboard/components/PdfToWordTool/PdfToWordTool.tsx`
- Modify: `features/dashboard/components/ImageToPdfTool/ImageToPdfTool.tsx`
- Modify: `locales/en/merge.json`
- Modify: `locales/es/merge.json`
- Modify: `locales/en/split.json`
- Modify: `locales/es/split.json`
- Modify: `locales/en/ocr.json`
- Modify: `locales/es/ocr.json`
- Modify: `locales/en/pdfToWord.json`
- Modify: `locales/es/pdfToWord.json`
- Modify: `locales/en/imageToPdf.json`
- Modify: `locales/es/imageToPdf.json`

**Interfaces:**
- Each tool constructs `useToolProcessFeedback(...)` with its own success message/accent.
- Each tool passes progress callbacks into its existing `run(...)` call.

- [ ] **Step 1: Add localized stage copy**

Spanish examples:
```json
{
  "starting": "Comenzando a trabajar...",
  "processing": "Procesando archivo...",
  "generating": "Generando PDF...",
  "success_overlay": "PDF combinado generado correctamente"
}
```

Use tool-specific processing/generating/success wording for all five tools and equivalent English copy.

- [ ] **Step 2: Wire Merge and Split**

Use merge/split accents and show the shared feedback component in each tool root.

- [ ] **Step 3: Wire OCR and PDF to Word**

For backend jobs, map polling work to processing and the download step to generating. OCR success copy is “Texto reconocido correctamente”; Word success copy is “Archivo Word generado correctamente”.

- [ ] **Step 4: Wire Image to PDF**

Use image accent and success copy “PDF de imágenes generado correctamente”.

- [ ] **Step 5: Ensure failures reset progress and show errors only**

No success overlay may render after a thrown error or backend failure state.

### Task 5: Toast placement and final verification

**Files:**
- Modify: `app/dashboard/layout.tsx`
- Modify: `app/dashboard/dashboard.css`

**Interfaces:**
- Existing Sileo errors/validation messages render in the agreed dashboard position.

- [ ] **Step 1: Move general dashboard toasts**

Configure Sileo/Toaster so desktop errors appear top-right within the content viewport and mobile errors use top full-width margins. Keep z-index below the success overlay but above dashboard panels.

- [ ] **Step 2: Run lint**

```bash
pnpm lint
```
Expected: no new errors.

- [ ] **Step 3: Run production build**

```bash
pnpm build
```
Expected: exit code 0.

- [ ] **Step 4: Manual light/dark matrix**

For each tool in light and dark:
- trigger without required input and verify error toast;
- upload/select valid input;
- start generation and observe one changing progress toast;
- verify success overlay appears only after success;
- verify overlay dismisses in ~2s;
- verify download still triggers;
- verify buttons re-enable after completion;
- verify radio/select/uploader keyboard focus.

- [ ] **Step 5: Commit final verification fixes**

```bash
git add app components features hooks locales docs
git commit -m "feat: add staged dashboard processing feedback"
```
