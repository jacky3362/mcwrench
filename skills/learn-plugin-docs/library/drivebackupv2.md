---
name: DriveBackupV2
slug: drivebackupv2
source_url: https://modrinth.com/mod/drivebackupv2
fetched_at: 2026-06-07T21:35:57.023Z
adapter: modrinth
---
# DriveBackupV2 — condensed reference
> Condensed by mcwrench/learn-plugin-docs from <https://modrinth.com/mod/drivebackupv2>. Full text in RAW.md. Verify against the live docs for anything safety-critical.

## Overview

## What is this?
Have you ever lost your Minecraft world before?

Maybe your hard drive died.  
Maybe your server hosting provider terminated the server without warning.  
Maybe you just accidentally deleted it.  

DriveBackupV2 is a plugin that aims to provide an extra layer of security to your data by backing it up remotely.

## Installation

## Requirements

### General Requirements

- Java 8 or higher

### Platform Specific Requirements

## Basic Setup
First, download the plugin and copy it to the `plugins` folder on your server.
Then, restart your server.
Finally, follow the instructions below for the backup method of your choice.

## Advanced Setup
Learn how to set up and use more advanced features in the [wiki](https://github.com/MaxMaeder/DriveBackupV2/wiki).

## Details

## DriveBackupV2
DriveBackupV2 is a plugin that aims to provide an extra layer of security to your data making a backup and saving it remotely.

_client: unsupported · server: required_

**Categories:** management, storage, utility
**Game versions:** 1.21.7, 1.21.8, 1.21.9, 1.21.10, 1.21.11, 26.1, 26.1.1, 26.1.2
**Source:** https://github.com/MaxMaeder/DriveBackupV2
**Wiki:** https://github.com/MaxMaeder/DriveBackupV2/wiki

---

## DriveBackupV2

**Need help? Talk to our team on [Discord](https://discord.gg/VdCAUtm)!**

## Features
- Creates and/or uploads backups to Google Drive, OneDrive, Dropbox,
and/or a remote storage server with (S)FTP or S3 compatible api.
- Can automatically create a backup out of any files or folders on your Minecraft server.
- Can make backups of remote (S)FTP file sources and MySQL databases from external servers (such as a BungeeCord one!)
- Automatically deletes backups locally and remotely if they exceed a specified amount.
- Automatically run backups at a set interval or on a custom schedule.
- And **much** more!

#### Bukkit/Spigot/Paper/Purpur

- Minecraft 1.8 - 1.21.X

### Google Drive
Simply run `/drivebackup linkaccount googledrive` and follow the on-screen instructions.

### OneDrive
Simply run `/drivebackup linkaccount onedrive` and follow the on-screen instructions.

### DropBox
Simply run `/drivebackup linkaccount dropbox` and follow the on-screen instructions.

### Local
> Since **v1.3.0**

Change `local-keep-count` in the `config.yml` to set the number of backups to keep locally.
Set to `-1` to keep an unlimited number of backups locally.

Once you have completed the above instructions,
backups will run automatically every hour by default.

## Privacy Policy
Since we need to access your Google Drive
and/or OneDrive data to back up your world,
we are required to provide a Privacy Policy.
 
All of the data this plugin uploads and downloads
or otherwise accessed from your Google Drive
and/or OneDrive stays on your Minecraft server,
so we never have access to it.
This plugin physically cannot access any data in your Google Drive
and/or OneDrive that is not related to backing up your Minecraft server.
But don't take our word for it, all of this plugin's source code is available here!
