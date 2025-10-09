<template>
  <div class="terminal-shell">
    <header class="terminal-header">
      <span class="title">Adi Terminal</span>
      <span class="decor">ctrl + l to clear • type <keyword>help</keyword></span>
    </header>

    <section class="terminal-body" @click="focusInput">
      <div v-if="isLoading" class="terminal-status">Loading profile data…</div>
      <div v-else-if="loadError" class="terminal-status error">
        ⚠ Unable to load profile data<br />
        {{ loadError }}
      </div>

      <div v-else class="terminal-console">
        <div ref="outputRef" class="terminal-output">
          <div v-for="(entry, index) in history" :key="index" class="terminal-entry">
            <div v-if="entry.command" class="terminal-command">
              {{ prompt }} <span>{{ entry.command }}</span>
            </div>
            <pre class="terminal-response">{{ entry.output }}</pre>
          </div>
        </div>

        <form class="terminal-input" @submit.prevent="execute">
          <span class="prompt">{{ prompt }}</span>
          <input
            ref="inputRef"
            v-model="current"
            type="text"
            spellcheck="false"
            autocomplete="off"
            aria-label="Terminal input"
          />
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

interface SkillGroup {
  category: string;
  items: string[];
}

interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

interface Project {
  name: string;
  summary: string;
  links?: string[];
}

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  highlights?: string[];
}

interface Links {
  email?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  resume?: string;
}

interface UserProfile {
  name: string;
  title: string;
  location: string;
  summary: string[];
  values?: string[];
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  education: EducationItem[];
  links: Links;
}

const profile = ref<UserProfile | null>(null);
const isLoading = ref(true);
const loadError = ref<string | null>(null);

const history = ref<Array<{ command: string; output: string }>>([]);
const current = ref('');
const prompt = 'adi@retro-os:~$';

const inputRef = ref<HTMLInputElement | null>(null);
const outputRef = ref<HTMLDivElement | null>(null);

const formatList = (items: string[], prefix = '  - ') => items.map(item => `${prefix}${item}`).join('\n');

const ensureProfile = (formatter: (info: UserProfile) => string) => {
  if (loadError.value) {
    return `⚠ Error: ${loadError.value}`;
  }
  if (!profile.value) {
    return 'Loading profile data…';
  }
  return formatter(profile.value);
};

const sectionDescriptors = [
  { command: 'about', description: 'Who I am and what I do' },
  { command: 'values', description: 'Principles and working style' },
  { command: 'skills', description: 'Technical proficiencies' },
  { command: 'experience', description: 'Professional journey' },
  { command: 'projects', description: 'Selected personal projects' },
  { command: 'education', description: 'Academic background' },
  { command: 'contact', description: 'Reach out or connect' },
  { command: 'links', description: 'Social and web links' },
  { command: 'resume', description: 'Get a link to my résumé PDF' },
  { command: 'clear', description: 'Clear the console output' }
];

const helpText = computed(() =>
  [
    'Available commands:',
    ...sectionDescriptors.map(({ command, description }) => `  ${command.padEnd(12)} – ${description}`),
    '',
    'Tips:',
    '  • Try `ls` to list section names.',
    '  • Use arrow keys to cycle through previous commands.'
  ].join('\n')
);

const lsText = computed(() =>
  sectionDescriptors
    .map(({ command }) => `  ${command}`)
    .join('\n')
);

const appendHistory = (command: string, output: string) => {
  history.value.push({ command, output });
  nextTick(() => {
    if (outputRef.value) {
      outputRef.value.scrollTop = outputRef.value.scrollHeight;
    }
    focusInput();
  });
};

const focusInput = () => {
  if (isLoading.value || loadError.value) return;
  nextTick(() => {
    inputRef.value?.focus();
  });
};

