import { createClient } from '@/utils/supabase/client';

export async function fetchGitHubRepos() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.provider_token) {
    throw new Error('No GitHub provider token found in session. Please sign in with GitHub.');
  }

  const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
    headers: {
      Authorization: `Bearer ${session.provider_token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch GitHub repositories');
  }

  const repos = await response.json();
  return repos.map((repo: any) => ({
    id: repo.id,
    name: repo.name,
    owner: repo.owner.login,
    full_name: repo.full_name,
    private: repo.private,
    html_url: repo.html_url,
    updated_at: repo.updated_at,
    default_branch: repo.default_branch,
  }));
}
