import React, { useState, useRef, useEffect, useCallback } from 'react';
import './TerminalUI.css';
import resumeData from './data/resumeData.json';

const ASCII_BANNER = `
 █████╗ ██████╗ ██╗   ██╗██╗███╗   ██╗██████╗ 
██╔══██╗██╔══██╗██║   ██║██║████╗  ██║██╔══██╗
███████║██████╔╝██║   ██║██║██╔██╗ ██║██║  ██║
██╔══██║██╔══██╗╚██╗ ██╔╝██║██║╚██╗██║██║  ██║
██║  ██║██║  ██║ ╚████╔╝ ██║██║ ╚████║██████╔╝
╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚═╝  ╚═══╝╚═════╝ `;

const WELCOME_MESSAGE = [
  { text: ASCII_BANNER, className: 'terminal-ascii' },
  { text: '' },
  { text: '  Arvind Narayanan — Full-Stack Tech Lead', className: 'terminal-highlight' },
  { text: '  Interactive Portfolio Terminal v2.0', className: 'terminal-dim' },
  { text: '' },
  { text: '  Type "help" to see available commands.', className: 'terminal-success' },
  { text: '─'.repeat(56), className: 'terminal-dim' },
  { text: '' },
];

const COMMANDS = {
  help: {
    description: 'Show available commands',
    usage: 'help',
  },
  about: {
    description: 'Display information about me',
    usage: 'about',
  },
  experience: {
    description: 'View work experience',
    usage: 'experience [index]  — e.g. "experience 1" for details',
  },
  skills: {
    description: 'List technical skills',
    usage: 'skills [category]  — e.g. "skills frontend"',
  },
  projects: {
    description: 'View my projects',
    usage: 'projects',
  },
  education: {
    description: 'View education background',
    usage: 'education',
  },
  certs: {
    description: 'View certifications',
    usage: 'certs',
  },
  contact: {
    description: 'Get contact information',
    usage: 'contact',
  },
  clear: {
    description: 'Clear the terminal',
    usage: 'clear',
  },
  whoami: {
    description: 'Who is the visitor?',
    usage: 'whoami',
  },
  date: {
    description: 'Show current date & time',
    usage: 'date',
  },
  echo: {
    description: 'Echo a message',
    usage: 'echo <message>',
  },
  history: {
    description: 'Show command history',
    usage: 'history',
  },
  neofetch: {
    description: 'System-style info card',
    usage: 'neofetch',
  },
  theme: {
    description: 'Change terminal color theme',
    usage: 'theme <green|amber|cyan|white|pink>',
  },
};

// ── Command Handlers ──────────────────────────────────────────

function handleHelp() {
  const lines = [
    { text: '' },
    { text: '  ╔══════════════════════════════════════════════╗', className: 'terminal-border' },
    { text: '  ║         AVAILABLE COMMANDS                   ║', className: 'terminal-border' },
    { text: '  ╚══════════════════════════════════════════════╝', className: 'terminal-border' },
    { text: '' },
  ];
  Object.entries(COMMANDS).forEach(([cmd, info]) => {
    lines.push({
      text: `  ${cmd.padEnd(14)} ${info.description}`,
      className: 'terminal-help-row',
    });
  });
  lines.push({ text: '' });
  lines.push({ text: '  Use ↑/↓ arrows to navigate command history', className: 'terminal-dim' });
  lines.push({ text: '  Tab to autocomplete commands', className: 'terminal-dim' });
  lines.push({ text: '' });
  return lines;
}

function handleAbout() {
  const { name, title, description, summaryHTML } = resumeData.about;
  // Strip HTML tags for terminal display
  const plainSummary = summaryHTML
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
  // Wrap text at ~70 chars
  const wrapText = (text, width = 68) => {
    const words = text.split(' ');
    const lines = [];
    let current = '';
    words.forEach((word) => {
      if ((current + ' ' + word).trim().length > width) {
        lines.push(current.trim());
        current = word;
      } else {
        current = current ? current + ' ' + word : word;
      }
    });
    if (current) lines.push(current.trim());
    return lines;
  };

  const lines = [
    { text: '' },
    { text: `  ┌─ ABOUT ${'─'.repeat(46)}┐`, className: 'terminal-border' },
    { text: '' },
    { text: `  👤  ${name}`, className: 'terminal-highlight' },
    { text: `      ${title}`, className: 'terminal-accent' },
    { text: '' },
    { text: `  📋  ${description}`, className: 'terminal-text' },
    { text: '' },
  ];
  const wrappedSummary = wrapText(plainSummary);
  wrappedSummary.forEach((line) => {
    lines.push({ text: `      ${line}`, className: 'terminal-dim' });
  });
  lines.push({ text: '' });
  lines.push({ text: `  └${'─'.repeat(52)}┘`, className: 'terminal-border' });
  lines.push({ text: '' });
  return lines;
}

