---
name: GSit
slug: gsit
source_url: https://modrinth.com/mod/gsit
fetched_at: 2026-06-07T21:35:55.507Z
adapter: modrinth
---
# GSit — condensed reference
> Condensed by mcwrench/learn-plugin-docs from <https://modrinth.com/mod/gsit>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Folia

### <center>**Supports Spigot, Paper (+ all Forks), Folia Servers from 1.16 to 26.1!**</center>
<center>(Pose and Crawl Features only work 1.17+)</center>

**Overview**

* **This is the ultimate Sit, Chair and Lay - Plugin which allows to sit on Stairs / Chairs**
* Lay, Bellyflop, Spin & Crawl on the ground
* This Plugin contains a lot of settings and features that all can be changed by you in the plugin config and the language files

* Join the [**GPlugins Discord Server**](https://discord.gg/cy2p4au) for the latest **Updates** and **News**

**Special Features**

* **100% customizable!**
* Very good performance
* **Sit** on **every block** with "**/sit**"
* **Crawl** on the ground with "**/crawl**"
* **Lay** or **Bellyflop** on every block with "**/lay**" or "**/bellyflop**"
* You can let laying players snore without any Resource Pack!
* Spin around with "**/spin**"
* Simply right click on top of  a seat (stair, slab or carpet) to sit there
* Create your own **custom list of materials** a **player can sit on**!
* Click on another Player to sit on him and stack up! (Must be enabled in the Config!)
* **GriefPrevention**, **PlotSquared** & **WorldGuard**-Area-**Support**!
* Perfect sit direction calculated from the placement of the seat!
* WorldGuard-Flags! ("sit" "playersit" "pose", "crawl") (requires the "ride", "interact" or "build" flag to be allowed)
* Return a player to the location where he started sitting!
* Set a **customized Sit**, **PlayerSit** or **Pose Message**
* Set the maximum distance between a player and the block!
* Placeholders from **PlaceholderAPI** ("playertoggle", "posing", "sitting", "toggle")
* **And many more ...**

**Pictures**

![https://i.imgur.com/RM9ZGHF.png](https://i.imgur.com/RM9ZGHF.png)

![https://i.imgur.com/jjYPEra.png](https://i.imgur.com/jjYPEra.png)

![https://i.imgur.com/qhJNYoE.png](https://i.imgur.com/qhJNYoE.png)

<details>
<summary>more pictures</summary>

![https://i.imgur.com/SWohPru.png](https://i.imgur.com/SWohPru.png)

![https://i.imgur.com/kFZdq8j.png](https://i.imgur.com/kFZdq8j.png)

![https://i.imgur.com/RGGhhYW.png](https://i.imgur.com/RGGhhYW.png)

</details>

**Commands**

* **/sit (/gsit)** -> Sit on a Block
* **/lay (/glay)** -> Lay on a Block
* **/bellyflop (/gbellyflop)** -> BellyFlop on a Block
* **/spin (/gspin)** -> Spin on a Block
* **/crawl (/gcrawl)** -> Crawl on the ground
* **/sit toggle/playertoggle** -> Toggle the ability to rightclick Blocks or Players
* **/gsitreload (/gsitrl)** -> Reload the Plugin

**Permissions**

**OP-Permission**: GSit.*

**Update-Notification-Permission:** GSit.Update

**Config-Reload-Permission:** GSit.Reload

**Sit-Permissions** (Default-Permissions marked Underlined)**:**

* **GSit.Sit** -> Use "/sit"
* **GSit.SitClick** -> Click on a Block to sit down
* **GSit.SitToggle** -> Use "/sit toggle"
* **GSit.PlayerSit** -> Click on a Player to sit on him
* **GSit.PlayerSitToggle** -> Use "/sit playertoggle"
* **GSit.Lay** -> Use "/lay"
* **GSit.BellyFlop** -> Use "/bellyflop"
* **GSit.Spin** -> Use "/spin"
* **GSit.Crawl** -> Use "/crawl"
* **GSit.Kick.*** -> Combines "GSit.Kick.Sit & GSit.Kick.Pose"
* **GSit.Kick.Sit** -> Kick a sitting Player from his location
* **GSit.Kick.Pose** -> Kick a posing Player from his location
* **GSit.ByPass.*** -> Combines "GSit.ByPass.World"
* **GSit.ByPass.World** -> Ignore the WorldBlacklist

**Known Bugs / Issues**

If you discover any kind of Bug please instantly contact me on the [**GPlugins Discord Server**](https://discord.gg/Cy2P4AU), so i can fix this as soon as possible!

**Stats**

**Videos**

Here you can find some Videos in diffrent languges which show you the plugin with its features!
**Thanks to all of you who created and shared a Video!**

<details>
<summary>videos</summary>

@[YouTube](https://youtu.be/xMLNh_NNqhY)
@[YouTube](https://youtu.be/UPdtfiMgaRs)
@[YouTube](https://youtu.be/a06OZj_yRfE)

</details>

**Miscellaneous**

<center>This Plugin supports the Minecraft-Versions:
1.16, 1.17, 1.18, 1.19, 1.20, 1.21 & 26.1</center>

## Details

## GSit
Modern Sit (Seat and Chair), Lay and Crawl Plugin

_client: unsupported · server: required_

**Categories:** adventure, game-mechanics, social
**Game versions:** 1.21.7, 1.21.8, 1.21.9, 1.21.10, 1.21.11, 26.1, 26.1.1, 26.1.2
**Source:** https://github.com/gecolay/GSit

---
![https://i.imgur.com/QD37itc.png](https://i.imgur.com/QD37itc.png)

## <center>**Modern Sit (Seat and Chair), Lay and Crawl - Plugin**</center>
