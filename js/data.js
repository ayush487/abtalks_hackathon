// ABTalks — mocked data layer
// All student/challenge data lives here. No backend, no auth, no database.
window.ABDATA = {
  tracks: [
    { id: 'web', name: 'Web Dev', emoji: '\u{1F310}', color: '#4fd1c5', blurb: 'HTML, CSS, JS projects from scratch' },
    { id: 'js', name: 'JavaScript', emoji: '\u{1F4A1}', color: '#f5b942', blurb: 'Algorithms, DOM, and mini-libraries' },
    { id: 'data', name: 'Data & AI', emoji: '\u{1F4CA}', color: '#a78bfa', blurb: 'Python, stats, and small ML demos' },
    { id: 'app', name: 'App Dev', emoji: '\u{1F4F1}', color: '#fb7185', blurb: 'Mobile-first apps and products' }
  ],

  // 60-day challenge content (realistic scoped tasks)
  days: [
    { day: 1,  track: 'web', title: 'Personal intro page', desc: 'Build a single HTML page that introduces you. Include your name, college, and one thing you are learning this month.', scope: ['A main heading with your name', 'A short intro paragraph', 'One image or emoji touch', 'A link to your GitHub'], friday: 'You shipped a live page on the internet. Recruiters can literally click it.' },
    { day: 2,  track: 'web', title: 'Style it with CSS', desc: 'Make yesterday\u2019s page look like something you would actually show off. Choose a color scheme and clean spacing.', scope: ['Background + text colors that match', 'Consistent spacing between sections', 'A hover effect on the link'], friday: 'Looks beat a thousand words. A styled page signals care.' },
    { day: 3,  track: 'web', title: 'Add a navigation bar', desc: 'Add a simple top nav with 3 links that scroll to sections of your page.', scope: ['A sticky top bar', '3 working anchor links', 'Smooth scroll behavior'], friday: 'Navigation is how real sites are structured. You are learning real habits.' },
    { day: 4,  track: 'web', title: 'Responsive layout', desc: 'Make your page look good on both mobile and desktop using media queries or flexbox.', scope: ['Works on a 390px phone', 'Works on a desktop width', 'No horizontal scroll'], friday: 'Mobile-first is the industry standard. You just built it.' },
    { day: 5,  track: 'web', title: 'A button that counts', desc: 'Add a button that increments a number on the page using JavaScript.', scope: ['A visible button', 'A counter that updates', 'Works on every click'], friday: 'First real JavaScript interaction. This is the fun part.' },
    { day: 6,  track: 'web', title: 'Fetch something', desc: 'Use fetch() to load data from a public API and display it on your page.', scope: ['A working fetch call', 'Data rendered on the page', 'A loading state'], friday: 'You just talked to a server. That is how the whole internet works.' },
    { day: 7,  track: 'web', title: 'Share your progress', desc: 'Post a LinkedIn update about your first week. Show your page, tag #ABTalks, and tell people what you learned.', scope: ['Screenshot of your project', 'A 2\u20133 sentence reflection', 'Tag #ABTalks'], friday: 'Week one done. Public proof is the whole point.' },
    { day: 8,  track: 'web', title: 'Tic-tac-toe board', desc: 'Build the visual board for tic-tac-toe with HTML and CSS. No logic yet.', scope: ['A 3x3 grid', 'Alternating X and O placements', 'Clean borders'], friday: 'Games are the best way to practice. Your skills are compounding.' },
    { day: 9,  track: 'web', title: 'Game logic', desc: 'Add the win-checking logic so the game knows when someone wins or it is a draw.', scope: ['X and O take turns', 'Win detection works', 'A reset button'], friday: 'You wrote conditional logic that powers a real game.' },
    { day: 10, track: 'web', title: 'Score tracker', desc: 'Add a scoreboard that tracks wins for X, O, and draws across rounds.', scope: ['Three counts tracked', 'Persists across rounds', 'Visible on screen'], friday: 'State management is a junior-dev interview topic. You are doing it.' },
    { day: 11, track: 'web', title: 'Timer app', desc: 'Build a simple count-up timer with start, pause, and reset controls.', scope: ['Start button works', 'Pause works', 'Reset works', 'Time displays cleanly'], friday: 'Timers teach you about time and intervals. Daily drivers use them everywhere.' },
    { day: 12, track: 'web', title: 'Build a progress-bar component', desc: 'Build a reusable progress bar that fills up to a target value. Use it to track anything \u2014 water drunk, study minutes, anything.', scope: ['A progress bar that animates', 'An input or button to increase it', 'A label showing the percentage', 'Works from 0% to 100%'], friday: 'Progress bars are everywhere in products. You just built the core of one.' },
    { day: 13, track: 'web', title: 'Theme switcher', desc: 'Add a light/dark mode toggle to one of your existing projects.', scope: ['A toggle button', 'Colors change when toggled', 'Choice is remembered'], friday: 'Dark mode is expected in every modern app. You ship it.' },
    { day: 14, track: 'web', title: 'Local storage', desc: 'Save your timer or counter value using localStorage so it survives a page refresh.', scope: ['Value persists after refresh', 'A clear/reset option'], friday: 'You now understand how apps remember things. Big milestone.' },
    { day: 15, track: 'web', title: 'Share your week two', desc: 'Post a LinkedIn update recapping your second week. Show one project and one lesson learned.', scope: ['A project screenshot', 'One concrete lesson', 'Tag #ABTalks'], friday: 'Half of an internship-worthy portfolio is already public.' },
    { day: 16, track: 'web', title: 'To-do list app', desc: 'Build a to-do list where you can add, mark complete, and delete tasks.', scope: ['Add a task', 'Mark complete', 'Delete a task', 'Persistence via localStorage'], friday: 'The classic interview project. Yours will be public for all to see.' },
    { day: 17, track: 'web', title: 'Keyboard shortcuts', desc: 'Add keyboard shortcuts to your to-do list (press Enter to add, Esc to cancel).', scope: ['Enter adds a task', 'Esc clears the input', 'No conflicting behavior'], friday: 'Accessibility and UX details are what separate amateurs from pros.' },
    { day: 18, track: 'web', title: 'Search filter', desc: 'Add a search box that filters your to-do items as you type.', scope: ['A search input', 'Live filtering', 'A "no results" message'], friday: 'Filtering is a core data skill. You are building the muscle.' },
    { day: 19, track: 'web', title: 'Card component', desc: 'Build a reusable card component with a title, body, and button. Use it twice with different content.', scope: ['A reusable card', 'Used at least twice', 'Consistent styling'], friday: 'Reusable components are how entire design systems are made.' },
    { day: 20, track: 'web', title: 'Modal dialog', desc: 'Add a modal that opens when you click a button and closes on the overlay or an X.', scope: ['Opens on click', 'Closes on overlay click', 'Closes on X', 'Traps focus'], friday: 'Modals are everywhere. You can now build the one everyone loves to hate.' },
    { day: 21, track: 'web', title: 'Share your week three', desc: 'Post a LinkedIn update. Show your to-do app and describe one feature you are proud of.', scope: ['To-do app screenshot', 'One proud feature', 'Tag #ABTalks'], friday: 'Three weeks of public consistency. That is rare and valuable.' }
  ],

  // Demo students — each demonstrates a distinct state
  students: {
    // Active streak mid-challenge (the "happy path")
    active: {
      id: 'active',
      name: 'AyRis',
      college: 'Banaras Hindu University',
      track: 'web',
      startDay: 1,
      currentDay: 12,
      streak: 12,
      bestStreak: 12,
      freezesTotal: 2,
      freezesUsed: 0,
      submissions: [
        { day: 1,  github: 'https://github.com/AyRis/intro', linkedin: 'https://linkedin.com/posts/AyRis-day1' },
        { day: 2,  github: 'https://github.com/AyRis/intro', linkedin: 'https://linkedin.com/posts/AyRis-day2' },
        { day: 3,  github: 'https://github.com/AyRis/navpage', linkedin: 'https://linkedin.com/posts/AyRis-day3' },
        { day: 4,  github: 'https://github.com/AyRis/responsive', linkedin: 'https://linkedin.com/posts/AyRis-day4' },
        { day: 5,  github: 'https://github.com/AyRis/counter', linkedin: 'https://linkedin.com/posts/AyRis-day5' },
        { day: 6,  github: 'https://github.com/AyRis/fetchpage', linkedin: 'https://linkedin.com/posts/AyRis-day6' },
        { day: 7,  github: 'https://github.com/AyRis/intro', linkedin: 'https://linkedin.com/posts/AyRis-day7' },
        { day: 8,  github: 'https://github.com/AyRis/tictactoe', linkedin: 'https://linkedin.com/posts/AyRis-day8' },
        { day: 9,  github: 'https://github.com/AyRis/tictactoe', linkedin: 'https://linkedin.com/posts/AyRis-day9' },
        { day: 10, github: 'https://github.com/AyRis/tictactoe', linkedin: 'https://linkedin.com/posts/AyRis-day10' },
        { day: 11, github: 'https://github.com/AyRis/timer', linkedin: 'https://linkedin.com/posts/AyRis-day11' }
      ],
      badges: ['first_commit', 'week_streak', 'gh_link', 'linkedin_pro']
    },

    // Fresh student — no streak yet, warm start
    fresh: {
      id: 'fresh',
      name: 'AyRis',
      college: 'Banaras Hindu University',
      track: 'web',
      startDay: 1,
      currentDay: 1,
      streak: 0,
      bestStreak: 0,
      freezesTotal: 2,
      freezesUsed: 0,
      submissions: [],
      badges: ['joined']
    },

    // Missed a day — streak preserved via a used Streak Freeze
    freezed: {
      id: 'freezed',
      name: 'AyRis',
      college: 'Banaras Hindu University',
      track: 'web',
      startDay: 1,
      currentDay: 44,
      streak: 43,
      bestStreak: 44,
      freezesTotal: 2,
      freezesUsed: 1,
      freezeActive: { missedDay: 27 },
      submissions: [
        { day: 1, github: 'https://github.com/meera/start', linkedin: 'https://linkedin.com/posts/meera-day1' }
        // truncated for brevity — rest of days submitted
      ],
      badges: ['first_commit', 'week_streak', 'month_streak', 'gh_link', 'linkedin_pro', 'freeze_user']
    },

    // Empty profile — has joined but zero submissions
    empty: {
      id: 'empty',
      name: 'AyRis',
      college: 'Banaras Hindu University',
      track: 'web',
      startDay: 1,
      currentDay: 34,
      streak: 0,
      bestStreak: 0,
      freezesTotal: 2,
      freezesUsed: 0,
      submissions: [],
      badges: ['joined']
    }
  },

  // Global product stats for the landing page
  stats: {
    students: '12,400+',
    tracks: '4',
    avgStreak: '21',
    placements: '340+'
  },

  // A short real-sounding success snippet for the landing page
  successSnippet: {
    name: 'AyRis',
    college: 'Banaras Hindu University',
    line: 'Day 60/60 \u2014 got a frontend internship off my ABTalks portfolio. The public streak did it.',
    streak: 60
  }
};
