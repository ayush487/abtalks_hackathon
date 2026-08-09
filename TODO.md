# TODO — Convert hash router to path-based (History API) router

- [x] Update file header comment (Hash router → Path router)
- [x] Add `BASE` base-path helper + `p()` prefix function
- [x] Update `brandHref` in `header()` to `p('/')`
- [x] Update profile button `data-go` to `p('/dashboard')`
- [x] Update bottom nav hrefs to `p('/')` and `p('/dashboard')`
- [x] Update landing page CTA hrefs to `p('/dashboard')` and `p('/day/12')`
- [x] Update dashboard page hrefs/data-go
- [x] Update day page hrefs
- [x] Rewrite `route()` to read `location.pathname` (base-path aware)
- [x] Add `go()` helper using `history.pushState`
- [x] Update `hookUp()` data-go handler + intercept `a[href^="/"]` anchors
- [x] Update submission form day detection to `location.pathname`
- [x] Switch event listener from `hashchange` to `popstate`
- [x] Test routes: `/`, `/dashboard`, `/day/:n`
