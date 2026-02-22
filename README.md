# Mist

MFA for AI agents.

Mist is an [OpenClaw](https://github.com/percent-20/openclaw) plugin that adds multi-factor authentication to AI agent actions. When your agent attempts something risky, Mist pauses the action and asks a human to approve or deny via the [SafeRoom](https://percent-20.com) companion app.

**Live site:** [percent-20.github.io/agentic-mist](https://percent-20.github.io/agentic-mist/)

## Quick Start

```bash
openclaw plugins install @percent-20/openclaw-mfa-gate
openclaw mfa          # pair with SafeRoom via QR code
openclaw restart
```

## Links

- [Percent-20](https://percent-20.com)
- [OpenClaw](https://github.com/percent-20/openclaw)

## License

MIT