function handleExperience(args) {
  const experiences = resumeData.experience;
  if (args && args.length > 0) {
    const idx = parseInt(args[0], 10) - 1;
    if (isNaN(idx) || idx < 0 || idx >= experiences.length) {
      return [{ text: `  ⚠ Invalid index. Use 1-${experiences.length}`, className: 'terminal-error' }];
    }
    const exp = experiences[idx];
    const lines = [
      { text: '' },
      { text: `  ┌─ EXPERIENCE DETAIL ${'─'.repeat(34)}┐`, className: 'terminal-border' },
      { text: '' },
      { text: `  🏢  ${exp.title}`, className: 'terminal-highlight' },
      { text: `      ${exp.company}  |  ${exp.duration}`, className: 'terminal-accent' },
      { text: '' },
      { text: `      ${exp.description}`, className: 'terminal-dim' },
      { text: '' },
      { text: '      Key Achievements:', className: 'terminal-success' },
    ];
    exp.achievements.forEach((ach, i) => {
      lines.push({ text: `        ${i + 1}. ${ach}`, className: 'terminal-text' });
    });
    lines.push({ text: '' });
    lines.push({ text: `  └${'─'.repeat(52)}┘`, className: 'terminal-border' });
    lines.push({ text: '' });
    return lines;
  }

  // List all
  const lines = [
    { text: '' },
    { text: `  ┌─ EXPERIENCE ${'─'.repeat(40)}┐`, className: 'terminal-border' },
    { text: '' },
  ];
  experiences.forEach((exp, i) => {
    lines.push({ text: `  [${i + 1}]  ${exp.title}`, className: 'terminal-highlight' });
    lines.push({ text: `       ${exp.company}  |  ${exp.duration}`, className: 'terminal-accent' });
    lines.push({ text: `       ${exp.description.substring(0, 90)}...`, className: 'terminal-dim' });
    lines.push({ text: '' });
  });
  lines.push({ text: `  💡 Tip: "experience <number>" for full details`, className: 'terminal-success' });
  lines.push({ text: '' });
  lines.push({ text: `  └${'─'.repeat(52)}┘`, className: 'terminal-border' });
  lines.push({ text: '' });
  return lines;
}

function handleSkills(args) {
  const categories = resumeData.skills;
  if (args && args.length > 0) {
    const query = args.join(' ').toLowerCase();
    const match = categories.find((c) => c.category.toLowerCase().includes(query));
    if (!match) {
      return [
        { text: '' },
        { text: `  ⚠ No category matching "${args.join(' ')}"`, className: 'terminal-error' },
        { text: `  Available: ${categories.map((c) => c.category).join(', ')}`, className: 'terminal-dim' },
        { text: '' },
      ];
    }
    return [
      { text: '' },
      { text: `  ─── ${match.category} ───`, className: 'terminal-highlight' },
      { text: '' },
      ...match.skills.map((s) => ({
        text: `    ▸ ${s}`,
        className: 'terminal-skill',
      })),
      { text: '' },
    ];
  }

  const lines = [
    { text: '' },
    { text: `  ┌─ SKILLS ${'─'.repeat(44)}┐`, className: 'terminal-border' },
    { text: '' },
  ];
  categories.forEach((cat) => {
    lines.push({ text: `  ⚡ ${cat.category}`, className: 'terminal-highlight' });
    const skillLine = cat.skills.map((s) => s).join('  •  ');
    lines.push({ text: `     ${skillLine}`, className: 'terminal-skill' });
    lines.push({ text: '' });
  });
  lines.push({ text: `  └${'─'.repeat(52)}┘`, className: 'terminal-border' });
  lines.push({ text: '' });
  return lines;
}

