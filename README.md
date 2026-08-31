<p align="center">
  <img src="./public/logo.png" lt="Logo" width="65" />
<p>

# Portfolio Shirsendu

<p align="center">
  <a href="https://shirsendu-bairagi.betteruptime.com">
    <img src="https://uptime.betterstack.com/status-badges/v3/monitor/10aqw.svg" alt="uptime status">
  </a>
</p>

![Landing](public/previews/landing.webp)

> Shirsendu's devfolio showcasing his projects, experience and certification in a visually appealing manner

- 📦 SSR
- 🖼️ OG Tags
- 🚀 PWA
- ✋ Push Notification
- 🌙 Light/Dark Mode
- 🗂️ CMS (Notion)
- 🤖 Automation (Email, Whatsapp)
- 🐋 Containerized
- 🪄 CI/CD (Github Action)
- ⚡️ API Route Caching
- 📐 Analytics

## How to Deploy

1. Create a docker volume

```bash
docker volume create \
  --name portfolio-shirsendu_static \
  --driver local \
  --opt type=none \
  --opt device=~/Algostract/portfolio-shirsendu/static \
  --opt o=bind

docker volume create \
  --name portfolio-shirsendu_data \
  --driver local \
  --opt type=none \
  --opt device=~/Algostract/portfolio-shirsendu/.data \
  --opt o=bind
```

## License

Published under the [GNU GPLv3](https://github.com/shba007/portfolio-shirsendu/blob/main/LICENSE) license.
<br><br>
<a href="https://github.com/shba007/portfolio-shirsendu/graphs/contributors">
<img src="https://contrib.rocks/image?repo=shba007/portfolio-shirsendu" />
</a>
