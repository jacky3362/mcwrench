---
name: QuickShop-Hikari
slug: quickshop-hikari
source_url: https://modrinth.com/mod/quickshop-hikari
fetched_at: 2026-06-07T21:23:02.214Z
adapter: modrinth
---
# QuickShop-Hikari — condensed reference
> Condensed by mcwrench/learn-plugin-docs from <https://modrinth.com/mod/quickshop-hikari>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Installation

## How to Install
**QuickShop requires Minecraft 1.20+  to be run. Any versions below 1.20 were unsupported.**
* Install Vault and an economy plugin supported by Vault.
* If you are using multi-currency, you will need an economy plugin that supports VaultUnlocked.
* Install optional [ProtocolLib](https://www.spigotmc.org/resources/1997/) or [PacketEvents](https://modrinth.com/plugin/packetevents) which can greatly improve QuickShop performance.
* Spigot is no longer supported in recent updates. We recommend switching to Paper or its forks to ensure optimal performance.
* Download QuickShop jar and put it in your plugins folder.
* Download other compatibility modules or add-ons if you need them.
  * Only install compatibility modules that you need, they're not open box to use, you need configure them.
  * Most cases, Hikari can handle region protections by itself, you don't need them.
* Turn on the server and here we go!

## Permissions

## Permissions
If you're a lazy owner, simply give the player `quickshop.player` permission node which contains all needs to let the player create and use quick shops.

But if you're a pro owner, there is also a detailed list to allow control of everything:

<details>
<summary>Detailed Permissions</summary>

### Player Permissions:
* quickshop.use  
  Required for any QuickShop Actions.
* quickshop.create.sell  
  Required to make a shop (Sell-Mode)
* quickshop.create.buy  
  Required to make a shop (Buy-Mode) or to switch from Sell to Buy-Mode.
* quickshop.create.stacks  
  Required to allow selling items in stacks.
* quickshop.create.changeitem  
  Allows a player to change a shop's item.
* quickshop.create.changeamount  
  Allows a player to change the item amount per buy/sell.
* quickshop.create.changeprice  
  Allows a player to change the buy/sell price of their shops.
* quickshop.create.double  
  Allows a player to create a double chest shop.
* quickshop.create.cmd  
  Required to have access to the `/quickshop create` command.  
  This command may bypass certain protections of not-supported protection plugins!
* quickshop.transfer  
  Required to transfer all owned shops to another player.
* quickshop.find  
  Required to use `/quickshop find <item>`
* quickshop.fetchmessage    
  Required to use `/quickshop fetchmessage`
* quickshop.staff  
  Required to use `/quickshop staff` and all its subcommands.
* quickshop.preview  
  Required to use the GUI Item Preview.
* quickshop.currency  
  Required to use the `/quickshop currency <currency>`
* quickshop.shopnaming  
  Required to use the `/quickshop name <name>`
* quickshop.permission  
  Required to use the `/quickshop permission`
* quickshop.benefit  
  Required to use the `/quickshop benefit`

### Admin Permissions:
* quickshop.unlimited  
  Required to use `/quickshop unlimited`
* quickshop.alwayscounting  
  Required to use `/quickshop alwayscounting`
* quickshop.setowner  
  Required to use /quickshop setowner
* quickshop.other.destroy  
  Allows the player to remove/destroy the shops of others.
* quickshop.other.open  
  Allows the player to open chests of other shops and take/put items from/into it.
* quickshop.other.price  
  Allows the player to change the price of someone's shop.
* quickshop.transfer.other  
  Required to transfer ALL shops of someone to another player.
* quickshop.refill  
  Allows the player to refill their shops using a command, essentially making the shop having unlimited items.
* quickshop.empty  
  Allows the player to clear the shop's inventory.
* quickshop.clean  
  Allows the purging/removal of any Shops that have no items in stock.
* quickshop.bypass.<ItemID>  
  Required to sell blacklisted items (E.g. bedrock).
* quickshop.price.restriction.bypass.<RuleName>  
  Required to bypass a specific price limit rule.
* quickshop.alerts  
  Required to receive notifications about possible cheating, plugin warnings and updates.
* quickshop.info  
  Required to use `/quickshop info`
* quickshop.debug  
  Required to use `/quickshop debug`
* quickshop.paste  
  Required to use `/quickshop paste`
* quickshop.purge  
  Required to use `/quickshop purge`
* quickshop.create.admin  
  Required to bypass any protection-checks while creating a shop using /quickshop supercreate
* quickshop.tax  
  Permission to bypass the tax fee.
* quickshop.tax.bypassunlimited  
  Permission to bypass the tax fee but only in the unlimited shop.
* quickshop.cleanghost  
  Permission to remove any broken shop using `/quickshop cleanghost`
* quickshop.export  
  Permission to use /quickshop export  
  This permission is pointless since the command is console only.
* quickshop.recovery  
  Permission to use /quickshop recovery
  This permission is pointless since the command is console only.
* quickshop.removeworld  
  Permission to remove all shops in a world using /quickshop removeworld
* quickshop.other.changeitem  
  Allows the player to change the item of someone's shop.
* quickshop.other.changeamount  
  Allows the player to change the bulk amount of someone's shop.
* quickshop.other.shopnaming  
  Allows the player to change the name of someone's shop.
* quickshop.bypass.namefee  
  Allows the player to bypass the fee of shop naming.
* quickshop.database  
  Permission to use `/quickshop database`

</details>

### Per shop permission management
Have you ever considered putting another player in full charge of your shop?
Or just ban a player to avoid him purchase your shop?
You can do this now with per shop permission management.

![](https://cdn.discordapp.com/attachments/944300612856713236/1013083250664681563/unknown.png)

## Commands

## Commands
Note: Most features can be accessed by control panel or interaction with the shop, in most cases, you don't need those commands.
* **/quickshop unlimited**  
  Makes your Shop buy/sell Items in unlimited quantity or limited
* **/quickshop setowner <player>**  
  Change the Shop Owner.
* **/quickshop buy**  
  Change the shop to buying items.
* **/quickshop sell**  
  Change the shop to selling items.
* **/quickshop price <price>**  
  Change the buy/sell price of the item.
* **/quickshop clean**  
  Removes any loaded shop that doesn't have any items in stock.
* **/quickshop find <item>**  
  Find the nearest shop that sells items that start with the provided text. E.g. /quickshop find dia will find the nearest shop that buys/sells diamonds.
* **/quickshop fetchmessage**  
  Fetch shop message manually from the database.
* **/quickshop info**  
  Show QuickShop information.
* **/quickshop debug**  
  Enable/Disable Debug Mode.
* **/quickshop create <price> [item]**  
  Command to create the shop with the item in hand or specified.
* **/quickshop currency <currency name>**  
  Command to specified the currency the shop using.  
  The Economy plugin must support the Multi-Currency feature and be supported by QuickShop. 
* **/quickshop supercreate**  
  Create a shop while bypassing any protection checks.
* **/quickshop paste**  
  Collects useful information and pastes it on Pastebin.
* **/quickshop staff**  
  Manage staff in your shop.
* **/quickshop staff add <player>**  
  Add a player as staff to your shop.
* **/quickshop staff del <player>**  
  Remove a player as staff from your shop.
* **/quickshop staff clear**  
  Remove all staff members from your shop.
* **/quickshop staff list**  
  Show all current staff members of your shop.
* **/quickshop cleanghost**  
  Remove all broken shops.
* **/quickshop export**  
  Export all shop data to a zip.  
  This command is CONSOLE ONLY!
* **/quickshop recovery**  
  Recover all shops from a TXT file or Paste.  
  This command is CONSOLE ONLY and may remove/override any existing shop on your Server! Make a backup first and try it with a clean database!
* **/quickshop size**  
  Change the bulk size.  
  Requires the "allow-stacks" option in the config to be enabled for the command to work.
* **/quickshop purge**  
  Purge the old shops, for more information please check the purge option in config.yml  
  Requires the "purge" option in the config to be enabled for the command to work.  
* **/quickshop transfer**  
  Transfer ALL shops from one player to another.
* **/quickshop item**  
  Change the item of the shop.  
  Requires the "allow-stacks" option in the config to be enabled for the command to work.
* **/quickshop removeworld**  
  Remove all shops in a specific world.
* **/quickshop name**  
  Naming or un-naming a shop with a specific name.
* **/quickshop permission**  
  Tweaking the per-shop permissions, or add/remove player into/from specific groups.
* **/quickshop database**  
  View and manage QuickShop-Hikari status.
* **/quickshop benefit**  
  View and manage yout shop benefits.

## Details

## QuickShop-Hikari
A shop plugin that allows players to easily sell/buy any items from a chest without any commands.

_client: unsupported · server: required_

**Categories:** economy
**Game versions:** 1.21.7, 1.21.8, 1.21.9, 1.21.10, 1.21.11, 26.1, 26.1.1, 26.1.2
**Source:** https://github.com/QuickShop-Community/QuickShop-Hikari
**Wiki:** https://quickshop-community.github.io/QuickShop-Hikari-Documents/

---
![](https://app.codacy.com/project/badge/Grade/a04ef7174d9f4e65b60ae28b09222809)
![](https://www.codefactor.io/repository/github/ghost-chu/quickshop-hikari/badge)
![](https://api.codiga.io/project/32011/score/svg)
![](https://app.fossa.com/api/projects/git%2Bgithub.com%2FGhost-chu%2FQuickShop-Hikari.svg?type=shield)  

![center banner](https://user-images.githubusercontent.com/30802565/154732527-859c4bed-1548-41bc-bdbf-3c1954f368dc.jpg)

对于不方便使用 Discord 或 Github Issue Tracker 的用户，也可在 QQ 社区群内 966701484 内寻求热心社区人员的帮助
<center><a href="https://quickshop-community.github.io/QuickShop-Hikari-Documents/">We have documents now! Finally!</a></center>

## Features
* Easy to use, simply click and type price to create the shops.
* NBT Data, Enchantment, Tool Damage, Potion, and Mob Egg supports.
* Dynamically switch the display language according to the client language, internationalization friendly.
* Unlimited store support.
* Blacklist support & bypass permissions.
* Shops that buy and sell items in a double-chest.
* UUID support (of course)
* A cool item preview both in chat and GUI.
* Chat Control Panel to change the settings of your shop. Just click to modify everything.
* World/region protection plugins support, and lots of compatibility modules can be downloaded.
* [ProtocolLib](https://www.spigotmc.org/resources/1997/)/[PacketEvents](https://modrinth.com/plugin/packetevents) based Virtual DisplayItem (better for performance) support.
* Multi-currency support: Use different currencies in shops from any economy that supports VaultUnlocked. We also support Vault by default!
* Tax and ongoing fee support!
* Hide commands from help if the player had no permission.
* Sign header color and clear description on the info sign for different shops status.
* [MiniMessage](https://docs.adventure.kyori.net/minimessage/index.html) support, create fancy messages as you want.
* H2 (local) or MySQL (remote) support.
* Advanced transaction mechanism, rollback any Inventory/Economy operation when it failed to execute to prevent player dupes.
* InventoryWrapper API offers custom inventory ability for developers.
* Advanced Event Bus to allow user block protection check event transfer to a specific plugin.
* Fast cache layer, handle more than 1k+ shops without any lag! (Require ProtocolLib installed)
* Per-shop permission management.
* Shop benefits between shop owner and other players!
* Much much more! Cannot put them all in there!

### Or with addons to add more features
* Discount code
* Plan metrics
* DiscordSRV notifications

### Aliases:
* /shop
* /qs
* /chestshop
* /cshop
(customize the aliases in config.yml)

## How to create a shop
To create a shop, place down a chest and left-click it with the number of items you want to sell.
For example: If I want to sell 16 diamonds will I need to hold 16 diamonds in my hand and left-click the chest with it. *(Need allow-stacks: true and permission).*

![](https://cdn.discordapp.com/attachments/944300612856713236/975402078249828402/1_1.gif)

You will then be prompted to type in the chat, how much you would like to sell this item for.

**Note:** You may encounter issues with the chat system if you're on a BungeeCord network that utilizes a global chat plugin like BungeeChat. In such a case will you need to use commands to create a shop!

After you completed those steps should an item be displayed on top (Can be toggled off in the configuration) and a sign with info be placed on the side of the chest.
A Shop may not be created if there is no space around the chest to place down a sign.

## How to buy/sell Items
To buy or sell an Item from/to a Shop will you need to left-click the sign.
You will then be prompted to write the amount you want to buy/sell in chat.

Whether a shop sells or buys items depends on the displayed info on the sign.

![](https://cdn.discordapp.com/attachments/944300612856713236/975401623683739678/2.gif)

## Advanced Features

### Item Preview GUI
Preview the item you will purchase before actual purchase to avoid scam!

![](https://cdn.discordapp.com/attachments/944300612856713236/944301389121749022/item-preview.gif)

### Shop Control Panel
Shop Control Panel allows tweaks to your shop with one click, no command needs!

![](https://cdn.discordapp.com/attachments/944300612856713236/975401244266987540/154743474-4e32ade6-4f07-45b1-8ccf-5627ea1e25f7.gif)

### Shop Staff
Shop owner can able to managing shop staff by using the command `/quickshop staff <add/del/list> <player>`, which allow shop staff to access your shop to manage the stock.

### Ender Chest Inventory Linkage
Install OpenInv and openinv compatibility module and you will be able to use `/quickshop echest` to link your quick shop to your ender chest inventory! So all your echest shops can share with your ender chest inventory!

### Rules-Based Price Limiter
Create rules to limit shops' prices with specific materials!

### Translation OTA & Override system
Unlike other plugins, QuickShop uses CrowdinOTA technology to update our translation over the air. You can always enjoy the latest translations. All translations will keep updated with the cloud.
If you need to customize the translation, you can follow our guide to use the [override customize system](https://quickshop-community.github.io/QuickShop-Hikari-Documents/docs/modules/localization)!

### Shop Purger
Purge shops that owner no longer active or banned!
Our compatibility modules also offer purge player shops while it leave teams/islands/lands.

### Interaction Controller & Direct Trade
Custom the click behavior through interaction.yml!
You can sell or buy 1 or all things directly by sneaking clicking (or any behavior you configured).

### Item Stacking
Enable the allow-stack option in config.yml, then you can create a stacking shop by holding more than one item in hand. So players must buy items that are multiples of their holding.
![](https://cdn.discordapp.com/attachments/944300612856713236/944301599369617428/stacking.gif)

## Compatibility Modules
QuickShop-Hikari officially provides some plugins compatibility modules to make them work more closely with QuickShop, here is a list that we currently support:
* AdvancedRegionMarket *(Remove shops when region reset)*
* BentoBox *(Remove shops while the member was kicked out of the team)*
* Clearlag *(Prevent clear the QuickShop displays if you hadn't installed ProtocolLib)*
* GriefPrevention *(Remove sho

…[truncated — see RAW.md for the full document]
