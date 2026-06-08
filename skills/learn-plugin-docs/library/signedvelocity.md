---
name: SignedVelocity
slug: signedvelocity
source_url: https://modrinth.com/mod/signedvelocity
fetched_at: 2026-06-07T21:22:59.444Z
adapter: modrinth
---
# SignedVelocity — condensed reference
> Condensed by mcwrench/learn-plugin-docs from <https://modrinth.com/mod/signedvelocity>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Installation

## Requirements
- Java 21+
- Velocity 3.4.0+

## Installation
In order for SignedVelocity to work, you must install it on both Velocity and all your servers

### Installation Videos

## Details

## SignedVelocity
Allows you to cancel or modify messages or commands from Velocity without synchronization problems

_client: unknown · server: unknown_

**Categories:** technology, utility
**Game versions:** 1.21.5, 1.21.6, 1.21.7, 1.21.8, 1.21.9, 1.21.10, 1.21.11, 26.1
**Source:** https://github.com/4drian3d/SignedVelocity

---

## SignedVelocity

](https://ci.codemc.io/job/4drian3d/job/SignedVelocity/)

Allows you to cancel or modify messages or commands from Velocity without synchronization problems

#### **Backend:**
- Paper 1.20+ 
- Sponge 10/12+
- [Minestom](https://github.com/4drian3d/SignedVelocity?tab=readme-ov-file#minestom)
- Fabric 1.21+

## Features
- Transmit the modification and cancellation status of Velocity messages and commands to your backend server using plugin messages. This avoids chat chain synchronization problems and avoids Velocity's security check by correctly synchronizing messages.
- Chat reporting support using Velocity (can be disabled using external plugins like FreedomChat, **not recommended**)
- Ability to remove the unsecured chat warning when logging into each server. Requires [VPacketEvents](https://modrinth.com/plugin/vpacketevents) or [PacketEvents](https://modrinth.com/plugin/packetevents)

   ![SignedVelocitySignedStatus](https://github.com/4drian3d/SignedVelocity/assets/68704415/4a7e2bec-c167-4de1-b827-d188d0afaa56)

> SignedVelocity-Proxy versions prior to 1.3.0 contain an exploit that can be used
> to replace the input of any player, and can give administrator permissions to malicious agents,
> it is recommended to upgrade to the latest version.
> SignedVelocity backend versions are not affected

### Velocity
- Download SignedVelocity-Proxy
- Drag and drop on your Velocity plugins folder
- Start your proxy

### Paper
- Download SignedVelocity-Paper
- Drag and drop on your Paper plugins folder
- Start your server

### Sponge
- Download the version of SignedVelocity-Sponge that is compatible with your server.
  SignedVelocity-Sponge-8 supports API 8.1 and 9, SignedVelocity-Sponge-10 supports API 10 and 11
- Drag and drop on your Sponge plugins folder
- Start your server

### Fabric
- Download the version of SignedVelocity Fabric that corresponds to your server version
- Drag and drop on your Fabric mods folder
- Start your server

### Minestom

In the case of Minestom, SignedVelocity from version 1.3.0 onwards is used in the form of a library
so that it can be included in your own implementation.

#### Maven Repository

##### Gradle

```kotlin
repositories {
    mavenCentral()
}

dependencies {
    implementation("io.github.4drian3d:signedvelocity-minestom:1.4.0")
}
```

#### Example

```java
import io.github._4drian3d.signedvelocity.minestom.SignedVelocity;

// then...

SignedVelocity.initialize();
```

For older versions of Minestom, you can use SignedVelocity-Minestom 1.2.4 which comes as an extension

### Spanish by 4drian3d

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/yfVPBu4Giww" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Metrics
