---
description: Set up or troubleshoot a Velocity/BungeeCord proxy network and modern forwarding.
---

# Proxy / network

1. Engage the **proxy-network** skill (`.agents/skills/proxy-network/SKILL.md`).
2. Walk the 5-point modern-forwarding contract: `velocity.toml` mode `modern` +
   `forwarding-secret-file`; matching `secret` in each backend's `paper-global.yml`; backend
   `online-mode=false`; never enable BungeeCord and Velocity forwarding together; firewall
   backend ports to the proxy.
3. Map the symptom to its cause (see `velocity-modern-forwarding.md` troubleshooting table) and
   give exact config changes.