const commandHandlers: Record<string, (args: string) => string | void> = {
  help: () => helpText.value,
  ls: () => lsText.value,
  clear: () => undefined,
  about: () =>
    ensureProfile(info => [`${info.name} — ${info.title}`, info.location, '', ...info.summary].join('\n')),
  values: () =>
    ensureProfile(info =>
      info.values?.length ? ['What drives me:', formatList(info.values, '  • ')].join('\n') : 'Values coming soon.'
    ),
  skills: () =>
    ensureProfile(info =>
      info.skills
        .map(group => `${group.category}\n${formatList(group.items)}`)
        .join('\n\n')
    ),
  experience: () =>
    ensureProfile(info =>
      info.experience
        .map(job => {
          const header = `${job.role} @ ${job.company}`;
          const timeline = `${job.period} • ${job.location}`;
          const details = job.highlights?.length ? formatList(job.highlights) : '  - Impact details coming soon.';
          return [header, timeline, details].join('\n');
        })
        .join('\n\n')
    ),
  projects: () =>
    ensureProfile(info =>
      info.projects
        .map(project => {
          const links = project.links?.length ? `\n  Links: ${project.links.join(', ')}` : '';
          return `${project.name}\n  ${project.summary}${links}`;
        })
        .join('\n\n')
    ),
  education: () =>
    ensureProfile(info =>
      info.education
        .map(item => {
          const header = `${item.degree} — ${item.institution} (${item.year})`;
          const extras = item.highlights?.length ? `\n${formatList(item.highlights)}` : '';
          return `${header}${extras}`;
        })
        .join('\n\n')
    ),
  contact: () =>
    ensureProfile(info => {
      const { email, website, linkedin } = info.links;
      return ['Get in touch:', email && `  Email: ${email}`, linkedin && `  LinkedIn: ${linkedin}`, website && `  Website: ${website}`]
        .filter(Boolean)
        .join('\n');
    }),
  links: () =>
    ensureProfile(info => {
      const { github, linkedin, website } = info.links;
      return ['Links:', github && `  GitHub:   ${github}`, linkedin && `  LinkedIn: ${linkedin}`, website && `  Website:  ${website}`]
        .filter(Boolean)
        .join('\n');
    }),
  resume: () =>
    ensureProfile(info => info.links.resume ? `Download résumé: ${info.links.resume}` : 'Résumé link is not available yet.')
};

const execute = () => {
  const raw = current.value.trim();
  if (!raw) return;

  const [command, ...rest] = raw.split(/\s+/);
  const args = rest.join(' ');
  const handler = commandHandlers[command.toLowerCase()];
  current.value = '';

  if (!handler) {
    appendHistory(raw, `${command}: command not found`);
    return;
  }

  const result = handler(args);
  if (command.toLowerCase() === 'clear') {
    history.value = [];
    appendHistory('', 'Console cleared. Type `help` to explore commands.');
    return;
  }
  appendHistory(raw, (result ?? '').toString() || '');
};

onMounted(async () => {
  try {
    const response = await fetch('/user_data.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    profile.value = await response.json();
  } catch (error: unknown) {
    loadError.value = error instanceof Error ? error.message : 'Unexpected error loading profile data.';
  } finally {
    isLoading.value = false;
    if (profile.value) {
      appendHistory(
        '',
        ensureProfile(info => [`${info.name} — ${info.title}`, info.location, '', 'Type \"help\" to explore commands.' ].join('\n'))
      );
    }
    focusInput();
  }
});

onBeforeUnmount(() => {
  if (inputRef.value) {
    inputRef.value.blur();
  }
});
</script>

<style scoped>
.terminal-shell {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #0a0f1a;
  border: 2px solid #1d2437;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  font-family: 'Fira Code', 'Source Code Pro', monospace;
}


.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: linear-gradient(180deg, #0056e0 0%, #003a9c 100%);
  color: #f4f7ff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  font-size: 13px;
  letter-spacing: 0.4px;
}

.terminal-header .decor {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
}

.terminal-header keyword {
  color: #fffd82;
  font-weight: 600;
}

.terminal-body {
  flex: 1;
  background: #0a0f1a;
  padding: 0;
  overflow: hidden;
  display: flex;
  min-height: 0;
  color: #dce4ff;
}

.terminal-status {
  margin: auto;
  padding: 24px;
  color: #9cb4ff;
  font-size: 14px;
  text-align: center;
  line-height: 1.5;
}

.terminal-status.error {
  color: #ff8f7a;
}

.terminal-console {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #0a0f1a;
  color: #dce4ff;
  padding: 18px 24px 16px;
  gap: 12px;
  min-height: 0;
}

.terminal-output {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 4px;
  min-height: 0;
}

.terminal-entry {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.terminal-command {
  color: #5ae3a1;
  font-weight: 600;
}

.terminal-command span {
  color: #f3f5ff;
  font-weight: 400;
}

.terminal-response {
  position: relative;
  background: rgba(4, 12, 29, 0.7);
  border-left: 3px solid rgba(90, 227, 161, 0.45);
  padding: 10px 14px;
  border-radius: 4px;
  line-height: 1.55;
  margin: 0;
  white-space: pre-wrap;
  color: #dce4ff;
}

.terminal-input {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(55, 72, 110, 0.5);
}

.prompt {
  color: #5ae3a1;
  font-weight: 600;
}

.terminal-input input {
  flex: 1;
  background: #111a2c;
  color: #f6f8ff;
  border: 1px solid rgba(62, 96, 138, 0.8);
  border-radius: 4px;
  padding: 8px 10px;
  font-family: inherit;
  font-size: 14px;
  outline: none;
}

.terminal-input input:focus {
  border-color: #5ae3a1;
  box-shadow: 0 0 0 2px rgba(90, 227, 161, 0.15);
}
</style>
