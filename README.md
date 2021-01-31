# Freakylay
An alternative and customizable overlay for [DataPuller Mod](https://github.com/kOFReadie/DataPuller) which lets you choose your own style.

Its based on the [original overlay by kOF.Readie](https://github.com/kOFReadie/BSDP-Overlay) with some tweaks and a completely new way of displaying scores, combo, player health, accuracy and much more!

# Index:
- [Features](#Features)
- [Url and access](#Url)
- [Customizing](#Customizing)
- [Configuration](#Configuration)
- [List of Parameters](#Parameters)
- [Older Versions](#Versions)

## Features

- change **background and font color like you want**, even with transparency
- supports long and short names for modifiers (Instant Fail / IF)
- if in practice mode, it displays the offset instead of the whole percentage
    - 130% => +30%
    - 80% => -20%
- displays accuracy, player health and time in a nice circular progressbar
- it hides itself when in menus
- flip elements independently
- test it with a preview image of Beat Saber without having the game to run

## Url
It is hosted via HTTP so you can use the IP feature too:

[http://u.unskilledfreak.zone/overlay/freakylay/latest/](http://u.unskilledfreak.zone/overlay/freakylay/latest/)

See [Configuration](#Configuration) for more options. 

## Customizing

**Just double-click somewhere on the page!**

Use the opening options panel to customize the overlay like you want!
You can close the options panel simply by double-click somewhere else.

## Configuration

The option panel will generate the URL by itself. Copy the URL and insert it into something useful like OBS or other recording or streaming software.

## Parameters

|Parameter|Info|DataPuller Version|Freakylay Version|
|---|---|---|---|
|ip=\<ip\>|IP to connect to any game running DataPuller Mod in the local network, default is 127.0.0.1|0.0.2|0.1.0|
|a|background color in rgba or hex|0.0.2|0.1.0|
|b|text color in rgba or hex|0.0.2|0.1.0|
|c|enable short modifier names (Instant Fail <> IF)|0.0.2|0.1.0|
|d|display previous played BSR key if any|0.0.2|0.1.0|
|e|enable miss counter|0.0.2|0.2.0|
|f|do not display BPM|0.0.2|0.2.1|
|g|do not display NJS|0.0.2|0.2.1|
|h|do not display Combo|0.0.2|0.2.1|
|i|display song info on the right side|0.0.2|0.3.0|
|j|display counter section on the right side|0.0.2|0.3.0|
|k|display modifiers on the right side|0.0.2|0.2.0|
|l|shows an arrow next to the score, pointing up if a new high score can be set, pointing down if actual score is lower then previous one|1.0.0|1.0.0|
|m|show full combo as modifier, will get removed when full combo breaks|1.0.0|1.1.0|

## Versions
Older versions of Freakylay are available via there tags inside the master branch. The tags are based on the compatible DataPuller Version.
Every Version can be accessed by its DataPuller version number as sub directory.

The latest version of this overlay can always be found at the `latest` subdirectory:
[http://u.unskilledfreak.zone/overlay/freakylay/latest/](http://u.unskilledfreak.zone/overlay/freakylay/latest/)

|Freakylay Version|DataPuller Version|Url|
|---|---|---|
|2.0.0|2.0.2|[http://u.unskilledfreak.zone/overlay/freakylay/2.0.0/](http://u.unskilledfreak.zone/overlay/freakylay/2.0.0/)|
|1.1.0|1.1.1|[http://u.unskilledfreak.zone/overlay/freakylay/1.1.0/](http://u.unskilledfreak.zone/overlay/freakylay/1.1.0/)|

## Changelog

- 2.0.0
  - updated to DataPuller 2.0.2
  - converted whole js part of this project to typescript
  - fixed all modifiers disappearing when full combo is lost
  - internal improvements on calculations
  - added minify to generated js file to improve loading speed 
- 1.1.0
  - Updated to DataPuller 1.1.1
  - added Full Combo Modifier
  - added alpha check
  - added better support for 720p
  - improved performance
