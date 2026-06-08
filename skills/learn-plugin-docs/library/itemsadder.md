---
name: itemsadder.devs.beer
slug: itemsadder-index
source_url: https://itemsadder.devs.beer/llms-full.txt
fetched_at: 2026-06-07T21:17:14.512Z
adapter: gitbook
---
# itemsadder.devs.beer — condensed reference
> **Warnings:** GitBook .md export unavailable for this page; used llms.txt fallback
> Condensed by mcwrench/learn-plugin-docs from <https://itemsadder.devs.beer/llms-full.txt>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Overview

### Errors about downloading vanilla assets

Please read the tutorial here.

{% content-ref url="/pages/QPgAkbowaKF5Cm58Hr6i" %}
[Failed to download Minecraft assets](/faq/failed-to-download-minecraft-assets)
{% endcontent-ref %}

## Introduction

Maintaining compatibility for 6 versions of the game became a very hard task which is impacting too much over the quality of the product and its updates release delay.

I decided to discard compatibility for 1.15 to 1.20.4 in favor of a better 1.20.5+ experience.

## Installation

## Read the install tutorial again

Try again to follow the installation tutorial on a clean server.

{% content-ref url="/pages/-M2DaLP4y3wYXxs9pJdt" %}
[First Install](/plugin-usage/first-install)
{% endcontent-ref %}

## Failed to download Minecraft assets

ItemsAdder needs some Minecraft assets to work, it automatically downloads them for you, but some server setups might have issues downloading (blocking firewall, network error, etc.).

You can manually download the assets to fix this.

{% stepper %}
{% step %}

#### Download the assets

{% embed url="<https://mc-assets-downloader.lonedev.workers.dev/itemsadder-required-vanilla-assets/vanilla_assets.zip>" %}

<div align="left"><figure><img src="/files/i2w6gwvoqCFKVqMmJyT9" alt=""><figcaption></figcaption></figure></div>
{% endstep %}

{% step %}

## [Download here](https://www.spigotmc.org/resources/additions-custom-commands-menus-items-tablists-actions-scoreboards-and-much-more-1-8-1-16.67706/)

## [Download here](https://www.spigotmc.org/resources/43058/)

## [Download here](https://www.spigotmc.org/resources/animatedscoreboard.20848/)

{% hint style="warning" %}
Please refer to the plugin page tutorials before asking for help, I'm not the developer of this plugin and this info might become outdated at some point.
{% endhint %}

## [Download here](https://www.spigotmc.org/resources/authmereloaded.6269/)

## [Download here](https://www.spigotmc.org/resources/bentobox-bskyblock-acidisland-skygrid-caveblock-aoneblock-boxed.73261/)

## [Download here](https://ci.citizensnpcs.co/job/citizens2/)

### [Polymart Download](https://polymart.org/resource/cluescrolls.906)

### [Spigot Download](https://www.spigotmc.org/resources/30276/)

## [Download here](https://www.spigotmc.org/resources/1-9-1-16-custom-recipes-and-crafting-craftenhance.65058/)

{% hint style="warning" %}
**Partially compatible**

(we have to wait CraftEnhance developer to implement ItemsAdder API properly)
{% endhint %}

## [Download here](https://www.spigotmc.org/resources/55883/)

## [Download here](https://www.spigotmc.org/resources/dailyshop-an-advanced-shop-plugin.88768/)

## [Download here](https://www.spigotmc.org/resources/83982/)

More info:

{% embed url="<https://astaspastagam.gitbook.io/first-steps/>" %}

## [Download here](https://www.spigotmc.org/resources/1-16-1-17-%E2%9A%A1-ecoarmor-%E2%9C%A8-create-custom-armor-sets-%E2%9C%85-upgrades-crafting-and-more.88246/)

## [Download here](https://www.spigotmc.org/resources/ecoitems-%E2%AD%95-create-custom-items-%E2%9C%85-weapons-armors-tools-charms-%E2%9C%A8-item-levels-rarities.94601/)

## [Download here](https://www.spigotmc.org/resources/1-16-1-17-%E2%9A%A1-ecobosses-%E2%98%84%EF%B8%8F-make-custom-bosses-%E2%9C%85-no-coding-knowlege-needed.86576/)

