// ============================================================
// ABTalks — App logic
// Path router (History API) + view renderers + streak-freeze logic.
// Routes: / , /dashboard , /day/:n
// ============================================================
(function () {
  'use strict';

var D = window.ABDATA;
  var app = document.getElementById('app');

  // ---- base path (GitHub Pages / subpath aware) ----
  // Derives the app's base directory from the current URL so that
  // routes keep the deployment subpath, e.g. /abtalks_hackathon/dashboard
  var BASE = (function () {
    var t = location.pathname.replace(/\/+$/, '');
    return t.replace(/\/dashboard$/, '').replace(/\/day\/\d+$/, '');
  })();

  // prefix a route with the base path
  function p(path) {
    return BASE + path;
  }

  // ---- current demo student (switched via the demo switcher) ----
  var currentStudentId = 'active';
  var student = D.students[currentStudentId];

  // ---------- tiny helpers ----------
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"');
  }
  function icon(id, cls) {
    return '<svg class="' + (cls || '') + '"><use href="#icon-' + id + '"></use></svg>';
  }
  function initials(name) {
    return name.split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('');
  }
  function trackOf(id) {
    return D.tracks.find(function (t) { return t.id === id; }) || D.tracks[0];
  }
  function dayOf(n) {
    return D.days.find(function (d) { return d.day === n; }) || D.days[0];
  }
  function submittedDays(s) {
    return (s.submissions || []).map(function (sub) { return sub.day; });
  }
  function isSubmitted(s, day) {
    return submittedDays(s).indexOf(day) !== -1;
  }
  function completionPct(s) {
    return Math.round((s.streak / 60) * 100);
  }

  // ---------- badge catalog ----------
  var BADGES = {
    joined:        { label: 'Joined',        emoji: '\u{1F389}' },
    first_commit:  { label: 'First commit',  emoji: '\u{1F4BB}' },
    week_streak:   { label: '7-day streak',  emoji: '\u{1F525}' },
    month_streak:  { label: '30-day streak', emoji: '\u{1F947}' },
    gh_link:       { label: 'GitHub pro',    emoji: '\u{1F4C1}' },
    linkedin_pro:  { label: 'LinkedIn pro',  emoji: '\u{1F4BC}' },
    freeze_user:   { label: 'Freeze user',   emoji: '\u{1F9E1}' }
  };

  // ============================================================
  // SHARED LAYOUT
  // ============================================================
  function header() {
    var chips = '';
    if (student.streak > 0) {
      chips += '<span class="streak-chip">' + icon('flame') + student.streak + '</span>';
    }
var brandHref = p('/');
    return (
      '<header class="app-header">' +
        '<a class="brand" href="' + brandHref + '">' +
          '<span class="mark">AB</span>Talks<small>&middot; 60 days</small>' +
        '</a>' +
        '<div class="header-actions">' + chips +
'<button class="profile-btn" data-go="' + p('/dashboard') + '" aria-label="Profile">' +
            '<span class="avatar">' + esc(initials(student.name)) + '</span>' +
          '</button>' +
        '</div>' +
      '</header>'
    );
  }

  function bottomNav(active) {
    var items = [
      { id: '', label: 'Home', icon: 'home' },
      { id: 'dashboard', label: 'Dashboard', icon: 'board' }
    ];
    var html = items.map(function (it) {
      var act = (active === it.id) ? ' active' : '';
var href = it.id === '' ? p('/') : p('/' + it.id);
      return '<a class="nav-item' + act + '" href="' + href + '">' + icon(it.icon) + '<span>' + it.label + '</span></a>';
    }).join('');
    return '<nav class="bottom-nav">' + html + '</nav>';
  }

  function demoSwitcher(activeId) {
    var opts = Object.keys(D.students).map(function (id) {
      var label = { active: 'Active', fresh: 'New', freezed: 'Missed \u2192 Freeze', empty: 'Empty profile' }[id] || id;
      var act = (id === activeId) ? ' active' : '';
      return '<button class="opt' + act + '" data-student="' + id + '">' + label + '</button>';
    }).join('');
    return (
      '<div class="demo-switch">' +
        '<div class="label">Demo profile &mdash; preview states</div>' +
        '<div class="opts">' + opts + '</div>' +
      '</div>'
    );
  }

  function shell(activeNav, inner) {
    return header() + '<main class="page">' + inner + '</main>' + bottomNav(activeNav);
  }

  // ============================================================
// LANDING PAGE  (/)
  // ============================================================
  function renderLanding() {
    var D = window.ABDATA;
    var stats = D.stats;
    var trackChips = D.tracks.map(function (t) {
      return '<span class="chip" style="border-color:' + t.color + ';color:' + t.color + '">' + t.emoji + ' ' + t.name + '</span>';
    }).join(' ');

    var inner =
      '<section class="hero">' +
        '<div class="glow"></div>' +
        '<div class="logo-ring">\u{1F525}</div>' +
        '<h1>Build daily.<br/><span class="grad">Prove it publicly.</span></h1>' +
        '<p class="lead">ABTalks is a 60-day coding challenge for college students. Pick a track, build something small every day, and keep a public streak your future recruiter can see.</p>' +
        '<div class="hero-cta">' +
'<a class="btn btn-primary" href="' + p('/dashboard') + '">Start your 60 days \u2192</a>' +
          '<a class="btn btn-ghost" href="' + p('/day/12') + '">See a sample day</a>' +
        '</div>' +
        '<p class="hero-note">Free to join &middot; 2 free Streak Freezes included</p>' +
      '</section>' +

      '<section class="how">' +
        '<p class="eyebrow" style="text-align:center;margin-bottom:' + '12px">How it works</p>' +
        '<div class="step"><div class="step-num">1</div><div>' +
          '<h3>Pick a track</h3><p>Web Dev, JavaScript, Data &amp; AI, or App Dev. Choose what fits your goal.</p></div></div>' +
        '<div class="step"><div class="step-num">2</div><div>' +
          '<h3>Build something daily</h3><p>A small, scoped task each day. 20 minutes of focused work, no fluff.</p></div></div>' +
        '<div class="step"><div class="step-num">3</div><div>' +
          '<h3>Prove it with GitHub + LinkedIn</h3><p>Push your commit and share a short post. That public proof is your portfolio.</p></div></div>' +
        '<div class="step"><div class="step-num">4</div><div>' +
          '<h3>Keep the streak alive</h3><p>Miss a day? A Streak Freeze protects it. 60 days of visible consistency.</p></div></div>' +
      '</section>' +

      '<section class="card">' +
        '<p class="eyebrow" style="margin-bottom:' + '12px">Who it\u2019s for</p>' +
        '<p style="font-size:14px;color:var(--text-soft)">Built for students in their first jobs hunt &mdash; where showing you can ship daily beats a resume line. No degree required, just consistency.</p>' +
      '</section>' +

      '<section class="card">' +
        '<div class="snippet">' +
          '<span class="avatar">' + esc(initials(D.successSnippet.name)) + '</span>' +
          '<div>' +
            '<p class="quote">&ldquo;' + esc(D.successSnippet.line) + '&rdquo;</p>' +
            '<div class="who">' + esc(D.successSnippet.name) + ' &middot; ' + esc(D.successSnippet.college) + '</div>' +
            '<div class="streak-mini">' + icon('flame') + ' ' + D.successSnippet.streak + ' day streak</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="card">' +
        '<p class="eyebrow" style="margin-bottom:' + '12px">Tracks</p>' +
        '<div style="display:flex;flex-wrap:wrap;gap:' + '8px">' + trackChips + '</div>' +
      '</section>' +

      '<section class="card">' +
        '<div class="stats-row">' +
          '<div class="stat"><div class="num">' + stats.students + '</div><div class="lbl">students</div></div>' +
          '<div class="stat"><div class="num">' + stats.tracks + '</div><div class="lbl">tracks</div></div>' +
          '<div class="stat"><div class="num">' + stats.avgStreak + '</div><div class="lbl">avg streak</div></div>' +
          '<div class="stat"><div class="num">' + stats.placements + '</div><div class="lbl">placed</div></div>' +
        '</div>' +
      '</section>' +

'<a class="btn btn-primary" href="' + p('/dashboard') + '" style="margin-bottom:' + '24px">Start your 60 days \u2192</a>';

    app.innerHTML = shell('', '<div class="landing-grid">' + inner + '</div>');
    hookUp();
  }

  // ============================================================
// DASHBOARD  (/dashboard)
  // ============================================================
  function freezeLeft(s) { return s.freezesTotal - s.freezeUsed; }
  function freezeActive(s) { return s.freezeActive && s.freezeActive.missedDay; }

  function renderDashboard() {
    var s = student;
    var track = trackOf(s.track);
    var today = dayOf(s.currentDay);
    var pct = completionPct(s);
    var ringR = 66, ringC = 2 * Math.PI * ringR;
    var offset = ringC * (1 - pct / 100);

    // --- Streak hero ring ---
    var streakBlock;
    if (s.streak === 0) {
      streakBlock =
        '<div class="empty-state" style="padding-bottom:' + '12px">' +
          '<div class="big">\u{1F31F}</div>' +
          '<h3>Your streak starts today</h3>' +
          '<p>No pressure. Day 1 is one small build + one short post. That\u2019s it.</p>' +
        '</div>';
    } else {
      streakBlock =
        '<div class="streak-ring">' +
          '<svg width="168" height="168" viewBox="0 0 168 168">' +
            '<circle class="ring-bg" cx="84" cy="84" r="' + ringR + '"/>' +
            '<circle class="ring-fill" cx="84" cy="84" r="' + ringR + '" stroke-dasharray="' + ringC + '" stroke-dashoffset="' + offset + '"/>' +
          '</svg>' +
          '<div class="streak-center"><div class="num">' + s.streak + '</div><div class="lbl">day streak</div></div>' +
        '</div>' +
        '<div class="bestline">Best: ' + s.bestStreak + ' days &middot; ' + pct + '% of 60</div>';
    }

    // --- protected / freeze banner ---
    var protectedBanner = '';
    if (freezeActive(s)) {
      protectedBanner =
        '<div class="protected-banner">' +
          '<span class="ic">' + icon('shield') + '</span>' +
          '<div><strong>Day ' + s.freezeActive.missedDay + ' was protected</strong><br/><p>A Streak Freeze kept your ' + s.streak + '-day streak alive. You\u2019re back on track.</p></div>' +
        '</div>';
    }

    // --- freeze dots ---
    var dots = '';
    for (var i = 0; i < s.freezesTotal; i++) {
      var used = i < s.freezeUsed;
      var lock = freezeActive(s) && i === s.freezeUsed - 1;
      var cls = used ? (lock ? 'freeze-dot lock' : 'freeze-dot used') : 'freeze-dot';
      dots += '<span class="' + cls + '" title="Freeze">' + (used ? (lock ? '✓' : '•') : '○') + '</span>';
    }

    // --- today card (or warm start) ---
    var todayCard;
    if (s.currentDay > 60) {
todayCard = '<div class="card today-card"><div class="top"><span class="day-tag">Challenge complete</span></div><div class="big" style="font-size:40px">\u{1F3C6}</div><h3>You finished your 60 days!</h3><div class="btn btn-teal" data-go="' + p('/dashboard') + '">View portfolio</div></div>';
    } else if (isSubmitted(s, s.currentDay)) {
      todayCard =
        '<div class="card today-card">' +
          '<div class="top"><span class="day-tag">Day ' + s.currentDay + ' of 60</span><span class="chip teal">Submited \u2713</span></div>' +
          '<h3>' + esc(today.title) + '</h3>' +
          '<p class="desc">' + esc(today.desc) + '</p>' +
'<a class="btn btn-ghost" href="' + p('/day/' + s.currentDay) + '">Review today</a>' +
        '</div>';
    } else {
      todayCard =
        '<div class="card today-card">' +
          '<div class="top"><span class="day-tag">Today \u2014 Day ' + s.currentDay + '</span></div>' +
          '<h3>' + esc(today.title) + '</h3>' +
          '<p class="desc">' + esc(today.desc) + '</p>' +
'<a class="btn btn-primary" href="' + p('/day/' + s.currentDay) + '">Start today ' + icon('arrow') + '</a>' +
        '</div>';
    }

    // --- progress ---
    var progBlock =
      '<div class="prog-head"><span class="eyebrow">Challenge progress</span><span class="pct">' + pct + '%</span></div>' +
      '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
      '<div class="prog-label"><span>Day ' + s.currentDay + ' of 60</span><span>' + (60 - s.currentDay) + ' to go</span></div>';

    // --- stats ---
    var compPct = s.submissions.length ? Math.round((s.submissions.length / s.currentDay) * 100) : 0;
    var dashStats =
      '<div class="dash-stats">' +
        '<div class="dash-stat"><div class="k">Submissions</div><div class="v teal">' + s.submissions.length + '</div></div>' +
        '<div class="dash-stat"><div class="k">Completion</div><div class="v amber">' + compPct + '%</div></div>' +
        '<div class="dash-stat"><div class="k">Tracks</div><div class="v violet">' + track.emoji + ' ' + track.name + '</div></div>' +
        '<div class="dash-stat"><div class="k">Best streak</div><div class="v">' + s.bestStreak + '</div></div>' +
      '</div>';

    // --- badges ---
    var badgeHtml = s.badges.length
      ? s.badges.map(function (b) { var m = BADGES[b]; return m ? '<span class="badge"><span class="ic">' + m.emoji + '</span>' + m.label + '</span>' : ''; }).join('')
      : '<span class="chip">No badges yet &mdash; your first comes soon</span>';

    var inner =
      '<section class="greet">' +
        '<p class="eyebrow">' + esc(s.college) + '</p>' +
        '<h1>Hey, ' + esc(s.name.split(' ')[0]) + '\u2E3C</h1>' +
        '<div class="sub">' + track.emoji + ' ' + track.name + ' track &middot; Day ' + s.currentDay + ' of 60</div>' +
      '</section>' +
      demoSwitcher(currentStudentId) +
      protectedBanner +
      '<section class="card streak-hero">' + streakBlock +
        '<div class="freeze-row">' +
          '<span class="lbl">Streak Freezes left</span>' +
          '<div class="freeze-dots">' + dots + '</div>' +
        '</div>' +
      '</section>' +
      todayCard +
      '<section class="card">' + progBlock + '</section>' +
      '<section class="dash-grid">' +
        '<div class="card ' + (s.submissions.length === 0 ? 'full' : '') + '">' + dashStats + '</div>' +
        '<div class="card"><p class="eyebrow" style="margin-bottom:' + '12px">Badges</p><div class="badge-row">' + badgeHtml + '</div></div>' +
      '</section>';

    // empty encourage when no submissions
    if (s.submissions.length === 0) {
      inner +=
        '<div class="card" style="border-style:dashed">' +
          '<div class="empty-state" style="padding:' + '8px 0">' +
            '<div class="big">\u{1F4AD}</div>' +
            '<h3>No builds yet &mdash; that\u2019s okay</h3>' +
            '<p>Your dashboard is ready. Submit your first day\u2019s GitHub + LinkedIn proof and it\u2019ll light up here.</p>' +
'<a class="btn btn-primary" href="' + p('/day/' + s.currentDay) + '">Do Day ' + s.currentDay + '\u2192</a>' +
          '</div>' +
        '</div>';
    }

inner += '<a class="btn btn-ghost" href="' + p('/day/' + s.currentDay) + '" style="margin-top:' + '8px">Open today\u2019s challenge</a>';

    app.innerHTML = shell('dashboard', inner);
    hookUp();
  }

  // ============================================================
// DAY PAGE  (/day/:n)
  // ============================================================
  function renderDay(n) {
    var s = student;
    var day = dayOf(n);
    var track = trackOf(day.track);
    var submitted = isSubmitted(s, n);
    var sub = (s.submissions || []).find(function (x) { return x.day === n; });

    var statusHtml;
    if (submitted && sub) {
      statusHtml =
        '<div class="sub-status done">' +
          '<span class="ic">' + icon('check') + '</span>' +
          '<div><strong>Day proved</strong><p>Both links submitted. Nice work.</p></div>' +
        '</div>';
    } else {
      statusHtml =
        '<div class="sub-status">' +
          '<span class="ic">\u{23F1}\uFE0F</span>' +
          '<div><strong>20 minutes, that\u2019s it</strong><p>Build, then paste two links below.</p></div>' +
        '</div>';
    }

    var scopeHtml = day.scope.map(function (item, i) {
      var done = submitted ? ' done' : '';
      return '<li class="scope-item' + done + '"><span class="check">' + (submitted ? '<svg style="width:13px;height:13px"><use href="#icon-check"></use></svg>' : '') + '</span><span>' + esc(item) + '</span></li>';
    }).join('');

    var formHtml;
    if (submitted) {
      formHtml =
        '<div class="success-state">' +
          '<div class="success-check">' + icon('check') + '</div>' +
          '<h2>Day ' + n + ' is in the books</h2>' +
          '<p>Your GitHub and LinkedIn proof is saved. Come back tomorrow to keep the streak going.</p>' +
'<a class="btn btn-primary" href="' + p('/dashboard') + '">Back to dashboard</a>' +
        '</div>';
    } else {
      formHtml =
        '<p class="eyebrow" style="margin-bottom:' + '12px">Submit your proof</p>' +
        '<div class="sub-field">' +
          '<label for="gh">GitHub repo / commit link</label>' +
          '<input id="gh" type="url" inputmode="url" placeholder="https://github.com/you/project" />' +
        '</div>' +
        '<div class="sub-field">' +
          '<label for="li">LinkedIn post link</label>' +
          '<input id="li" type="url" inputmode="url" placeholder="https://linkedin.com/posts/..." />' +
        '</div>' +
        '<button class="btn btn-primary" id="submit-btn">Submit proof</button>' +
        '<p style="font-size:12px;color:var(--text-mut);text-align:center;margin-top:' + '12px">Past the link, you\u2019re done for the day.</p>';
    }

    var inner =
      '<section class="day-head">' +
        '<p class="eyebrow">Day ' + n + ' of 60</p>' +
        '<h1>' + esc(day.title) + '</h1>' +
        '<div class="track-chip"><span class="chip" style="border-color:' + track.color + ';color:' + track.color + '">' + track.emoji + ' ' + track.name + '</span></div>' +
      '</section>' +
      demoSwitcher(currentStudentId) +
      '<section class="card">' +
        '<p class="eyebrow" style="margin-bottom:' + '10px">The task</p>' +
        '<p class="task-desc">' + esc(day.desc) + '</p>' +
      '</section>' +
      '<section class="card">' +
        '<p class="eyebrow" style="margin-bottom:' + '8px">What to build today</p>' +
        '<ul class="scope-list">' + scopeHtml + '</ul>' +
      '</section>' +
      '<section class="card friday-tip" style="margin-bottom:' + '16px">' +
        '<span class="ic">\u{1F4A1}</span>' +
        '<p><strong>Why it matters: </strong>' + esc(day.friday) + '</p>' +
      '</section>' +
      '<section class="card">' + statusHtml + formHtml + '</section>';

    app.innerHTML = shell('dashboard', inner);
    hookUp();
  }

  // ============================================================
  // ROUTER
  // ============================================================
  function setStudent(id) {
    currentStudentId = id;
    student = D.students[id];
  }

function go(path) {
    if (location.pathname === path) { return; }
    history.pushState({}, '', path);
    route();
  }

function route() {
    var path = location.pathname || '/';
    // strip the deployment base path (e.g. /abtalks_hackathon) so the
    // matcher below works identically whether hosted at root or a subpath.
    if (BASE && path.indexOf(BASE) === 0) {
      path = path.slice(BASE.length) || '/';
    }

    if (path === '/' || path === '') {
      renderLanding();
    } else if (path === '/dashboard') {
      renderDashboard();
    } else {
      var m = path.match(/^\/day\/(\d+)$/);
      if (m) {
        renderDay(parseInt(m[1], 10));
      } else {
        renderLanding();
      }
    }
  }

  // ============================================================
  // EVENT BINDING (delegation)
  // ============================================================
  function hookUp() {
    // demo student switcher
    document.querySelectorAll('[data-student]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setStudent(btn.getAttribute('data-student'));
        route();
      });
    });

// data-go links (in-app navigation)
    document.querySelectorAll('[data-go]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        go(el.getAttribute('data-go'));
      });
    });

    // in-app anchor links (intercept path routes)
    document.querySelectorAll('a[href^="/"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (href.indexOf('http') === 0) { return; }
        e.preventDefault();
        go(href);
      });
    });

    // day submission form
    var submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        var gh = document.getElementById('gh').value.trim();
        var li = document.getElementById('li').value.trim();
        if (!gh || !li) {
          alert('Please paste both a GitHub and a LinkedIn link.');
          return;
        }
var m = location.pathname.match(/\/day\/(\d+)/);
        var dayNum = m ? parseInt(m[1], 10) : student.currentDay;
        student.submissions = student.submissions.concat([{ day: dayNum, github: gh, linkedin: li }]);
        student.streak = Math.max(student.streak, dayNum);
        student.bestStreak = Math.max(student.bestStreak, student.streak);
        if (student.badges.indexOf('first_commit') === -1) student.badges.push('first_commit');
        route();
      });
    }
  }

// ---- boot ----
  window.addEventListener('popstate', route);
  route();
})();