function handleProjects() {
  const projects = resumeData.projects;
  const lines = [
    { text: '' },
    { text: `  ┌─ PROJECTS ${'─'.repeat(42)}┐`, className: 'terminal-border' },
    { text: '' },
  ];
  projects.forEach((proj, i) => {
    lines.push({ text: `  [${i + 1}]  ${proj.title}`, className: 'terminal-highlight' });
    lines.push({ text: `       ${proj.description}`, className: 'terminal-dim' });
    lines.push({
      text: `       Tech: ${proj.technologies.join(', ')}`,
      className: 'terminal-accent',
    });
    if (proj.link) {
      lines.push({ text: `       🔗 ${proj.link}`, className: 'terminal-link' });
    }
    if (proj.github) {
      lines.push({ text: `       📦 ${proj.github}`, className: 'terminal-link' });
    }
    lines.push({ text: '' });
  });
  lines.push({ text: `  └${'─'.repeat(52)}┘`, className: 'terminal-border' });
  lines.push({ text: '' });
  return lines;
}

function handleEducation() {
  const edu = resumeData.education;
  const lines = [
    { text: '' },
    { text: `  ┌─ EDUCATION ${'─'.repeat(41)}┐`, className: 'terminal-border' },
    { text: '' },
  ];
  edu.forEach((e) => {
    lines.push({ text: `  🎓  ${e.degree}`, className: 'terminal-highlight' });
    lines.push({ text: `      ${e.institution}  |  ${e.duration}`, className: 'terminal-accent' });
    lines.push({ text: '' });
  });
  lines.push({ text: `  └${'─'.repeat(52)}┘`, className: 'terminal-border' });
  lines.push({ text: '' });
  return lines;
}

function handleCerts() {
  const certs = resumeData.certifications;
  const lines = [
    { text: '' },
    { text: `  ┌─ CERTIFICATIONS ${'─'.repeat(36)}┐`, className: 'terminal-border' },
    { text: '' },
  ];
  certs.forEach((c, i) => {
    lines.push({ text: `  [${i + 1}]  ${c}`, className: 'terminal-highlight' });
  });
  lines.push({ text: '' });
  lines.push({ text: `  └${'─'.repeat(52)}┘`, className: 'terminal-border' });
  lines.push({ text: '' });
  return lines;
}

function handleContact() {
  const { contact } = resumeData.about;
  return [
    { text: '' },
    { text: `  ┌─ CONTACT ${'─'.repeat(43)}┐`, className: 'terminal-border' },
    { text: '' },
    { text: `  📧  Email      ${contact.email}`, className: 'terminal-highlight' },
    { text: `  📍  Location   ${contact.location}`, className: 'terminal-text' },
    { text: `  🔗  LinkedIn   ${contact.linkedin}`, className: 'terminal-link' },
    { text: `  🐙  GitHub     ${contact.github}`, className: 'terminal-link' },
    { text: `  📸  Instagram  ${contact.instagram}`, className: 'terminal-link' },
    { text: '' },
    { text: `  └${'─'.repeat(52)}┘`, className: 'terminal-border' },
    { text: '' },
  ];
}

