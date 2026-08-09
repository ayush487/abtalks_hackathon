# ABTalks — Task: Fix checkboxes to select one at a time

## Steps
- [x] 1. Update `js/app.js` `renderDay()` to render scope items as radio inputs (single-select) styled as checkboxes
- [x] 2. Preserve the submitted "done" static state
- [x] 3. Add CSS in `css/styles.css` for radio-as-checkbox visuals
- [x] 4. Verify on /day/12 that only one checkbox can be selected at a time

## Bonus: Light/Dark theme toggle
- [x] Add light theme CSS vars (`[data-theme="light"]`) in `css/styles.css`
- [x] Add floating `.theme-toggle` button styles
- [x] Inject the toggle button in `shell()` via `themeToggle()`
- [x] Wire up the toggle handler in `hookUp()` with `localStorage` persistence
- [x] Restore saved theme on boot before first render
