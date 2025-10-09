<template>
  <div class="iframe-app">
    <div v-if="!isBlocked" class="iframe-container">
      <iframe
        :src="githubUrl"
        frameborder="0"
        @load="onLoad"
        @error="onError"
        ref="iframeRef"
      ></iframe>
    </div>
    <div v-else class="fallback-container">
      <div v-if="!isLoadingProfile && profile" class="profile-card">
        <img :src="profile.avatar_url" alt="GitHub avatar" class="avatar" />
        <div class="profile-meta">
          <h3>{{ profile.name || profile.login }}</h3>
          <p class="username">@{{ profile.login }}</p>
          <p v-if="profile.bio" class="bio">{{ profile.bio }}</p>
          <ul class="stats">
            <li>
              <strong>{{ profile.followers }}</strong>
              <span>Followers</span>
            </li>
            <li>
              <strong>{{ profile.following }}</strong>
              <span>Following</span>
            </li>
            <li>
              <strong>{{ profile.public_repos }}</strong>
              <span>Repos</span>
            </li>
          </ul>
          <p v-if="profile.location" class="meta-line">📍 {{ profile.location }}</p>
          <p v-if="profile.blog" class="meta-line">
            🔗 <a :href="profile.blog" target="_blank" rel="noopener">Portfolio</a>
          </p>
        </div>
      </div>
      <p v-else-if="isLoadingProfile" class="status-line">Loading GitHub profile…</p>
      <p v-else-if="profileError" class="status-line error">{{ profileError }}</p>

      <div v-if="repos.length" class="repos-section">
        <h4>Highlighted Repositories</h4>
        <ul>
          <li v-for="repo in repos" :key="repo.id" class="repo-card">
            <a :href="repo.html_url" target="_blank" rel="noopener" class="repo-name">{{ repo.name }}</a>
            <p v-if="repo.description" class="repo-description">{{ repo.description }}</p>
            <div class="repo-meta">
              <span v-if="repo.language">{{ repo.language }}</span>
              <span>★ {{ repo.stargazers_count }}</span>
              <span>Updated {{ formatUpdatedAt(repo.updated_at) }}</span>
            </div>
          </li>
        </ul>
      </div>

      <p class="embed-note">
        GitHub prevents embedding profiles outside of github.com, so here’s a live snapshot instead.
      </p>
      <div class="open-link">
        <a :href="githubUrl" target="_blank" rel="noopener">
          <button>Open GitHub Profile</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue';

const githubUrl = 'https://github.com/adiagarwalrock';
const isBlocked = ref(false);
const iframeRef = ref<HTMLIFrameElement | null>(null);
const iframeLoaded = ref(false);
let accessCheckTimer: number | undefined;

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  location: string | null;
  blog: string | null;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

const profile = ref<GitHubUser | null>(null);
const repos = ref<GitHubRepo[]>([]);
const isLoadingProfile = ref(true);
const profileError = ref<string | null>(null);

const formatUpdatedAt = (iso: string) =>
  new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(iso));

const fetchProfile = async () => {
  isLoadingProfile.value = true;
  profileError.value = null;
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch('https://api.github.com/users/adiagarwalrock'),
      fetch('https://api.github.com/users/adiagarwalrock/repos?sort=updated&per_page=5'),
    ]);

    if (!userRes.ok) {
      throw new Error('Unable to load GitHub profile right now.');
    }
    profile.value = (await userRes.json()) as GitHubUser;

    if (reposRes.ok) {
      const repoData = (await reposRes.json()) as GitHubRepo[];
      repos.value = repoData.slice(0, 5);
    } else if (reposRes.status === 403) {
      profileError.value = 'GitHub rate limit reached. Try again in a few minutes.';
    }
  } catch (error) {
    profileError.value =
      error instanceof Error ? error.message : 'Something went wrong while fetching the GitHub profile.';
  } finally {
    isLoadingProfile.value = false;
  }
};

const verifyIframeAccess = () => {
  if (!iframeRef.value) return;
  try {
    const doc = iframeRef.value.contentDocument;
    if (!doc || doc.readyState === 'uninitialized') {
      isBlocked.value = true;
    }
  } catch (error) {
    isBlocked.value = true;
  }
};

const onLoad = () => {
  iframeLoaded.value = true;
  verifyIframeAccess();
};

const onError = () => {
  isBlocked.value = true;
};

onMounted(() => {
  fetchProfile();

  accessCheckTimer = window.setTimeout(() => {
    if (!iframeLoaded.value) {
      isBlocked.value = true;
    } else {
      verifyIframeAccess();
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

.fallback-container {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

.profile-card {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 8px;
  border: 2px solid #000;
  object-fit: cover;
}

.profile-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.profile-meta h3 {
  margin: 0;
  font-size: 18px;
}

.username {
  margin: 0;
  font-size: 12px;
  color: #333;
}

.bio {
  margin: 0;
  font-size: 13px;
}

.stats {
  display: flex;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
  font-size: 12px;
}

.stats li {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.stats strong {
  font-size: 14px;
}

.meta-line {
  margin: 0;
  font-size: 12px;
}

.repos-section h4 {
  margin: 0;
}

.repos-section ul {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.repo-card {
  border: 1px solid #999;
  background-color: #f0f0f0;
  box-shadow: inset 1px 1px 0 #fff;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.repo-name {
  font-weight: bold;
  text-decoration: none;
  color: inherit;
}

.repo-name:hover {
  text-decoration: underline;
}

.repo-description {
  margin: 0;
  font-size: 13px;
}

.repo-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 12px;
  color: #333;
}

.status-line {
  text-align: center;
  font-size: 13px;
}

.status-line.error {
  color: #b00020;
}

.embed-note {
  font-size: 12px;
  text-align: center;
  color: #444;
}

.open-link {
  display: flex;
  justify-content: center;
}

.open-link button {
  padding: 6px 12px;
}

iframe {
  flex-grow: 1;
  border: none;
}
</style>
