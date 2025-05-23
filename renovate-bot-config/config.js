module.exports = {
  autodiscover: false,
  onboarding: true,
  onboardingConfig: {
    $schema: "https://docs.renovatebot.com/renovate-schema.json",
    extends: ["github>philmph/renovate-bot//renovate-repo-config/default.json"],
  },
  platform: "github",
  repositories: ["philmph/Cloudflare", "philmph/Cloudflare-Data", "philmph/GitHub-Repositories", "philmph/philmph.github.io", "philmph/Renovate-Bot"],

  // From Repository Config - No idea why this works here
  branchPrefix: "renovate/",
  gitAuthor: "Renovate Bot <bot@renovateapp.com>",
};