## [Download the backpack plugin here](https://www.spigotmc.org/resources/%E2%9C%85must-have%E2%9C%85-epic-backpacks.28981/)

{% hint style="warning" %}
You must have the [DefaultPack](/plugin-usage/first-install#optional-add-official-itemsadder-custom-content) installed!
{% endhint %}

{% hint style="success" %}
To create backpacks that will use ItemsAdder texture you have to open backpacks.yml (in EpicBackpacks folder) and add this (one for each backpack you want to create):
{% endhint %}

```yaml
 cool_backpack:
    display_name: '&fCool Backpack'
    item:
      type: ITEMSADDER_ITEM
      name: "iageneric:plastic_bag"
    size: 3
    craft_recipe:
      pattern:
        - XXX
        - LCL
        - XLX
      ingredients:
        L: LEATHER
        C: CHEST
```

## [Download here](https://www.spigotmc.org/resources/custom-items-free-executable-items-1-12-1-17.77578/)

## [Download here](https://www.spigotmc.org/resources/fancywaystones.94376/)

## [Graves Legacy Download here](https://www.spigotmc.org/resources/graves.74208/)

## [GravesX Download here](https://www.spigotmc.org/resources/gravesx.118271/)

## [Download Here](https://www.spigotmc.org/resources/griefpreventionstickfix.76015/)

Disables "No one has claimed this block" message when you right click with a stick that has metadata.\
So it will work only on sticks that are vanilla, with no lore, no custom name...\
\
Useful for [ItemsAdder](https://www.spigotmc.org/resources/%E2%9C%85must-have%E2%9C%85-itemsadder%E2%9C%A8-custom-items-huds-guis-textures-3dmodels-emojis-blocks-wings-hats.73355/) custom items.

## [Download Here](https://www.spigotmc.org/resources/headsanywhere-use-players-heads-anywhere.109951/)

HeadsAnywhere is a plugin that allows you to use player heads as character in your chat, making it easy to access and display player heads anywhere in the game.

It is compatible with ItemsAdder, allowing you to use custom player heads as well.

You will need to disable their resourcepack in their config.yml and merge its resourcepack with ItemsAdder's resourcepack to use custom player heads.

Editation of their default.json to get more accurate head offsets

```json
{
  "providers": [
    {
      "type": "ttf",
      "file": "minecraft:headsanywhere.ttf",
			"shift": [-2, 2],
			"size": 11.0,
			"oversample": 2.0,
			"skip": ""
    }
  ]
}
```

## [Download Here](https://www.spigotmc.org/resources/hmccosmetics.100107/)

![](/files/p6mmOBXRPOJDJlv2qbyX)

### How to Install

* Add HMCCosmetics.jar to your server plugins folder
* Drag the "data" folder in ItemsAdder-Config.zip into the ItemsAdder plugin folder.
* Drag the "HMCCosmetics" folder into your plugins folder.
* Start server
* After your server is started, change the prefix in messages.yml to "%img\_colorful%"

And.. you're done! You have successfully installed HMCCosmetics with the ItemsAdder addon.

## [Download here](https://www.spigotmc.org/resources/interactionvisualizer-visualize-function-blocks-like-crafting-tables-with-animations-client-side.77050/)

## [Download here](https://www.spigotmc.org/resources/iris-world-gen-custom-biome-colors.84586/)

## [Download here](https://www.spigotmc.org/resources/77080/)

## [Download here](https://www.spigotmc.org/resources/itemframeshops.4667/)

{% hint style="warning" %}
**Limitation**\
You do have to set prices for ItemsAdder items per shop as they can't be loaded from defaults.
{% endhint %}

## [Download here](https://www.spigotmc.org/resources/jetsprisonmines-quick-gui-setup-effects-fawe-schematics-holograms-1-mines-1-8-1-19.63783/update?update=488918)

## [Download it here](https://www.spigotmc.org/resources/lootchest.61564)

## [Download here](https://github.com/EndlessCodeGroup/Mimic)

### Here you can download the example package shown in this tutorial

{% embed url="<https://www.spigotmc.org/resources/items-mmoitem-example-integration.88351/>" %}

## [Download here](https://www.spigotmc.org/resources/conxeptworks-model-engine%E2%80%94ultimate-entity-model-manager-1-14-1-17-1.79477/)

## Permissions

## Fix explosions permission

If you have any problem about explosions in others claims (for example when throwing Grenades) you have to install this fix by BentoBox developers: <https://github.com/BONNePlayground/ItemsAdderHook>\
([Download](https://ci.codemc.io/job/BONNePlayground/job/ItemsAdderHook/lastBuild/))

## Commands

### Use the command /mmoitems browse

![](/files/-MS3E1xyRXt8UdH39HaD)

## Dependencies

## Update all dependencies

Update all dependencies, sometimes outdated JARs can cause issues.

## Details

## Welcome

This website helps you configure and create custom items for my plugin.

Some pages in this website may contain affiliate links, meaning I get a commission if you decide to make a purchase (at no cost to you).

### 💠Quick Links

{% content-ref url="/pages/AULodL7VDpAVU8WJ7Fkx" %}
[Terms Of Service](/help/tos)
{% endcontent-ref %}

{% content-ref url="/pages/-M2DaLP4y3wYXxs9pJdt" %}
[First Install](/plugin-usage/first-install)
{% endcontent-ref %}

### 🌐Social Media

* [Ko-fi](http://a.devs.beer/kofi)
* [YouTube](http://youtube.com/lonedev)
* [SpigotMC](https://www.spigotmc.org/members/lonedev.88296/#resources)
* [Website](https://devs.beer)
* [Steam Developer Page](https://store.steampowered.com/developer/LoneDev/)
* [Discord](https://discord.gg/4dfnpUK)

## Purchase

{% hint style="warning" %}
Buy the plugin only from official shops, if you bought it elsewhere you were scammed, ask for a refund.
{% endhint %}

### With PayPal

* [SpigotMC](https://www.spigotmc.org/resources/%E2%9C%A8itemsadder%E2%AD%90emotes-mobs-items-armors-hud-gui-emojis-blocks-wings-hats-liquids.73355/)
* [Polymart](https://polymart.org/resource/itemsadder-custom-items-etc.1851)
* [BuiltByBit](https://builtbybit.com/resources/itemsadder-emotes-mobs-items-armors-hud-gui-emojis-blocks-wings-hats-liquids.10839/)

### Without PayPal

* [Polymart](https://polymart.org/resource/itemsadder-custom-items-etc.1851)

## Frequently asked questions

## Resourcepack is not loading correctly

{% hint style="danger" %}
**Please read this page CAREFULLY before asking for support.**

Most of the times the issue can be easily fixed by reading this page.
{% endhint %}

* resourcepack not loaded at all
* an error shown fullscreen when the player joins
* black and purple texture is shown
* your model doesn't load correctly
* the pack failed to load
* custom sounds don't play
* infinite resourcepack loading glitch

## How to read the SERVER logs

* run the command `/iazip`
* wait it to finish
* read your server console or open the file `logs/latest.log` using any text editor (for example [VSCode](https://code.visualstudio.com/))
* check if any error or warning was thrown and read them carefully, they contain useful information most of the times

## How to read the CLIENT logs (not SERVER)

{% hint style="warning" %}

#### Always use the Vanilla client when something is broken!

The log provided by the game will often be asked from support when necessary.\
A non-bloated log is better for supporting you, and finding a solution easily.
{% endhint %}

#### Original launcher

<details>

<summary>Click to expand</summary>

Enable output log

![](/files/-MlPJSUXC0rKS40f1Oxs)

Join the server and read the log

![](/files/-MlPP7JHqvVwKW_C-Ykq)

You can clearly see which files failed to load and why. The errors are clear in most of the cases.

In this example I had two broken files `gem_vending_machine` and `whitebathroom_sink`.\
The error tells me that the JSON files are broken, they probably have bad characters inside or they are corrupted.

</details>

#### Any launcher

<details>

<summary>Click to expand</summary>

Join the server and let the pack load.\
Open your Minecraft GAME log file, **not server** logs.\
It is usually located here: `%appdata%\.minecraft\logs\latest.log`\
You can clearly see which files failed to load and why, the errors are clear in most of the cases.

</details>

## Common issues <a href="#resourcepack-not-loading-i-get-an-error-in-chat" id="resourcepack-not-loading-i-get-an-error-in-chat"></a>

* Be sure to follow all resourcepack hosting [tutorial ](/plugin-usage/plugin-configuration/resourcepack-hosting)steps.
* If you use [`self-host`](/plugin-usage/plugin-configuration/resourcepack-hosting/self-hosting) make sure the **port** is opened. Ask your hosting about it.
* Make sure you're not using **UPPERCASE**, **space** or **special characters** in items **names**, **namespaces**, **texture** files (`png`) and **model** files (`json`).\
  For example an ID for a custom item: `CustomSword` is wrong, use `custom_sword`.
* If you have **SkinsRestorer** please [read here](/compatibility-with-other-plugins/compatible/skinsrestorer).
* If get black and purple textures and you are on 1.21.11 or greater [read here](/faq/multiple-atlases-used-in-model).
* Check if you have another plugin that uses **custom resourcepacks**.\
  **I**f you have a similar plugins please **disable** its **resourcepack** feature or **ItemsAdder** won't be able to apply the pack correctly. If you want to apply both packs [read here](/adding-content/merge-resourcepacks).
* Make sure you don't have any resourcepack set in the `server.properties` file.
* **Minecraft** limits servers resourcepacks **size** to **50MB** on Minecraft **1.14**, **100MB** on **1.15+** and **250MB** on **1.18+**.\
  Make sure to **compress** your **textures** and your **music** files before creating the zip file.
* Run `/iainfo` command and make sure the resourcepack **URL** is reachable from your browser and it directly downloads the resourcepack `.zip` file.\
  If you paste the link on your browser (Firefox/Chrome) you must instantly see the download start.\
  If you see a download page with buttons it is an invalid URL.\
  Read the resourcepack [hosting tutorials](/plugin-usage/plugin-configuration/resourcepack-hosting).

### Resourcepack not sent at all <a href="#my-players-cant-see-textures-but-ive-followed-the-whole-tutorial" id="my-players-cant-see-textures-but-ive-followed-the-whole-tutorial"></a>

* Enable the resourcepack in the server list settings: <http://imgur.com/a/SG0AU>
* Make sure you don't have any inventory (GUI) or book opening on join.\
  This can cause the resourcepack prompt to disappear and the player won't be able to click on it.\
  In order to fix this you can use the free plugin [ResourcePackBroadcast](https://www.spigotmc.org/resources/resourcepackbroadcast.88318/).\
  This allows you to run commands as soon as the resourcepack is accepted (and various other features).
* Increasing the `delay-ticks` in `config.yml` of **ItemsAdder** to `10` or greater.
* Leave the server, go to `%appdata%/.minecraft/server-resource-packs` and delete everything. Then join the server again.

## Resourcepack not updating after `/iazip`

If you are on **Cloudflare** make sure to use Cache Bypass, clean the cache or implement a custom rule that force no cache on the resourcepack file. Source [here](https://github.com/PluginBugs/Issues-ItemsAdder/issues/3894#issuecomment-2817017486).

## Plugin doesn't work

{% hint style="danger" %}
**Please read this page CAREFULLY before asking for support.**

Most of the times the issue can be easily fixed by reading this page.
{% endhint %}

## Remove any recently installed plugin

Try to remove the new plugin, restore from a server backup, or downgrade the updated plugin/server version and check if the issue persists.

## Follow the resourcepack troubleshooting tutorial

{% content-ref url="/pages/-MlPE9\_ZyAh4iUC4QO-5" %}
[Resourcepack is not loading correctly](/faq/identify-why-textures-are-not-shown)
{% endcontent-ref %}

## Ask on Discord

Someone might have the same issue. Try also to use the search button.

## **Report the bug if you still have issues** <a href="#if-you-still-have-problems-please-read-this-and-then-contact-me" id="if-you-still-have-problems-please-read-this-and-then-contact-me"></a>

{% hint style="warning" %}
Use the search button before submitting a report, people might already have reported it.
{% endhint %}

{% hint style="danger" %}

#### Invalid support requests will be ignored

{% end

…[truncated — see RAW.md for the full document]
