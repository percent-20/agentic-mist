# Agentic Mist

Location-based MFA for AI agent actions.

Agentic Mist is the landing page and documentation site for the **Mist Channel** — an OpenClaw plugin that uses AirVaults to automatically approve or deny risky AI agent operations based on your physical location.

**Live site:** [percent-20.github.io/agentic-mist](https://percent-20.github.io/agentic-mist/)

## How It Works

1. An AI agent (Claude, etc.) triggers a risky action through OpenClaw
2. OpenClaw's approval engine flags the risk and pauses execution
3. The Mist channel sends a challenge to AirVaults
4. AirVaults checks if you're physically inside your vault's geofenced location
5. If you're inside: approved instantly. If not: denied.

No pop-ups. No codes. No friction.

## Tech Stack

- Static HTML/CSS/JS (no build step)
- Hosted on GitHub Pages
- Dark theme with responsive layout

## Related Projects

- [OpenClaw](https://github.com/percent-20/openclaw) — AI agent security gateway
- [AirVaults](https://github.com/percent-20/airvaults) — Location-based encrypted vault platform
- [openclaw-mfa-gate](https://github.com/percent-20/airvaults/tree/main/apps/openclaw-mfa-gate) — The Mist channel plugin

## License

MIT
