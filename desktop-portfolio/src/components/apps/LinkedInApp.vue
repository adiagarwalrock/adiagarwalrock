<template>
  <div class="iframe-app">
    <div v-if="!isBlocked" class="iframe-container">
      <iframe
        :src="linkedinUrl"
        frameborder="0"
        @load="onLoad"
        @error="onError"
        ref="iframeRef"
      ></iframe>
    </div>
    <div v-else class="fallback">
      <header class="profile-header">
        <div class="identity">
          <h3>{{ profileSummary.name }}</h3>
          <p class="headline">{{ profileSummary.headline }}</p>
          <p class="summary">{{ profileSummary.summary }}</p>
        </div>
      </header>

      <section class="section">
        <h4>Core Skills</h4>
        <div class="skills-grid">
          <div v-for="skill in profileSummary.skills" :key="skill.label" class="skill-card">
            <h5>{{ skill.label }}</h5>
            <ul>
              <li v-for="item in skill.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section">
        <h4>Recent Certifications</h4>
        <ul class="certifications">
          <li v-for="cert in profileSummary.certifications" :key="cert.name">
            <p class="cert-title">{{ cert.name }}</p>
            <p class="cert-meta">
              {{ cert.platform }}<span v-if="cert.provider"> · {{ cert.provider }}</span> · {{ cert.date }}
            </p>
          </li>
        </ul>
      </section>

      <footer class="footer">
        <p class="footnote">
          LinkedIn prevents full profile embeds outside linkedin.com, so here’s a quick snapshot instead.
        </p>
        <a :href="linkedinUrl" target="_blank" rel="noopener">
          <button>View Full LinkedIn Profile</button>
        </a>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const linkedinUrl = 'https://www.linkedin.com/in/adityaagarwal1999/';
const isBlocked = ref(false);
const iframeRef = ref<HTMLIFrameElement | null>(null);
const iframeLoaded = ref(false);
let accessCheckTimer: number | undefined;

interface SkillGroup {
  label: string;
  items: string[];
}

interface Certification {
  name: string;
  platform: string;
  provider?: string;
  date: string;
}

const profileSummary = {
  name: 'Aditya Agarwal',
  headline: 'Software Engineer · AI & Full-Stack Development',
  summary:
    'Delivers data-rich, ML-powered products end-to-end—shipping Python, Java, and C++ solutions with production-ready web UIs.',
  skills: [
    {
      label: 'Languages',
      items: ['Python 3.x', 'Core Java', 'C++'],
    },
    {
      label: 'Frameworks',
      items: ['TensorFlow', 'Flask', 'Django', 'Bootstrap', 'Llama-Index'],
    },
    {
      label: 'Data & DBs',
      items: ['MySQL', 'MongoDB', 'Neo4j', 'Vector Databases'],
    },
    {
      label: 'Tech Stack',
      items: ['Neural Networks', 'Docker', 'OpenCV', 'Modern Web (Vue, Vite)'],
    },
  ] as SkillGroup[],
  certifications: [
    {
      name: 'Building a Recommendation System with Python Machine Learning & AI',
      platform: 'LinkedIn Learning',
      date: 'Jul 2021',
    },
    {
      name: 'Introduction to TensorFlow for AI, ML and Deep Learning',
      platform: 'Coursera',
      provider: 'deeplearning.ai',
      date: 'Jun 2020',
    },
    {
      name: 'Structuring Machine Learning Projects',
      platform: 'Coursera',
      provider: 'deeplearning.ai',
      date: 'May 2020',
    },
  ] as Certification[],
};

const onLoad = () => {
  iframeLoaded.value = true;
  try {
    if (iframeRef.value && iframeRef.value.contentWindow && iframeRef.value.contentWindow.length === 0) {
      isBlocked.value = true;
    }
  } catch (error) {
    isBlocked.value = true;
  }
};

const onError = () => {
  isBlocked.value = true;
};

onMounted(() => {
  accessCheckTimer = window.setTimeout(() => {
    if (!iframeLoaded.value) {
      isBlocked.value = true;
    } else if (iframeRef.value && !iframeRef.value.contentDocument) {
      isBlocked.value = true;
    }
  }, 1200);
});

onBeforeUnmount(() => {
  if (accessCheckTimer) {
    window.clearTimeout(accessCheckTimer);
  }
});
</script>

<style scoped>
.iframe-app,
.iframe-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.fallback {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

.profile-header {
  display: flex;
  align-items: flex-start;
}

.identity h3 {
  margin: 0;
  font-size: 18px;
}

.headline {
  margin: 4px 0;
  font-size: 13px;
  font-weight: bold;
}

.summary {
  margin: 0;
  font-size: 13px;
}

.section h4 {
  margin: 0;
  font-size: 14px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-top: 8px;
}

.skill-card {
  border: 1px solid #999;
  background: #f0f0f0;
  padding: 10px;
  box-shadow: inset 1px 1px 0 #fff;
}

.skill-card h5 {
  margin: 0 0 6px;
  font-size: 13px;
}

.skill-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.certifications {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cert-title {
  margin: 0;
  font-weight: bold;
  font-size: 13px;
}

.cert-meta {
  margin: 0;
  font-size: 12px;
  color: #333;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: auto;
}

.footnote {
  margin: 0;
  font-size: 12px;
  text-align: center;
  color: #444;
}

.footer button {
  padding: 6px 12px;
}

iframe {
  flex-grow: 1;
  border: none;
}
</style>
