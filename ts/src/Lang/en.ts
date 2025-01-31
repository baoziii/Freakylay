namespace Freakylay.Lang {
    export class Localization_en extends Freakylay.Lang.Localization {
        constructor() {
            super(null);
        }

        public getData(): Object {
            return {
                "html_head_title": "Freakylay - stream overlay for multiple games",
                "html_meta_description": "An easy to use and customizable overlay with many features like colors, circular bars and many more.",

                "previousBSRLabel": "PREVIOUS BSR",
                "bsr": "BSR",
                "mapper": "MAPPER",
                "marqueeDifficulty": "DIFFICULTY",
                "marqueeSongArtist": "ARTIST",
                "marqueeSongName": "SONGNAME SONGNAME SONGNAME SONGNAME SONGNAME SONGNAME",
                "fullComboLabel": "Full Combo",
                "rankedLabel": "Ranked",
                "starsLabel": "Stars ",
                "comboLabel": "Combo",
                "missLabel": "Miss",
                "score": "SCORE",
                "njsLabel": "NJS",
                "bpmLabel": "BPM",
                "HealthLabel": {
                    "before": "Health",
                    "after": "%"
                },
                "AccuracyLabel": {
                    "before": "Accuracy",
                    "after": "%"
                },
                "timeLabel": {
                    "circle": {
                        "before": "Time<br>",
                        "after": ""
                    },
                    "notCircle": {
                        "before": "",
                        "middle": "<br>",
                        "after": ""
                    }
                },
                "practiceMode": "Practice Mode",
                "practiceModeShort": "PM",
                "practiceModeSongSpeed": "Speed: 100%",
                "practiceModeSongSpeedLabel": {
                    "before": "Speed: ",
                    "after": "%"
                },
                "practiceModeTimeOffset": "Start: 0%",
                "practiceModeTimeOffsetLabel": {
                    "before": "Start: ",
                    "after": ""
                },
                "practiceModeSpacer": "",
                "noFailOn0Energy": "No Fail",
                "oneLife": "One Life",
                "fourLives": "Four Lives",
                "noBombs": "No Bombs",
                "noWalls": "No Walls",
                "noArrows": "No Arrows",
                "ghostNotes": "Ghost Notes",
                "disappearingArrows": "Disappearing Arrows",
                "smallNotes": "Small Notes",
                "proMode": "Pro Mode",
                "strictAngles": "Strict Angles",
                "zenMode": "Zen Mode",
                "slowerSong": "Slower Song",
                "fasterSong": "Faster Song",
                "superFastSong": "Super Fast Song",
                "noFailOn0EnergyShort": "NF",
                "oneLifeShort": "1L",
                "fourLivesShort": "4L",
                "noBombsShort": "NB",
                "noWallsShort": "NW",
                "noArrowsShort": "NA",
                "ghostNotesShort": "GN",
                "disappearingArrowsShort": "DA",
                "smallNotesShort": "SN",
                "proModeShort": "PM",
                "strictAnglesShort": "SA",
                "zenModeShort": "ZM",
                "slowerSongShort": "SS",
                "fasterSongShort": "FS",
                "superFastSongShort": "SFS",

                "tabs-Welcome": "Welcome",
                "tabs-Game-Connection": "Game & Connection",
                "tabs-Colors": "Colors",
                "tabs-Settings": "Settings",
                "tabs-HeartRate": "Heart Rate",

                "welcomeLine1-1": "Welcome to ",
                "welcomeVersion": {
                    "before": "Freakylay ",
                    "after": ""
                },
                "welcomeLine1-2": "!",
                "welcomeLine2": "Please use 'Game & Connection' tab first to choose the correct game and mod you are using.",
                "welcomeLine3": "Version 3 was completely overhauled under its hood with focus of supporting multiple games and mods while still containing a bunch of useful features for content creators.",
                "welcomeLine4-1": "If you have any suggestions, issues or need help, let me know at ",
                "welcomeLine4-2": "Github issues",
                "welcomeLine4-3": ". Please provide as many infos as you can like what game and connection was in use and what went wrong.",
                "welcomeLine5": "Thanks! UnskilledFreak",
                "languageListLabel": "🌐Language:",
                // "languageListTranslatorLabel": "Translation Contributor(s): <a href=\"https://github.com/UnskilledFreak\">Freakylay</a>",

                "gameLinkStatusLabel": "Status:",
                "gameLinkStatus": {
                    "Not Connected": "Not Connected",
                    "Connecting...": "Connecting...",
                    "Connected!": "Connected!"
                },
                "gameLinkStatusNotice": "If this stays at 'Connecting...' for more than 20 seconds that means that something went wrong. Check the settings if any and make sure your game is running and mods are working.",
                "gameListLabel": "Select game:",
                "gameList": {
                    "None": "choose",
                    "Beat Saber": "Beat Saber"
                },
                "connectionListLabel": "Connection:",
                "connectionList": {
                    "None": "choose",
                    "DataPuller_2_0_12": "DataPuller 2.0.12",
                    "DataPuller_2_1_0": "DataPuller 2.1.0+",
                    "HttpSiraStatus_9_0_1": "Http(Sira)Status 9.0.1+"
                },
                "connectionUseScoreWithMultipliers": "use ScoreWithMultipliers",
                "connectionIP": "IP: ",
                "connectionPort": "Port: ",
                "connectToGame": "Connect!",

                "colorManagement": "Color management",
                "colorBackgroundColor": "Background color",
                "colorTextColor": "Text color",
                "colorRandomBackgroundColor": "Random background color",
                "colorInputsRed": "Red: ",
                "colorInputsGreen": "Green: ",
                "colorInputsBlue": "Blue: ",
                "colorInputsAlpha": "Alpha: ",
                "alphaInfo": "Not recommended but might work great ;)",
                "colorRandomTextColor": "Random text color",
                "defaultColorInfoText": "It will not change the alpha channel, only RGB will get used!",
                "UserOverrideColorSetting": " ....... this does not make any sense at all to set both to the same color...",

                "settingsBanner": "Please note: Not all settings are supported by the selected game or connection.",
                "settingsLooks": "Looks",
                "settingsLooksDisplayShortModifierNames": "display short modifier names",
                "settingsLooksShowPreviousMapKey": "show previous map key (DataPuller)",
                "settingsLooksShowMissBadHitCounter": "show miss/bad hit counter",
                "settingsLooksShowBPM": "show BPM",
                "settingsLooksShowBlockSpeed": "show block speed",
                "settingsLooksShowCombo": "show combo",
                "settingsLooksHideFullComboInfo": "hide full combo info",
                "settingsLooksHideDefaultDifficultyIfDifficultyHasCustomName": "hide default difficulty if difficulty has custom name (DataPuller)",
                "settingsLooksHideCompleteModifierSection": "hide complete modifier section",
                "settingsLooksHideCompleteCounterSection": "hide complete counter section",
                "settingsLooksHideCompleteSongInfoSection": "hide complete song info section",
                "settingsLooksTimeCircleMatchesOtherCircles": "time circle matches other circles",
                "settingsLooksShowIfMapIsRanked": "show if map is ranked (DataPuller)",
                "settingsLooksShowRankedStarDifficultyInfo": "show ranked star/difficulty info (DataPuller)",
                "settingsLooksShowRankBehindTheAccuracyCircle": "show rank behind the accuracy circle (DataPuller)",
                "settingsLooksBorderRadius": "border radius",
                "settingsLooksOverrideBackgroundColorWithMapColor": {
                    "label": "override background color with map color (HttpSiraStatus)",
                    "options": {
                        "0": "No override",
                        "1": "Use left environment color",
                        "2": "Use right environment color",
                        "3": "Use obstacle color",
                        "4": "Use wall color (only Sira!)",
                        "5": "Use left saber color",
                        "6": "Use right saber color"
                        // "NoOverride": "No override",
                        // "UseLeftEnvironmentColor": "Use left environment color",
                        // "UseRightEnvironmentColor": "Use right environment color",
                        // "UseObstacleColor": "Use obstacle color",
                        // "UseWallColor": "Use wall color (only Sira!)",
                        // "UseLeftSaberColor": "Use left saber color",
                        // "UseRightSaberColor": "Use right saber color"
                    }
                },
                "settingsLooksOverrideTextColorWithMapColor": {
                    "label": "override text color with map color (HttpSiraStatus)",
                    "options": {
                        "0": "No override",
                        "1": "Use left environment color",
                        "2": "Use right environment color",
                        "3": "Use obstacle color",
                        "4": "Use wall color (only Sira!)",
                        "5": "Use left saber color",
                        "6": "Use right saber color"
                        // "NoOverride": "No override",
                        // "UseLeftEnvironmentColor": "Use left environment color",
                        // "UseRightEnvironmentColor": "Use right environment color",
                        // "UseObstacleColor": "Use obstacle color",
                        // "UseWallColor": "Use wall color (only Sira!)",
                        // "UseLeftSaberColor": "Use left saber color",
                        // "UseRightSaberColor": "Use right saber color"
                    }
                },
                "settingsPositions": "Positions",
                "settingsPositionsMoveSongInfoToRightSide": "move song info to right side",
                "settingsPositionsMoveSongInfoToTop": "move song into to top",
                "settingsPositionsMoveCounterSectionToTop": "move counter section to top",
                "settingsPositionsMoveModifiersToRightSide": "move modifiers to right side",
                "settingsPositionsMargin": "margin",
                "settingsMisc": "Misc",
                "settingsMiscCompareScoreWithLastScore": {
                    "label": "compare score with last score (DataPuller)",
                    "options": {
                        "0": "do not compare",
                        "1": "legacy - Freakylay 2 Arrow",
                        "2": "use offset"
                        // "DoNotCompare": "do not compare",
                        // "LegacyFreakylay2Arrow": "legacy - Freakylay 2 Arrow",
                        // "UseOffset": "use offset"
                    }
                },
                "settingsMiscAnimateScoreIncrement": "animate score increment",
                "settingsMiscShowSongSpeedAsRelativeValues": "show song speed as relative values (-20% instead of 80%)",
                "settingsMiscTestWithBackgroundImage": "test with background image",

                "heartRateConnectionType": "Connection type",
                "heartRateConnectionStateLabel": "Connection state: ",
                "heartRateConnectionState": {
                    "Ready": "Ready",
                    "Fetching": "Fetching",
                    "Error": "Error",
                    "NotConnected": "NotConnected"
                },
                "heartRateFeedButton": "Apply",
                "heartRateFeedTypeLabel": "Feed type:",
                "heartRateFeedType": {
                    "Disabled": "Disabled",
                    "Token": "Pulsoid Token",
                    "JSON": "Pulsoid JSON (deprecated)",
                    "HypeRate": "HypeRate",
                },
                "heartRateHintJson-1": "See config for 'Feed reference' at ",
                "heartRateHintJson-2": "Pulsoid Configuration",
                "heartRateHintJson-3": ".\n\nWARNING! This feed type is deprecated and will be removed in future releases of Freakylay or by Pulsoid team. It may not function at any moment.",
                "heartRateHintToken-1": "Get or refresh Token ",
                "heartRateAuthLink": "here",
                "heartRateHintToken-2": ".\nPaste generated token into the input field above.",
                "heartRateHintSession": "Paste your Session-ID given by the app.",
                "heartRateFeedUrlText": "URL or token",
                "heartRateFeedTextDisabled": "URL or token",
                "heartRateFeedTextJSON": "JSON URL",
                "heartRateFeedTextToken": "Token",
                "heartRateFeedTextDummy": "Token",
                "heartRateFeedTextDummyValue": "not needed =)",
                "heartRateFeedTextHypeRate": "Session-ID",
                "pulsoidThanks": "Special thanks to the Pulsoid team for making this possible!",
                "hypeRateThanks": "Special thanks to the HypeRate team for making this possible!",
                "heartRateCircleBarLabel": {
                    "before": "Heart<br>",
                    "after": ""
                },
                "heartRateOffsetHint": "If it does not show up, it might be out of bounds. Try adjusting the offset values and make sure the connection is in fetching state.",
                "heartRatePullInfo": "A higher number means more data to show, lower will show a more fast paced graph. Normally a bpm event is received about every second but it can vary.",
                "heartRateSettingsUseDynamicMaxBPM": "use dynamic max bpm",
                "heartRateSettingsMaximumBPMToDisplay": "maximum bpm to display (affects circle)",
                "heartRateSettingsGraph": "Graph",
                "heartRateSettingsDisplayGraph": "display graph",
                "heartRateSettingsUseBackground": "use background",
                "heartRateSettingsStrokeLineWithBackgroundColorInNoBackgroundMode": "stroke line with background color in no background mode",
                "heartRateSettingsGraphWidth": "width",
                "heartRateSettingsGraphHeight": "height",
                "heartRateSettingsDisableCircleBarInCounterSection": "disable circle bar in counter section",
                "heartRateSettingsDisplayNumbers": "display numbers",
                "heartRateSettingsFontSizeForMinAndMaxBPM": "font size for min and max bpm",
                "heartRateSettingsFontSizeForCurrentBPM": "font size for current bpm",
                "heartRateSettingsAnchor": {
                    "label": "anchor",
                    "options": {
                        "0": "top left",
                        "1": "top right",
                        "2": "bottom left",
                        "3": "bottom right",
                        "4": "center screen"
                        // "TopLeft": "top left",
                        // "TopRight": "top right",
                        // "BottomLeft": "bottom left",
                        // "BottomRight": "bottom right",
                        // "CenterScreen": "center screen"
                    }
                },
                "heartRateSettingsOffsetX": "offset X",
                "heartRateSettingsOffsetY": "offset Y",
                "heartRateSettingsEventsToShow": "events to show",

                "settings": "Settings",
                "urlTextLabel": "URL to use:",
                "huh": "Who needs a fancy settings panel when it's not visible for 99.9% of usage time?",
                "copyright": "Freakylay",

                "versionHint1": "Welcome & sorry to bother!",
                "versionHint2-1": "You are using an old config for Freakylay.<br>This is the new version ",
                "versionHint2-2": "!",
                "versionHint3": "While the new version is compatible with the old one's config, you have to change the game and connection in the options panel.",
                "versionHint4": "Please use the button bellow to open the option panel and make additional changes!",
                "versionHintOptions": "Open Options",
                "versionWarning": "Freakylay"
            };
        }
    }
}