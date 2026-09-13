# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

Self-hosted Renovate Bot config: a scheduled GitHub Actions workflow keeps `philmph`'s repositories up to date. Pure config - no application code, build, lint, or test tooling.

## Architecture

- `.github/workflows/renovate.yml` - the only executable part of this repo. Runs on a weekly cron (Sat 02:20 and 04:20 UTC - the second run is for automerge) or via `workflow_dispatch` with `log_level` and `dry_run` inputs. Runs `renovatebot/github-action`, pointed at `renovate-bot-config/config.js`. `RENOVATE_VERSION` pins the Renovate engine version independently of the action version.
- `renovate-bot-config/config.js` - self-hosted Renovate global config (bot-level, not repo-level): the `repositories` array the bot manages, plus `platform`, `autodiscover`, `onboarding`, `onboardingConfig`. `onboardingConfig` is written into a managed repo's `renovate.json` on first onboarding - it extends `renovate-repo-config/default.json` via `github>philmph/renovate-bot//...`. `branchPrefix`/`gitAuthor` here are normally repo-level settings but are also valid at the global level.
- `renovate-repo-config/default.json` - shared preset applied to every managed repo (assignees, labels, PR rate limit, lockfile maintenance, semantic commits). Affects all repos extending it, not just this one.
- `renovate.json` (repo root) - this repo's own config, extending the shared preset so Renovate-Bot keeps itself updated too.

## Making changes

- Add/remove a managed repository: edit `repositories` in `renovate-bot-config/config.js`.
- Change behavior across all managed repos: edit `renovate-repo-config/default.json` (only affects repos that haven't overridden the setting locally).
- Bump the Renovate engine: update `RENOVATE_VERSION` in `.github/workflows/renovate.yml`. Bump the action: update the `renovatebot/github-action` tag in the same step (both are kept current by this bot itself).
- No local way to run this bot; test config changes via `workflow_dispatch` (optionally `dry_run: full`) and inspect the Action logs.
