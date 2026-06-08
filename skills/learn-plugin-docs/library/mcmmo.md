---
name: mcMMO-Dev/mcMMO
slug: mcmmo
source_url: https://raw.githubusercontent.com/mcMMO-Dev/mcMMO/HEAD/README.md
fetched_at: 2026-06-07T21:17:10.363Z
adapter: github-readme
---
# mcMMO-Dev/mcMMO — condensed reference
> Condensed by mcwrench/learn-plugin-docs from <https://raw.githubusercontent.com/mcMMO-Dev/mcMMO/HEAD/README.md>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Overview

### Brief Description
The goal of mcMMO is to take core Minecraft game mechanics and expand them into an extensive and quality RPG experience. Everything in mcMMO has been carefully thought out and is constantly being improved upon. Currently, mcMMO adds fourteen unique skills to train and level in. Each of these skills is highly customizable through our configuration files, allowing server admins to tweak mcMMO to best suit the needs of his or her server. Know that the mcMMO team is dedicated to providing an ever-evolving experience, and that we carefully read all feedback and bug reports in order to evaluate and balance the mechanics of mcMMO in every update.

## About the Team
In December 2018, the original author and creator of mcMMO (nossr50) returned and took over the role of project lead once again, to develop and improve mcMMO.

## Folia

#### Folia Contributors
[<img src="https://github.com/HSGamer.png" width=80 alt="HSGamer">](https://github.com/HSGamer)
[<img src="https://github.com/TechnicallyCoded.png" width=80 alt="TechnicallyCoded">](https://github.com/TechnicallyCoded)
[<img src="https://github.com/Yomamaeatstoes.png" width=80 alt="Yomamaeatstoes">](https://github.com/Yomamaeatstoes)
[<img src="https://github.com/Rockyers.png" width=80 alt="Rockyers">](https://github.com/Rockyers)

## Details

## mcMMO-Dev/mcMMO

## mcMMO
The #1 RPG Mod for Minecraft

## Useful URLs
Website: http://www.mcmmo.org

Spigot Resource: https://spigot.mcmmo.org

Polymart Resource: https://polymart.org/product/727/mcmmo

Wiki: https://wiki.mcmmo.org/

## API
If you are using maven, you can add mcMMO API to your plugin by adding it to pom.xml like so...

```
<repository>
    <id>neetgames</id>
    <url>https://nexus.neetgames.com/repository/maven-releases/</url>
</repository>
```
```
<dependency>
    <groupId>com.gmail.nossr50.mcMMO</groupId>
    <artifactId>mcMMO</artifactId>
    <version>put-the-version-here</version>
</dependency>
```

### Builds
Currently, you can obtain our builds via Spigot or Polymart:

http://spigot.mcmmo.org

https://polymart.org/resource/mcmmo.727

#### Current mcMMO Devs

### Former team members

## Compiling

mcMMO uses Maven to manage dependencies, packaging, and shading of necessary classes; Maven is required to compile mcMMO. It is recommended to always use the latest version of maven.

The typical command used to build mcMMO is: `mvn clean install`

https://spigot.mcmmo.org for more up to date information.

## Downloads

https://www.spigotmc.org/resources/official-mcmmo-original-author-returns.64348/

https://polymart.org/resource/mcmmo.727
