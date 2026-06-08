---
name: plan-player-analytics/Plan
slug: plan
source_url: https://raw.githubusercontent.com/plan-player-analytics/Plan/HEAD/README.md
fetched_at: 2026-06-07T21:24:10.518Z
adapter: github-readme
---
# plan-player-analytics/Plan — condensed reference
> Condensed by mcwrench/learn-plugin-docs from <https://raw.githubusercontent.com/plan-player-analytics/Plan/HEAD/README.md>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Reference

## plan-player-analytics/Plan

![Player Analytics](https://raw.githubusercontent.com/plan-player-analytics/drawio-diagrams-storage/master/image/header/main-header-Plan.jpg)

![Java](https://custom-icon-badges.demolab.com/badge/⮞-red?logo=java-white)
![React](https://custom-icon-badges.demolab.com/badge/⮞-blue?logo=react-white)

[Documentation & Tutorials](https://github.com/plan-player-analytics/Plan/wiki) | [Releases](https://github.com/plan-player-analytics/Plan/releases) | [DEV builds](https://github.com/plan-player-analytics/Plan/actions/workflows/ci.yml?query=branch%3Amaster) | [Issues & Suggestions](https://github.com/plan-player-analytics/Plan/issues)

Player Analytics is a fully-fledged solution for the analytics needs of your Minecraft server. A built-in webserver displays insights into different aspects of the server such as Online activity, Playerbase, and how these change over time.

Plan supports multiple different platforms and versions; Spigot, Paper, Fabric, Sponge, SpongeForge, Bungeecord, Velocity, Folia & all derivatives - One jar for all platforms.

- [Version 5 Release trailer on Youtube](https://www.youtube.com/watch?v=BS_Ti9zkoRc)

## API

- [Javadocs](https://plan-player-analytics.github.io/Plan/)
- [API documentation](https://github.com/plan-player-analytics/Plan/wiki/APIv5)

```xml
<repository>
    <id>jitpack</id>
    <url>https://jitpack.io</url>
</repository>

<dependency>
    <groupId>com.github.plan-player-analytics</groupId>
    <artifactId>Plan</artifactId>
    <version>{jitpack version}</version>
    <scope>provided</scope>
</dependency>
```

## Building

You can build the project by running the following in the repository root:
```
cd Plan
./gradlew build
```

- [More information about setting up the project](https://github.com/plan-player-analytics/Plan/wiki/Project-Setup)

## Used Libraries

- **[SBAdmin 2 Template](https://github.com/BlackrockDigital/startbootstrap-sb-admin-2)** | [MIT License](https://opensource.org/licenses/MIT)
- **[Bootstrap](https://getbootstrap.com/)** | [MIT License](https://v4-alpha.getbootstrap.com/about/license/)
- **[HighCharts](https://www.highcharts.com/)** | [Free for non-commercial](https://www.highcharts.com/products/highcharts/#non-commercial)
- **[FullCalendar](https://github.com/fullcalendar/fullcalendar)** | [MIT License](https://datatables.net/license/mit)
- **[Font Awesome Icons](http://fontawesome.io/icons/)** | [SIL Open Font License](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL)
- **[MaxMind GeoIP2 Country](https://www.maxmind.com/en/geoip2-country-database)** | [MaxMind End User License Agreement (EULA)](https://www.maxmind.com/en/end-user-license-agreement)
- **[Dagger](https://dagger.dev/)** | [Apache-2.0 License](https://github.com/google/dagger/blob/master/LICENSE.txt)
- **[DependencyDownload](https://github.com/Vankka/DependencyDownload)** | [MIT License](https://github.com/Vankka/DependencyDownload/blob/main/LICENSE)

## License

Player Analytics is licensed under LGPL-3 (GNU Lesser General Public License)

- [License](https://github.com/plan-player-analytics/Plan/blob/master/LICENSE)
