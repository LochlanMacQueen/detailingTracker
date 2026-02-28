# Complete Styling Library Documentation

**Dashboard Theme + Bootstrap 5.3 - All Available Classes**

This is your complete reference for every class you can use in the dashboard theme.

---

## Table of Contents

1. [Layout & Structure](#layout--structure)
2. [Typography](#typography)
3. [Colors](#colors)
4. [Spacing](#spacing)
5. [Flexbox](#flexbox)
6. [Grid System](#grid-system)
7. [Display & Visibility](#display--visibility)
8. [Positioning](#positioning)
9. [Sizing](#sizing)
10. [Borders](#borders)
11. [Shadows](#shadows)
12. [Opacity](#opacity)
13. [Overflow](#overflow)
14. [Buttons](#buttons)
15. [Cards](#cards)
16. [Forms](#forms)
17. [Tables](#tables)
18. [Badges & Labels](#badges--labels)
19. [Navigation](#navigation)
20. [Alerts & Messages](#alerts--messages)
21. [Modals & Overlays](#modals--overlays)
22. [Tooltips & Popovers](#tooltips--popovers)
23. [Progress Bars](#progress-bars)
24. [Spinners & Loaders](#spinners--loaders)
25. [Pagination](#pagination)
26. [Breadcrumbs](#breadcrumbs)
27. [List Groups](#list-groups)
28. [Dropdowns](#dropdowns)
29. [Collapse & Accordion](#collapse--accordion)
30. [Dashboard Components](#dashboard-components)
31. [Images](#images)
32. [Links](#links)
33. [Vertical Alignment](#vertical-alignment)
34. [Float](#float)
35. [Interactions](#interactions)
36. [Utilities](#utilities)

---

## Layout & Structure

### Containers

#### `.container`
Fixed-width responsive container. Centers content with automatic margins.

#### `.container-fluid`
Full-width container spanning 100% of viewport.

#### `.container-sm`
Container that's fluid below small breakpoint (< 576px), fixed above.

#### `.container-md`
Container that's fluid below medium breakpoint (< 768px), fixed above.

#### `.container-lg`
Container that's fluid below large breakpoint (< 992px), fixed above.

#### `.container-xl`
Container that's fluid below extra large breakpoint (< 1200px), fixed above.

#### `.container-xxl`
Container that's fluid below extra extra large breakpoint (< 1400px), fixed above.

### Rows

#### `.row`
Creates flexbox row for grid columns. Negative margins align with container padding.

#### `.row-cols-{number}`
Sets number of equal-width columns per row. Number: 1-6.

#### `.row-cols-auto`
Columns size to their content.

#### `.row-cols-{breakpoint}-{number}`
Responsive columns per row. Example: `.row-cols-md-3`

### Columns

#### `.col`
Equal-width flexible column.

#### `.col-auto`
Column sizes to content width.

#### `.col-{number}`
Column width 1-12. Example: `.col-6` = 50% width.

#### `.col-{breakpoint}`
Equal-width column at breakpoint and above.

#### `.col-{breakpoint}-{number}`
Responsive column width. Example: `.col-md-6` = 50% on medium+.

#### `.col-{breakpoint}-auto`
Auto-width column at breakpoint.

### Column Offsets

#### `.offset-{number}`
Offset column by number of columns (1-11).

#### `.offset-{breakpoint}-{number}`
Responsive offset. Example: `.offset-md-2`

### Column Ordering

#### `.order-{number}`
Controls flex order (0-5).

#### `.order-first`
Display first (order: -1).

#### `.order-last`
Display last (order: 6).

#### `.order-{breakpoint}-{number}`
Responsive ordering. Example: `.order-md-2`

### Gutters

#### `.g-{size}`
Gap between columns, horizontal and vertical. Size: 0-5.

#### `.gx-{size}`
Horizontal gap only.

#### `.gy-{size}`
Vertical gap only.

#### `.g-{breakpoint}-{size}`
Responsive gutters. Example: `.g-md-3`

---

## Typography

### Headings

#### `.h1`
Heading 1 style. 2.5rem, bold.

#### `.h2`
Heading 2 style. 2rem, semibold.

#### `.h3`
Heading 3 style. 1.75rem, semibold.

#### `.h4`
Heading 4 style. 1.5rem, semibold.

#### `.h5`
Heading 5 style. 1.25rem, semibold.

#### `.h6`
Heading 6 style. 1rem, semibold.

### Display Headings

#### `.display-1`
Extra large display heading. 5rem.

#### `.display-2`
Large display heading. 4.5rem.

#### `.display-3`
Medium large display heading. 4rem.

#### `.display-4`
Medium display heading. 3.5rem.

#### `.display-5`
Small display heading. 3rem.

#### `.display-6`
Extra small display heading. 2.5rem.

### Lead Text

#### `.lead`
Makes paragraph stand out. Larger font size, lighter weight.

### Font Size

#### `.fs-1`
Font size 2.5rem (largest).

#### `.fs-2`
Font size 2rem.

#### `.fs-3`
Font size 1.75rem.

#### `.fs-4`
Font size 1.5rem.

#### `.fs-5`
Font size 1.25rem.

#### `.fs-6`
Font size 1rem (smallest).

### Font Weight

#### `.fw-light`
Font weight 300.

#### `.fw-lighter`
Font weight lighter than parent.

#### `.fw-normal`
Font weight 400 (normal).

#### `.fw-medium`
Font weight 500 (medium).

#### `.fw-semibold`
Font weight 600 (semibold).

#### `.fw-bold`
Font weight 700 (bold).

#### `.fw-bolder`
Font weight bolder than parent.

### Font Style

#### `.fst-italic`
Italic text.

#### `.fst-normal`
Normal (non-italic) text.

### Text Transform

#### `.text-lowercase`
Transforms text to lowercase.

#### `.text-uppercase`
Transforms text to UPPERCASE.

#### `.text-capitalize`
Capitalizes First Letter Of Each Word.

### Text Alignment

#### `.text-start`
Left-aligns text.

#### `.text-center`
Center-aligns text.

#### `.text-end`
Right-aligns text.

#### `.text-{breakpoint}-start`
Responsive left alignment. Example: `.text-md-start`

#### `.text-{breakpoint}-center`
Responsive center alignment.

#### `.text-{breakpoint}-end`
Responsive right alignment.

### Text Wrapping

#### `.text-wrap`
Allows text to wrap (default).

#### `.text-nowrap`
Prevents text wrapping.

#### `.text-break`
Breaks long words to prevent overflow.

#### `.text-truncate`
Truncates text with ellipsis. Requires block or inline-block.

### Text Decoration

#### `.text-decoration-none`
Removes underline from links.

#### `.text-decoration-underline`
Adds underline.

#### `.text-decoration-line-through`
Strikes through text.

### Line Height

#### `.lh-1`
Line height 1.

#### `.lh-sm`
Line height 1.25.

#### `.lh-base`
Line height 1.5 (default).

#### `.lh-lg`
Line height 2.

### Monospace

#### `.font-monospace`
Changes font to monospace family.

### Reset Color

#### `.text-reset`
Resets text color to inherit from parent.

### Small Text

#### `.small`
Makes text 0.875em (87.5% of parent).

### Mark/Highlight

#### `.mark`
Highlights text with background color.

### Abbreviations

#### `.initialism`
Slightly smaller text for abbreviations.

### Blockquote

#### `.blockquote`
Styles blockquote element.

#### `.blockquote-footer`
Footer attribution in blockquote.

### Lists

#### `.list-unstyled`
Removes default list styling and left padding.

#### `.list-inline`
Places list items inline.

#### `.list-inline-item`
Individual inline list item.

---

## Colors

### Text Colors

#### `.text-primary`
Light blue text (#5e9ff2).

#### `.text-secondary`
Gray text (#8b96a5).

#### `.text-success`
Green text (#34d399).

#### `.text-danger`
Red text (#f87171).

#### `.text-warning`
Orange text (#fbbf24).

#### `.text-info`
Sky blue text (#60a5fa).

#### `.text-light`
Light gray text.

#### `.text-dark`
Dark gray text.

#### `.text-body`
Default body text color (#343d48).

#### `.text-muted`
Muted gray text (#8b96a5).

#### `.text-black`
Pure black text.

#### `.text-white`
Pure white text.

#### `.text-black-50`
50% opacity black text.

#### `.text-white-50`
50% opacity white text.

#### `.text-heading`
Heading color (#1a1f26).

#### `.text-secondary`
Secondary text color (#6b7784).

#### `.text-muted-light`
Light muted text (#9ca3af).

### Text Color Opacity

#### `.text-opacity-{value}`
Sets text opacity. Values: 25, 50, 75, 100.

### Background Colors

#### `.bg-primary`
Light blue background (#5e9ff2).

#### `.bg-secondary`
Gray background (#8b96a5).

#### `.bg-success`
Green background (#34d399).

#### `.bg-danger`
Red background (#f87171).

#### `.bg-warning`
Orange background (#fbbf24).

#### `.bg-info`
Sky blue background (#60a5fa).

#### `.bg-light`
Light gray background (#f5f7f9).

#### `.bg-dark`
Dark gray background.

#### `.bg-body`
Body background color (#f5f7f9).

#### `.bg-white`
White background.

#### `.bg-transparent`
Transparent background.

#### `.bg-black`
Black background.

### Background Opacity

#### `.bg-opacity-{value}`
Sets background opacity. Values: 10, 25, 50, 75, 100.

### Gradient

#### `.bg-gradient`
Adds gradient to background color.

---

## Spacing

Spacing scale: 0 = 0, 1 = 0.25rem, 2 = 0.5rem, 3 = 1rem, 4 = 1.5rem, 5 = 3rem

### Margin All Sides

#### `.m-0`
Margin 0.

#### `.m-1`
Margin 0.25rem.

#### `.m-2`
Margin 0.5rem.

#### `.m-3`
Margin 1rem.

#### `.m-4`
Margin 1.5rem.

#### `.m-5`
Margin 3rem.

#### `.m-auto`
Auto margin (centers block elements).

### Margin Top

#### `.mt-0` through `.mt-5`
Margin top (0 to 3rem).

#### `.mt-auto`
Auto margin top.

### Margin Bottom

#### `.mb-0` through `.mb-5`
Margin bottom (0 to 3rem).

#### `.mb-auto`
Auto margin bottom.

### Margin Start (Left)

#### `.ms-0` through `.ms-5`
Margin start/left (0 to 3rem).

#### `.ms-auto`
Auto margin start.

### Margin End (Right)

#### `.me-0` through `.me-5`
Margin end/right (0 to 3rem).

#### `.me-auto`
Auto margin end.

### Margin Horizontal

#### `.mx-0` through `.mx-5`
Margin left and right (0 to 3rem).

#### `.mx-auto`
Auto horizontal margins (centers element).

### Margin Vertical

#### `.my-0` through `.my-5`
Margin top and bottom (0 to 3rem).

#### `.my-auto`
Auto vertical margins.

### Negative Margin

#### `.mt-n1` through `.mt-n5`
Negative margin top.

#### `.mb-n1` through `.mb-n5`
Negative margin bottom.

#### `.ms-n1` through `.ms-n5`
Negative margin start.

#### `.me-n1` through `.me-n5`
Negative margin end.

#### `.mx-n1` through `.mx-n5`
Negative horizontal margin.

#### `.my-n1` through `.my-n5`
Negative vertical margin.

### Padding All Sides

#### `.p-0` through `.p-5`
Padding all sides (0 to 3rem).

### Padding Top

#### `.pt-0` through `.pt-5`
Padding top (0 to 3rem).

### Padding Bottom

#### `.pb-0` through `.pb-5`
Padding bottom (0 to 3rem).

### Padding Start (Left)

#### `.ps-0` through `.ps-5`
Padding start/left (0 to 3rem).

### Padding End (Right)

#### `.pe-0` through `.pe-5`
Padding end/right (0 to 3rem).

### Padding Horizontal

#### `.px-0` through `.px-5`
Padding left and right (0 to 3rem).

### Padding Vertical

#### `.py-0` through `.py-5`
Padding top and bottom (0 to 3rem).

### Gap

#### `.gap-0` through `.gap-5`
Gap between flex/grid items (0 to 3rem).

#### `.row-gap-0` through `.row-gap-5`
Vertical gap only.

#### `.column-gap-0` through `.column-gap-5`
Horizontal gap only.

### Responsive Spacing

#### `.{property}-{breakpoint}-{size}`
All spacing utilities support responsive variants.

Examples:
- `.mb-3.mb-md-4.mb-lg-5`
- `.p-2.p-md-3`
- `.gap-2.gap-lg-4`

---

## Flexbox

### Display Flex

#### `.d-flex`
Creates flexbox container.

#### `.d-inline-flex`
Creates inline flexbox container.

#### `.d-{breakpoint}-flex`
Responsive flex display. Example: `.d-md-flex`

#### `.d-{breakpoint}-inline-flex`
Responsive inline flex. Example: `.d-lg-inline-flex`

### Flex Direction

#### `.flex-row`
Horizontal direction (default).

#### `.flex-row-reverse`
Horizontal, reversed.

#### `.flex-column`
Vertical direction.

#### `.flex-column-reverse`
Vertical, reversed.

#### `.flex-{breakpoint}-row`
Responsive row direction.

#### `.flex-{breakpoint}-column`
Responsive column direction.

### Justify Content (Horizontal Alignment)

#### `.justify-content-start`
Align items to start (left).

#### `.justify-content-end`
Align items to end (right).

#### `.justify-content-center`
Center items horizontally.

#### `.justify-content-between`
Space between items. First/last touch edges.

#### `.justify-content-around`
Space around items.

#### `.justify-content-evenly`
Equal space between all items.

#### `.justify-content-{breakpoint}-{value}`
Responsive justify content. Example: `.justify-content-md-between`

### Align Items (Vertical Alignment)

#### `.align-items-start`
Align items to top.

#### `.align-items-end`
Align items to bottom.

#### `.align-items-center`
Center items vertically.

#### `.align-items-baseline`
Align to text baseline.

#### `.align-items-stretch`
Stretch items to fill (default).

#### `.align-items-{breakpoint}-{value}`
Responsive align items. Example: `.align-items-lg-center`

### Align Self

#### `.align-self-start`
Align individual item to start.

#### `.align-self-end`
Align individual item to end.

#### `.align-self-center`
Center individual item.

#### `.align-self-baseline`
Align individual item to baseline.

#### `.align-self-stretch`
Stretch individual item.

#### `.align-self-{breakpoint}-{value}`
Responsive align self.

### Align Content

#### `.align-content-start`
Pack lines to start.

#### `.align-content-end`
Pack lines to end.

#### `.align-content-center`
Center lines.

#### `.align-content-between`
Space between lines.

#### `.align-content-around`
Space around lines.

#### `.align-content-stretch`
Stretch lines (default).

#### `.align-content-{breakpoint}-{value}`
Responsive align content.

### Flex Fill

#### `.flex-fill`
Forces item to fill available space.

#### `.flex-{breakpoint}-fill`
Responsive flex fill.

### Flex Grow & Shrink

#### `.flex-grow-0`
Prevents item from growing.

#### `.flex-grow-1`
Allows item to grow.

#### `.flex-shrink-0`
Prevents item from shrinking.

#### `.flex-shrink-1`
Allows item to shrink (default).

#### `.flex-{breakpoint}-grow-{value}`
Responsive flex grow.

#### `.flex-{breakpoint}-shrink-{value}`
Responsive flex shrink.

### Flex Wrap

#### `.flex-wrap`
Allows items to wrap.

#### `.flex-nowrap`
Prevents wrapping (default).

#### `.flex-wrap-reverse`
Wraps in reverse.

#### `.flex-{breakpoint}-wrap`
Responsive wrap.

### Order

#### `.order-first`
Display first (order: -1).

#### `.order-0` through `.order-5`
Flex order 0-5.

#### `.order-last`
Display last (order: 6).

#### `.order-{breakpoint}-{value}`
Responsive order.

---

## Grid System

### Auto Layout

#### `.col`
Equal-width column.

#### `.col-auto`
Column sizes to content.

### Fixed Widths

#### `.col-1` through `.col-12`
Column widths (1/12 to 12/12 of container).

### Responsive Columns

#### `.col-sm-{number}`
Small screens (≥ 576px).

#### `.col-md-{number}`
Medium screens (≥ 768px).

#### `.col-lg-{number}`
Large screens (≥ 992px).

#### `.col-xl-{number}`
Extra large screens (≥ 1200px).

#### `.col-xxl-{number}`
Extra extra large screens (≥ 1400px).

### Mixed Columns

Combine breakpoints for complex layouts:
- `.col-12.col-md-6.col-lg-4` = Full mobile, half tablet, third desktop

---

## Display & Visibility

### Display

#### `.d-none`
Hide element (display: none).

#### `.d-inline`
Display inline.

#### `.d-inline-block`
Display inline-block.

#### `.d-block`
Display block.

#### `.d-grid`
Display grid.

#### `.d-table`
Display table.

#### `.d-table-row`
Display table-row.

#### `.d-table-cell`
Display table-cell.

#### `.d-flex`
Display flex.

#### `.d-inline-flex`
Display inline-flex.

### Responsive Display

#### `.d-{breakpoint}-{value}`
Show/hide at specific breakpoints.

Examples:
- `.d-none.d-md-block` = Hide mobile, show tablet+
- `.d-block.d-lg-none` = Show mobile/tablet, hide desktop+
- `.d-none.d-sm-inline.d-md-block` = Different displays per breakpoint

### Visibility

#### `.visible`
Makes element visible.

#### `.invisible`
Hides element but maintains space.

---

## Positioning

### Position

#### `.position-static`
Static positioning (default).

#### `.position-relative`
Relative positioning.

#### `.position-absolute`
Absolute positioning.

#### `.position-fixed`
Fixed positioning.

#### `.position-sticky`
Sticky positioning.

### Fixed Positioning

#### `.fixed-top`
Fixed to top of viewport.

#### `.fixed-bottom`
Fixed to bottom of viewport.

### Sticky Positioning

#### `.sticky-top`
Sticky to top when scrolling.

#### `.sticky-bottom`
Sticky to bottom when scrolling.

#### `.sticky-{breakpoint}-top`
Responsive sticky top.

### Position Values

#### `.top-0`
Top position 0%.

#### `.top-50`
Top position 50%.

#### `.top-100`
Top position 100%.

#### `.bottom-0`
Bottom position 0%.

#### `.bottom-50`
Bottom position 50%.

#### `.bottom-100`
Bottom position 100%.

#### `.start-0`
Left position 0%.

#### `.start-50`
Left position 50%.

#### `.start-100`
Left position 100%.

#### `.end-0`
Right position 0%.

#### `.end-50`
Right position 50%.

#### `.end-100`
Right position 100%.

### Translate Middle

#### `.translate-middle`
Translates element -50% on both axes (perfect centering).

#### `.translate-middle-x`
Translates -50% on x-axis.

#### `.translate-middle-y`
Translates -50% on y-axis.

---

## Sizing

### Width

#### `.w-25`
Width 25%.

#### `.w-50`
Width 50%.

#### `.w-75`
Width 75%.

#### `.w-100`
Width 100%.

#### `.w-auto`
Width auto (content-based).

### Max Width

#### `.mw-100`
Max-width 100%.

### Viewport Width

#### `.vw-100`
Width 100vw (viewport width).

#### `.min-vw-100`
Min-width 100vw.

### Height

#### `.h-25`
Height 25%.

#### `.h-50`
Height 50%.

#### `.h-75`
Height 75%.

#### `.h-100`
Height 100%.

#### `.h-auto`
Height auto (content-based).

### Max Height

#### `.mh-100`
Max-height 100%.

### Viewport Height

#### `.vh-100`
Height 100vh (viewport height).

#### `.min-vh-100`
Min-height 100vh.

---

## Borders

### Border

#### `.border`
Adds border on all sides (1px, light gray).

#### `.border-0`
Removes all borders.

#### `.border-top`
Border on top only.

#### `.border-bottom`
Border on bottom only.

#### `.border-start`
Border on left only.

#### `.border-end`
Border on right only.

#### `.border-top-0`
Removes top border.

#### `.border-bottom-0`
Removes bottom border.

#### `.border-start-0`
Removes left border.

#### `.border-end-0`
Removes right border.

### Border Color

#### `.border-primary`
Light blue border.

#### `.border-secondary`
Gray border.

#### `.border-success`
Green border.

#### `.border-danger`
Red border.

#### `.border-warning`
Orange border.

#### `.border-info`
Blue border.

#### `.border-light`
Light gray border.

#### `.border-dark`
Dark border.

#### `.border-white`
White border.

### Border Width

#### `.border-1`
1px border width.

#### `.border-2`
2px border width.

#### `.border-3`
3px border width.

#### `.border-4`
4px border width.

#### `.border-5`
5px border width.

### Border Opacity

#### `.border-opacity-{value}`
Sets border opacity. Values: 10, 25, 50, 75, 100.

### Border Radius

#### `.rounded`
Border radius 0.75rem (default).

#### `.rounded-0`
No border radius (sharp corners).

#### `.rounded-1`
Small border radius 0.5rem.

#### `.rounded-2`
Medium border radius 0.75rem.

#### `.rounded-3`
Large border radius 1rem.

#### `.rounded-4`
Extra large border radius 1.25rem.

#### `.rounded-5`
XXL border radius 2rem.

#### `.rounded-circle`
Fully circular (50% radius). Perfect for avatars.

#### `.rounded-pill`
Pill-shaped (fully rounded ends).

#### `.rounded-top`
Rounded top corners only.

#### `.rounded-bottom`
Rounded bottom corners only.

#### `.rounded-start`
Rounded left corners only.

#### `.rounded-end`
Rounded right corners only.

---

## Shadows

### Box Shadow

#### `.shadow-none`
No shadow.

#### `.shadow-sm`
Small subtle shadow.

#### `.shadow`
Default shadow.

#### `.shadow-lg`
Large prominent shadow.

---

## Opacity

### Opacity

#### `.opacity-0`
0% opacity (invisible).

#### `.opacity-25`
25% opacity.

#### `.opacity-50`
50% opacity.

#### `.opacity-75`
75% opacity.

#### `.opacity-100`
100% opacity (fully visible).

---

## Overflow

### Overflow

#### `.overflow-auto`
Auto scrollbar when content overflows.

#### `.overflow-hidden`
Hides overflowing content.

#### `.overflow-visible`
Shows overflowing content (default).

#### `.overflow-scroll`
Always shows scrollbar.

### Overflow X

#### `.overflow-x-auto`
Horizontal auto scroll.

#### `.overflow-x-hidden`
Hides horizontal overflow.

#### `.overflow-x-visible`
Shows horizontal overflow.

#### `.overflow-x-scroll`
Always horizontal scrollbar.

### Overflow Y

#### `.overflow-y-auto`
Vertical auto scroll.

#### `.overflow-y-hidden`
Hides vertical overflow.

#### `.overflow-y-visible`
Shows vertical overflow.

#### `.overflow-y-scroll`
Always vertical scrollbar.

---

## Buttons

### Button Base

#### `.btn`
Base button class. Required for all buttons.

### Button Styles

#### `.btn-primary`
Light blue button (10% bg opacity, 30% border opacity, full text).

#### `.btn-secondary`
Gray button.

#### `.btn-success`
Green button.

#### `.btn-danger`
Red button.

#### `.btn-warning`
Orange button.

#### `.btn-info`
Blue button.

#### `.btn-light`
Light gray button.

#### `.btn-dark`
Dark button.

#### `.btn-link`
Button styled as link (no background/border).

### Outline Buttons

#### `.btn-outline-primary`
Outline button with light blue border.

#### `.btn-outline-secondary`
Outline button with gray border.

#### `.btn-outline-success`
Outline button with green border.

#### `.btn-outline-danger`
Outline button with red border.

#### `.btn-outline-warning`
Outline button with orange border.

#### `.btn-outline-info`
Outline button with blue border.

#### `.btn-outline-light`
Outline button with light border.

#### `.btn-outline-dark`
Outline button with dark border.

### Button Sizes

#### `.btn-lg`
Large button (0.75rem 1.5rem padding, 1rem font).

#### `.btn-sm`
Small button (0.5rem 1rem padding, 0.8125rem font).

### Button States

#### `.disabled`
Visually disables button.

#### `.active`
Active/pressed state.

### Button Groups

#### `.btn-group`
Groups buttons horizontally.

#### `.btn-group-vertical`
Groups buttons vertically.

#### `.btn-group-sm`
Small button group.

#### `.btn-group-lg`
Large button group.

#### `.btn-toolbar`
Groups multiple button groups.

---

## Cards

### Card Base

#### `.card`
Card container. White background, border, rounded corners.

### Card Sections

#### `.card-body`
Main card content. Padding: 1.5rem.

#### `.card-header`
Card header with bottom border. Padding: 1.25rem 1.5rem.

#### `.card-footer`
Card footer with top border.

#### `.card-title`
Card title styling.

#### `.card-subtitle`
Card subtitle with muted color.

#### `.card-text`
Paragraph text in card.

#### `.card-link`
Styled link in card.

### Card Images

#### `.card-img`
Image spans entire card.

#### `.card-img-top`
Image at top of card.

#### `.card-img-bottom`
Image at bottom of card.

#### `.card-img-overlay`
Overlay content on image.

### Card Groups

#### `.card-group`
Connected cards with equal height.

#### `.card-deck`
Flexible equal-height cards.

### Card Colors

#### `.card-{color}`
Contextual card colors (primary, secondary, success, etc.).

### Card Borders

#### `.border-{color}`
Colored card border.

---

## Forms

### Form Controls

#### `.form-control`
Text input, textarea, select. Border, padding, rounded.

#### `.form-control-lg`
Large form control.

#### `.form-control-sm`
Small form control.

#### `.form-control-plaintext`
Plain text input (no border/background).

#### `.form-control-color`
Color picker input.

### Form Labels

#### `.form-label`
Label for form controls. Medium weight, 0.875rem.

#### `.col-form-label`
Label in horizontal form with grid.

#### `.col-form-label-lg`
Large label for horizontal form.

#### `.col-form-label-sm`
Small label for horizontal form.

### Form Text

#### `.form-text`
Helper text below inputs. Small, muted color.

### Form Select

#### `.form-select`
Styled select dropdown.

#### `.form-select-lg`
Large select dropdown.

#### `.form-select-sm`
Small select dropdown.

### Form Check (Checkbox/Radio)

#### `.form-check`
Wrapper for checkbox or radio.

#### `.form-check-input`
Checkbox or radio input.

#### `.form-check-label`
Label for checkbox or radio.

#### `.form-check-inline`
Inline checkbox or radio.

#### `.form-check-reverse`
Reverses checkbox/radio and label order.

### Form Switch

#### `.form-switch`
Toggle switch styled checkbox.

### Form Range

#### `.form-range`
Range slider input.

### Form Floating Labels

#### `.form-floating`
Floating label container.

### Input Groups

#### `.input-group`
Groups input with addons.

#### `.input-group-text`
Text or icon addon.

#### `.input-group-lg`
Large input group.

#### `.input-group-sm`
Small input group.

### Validation

#### `.was-validated`
Applies validation styles to form.

#### `.is-valid`
Valid state (green border).

#### `.is-invalid`
Invalid state (red border).

#### `.valid-feedback`
Success message (green).

#### `.invalid-feedback`
Error message (red).

#### `.valid-tooltip`
Tooltip-style success message.

#### `.invalid-tooltip`
Tooltip-style error message.

---

## Tables

### Table Base

#### `.table`
Base table class. Required.

### Table Variants

#### `.table-striped`
Zebra-striped rows.

#### `.table-hover`
Row hover effect.

#### `.table-bordered`
Borders on all cells.

#### `.table-borderless`
No borders.

#### `.table-sm`
Compact table (reduced padding).

### Responsive Tables

#### `.table-responsive`
Horizontal scroll on all screens.

#### `.table-responsive-sm`
Scrollable below 576px.

#### `.table-responsive-md`
Scrollable below 768px.

#### `.table-responsive-lg`
Scrollable below 992px.

#### `.table-responsive-xl`
Scrollable below 1200px.

#### `.table-responsive-xxl`
Scrollable below 1400px.

### Table Colors

#### `.table-primary`
Light blue row/cell background.

#### `.table-secondary`
Gray row/cell background.

#### `.table-success`
Green row/cell background.

#### `.table-danger`
Red row/cell background.

#### `.table-warning`
Orange row/cell background.

#### `.table-info`
Blue row/cell background.

#### `.table-light`
Light gray row/cell background.

#### `.table-dark`
Dark row/cell background.

#### `.table-active`
Highlights row with gray background.

---

## Badges & Labels

### Badges

#### `.badge`
Small count or label indicator.

#### `.bg-{color}`
Badge background color (combine with `.badge`).

#### `.rounded-pill`
Pill-shaped badge.

### Badge Positioning

#### `.position-absolute`
Position badge absolutely (for notification badges).

#### `.top-0.start-100.translate-middle`
Position badge at top-right corner.

---

## Navigation

### Navbar

#### `.navbar`
Navigation bar container.

#### `.navbar-brand`
Brand logo or text.

#### `.navbar-nav`
Navigation links container.

#### `.nav-item`
Individual navigation item.

#### `.nav-link`
Navigation link.

#### `.navbar-toggler`
Mobile menu toggle button.

#### `.navbar-toggler-icon`
Toggle icon (hamburger).

#### `.navbar-collapse`
Collapsible navbar content.

#### `.navbar-text`
Text in navbar.

#### `.navbar-expand-{breakpoint}`
When navbar expands to horizontal (sm, md, lg, xl, xxl).

#### `.navbar-light`
Light navbar theme.

#### `.navbar-dark`
Dark navbar theme.

### Nav

#### `.nav`
Base nav component.

#### `.nav-tabs`
Tab-style navigation.

#### `.nav-pills`
Pill-style navigation.

#### `.nav-fill`
Nav items fill available width equally.

#### `.nav-justified`
Nav items fill width with equal-width items.

### Nav Items

#### `.nav-item`
Nav item wrapper.

#### `.nav-link`
Nav link.

#### `.nav-link.active`
Active nav link.

#### `.nav-link.disabled`
Disabled nav link.

---

## Alerts & Messages

### Alerts

#### `.alert`
Alert box base class.

#### `.alert-primary`
Light blue alert.

#### `.alert-secondary`
Gray alert.

#### `.alert-success`
Green alert.

#### `.alert-danger`
Red alert.

#### `.alert-warning`
Orange alert.

#### `.alert-info`
Blue alert.

#### `.alert-light`
Light gray alert.

#### `.alert-dark`
Dark alert.

### Alert Elements

#### `.alert-heading`
Heading inside alert.

#### `.alert-link`
Styled link in alert (matching alert color).

### Dismissible Alerts

#### `.alert-dismissible`
Alert with close button.

#### `.btn-close`
Close button for dismissible alert.

---

## Modals & Overlays

### Modal

#### `.modal`
Modal overlay container.

#### `.modal-dialog`
Modal dialog box.

#### `.modal-content`
Modal content wrapper.

#### `.modal-header`
Modal header section.

#### `.modal-body`
Modal body content.

#### `.modal-footer`
Modal footer with actions.

#### `.modal-title`
Title in modal header.

### Modal Sizes

#### `.modal-sm`
Small modal (300px).

#### `.modal-lg`
Large modal (800px).

#### `.modal-xl`
Extra large modal (1140px).

#### `.modal-fullscreen`
Fullscreen modal.

#### `.modal-fullscreen-{breakpoint}-down`
Fullscreen below breakpoint.

### Modal Options

#### `.modal-dialog-centered`
Vertically centered modal.

#### `.modal-dialog-scrollable`
Scrollable modal body.

#### `.modal-static`
Non-dismissible backdrop.

### Offcanvas

#### `.offcanvas`
Offcanvas panel (slide-in sidebar).

#### `.offcanvas-start`
Slides in from left.

#### `.offcanvas-end`
Slides in from right.

#### `.offcanvas-top`
Slides in from top.

#### `.offcanvas-bottom`
Slides in from bottom.

#### `.offcanvas-header`
Offcanvas header.

#### `.offcanvas-body`
Offcanvas content.

#### `.offcanvas-title`
Offcanvas title.

---

## Tooltips & Popovers

### Tooltips

#### `data-bs-toggle="tooltip"`
Enables tooltip (requires JS initialization).

#### `data-bs-placement="top|bottom|left|right"`
Tooltip position.

#### `title="..."`
Tooltip text content.

### Popovers

#### `data-bs-toggle="popover"`
Enables popover (requires JS initialization).

#### `data-bs-placement="top|bottom|left|right"`
Popover position.

#### `data-bs-content="..."`
Popover content text.

#### `data-bs-title="..."`
Popover title.

---

## Progress Bars

### Progress

#### `.progress`
Progress bar container.

#### `.progress-bar`
Progress bar fill element.

#### `.progress-bar-striped`
Striped pattern.

#### `.progress-bar-animated`
Animated stripes.

### Progress Colors

#### `.bg-{color}`
Progress bar color (primary, success, danger, etc.).

---

## Spinners & Loaders

### Spinners

#### `.spinner-border`
Border spinner (circular).

#### `.spinner-grow`
Growing dot spinner.

#### `.spinner-border-sm`
Small border spinner.

#### `.spinner-grow-sm`
Small grow spinner.

### Spinner Colors

#### `.text-{color}`
Spinner color.

---

## Pagination

### Pagination

#### `.pagination`
Pagination container.

#### `.page-item`
Wrapper for pagination links.

#### `.page-link`
Individual pagination link.

#### `.page-item.active`
Active/current page.

#### `.page-item.disabled`
Disabled page link.

### Pagination Sizes

#### `.pagination-lg`
Large pagination.

#### `.pagination-sm`
Small pagination.

---

## Breadcrumbs

### Breadcrumb

#### `.breadcrumb`
Breadcrumb navigation container.

#### `.breadcrumb-item`
Individual breadcrumb item.

#### `.breadcrumb-item.active`
Current page in breadcrumb.

---

## List Groups

### List Group

#### `.list-group`
List group container.

#### `.list-group-item`
Individual list item.

#### `.list-group-item-action`
Actionable/clickable list item.

#### `.list-group-item.active`
Active list item.

#### `.list-group-item.disabled`
Disabled list item.

### List Group Variants

#### `.list-group-flush`
Removes borders and rounded corners.

#### `.list-group-horizontal`
Horizontal list group.

#### `.list-group-horizontal-{breakpoint}`
Horizontal at breakpoint.

#### `.list-group-numbered`
Numbered list items.

### List Group Colors

#### `.list-group-item-{color}`
Contextual colors (primary, success, danger, etc.).

---

## Dropdowns

### Dropdown

#### `.dropdown`
Dropdown wrapper (position: relative).

#### `.dropdown-toggle`
Button that triggers dropdown.

#### `.dropdown-menu`
Dropdown menu container.

#### `.dropdown-item`
Individual item in dropdown.

#### `.dropdown-divider`
Horizontal divider.

#### `.dropdown-header`
Non-interactive header.

#### `.dropdown-item-text`
Non-interactive text item.

### Dropdown Directions

#### `.dropup`
Opens upward.

#### `.dropend`
Opens to the right.

#### `.dropstart`
Opens to the left.

#### `.dropdown-center`
Centers dropdown.

#### `.dropup-center`
Centers dropup.

### Dropdown Alignment

#### `.dropdown-menu-end`
Aligns dropdown to right.

#### `.dropdown-menu-start`
Aligns dropdown to left (default).

#### `.dropdown-menu-{breakpoint}-end`
Responsive alignment.

### Dropdown Options

#### `.dropdown-menu-dark`
Dark dropdown theme.

---

## Collapse & Accordion

### Collapse

#### `.collapse`
Collapsible content. Hidden by default.

#### `.collapse.show`
Visible collapsed content.

#### `data-bs-toggle="collapse"`
Triggers collapse.

#### `data-bs-target="#id"`
Target element to collapse.

### Accordion

#### `.accordion`
Accordion container.

#### `.accordion-item`
Individual accordion item.

#### `.accordion-header`
Accordion header/button.

#### `.accordion-button`
Clickable accordion trigger.

#### `.accordion-collapse`
Collapsible content area.

#### `.accordion-body`
Accordion content.

#### `.accordion-flush`
Removes borders and rounded corners.

---

## Dashboard Components

### Sidebar

#### `.sidebar`
Sidebar navigation container. 260px width, white background, right border.

#### `.sidebar-header`
Sidebar header section.

#### `.sidebar-brand`
Brand logo/text in sidebar.

#### `.sidebar-menu`
Navigation list container.

#### `.sidebar-item`
Individual nav item wrapper.

#### `.sidebar-link`
Navigation link with icon and text.

#### `.sidebar-link.active`
Active navigation item. Light blue background (8% opacity).

#### `.sidebar-divider`
Section divider with border.

#### `.sidebar-section-title`
Uppercase section label.

### Top Bar

#### `.top-bar`
Top navigation bar. Sticky, white background, bottom border.

#### `.top-bar-start`
Left-aligned content.

#### `.top-bar-end`
Right-aligned content.

### Main Content

#### `.main-content`
Main content area. Light gray background, 2rem padding.

### Page Header

#### `.page-header`
Page title section.

#### `.page-title`
Main page heading. 1.75rem, bold.

#### `.page-subtitle`
Page description. Muted color.

### Metric Cards

#### `.stat-card`
Metric card. Light gray background matching page.

#### `.metric-value`
Large metric number. 2rem, bold.

#### `.metric-label`
Small label. 0.875rem, muted.

#### `.metric-change`
Change indicator.

#### `.metric-change.positive`
Green positive change.

#### `.metric-change.negative`
Red negative change.

### Icon Badges

#### `.icon-badge`
Circular icon container. 2.5rem diameter.

#### `.icon-badge-blue`
Light blue background (#f0f7ff), blue icon.

#### `.icon-badge-purple`
Light purple background, purple icon.

#### `.icon-badge-orange`
Light orange background, orange icon.

#### `.icon-badge-green`
Light green background, green icon.

#### `.icon-badge-pink`
Light pink background, pink icon.

#### `.icon-badge-cyan`
Light cyan background, cyan icon.

### Chart Cards

#### `.chart-card`
Chart container. White background, 1.5rem padding.

#### `.chart-header`
Chart header section.

#### `.chart-title`
Chart title. 1.125rem, semibold.

#### `.chart-subtitle`
Chart description. Muted color.

### Search

#### `.search-bar`
Search input wrapper with icon.

### User Profile

#### `.user-profile`
User profile display.

#### `.user-avatar`
Circular avatar. 2.25rem diameter.

#### `.user-info`
Name and role container.

#### `.user-name`
User's name. Semibold.

#### `.user-role`
User's role. Small, muted.

### Notifications

#### `.notification-badge`
Notification icon with badge.

---

## Images

### Image Classes

#### `.img-fluid`
Responsive image (max-width: 100%, height: auto).

#### `.img-thumbnail`
Image with border and padding.

### Image Alignment

#### `.rounded`
Rounded image corners.

#### `.rounded-circle`
Circular image (for avatars).

#### `.rounded-{size}`
Specific border radius (0-5).

### Float

#### `.float-start`
Float image left.

#### `.float-end`
Float image right.

#### `.float-none`
No float.

---

## Links

### Link Colors

#### `.link-primary`
Light blue link.

#### `.link-secondary`
Gray link.

#### `.link-success`
Green link.

#### `.link-danger`
Red link.

#### `.link-warning`
Orange link.

#### `.link-info`
Blue link.

#### `.link-light`
Light link.

#### `.link-dark`
Dark link.

### Link Utilities

#### `.link-opacity-{value}`
Link opacity (10, 25, 50, 75, 100).

#### `.link-opacity-{value}-hover`
Hover opacity.

#### `.link-underline`
Always underlined link.

#### `.link-underline-opacity-{value}`
Underline opacity.

---

## Vertical Alignment

### Vertical Align

#### `.align-baseline`
Aligns to baseline.

#### `.align-top`
Aligns to top.

#### `.align-middle`
Aligns to middle.

#### `.align-bottom`
Aligns to bottom.

#### `.align-text-top`
Aligns to text top.

#### `.align-text-bottom`
Aligns to text bottom.

---

## Float

### Float

#### `.float-start`
Float left.

#### `.float-end`
Float right.

#### `.float-none`
No float.

#### `.float-{breakpoint}-{value}`
Responsive float. Example: `.float-md-start`

### Clearfix

#### `.clearfix`
Clears floated elements.

---

## Interactions

### Pointer Events

#### `.pe-none`
Disables pointer events (not clickable).

#### `.pe-auto`
Enables pointer events (default).

### User Select

#### `.user-select-all`
Selects all text on click.

#### `.user-select-auto`
Default selection behavior.

#### `.user-select-none`
Prevents text selection.

### Pointer

#### `.cursor-pointer`
Changes cursor to pointer (custom addition).

---

## Utilities

### Stacks

#### `.hstack`
Horizontal stack (flexbox row with gap).

#### `.vstack`
Vertical stack (flexbox column with gap).

### Ratio

#### `.ratio`
Maintains aspect ratio container.

#### `.ratio-1x1`
1:1 aspect ratio (square).

#### `.ratio-4x3`
4:3 aspect ratio.

#### `.ratio-16x9`
16:9 aspect ratio (widescreen).

#### `.ratio-21x9`
21:9 aspect ratio (ultra-wide).

### Object Fit

#### `.object-fit-contain`
Scales to fit (maintains aspect).

#### `.object-fit-cover`
Covers container (maintains aspect).

#### `.object-fit-fill`
Stretches to fill.

#### `.object-fit-scale`
Scales down if needed.

#### `.object-fit-none`
No resizing.

### Z-index

#### `.z-n1`
Z-index -1.

#### `.z-0`
Z-index 0.

#### `.z-1`
Z-index 1.

#### `.z-2`
Z-index 2.

#### `.z-3`
Z-index 3.

---

## Responsive Utilities

### Breakpoint Format

Pattern: `.{property}-{breakpoint}-{value}`

### Available Breakpoints

- No suffix = All screens
- `sm` = ≥ 576px
- `md` = ≥ 768px
- `lg` = ≥ 992px
- `xl` = ≥ 1200px
- `xxl` = ≥ 1400px

### Responsive Examples

- `.d-none.d-md-block` = Hide mobile, show tablet+
- `.col-12.col-md-6.col-lg-4` = Full/half/third width
- `.mb-3.mb-lg-5` = Different margins
- `.text-start.text-md-center` = Different alignments
- `.flex-column.flex-lg-row` = Stack mobile, row desktop

---

*Complete Styling Library - Dashboard Theme v1.0 - Bootstrap 5.3+ - Last updated January 2026*
