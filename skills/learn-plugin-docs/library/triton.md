---
name: TritonMC/Triton
slug: triton
source_url: https://raw.githubusercontent.com/TritonMC/Triton/HEAD/README.md
fetched_at: 2026-06-07T21:37:07.656Z
adapter: github-readme
---
# TritonMC/Triton — condensed reference
> Condensed by mcwrench/learn-plugin-docs from <https://raw.githubusercontent.com/TritonMC/Triton/HEAD/README.md>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Reference

## TritonMC/Triton

## Triton

_Translate your server! Sends the same message in different languages... Hooks into all plugins!_  
This repository was previously called MultiLanguagePlugin.

Triton is a Minecraft plugin for Spigot/Paper, BungeeCord, and Velocity that helps you translate your Minecraft server!

Purchase the plugin on [Spigot](https://spigotmc.org/resources/triton.30331/)
or [Polymart](https://polymart.org/resource/triton.38)!

## Using the API

The recommended way to use Triton's API is through the Gradle/Maven artifact.
Note that the Maven repository mentioned below is only available since
Triton v3.11.2.

<details>
<summary>Gradle (Groovy) Instructions</summary>

Firstly, add the following repository to your project:

```groovy
repositories {
    maven {
        url "https://repo.diogotc.com/releases"
    }
}
```

Then, you should be able to add the Triton API dependency.
Make sure to NOT shade it into your plugin by using `compileOnly`.

```groovy
dependencies {
    // change the version to whatever the latest one is
    compileOnly "com.rexcantor64.triton:triton-api:4.0.0"
}
```
</details>

<details>
<summary>Maven Instructions</summary>

Firstly, add the following repository to your project:

```xml
<repository>
  <id>diogotc-repository-releases</id>
  <name>Diogo Correia's Releases Repository</name>
  <url>https://repo.diogotc.com/releases</url>
</repository>
```

Then, you should be able to add the Triton API dependency.
Make sure to NOT shade it into your plugin by setting the appropriate `scope`.

```xml
<dependency>
  <groupId>com.rexcantor64.triton</groupId>
  <artifactId>triton-api</artifactId>
  <!-- change the version to whatever the latest one is -->
  <version>4.0.0</version>
  <scope>provided</scope>
</dependency>
```
</details>

Need help developing? Take a look at the
[wiki](https://github.com/tritonmc/Triton/wiki),
[JavaDocs](https://triton.rexcantor64.com/javadocs) or join
our [Discord](https://triton.rexcantor64.com/discord)!

Looking for older API versions? Take a look at
the [download page](https://github.com/diogotcorreia/Triton/wiki/Downloads)
or [JitPack](https://jitpack.io/#tritonmc/triton/).

## Compiling from Source

Triton is still a premium plugin and if you're going to use it,
it's advised that you purchase it from Spigot or Polymart, as stated above.  
Nevertheless, you're still free to compile it yourself if you have the skills to do so.  
No support will be given to self-compiled versions.

To compile, clone this repository and run the following command:

```sh
./gradlew shadowJar
```
