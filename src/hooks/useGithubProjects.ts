import { useCallback, useEffect, useState } from "react";
import { hiddenRepos, type Project } from "../data/content";
import { fetchRepos, mergeProjects, withRepoLinks, type GithubRepo } from "../lib/github";

export type LoadStatus = "loading" | "ready" | "error";

interface State {
  status: LoadStatus;
  projects: Project[];
  error?: string;
}

// The unauthenticated GitHub API allows 60 requests an hour, so reuse a recent
// response for the rest of the visit instead of refetching on every reload
const CACHE_MS = 10 * 60 * 1000;

// Curated repos outside your account ("owner/name") are fetched one by one
const extraRepos = (curated: Project[]) => curated.map((p) => p.repo).filter((r): r is string => !!r && r.includes("/"));
// The key includes those extras, so adding one doesn't reuse a cache made without it
const cacheKey = (user: string, curated: Project[]) => `repos:${user}:${extraRepos(curated).join(",")}`;

function readCache(key: string): GithubRepo[] | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { at, repos } = JSON.parse(raw);
    return Date.now() - at < CACHE_MS ? repos : null;
  } catch {
    return null;
  }
}

function writeCache(key: string, repos: GithubRepo[]) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), repos }));
  } catch {
    // Caching is only an optimisation
  }
}

export function useGithubProjects(user: string, curated: Project[]) {
  const [state, setState] = useState<State>(() => {
    if (!user) return { status: "ready", projects: withRepoLinks(curated) };
    const cached = readCache(cacheKey(user, curated));
    return cached
      ? { status: "ready", projects: mergeProjects(curated, cached, hiddenRepos) }
      : { status: "loading", projects: withRepoLinks(curated) };
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const key = cacheKey(user, curated);
    if (!user || (attempt === 0 && readCache(key))) return;
    const controller = new AbortController();
    setState((s) => ({ ...s, status: "loading", error: undefined }));

    fetchRepos(user, controller.signal, extraRepos(curated))
      .then((repos) => {
        writeCache(key, repos);
        setState({ status: "ready", projects: mergeProjects(curated, repos, hiddenRepos) });
      })
      .catch((err: Error) => {
        if (controller.signal.aborted) return;
        console.warn("Could not load GitHub repos, showing curated projects only.", err);
        setState({ status: "error", projects: withRepoLinks(curated), error: err.message });
      });

    return () => controller.abort();
  }, [user, curated, attempt]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  return { ...state, retry };
}
