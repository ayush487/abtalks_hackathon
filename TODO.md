# TODO — Convert hash router to path-based (History API) router

- [x] Update file header comment (Hash router → Path router)
- [x] Update `brandHref` in `header()` to `/`
- [x] Update profile button `data-go` to `/dashboard`
- [x] Update bottom nav hrefs to `/` and `/dashboard`
- [x] Update landing page CTA hrefs
- [x] Update dashboard page hrefs/data-go
- [x] Update day page hrefs
- [x] Rewrite `route()` to read `location.pathname`
- [x] Add `go()` helper using `history.pushState`
- [x] Update `hookUp()` data-go handler + add link interception
- [x] Update submission form day detection to `location.pathname`
- [x] Switch event listener from `hashchange` to `popstate`
- [x] Test routes: `/`, `/dashboard`, `/day/:n`
