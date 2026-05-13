# Booking — WCAG 2.1 AA Contrast Audit

Date: 2026-05-13T23:27:29.148Z
Files audited: 9
Pairs evaluated: 50
Failures: 0

## Method

Programmatic contrast computation per WCAG 2.1 §1.4.3 (text) and §1.4.11 (non-text).
Foreground/background hex pairs were extracted from each booking component's source
(inline styles + design tokens). Translucent overlays were alpha-blended against their
actual painted background before measurement (no visual estimation).

Required ratios:
- Normal text: ≥ 4.5:1
- Large text (≥18pt or ≥14pt bold): ≥ 3:1
- UI components / graphical objects (borders, icons, focus rings): ≥ 3:1

## Results

| Element | FG | BG | Ratio | Required | WCAG | Pass |
|---|---|---|---|---|---|---|
| BookSchedule pill bg='Last step. Pick a time' | #FFFFFF | #E8670A | 3.29:1 | 3:1 | 1.4.3 | ✅ |
| BookSchedule h1 'Schedule your...' | #FFFFFF | #000814 | 20.10:1 | 3:1 | 1.4.3 | ✅ |
| BookSchedule subhead | #E5E7EB | #000814 | 16.23:1 | 4.5:1 | 1.4.3 | ✅ |
| BookSchedule progress bars | #E8670A | #000814 | 6.10:1 | 3:1 | 1.4.11 | ✅ |
| DayView card title 'Richmond clinic' | #0B1029 | #FFFFFF | 18.74:1 | 3:1 | 1.4.3 | ✅ |
| Prev/Next button label | #0B1029 | #FFFFFF | 18.74:1 | 4.5:1 | 1.4.3 | ✅ |
| Prev disabled (opacity 0.6) | #6D707F | #FFFFFF | 4.91:1 | 4.5:1 | 1.4.3 | ✅ |
| Week range label | #2C3346 | #FFFFFF | 12.58:1 | 4.5:1 | 1.4.3 | ✅ |
| Prev/Next border (UI) | #8B92A0 | #FFFFFF | 3.13:1 | 3:1 | 1.4.11 | ✅ |
| Day pill weekday label (default) | #2C3346 | #FFFFFF | 12.58:1 | 4.5:1 | 1.4.3 | ✅ |
| Day pill weekday label (selected) | #DADBDF | #0B1029 | 13.55:1 | 4.5:1 | 1.4.3 | ✅ |
| Day pill date (default) | #0B1029 | #FFFFFF | 18.74:1 | 3:1 | 1.4.3 | ✅ |
| Day pill date (selected) | #FFFFFF | #0B1029 | 18.74:1 | 3:1 | 1.4.3 | ✅ |
| Day pill border (default) | #8B92A0 | #FFFFFF | 3.13:1 | 3:1 | 1.4.11 | ✅ |
| Day badge OPEN ≥3 (green) | #0B6B33 | #DCF5E5 | 5.76:1 | 4.5:1 | 1.4.3 | ✅ |
| Day badge OPEN <3 (red) | #991B1B | #FDE2E2 | 6.79:1 | 4.5:1 | 1.4.3 | ✅ |
| Day badge FULL | #4B5563 | #E5E7EB | 6.10:1 | 4.5:1 | 1.4.3 | ✅ |
| Day badge CLOSED (Sunday) | #4B5563 | #E5E7EB | 6.10:1 | 4.5:1 | 1.4.3 | ✅ |
| Day badge OPEN (selected, white over translucent) | #FFFFFF | #373B50 | 11.03:1 | 4.5:1 | 1.4.3 | ✅ |
| Times heading 'Thursday, May 14' | #0B1029 | #F7F8FB | 17.65:1 | 3:1 | 1.4.3 | ✅ |
| Times helper 'All times shown in ET.' | #4B5563 | #F7F8FB | 7.12:1 | 4.5:1 | 1.4.3 | ✅ |
| Refresh pill text | #2C3346 | #FFFFFF | 12.58:1 | 4.5:1 | 1.4.3 | ✅ |
| Refresh pill secondary text | #4B5563 | #FFFFFF | 7.56:1 | 4.5:1 | 1.4.3 | ✅ |
| Times empty state italic | #4B5563 | #F7F8FB | 7.12:1 | 4.5:1 | 1.4.3 | ✅ |
| Time slot time digits (default) | #0B1029 | #FFFFFF | 18.74:1 | 3:1 | 1.4.3 | ✅ |
| Time slot AM/PM (default) | #4B5563 | #FFFFFF | 7.56:1 | 4.5:1 | 1.4.3 | ✅ |
| Time slot arrow (default) | #4B5563 | #FFFFFF | 7.56:1 | 3:1 | 1.4.11 | ✅ |
| Time slot border | #8B92A0 | #FFFFFF | 3.13:1 | 3:1 | 1.4.11 | ✅ |
| Time slot time digits (selected) | #FFFFFF | #C2410C | 5.18:1 | 3:1 | 1.4.3 | ✅ |
| Time slot AM/PM (selected) | #FFFFFF | #C2410C | 5.18:1 | 4.5:1 | 1.4.3 | ✅ |
| CTA enabled label | #FFFFFF | #E8670A | 3.29:1 | 3:1 | 1.4.3 | ✅ |
| CTA disabled label | #5B6271 | #E5E7EB | 4.94:1 | 3:1 | 1.4.3 | ✅ |
| Modal title | #0B1029 | #FFFFFF | 18.74:1 | 3:1 | 1.4.3 | ✅ |
| Modal eyebrow 'YOU\'RE BOOKING' | #4B5563 | #F7F8FB | 7.12:1 | 4.5:1 | 1.4.3 | ✅ |
| Modal slot summary line | #0B1029 | #F7F8FB | 17.65:1 | 4.5:1 | 1.4.3 | ✅ |
| Modal location subtext | #4B5563 | #F7F8FB | 7.12:1 | 4.5:1 | 1.4.3 | ✅ |
| Modal error text | #B91C1C | #FEF2F2 | 5.91:1 | 4.5:1 | 1.4.3 | ✅ |
| Modal error border (UI) | #EF4444 | #FEF2F2 | 3.44:1 | 3:1 | 1.4.11 | ✅ |
| Modal error countdown | #7F1D1D | #FEF2F2 | 9.16:1 | 4.5:1 | 1.4.3 | ✅ |
| Modal cancel button label | #7F1D1D | #FEF2F2 | 9.16:1 | 4.5:1 | 1.4.3 | ✅ |
| Modal progress filled (UI) | #B91C1C | #FECACA | 4.47:1 | 3:1 | 1.4.11 | ✅ |
| Modal confirm button label | #FFFFFF | #E8670A | 3.29:1 | 3:1 | 1.4.3 | ✅ |
| Modal '← Change time' link | #4B5563 | #FFFFFF | 7.56:1 | 4.5:1 | 1.4.3 | ✅ |
| BookLayout phone link | #FFFFFF | #000814 | 20.10:1 | 4.5:1 | 1.4.3 | ✅ |
| Survey card title text | #FFFFFF | #000814 | 20.10:1 | 3:1 | 1.4.3 | ✅ |
| Survey card body text | #E5E7EB | #000814 | 16.23:1 | 4.5:1 | 1.4.3 | ✅ |
| OptionRow default border (white card) | #8B92A0 | #FFFFFF | 3.13:1 | 3:1 | 1.4.11 | ✅ |
| OptionRow chevron icon (default) | #6B7280 | #FFFFFF | 4.83:1 | 3:1 | 1.4.11 | ✅ |
| OptionRow label | #0B1029 | #FFFFFF | 18.74:1 | 4.5:1 | 1.4.3 | ✅ |
| OptionRow selected fill label | #0B1029 | #FFF7F0 | 17.69:1 | 4.5:1 | 1.4.3 | ✅ |

## Final result: ✅ PASS — 0 AA failures
