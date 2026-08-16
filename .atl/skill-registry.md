# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

## User Skills

| Trigger | Skill | Path |
|---------|-------|------|
| Writing Go tests, using teatest, adding test coverage | go-testing | /Users/apliarte/.claude/skills/go-testing/SKILL.md |
| Creating a new skill, add agent instructions, document patterns for AI | skill-creator | /Users/apliarte/.claude/skills/skill-creator/SKILL.md |
| Creating a pull request, opening a PR, preparing changes for review | branch-pr | /Users/apliarte/.claude/skills/branch-pr/SKILL.md |
| "judgment day", "judgment-day", "review adversarial", "dual review", "doble review", "juzgar" | judgment-day | /Users/apliarte/.claude/skills/judgment-day/SKILL.md |
| Creating a GitHub issue, reporting a bug, requesting a feature | issue-creation | /Users/apliarte/.claude/skills/issue-creation/SKILL.md |
| Caveman mode, talk like caveman, less tokens, be brief | caveman | /Users/apliarte/.claude/plugins/cache/caveman/caveman/63e797cd753b/caveman/SKILL.md |
| Persistent memory, recall, remember, save decision | engram:memory | /Users/apliarte/.claude/plugins/cache/engram/engram/0.1.0/skills/memory/SKILL.md |

## Compact Rules

Pre-digested rules per skill. Delegators copy matching blocks into sub-agent prompts as `## Project Standards (auto-resolved)`.

### go-testing
- Table-driven tests with `t.Run` — always
- Use `teatest.NewTestModel` for Bubbletea TUI, `WaitFor` + `FinalModel` pattern
- Golden files under `testdata/` — `update=true` flag to regenerate
- No `t.Parallel()` in TUI tests — model state is not goroutine-safe
- Assert via `model.(ConcreteType)` after casting FinalModel

### skill-creator
- SKILL.md starts with YAML frontmatter: name, description (with Trigger:), license, metadata
- Compact rules section required for delegator injection
- Cover: When to Use, Critical Patterns, Anti-patterns, Return format
- Never include motivation or step-by-step in compact rules — only actionable constraints

### branch-pr
- Every PR MUST link a GitHub issue with `Closes #N` in the body
- Every PR MUST have exactly one `type:*` label
- Run automated checks before requesting review
- PR title ≤70 chars, conventional commits format
- Body: Summary (bullets) + Test plan (checklist)

### judgment-day
- Launch TWO independent judge sub-agents in parallel — they must not see each other's findings
- Each judge: read target code, apply project compact rules, produce CRITICAL/WARNING/SUGGESTION findings
- Orchestrator synthesizes: apply fixes for all CRITICAL, flag WARNING for user
- Re-judge after fixes — max 2 iterations, then escalate
- Do NOT share judge A's output with judge B

### issue-creation
- Use GitHub issue template (bug report or feature request) — blank issues disabled
- Every issue auto-gets `status:needs-review` — maintainer must add `status:approved` before PR
- Questions go to Discussions, not issues
- Include: steps to reproduce, expected vs actual, environment details (for bugs)

### caveman
- Drop: articles, filler words, pleasantries, hedging
- Fragments OK, short synonyms (big not extensive, fix not "implement a solution")
- Levels: lite / full (default) / ultra
- Code blocks unchanged — caveman applies to prose only
- Off: "stop caveman" / "normal mode"

### engram:memory
- Call `mem_save` immediately after: decisions, bug fixes, conventions, non-obvious discoveries
- Call `mem_search` before starting anything that might have been done before
- Call `mem_session_summary` before saying "done" / "listo"
- Format: title (verb+what), type (bugfix/decision/architecture/discovery/pattern/config/preference), content (**What** / **Why** / **Where** / **Learned**)
- Never save: code patterns derivable from files, git history, ephemeral task state

## Project Conventions

| File | Path | Notes |
|------|------|-------|
| Global CLAUDE.md | /Users/apliarte/.claude/CLAUDE.md | User-level rules: language, tone, tools (bat/rg/fd/sd/eza), commit style, strict TDD active |
| Project AGENTS.md | /Users/apliarte/trabajo/FabricaDeAgentesApliarte/AGENTS.md | Crafty Bots Co marketplace conventions: Service Layer (`src/services/`), TanStack Query, mock services for tests, Spanish UI/comments |

