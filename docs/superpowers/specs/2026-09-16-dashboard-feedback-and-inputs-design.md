# Dashboard Feedback and Input Controls Design

## Goal

Replace inconsistent browser-default controls in the dashboard and introduce a shared generation feedback flow for Merge PDF, Split PDF, OCR PDF, PDF to Word, and Image to PDF.

## Scope

This change is visual/interaction-focused. It does not change PDF algorithms, backend job contracts, polling endpoints, job storage semantics, or download naming beyond reusing existing values.

## Input controls

- Keep native HTML inputs/selects/radios in the DOM for keyboard and screen-reader accessibility.
- Replace their visible browser-default presentation with Docivo-styled controls.
- Use the existing brand system and dashboard tool accents.
- Focus states use the Docivo blue ring.
- Selected states must remain legible in both light and dark themes.
- File upload surfaces stay reusable through `FileUploader` and preserve drag/click behavior.

## Progress feedback

Each tool operation follows one shared lifecycle:

1. `starting`: show one progress toast with “Comenzando a trabajar...” / localized equivalent.
2. `processing`: update the same progress surface with a tool-specific message such as “Procesando páginas...” or “Procesando documento...”.
3. `generating`: update the same progress surface with the final generation step, such as “Generando PDF...” or “Generando archivo Word...”.
4. `success`: remove the progress toast and show a centered animated success overlay.
5. `error`: remove the progress toast and show an error toast; no success overlay.

The progress UI must not stack one toast per stage. One operation owns one progress surface whose content changes.

## Toast placement

Desktop:
- fixed to the top-right of the dashboard content viewport;
- 24px from the top/right;
- maximum width around 360px;
- stacked downward if unrelated error toasts appear.

Mobile:
- fixed at the top with 16px side margins;
- effectively full width within those margins.

The toast must not overlap the sidebar on desktop.

## Success overlay

- Centered fixed overlay above dashboard content.
- Lightweight translucent backdrop with blur.
- Compact card using theme tokens.
- Animated circular checkmark.
- Tool-specific success text:
  - Merge: “PDF combinado generado correctamente”.
  - Split: “PDF dividido generado correctamente”.
  - OCR: “Texto reconocido correctamente”.
  - PDF to Word: “Archivo Word generado correctamente”.
  - Image to PDF: “PDF de imágenes generado correctamente”.
- Auto-dismiss after approximately 2 seconds.
- Respect `prefers-reduced-motion`.
- Download behavior remains automatic and unchanged.

## Architecture

Create one shared dashboard process-feedback layer rather than repeating toast/overlay state in five tool components. The existing processing hooks remain responsible for actual work and `loading/success/error`; they will expose progress stage callbacks/state so the UI can render the shared feedback consistently.

Prefer a small shared hook/component pair:
- `useToolFeedback` or equivalent for the UI lifecycle;
- `ToolProgressToast` for top-right stage feedback;
- `ToolSuccessOverlay` for the centered completion animation.

Existing Sileo error notifications may remain for validation/runtime errors if doing so avoids duplicate error systems, but hardcoded white/slate styling must be removed or aligned with dashboard theme tokens.

## Tool-specific personality

Primary action color stays Docivo blue for all tools. Secondary identity remains:
- Merge: indigo/layers.
- Split: violet/cut.
- OCR: amber/scanner.
- PDF to Word: sky/document.
- Image to PDF: emerald/gallery.

Progress and success feedback may use the current tool accent for icon details while the primary progress indicator remains brand blue.

## Accessibility

- Native controls remain keyboard-operable.
- Custom visual controls preserve labels and focus visibility.
- Progress text uses `aria-live="polite"`.
- Error feedback remains assertive where appropriate.
- Success overlay is announced once and then dismissed.
- Reduced-motion users receive the same state changes without movement-heavy animation.

## Validation

The repository has no test runner. The user explicitly approved not adding Vitest/Jest for this iteration.

Validation for this implementation:
- `pnpm lint`
- `pnpm build`
- manual verification of all five tool flows in light and dark themes
- verify keyboard focus on select/radio/file controls
- verify success overlay auto-dismiss
- verify errors do not trigger success overlay
- verify downloads still occur