function handleNeofetch() {
  const { name, title } = resumeData.about;
  const skills = resumeData.skills.reduce((acc, c) => acc + c.skills.length, 0);
  const exp = resumeData.experience.length;
  const proj = resumeData.projects.length;

  const logo = [
    '       _____     ',
    '      /     \\    ',
    '     / () () \\   ',
    '    |  \\   /  |  ',
    '     \\  ---  /   ',
    '      \\_____/    ',
    '     /|     |\\   ',
    '    / |     | \\  ',
  ];

  const info = [
    { label: '', value: `${name}@portfolio`, className: 'terminal-highlight' },
    { label: '', value: '─'.repeat(28), className: 'terminal-dim' },
    { label: 'Title', value: title.replace(/🚀\s*/, ''), className: 'terminal-text' },
    { label: 'Experience', value: `${exp} positions`, className: 'terminal-text' },
    { label: 'Skills', value: `${skills} technologies`, className: 'terminal-text' },
    { label: 'Projects', value: `${proj} repositories`, className: 'terminal-text' },
    { label: 'Location', value: resumeData.about.contact.location, className: 'terminal-text' },
    { label: 'Shell', value: 'portfolio-sh 2.0', className: 'terminal-text' },
  ];

  const lines = [{ text: '' }];
  for (let i = 0; i < Math.max(logo.length, info.length); i++) {
    const logoPart = logo[i] || '                  ';
    const infoPart = info[i];
    if (infoPart) {
      const text = infoPart.label
        ? `  ${logoPart}   ${infoPart.label}: ${infoPart.value}`
        : `  ${logoPart}   ${infoPart.value}`;
      lines.push({ text, className: infoPart.className });
    } else {
      lines.push({ text: `  ${logoPart}`, className: 'terminal-dim' });
    }
  }
  lines.push({ text: '' });

  // Color blocks
  const colorRow = '  ███████████████████████████████████████████████';
  lines.push({ text: colorRow, className: 'terminal-color-blocks' });
  lines.push({ text: '' });

  return lines;
}

// ── Main Component ────────────────────────────────────────────

const TerminalUI = () => {
  const [outputLines, setOutputLines] = useState(WELCOME_MESSAGE);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState('green');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);
  const terminalBodyRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [outputLines]);

  // Focus input on click
  const focusInput = useCallback(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const appendOutput = useCallback((newLines) => {
    // Animate lines in with small delay
    setIsTyping(true);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < newLines.length) {
        const currentLine = newLines[idx]; // capture by value
        setOutputLines((prev) => [...prev, currentLine]);
        idx++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 18);
  }, []);

  const processCommand = useCallback(
    (rawCmd) => {
      const trimmed = rawCmd.trim();
      if (!trimmed) return;

      // Echo the command
      setOutputLines((prev) => [
        ...prev,
        { text: `  visitor@arvind:~$ ${trimmed}`, className: 'terminal-prompt-echo' },
      ]);

      // Add to history
      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      const parts = trimmed.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      let result;

      switch (cmd) {
        case 'help':
          result = handleHelp();
          break;
        case 'about':
        case 'whoami':
          if (cmd === 'whoami') {
            result = [
              { text: '' },
              { text: '  visitor@arvind-portfolio', className: 'terminal-highlight' },
              { text: '  You are an awesome visitor exploring my portfolio! 🎉', className: 'terminal-success' },
              { text: '' },
            ];
          } else {
            result = handleAbout();
          }
          break;
        case 'experience':
        case 'exp':
          result = handleExperience(args);
          break;
        case 'skills':
          result = handleSkills(args);
          break;
        case 'projects':
          result = handleProjects();
          break;
        case 'education':
        case 'edu':
          result = handleEducation();
          break;
        case 'certs':
        case 'certifications':
          result = handleCerts();
          break;
        case 'contact':
          result = handleContact();
          break;
        case 'clear':
        case 'cls':
          setOutputLines([]);
          return;
        case 'date':
          result = [
            { text: '' },
            { text: `  ${new Date().toString()}`, className: 'terminal-text' },
            { text: '' },
          ];
          break;
        case 'echo':
          result = [{ text: `  ${args.join(' ')}`, className: 'terminal-text' }];
          break;
        case 'history':
          result = [
            { text: '' },
            ...commandHistory.map((c, i) => ({
              text: `  ${String(i + 1).padStart(4)}  ${c}`,
              className: 'terminal-dim',
            })),
            { text: '' },
          ];
          break;
        case 'neofetch':
          result = handleNeofetch();
          break;
        case 'theme':
          if (args.length === 0) {
            result = [
              { text: '' },
              { text: `  Current theme: ${theme}`, className: 'terminal-highlight' },
              { text: '  Available: green, amber, cyan, white, pink', className: 'terminal-dim' },
              { text: '' },
            ];
          } else {
            const newTheme = args[0].toLowerCase();
            if (['green', 'amber', 'cyan', 'white', 'pink'].includes(newTheme)) {
              setTheme(newTheme);
              result = [
                { text: '' },
                { text: `  ✓ Theme changed to "${newTheme}"`, className: 'terminal-success' },
                { text: '' },
              ];
            } else {
              result = [
                { text: '' },
                { text: `  ⚠ Unknown theme "${args[0]}"`, className: 'terminal-error' },
                { text: '  Available: green, amber, cyan, white, pink', className: 'terminal-dim' },
                { text: '' },
              ];
            }
          }
          break;
        case 'sudo':
          result = [
            { text: '' },
            { text: '  ⚠ Nice try! But you don\'t have root access here 😄', className: 'terminal-error' },
            { text: '' },
          ];
          break;
        case 'ls':
          result = [
            { text: '' },
            { text: '  about.txt    experience/    skills.json    projects/', className: 'terminal-text' },
            { text: '  education/   certs.txt      contact.txt    README.md', className: 'terminal-text' },
            { text: '' },
          ];
          break;
        case 'cat':
          if (args[0] === 'README.md') {
            result = [
              { text: '' },
              { text: '  # Arvind Narayanan — Portfolio Terminal', className: 'terminal-highlight' },
              { text: '  A fully interactive terminal-based portfolio.', className: 'terminal-dim' },
              { text: '  Type "help" to explore!', className: 'terminal-success' },
              { text: '' },
            ];
          } else {
            result = [
              { text: `  cat: ${args[0] || ''}: Try using the command name directly (e.g. "about", "skills")`, className: 'terminal-dim' },
            ];
          }
          break;
        default:
          result = [
            { text: '' },
            {
              text: `  command not found: ${cmd}`,
              className: 'terminal-error',
            },
            { text: '  Type "help" for available commands', className: 'terminal-dim' },
            { text: '' },
          ];
      }

      if (result) {
        appendOutput(result);
      }
    },
    [commandHistory, theme, appendOutput]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        processCommand(inputValue);
        setInputValue('');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIdx =
            historyIndex === -1
              ? commandHistory.length - 1
              : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIdx);
          setInputValue(commandHistory[newIdx]);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex !== -1) {
          const newIdx = historyIndex + 1;
          if (newIdx >= commandHistory.length) {
            setHistoryIndex(-1);
            setInputValue('');
          } else {
            setHistoryIndex(newIdx);
            setInputValue(commandHistory[newIdx]);
          }
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const partial = inputValue.toLowerCase().trim();
        if (partial) {
          const matches = Object.keys(COMMANDS).filter((c) =>
            c.startsWith(partial)
          );
          if (matches.length === 1) {
            setInputValue(matches[0]);
          } else if (matches.length > 1) {
            setOutputLines((prev) => [
              ...prev,
              { text: `  visitor@arvind:~$ ${inputValue}`, className: 'terminal-prompt-echo' },
              { text: `  ${matches.join('  ')}`, className: 'terminal-dim' },
            ]);
          }
        }
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        setOutputLines([]);
      }
    },
    [inputValue, commandHistory, historyIndex, processCommand]
  );

  return (
    <div
      className={`terminal-container theme-${theme}`}
      onClick={focusInput}
      id="terminal-gui"
    >
      {/* Title Bar */}
      <div className="terminal-titlebar">
        <div className="terminal-titlebar-buttons">
          <span className="tb-btn tb-close"></span>
          <span className="tb-btn tb-minimize"></span>
          <span className="tb-btn tb-maximize"></span>
        </div>
        <span className="terminal-titlebar-text">visitor@arvind: ~</span>
        <div className="terminal-titlebar-spacer"></div>
      </div>

      {/* Terminal Body */}
      <div className="terminal-body" ref={terminalBodyRef}>
        {/* Output Lines */}
        {outputLines.filter(Boolean).map((line, i) => (
          <div key={i} className={`terminal-line ${line.className || ''}`}>
            <pre>{line.text}</pre>
          </div>
        ))}

        {/* Input Line */}
        {!isTyping && (
          <div className="terminal-input-line">
            <span className="terminal-prompt">
              <span className="prompt-user">visitor</span>
              <span className="prompt-at">@</span>
              <span className="prompt-host">arvind</span>
              <span className="prompt-colon">:</span>
              <span className="prompt-path">~</span>
              <span className="prompt-dollar">$</span>
            </span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal input"
            />
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};

export default TerminalUI;