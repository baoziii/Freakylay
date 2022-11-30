///<reference path="../Internal/Logger.ts"/>
namespace Freakylay.Ui {
    import BaseConnection = Freakylay.Game.BaseConnection;
    import Config = Freakylay.Internal.Config.Config;
    import Color = Freakylay.Internal.Color;
    import EventProperty = Freakylay.Internal.EventProperty;
    import Logger = Freakylay.Internal.Logger;
    import Pulsoid = Freakylay.DataTransfer.Pulsoid.Pulsoid;

    export class Events {

        private readonly logger: Logger;
        private config: Config;
        private helper: ConfigHelper;
        private connection: BaseConnection;
        private pulsoidConnection: Pulsoid;

        // html elements
        private cssRootVariables: HTMLHtmlElement;

        // marquee
        private marquee: Marquee[] = [];

        // sections
        private counterSection: HTMLDivElement;
        private songInfo: HTMLDivElement;
        private modifiers: HTMLDivElement;
        private practiceMode: HTMLDivElement;

        // counter section
        private combo: HTMLDivElement;
        private comboValue: HTMLSpanElement;
        private miss: HTMLDivElement;
        private missValue: HTMLSpanElement;
        private score: HTMLDivElement;
        //private previousScore: HTMLDivElement; // hmmm
        private blockSpeed: HTMLDivElement;
        private blockSpeedValue: HTMLSpanElement;
        private bpm: HTMLDivElement;
        private bpmValue: HTMLSpanElement;
        private health: HTMLDivElement;
        private accuracy: HTMLDivElement;
        private time: HTMLDivElement;
        private pulsoid: HTMLDivElement;
        private accuracyRank: HTMLDivElement;
        private ranked: HTMLDivElement;
        private stars: HTMLDivElement;
        private starsValue: HTMLSpanElement;
        private fullCombo: HTMLDivElement;

        // circle bars
        private healthCircleBar: CircleBar;
        private accuracyCircleBar: CircleBar;
        private timeCircleBar: CircleBar;
        private pulsoidCircleBar: CircleBar;

        // song info
        private mapKey: HTMLDivElement;
        private mapper: HTMLDivElement;
        private cover: HTMLDivElement;
        private coverImage: HTMLDivElement;
        private difficulty: HTMLDivElement;
        private difficultyValue: HTMLSpanElement;
        private customDifficultyValue: HTMLSpanElement;
        private songName: HTMLDivElement;
        private songArtist: HTMLDivElement;
        private previousMapKey: HTMLDivElement;
        private previousMapKeyValue: HTMLDivElement;

        // modifiers
        private modifierNoFailOn0Energy: HTMLDivElement;
        private modifierOneLife: HTMLDivElement;
        private modifierFourLives: HTMLDivElement;
        private modifierNoBombs: HTMLDivElement;
        private modifierNoWalls: HTMLDivElement;
        private modifierNoArrows: HTMLDivElement;
        private modifierGhostNotes: HTMLDivElement;
        private modifierDisappearingArrows: HTMLDivElement;
        private modifierSmallNotes: HTMLDivElement;
        private modifierProMode: HTMLDivElement;
        private modifierStrictAngles: HTMLDivElement;
        private modifierZenMode: HTMLDivElement;
        private modifierSlowerSong: HTMLDivElement;
        private modifierFasterSong: HTMLDivElement;
        private modifierSuperFastSong: HTMLDivElement;

        // practice mode
        private practiceModeInfo: HTMLDivElement;
        private practiceModeSongSpeed: HTMLDivElement;
        private practiceModeTimeOffset: HTMLDivElement;

        // modifier array
        private readonly gameModifiers: HTMLDivElement[];
        private readonly practiceModifiers: HTMLDivElement[];
        private readonly allModifiers: HTMLDivElement[][];

        // elements array
        private readonly toggleElements: HTMLDivElement[];

        private showElements: EventProperty<boolean>;

        // value holders...
        private valueDifficulty: string;
        private valueCustomDifficulty: string;
        private valuePreviousScore: number;

        /**
         * constructor of Event class
         * it also hooks into all events given by config and other stuff
         * @param config
         * @param helper
         * @param pulsoid
         */
        constructor(config: Config, helper: ConfigHelper, pulsoid: Pulsoid) {
            this.logger = new Logger('Events');
            this.config = config;
            this.helper = helper;
            this.pulsoidConnection = pulsoid;

            this.showElements = new EventProperty<boolean>(false);

            this.loadAllDomElements();

            this.gameModifiers = [
                this.modifierNoFailOn0Energy,
                this.modifierOneLife,
                this.modifierFourLives,
                this.modifierNoBombs,
                this.modifierNoWalls,
                this.modifierNoArrows,
                this.modifierGhostNotes,
                this.modifierDisappearingArrows,
                this.modifierSmallNotes,
                this.modifierProMode,
                this.modifierStrictAngles,
                this.modifierZenMode,
                this.modifierSlowerSong,
                this.modifierFasterSong,
                this.modifierSuperFastSong,
            ];

            this.practiceModifiers = [
                this.practiceModeInfo,
                this.practiceModeSongSpeed,
                this.practiceModeTimeOffset
            ];

            this.allModifiers = [
                this.gameModifiers,
                this.practiceModifiers
            ];

            this.toggleElements = [
                this.counterSection,
                this.modifiers,
                this.songInfo,
                this.practiceMode
            ];

            // internal
            this.showElements.register((show: boolean) => {
                const className = 'inactive';
                this.allModifiers.forEach((ar: HTMLDivElement[]) => {
                    ar.forEach((element: HTMLDivElement) => {
                        this.displayModifier(element, true);
                    });
                })
                this.toggleElements.forEach((element: HTMLDivElement) => {
                    if (show) {
                        element.removeClass(className);
                    } else {
                        element.addClass(className);
                    }
                });
            })

            // option panel
            this.helper.optionsOpen.register((show: boolean) => {
                this.showElements.Value = show;
            });

            // colors
            this.config.colors.background.register((color: Color) => {
                this.setBackgroundColor(color);
                this.helper.generateUrlText();
            });

            this.config.colors.text.register((color: Color) => {
                this.setTextColor(color);
                this.helper.generateUrlText();
            });

            // looks
            this.config.looks.shortModifierNames.register((enabled: boolean) => {
                this.helper.generateUrlText();
                this.handleShortNames(enabled);
            });
            this.config.looks.showPreviousKey.register((enabled: boolean) => {
                this.previousMapKey.display(enabled);
                this.helper.generateUrlText();
            });
            this.config.looks.showMissCounter.register((enabled: boolean) => {
                this.miss.inline(enabled);
                this.helper.generateUrlText();
            });
            this.config.looks.showBpm.register((enabled: boolean) => {
                this.bpm.inline(enabled);
                this.helper.generateUrlText();
            });
            this.config.looks.showBlockSpeed.register((enabled: boolean) => {
                this.blockSpeed.inline(enabled);
                this.helper.generateUrlText();
            });
            this.config.looks.showCombo.register((enabled: boolean) => {
                this.combo.inline(enabled);
                this.helper.generateUrlText();
            });
            this.config.looks.songInfoOnRightSide.register((enabled: boolean) => {
                this.songInfo.toggleClassByValue(enabled, 'flip');
                this.helper.generateUrlText();
            });
            this.config.looks.counterSectionOnTop.register((enabled: boolean) => {
                this.counterSection.toggleClassByValue(enabled, 'flip');
                this.helper.generateUrlText();
            });
            this.config.looks.modifiersOnRightSide.register((enabled: boolean) => {
                this.modifiers.toggleClassByValue(enabled, 'flip');
                this.practiceMode.toggleClassByValue(enabled, 'flip');
                this.helper.generateUrlText();
            });
            this.config.looks.hideFullComboModifier.register((enabled: boolean) => {
                this.fullCombo.display(!enabled);
                this.helper.generateUrlText();
            });
            this.config.looks.timeCircleLikeOtherCircles.register(() => {
                let min = 50;
                let max = 100;
                if (this.connection) {
                    min = this.connection.onTimeElapsedChange.Value;
                    max = this.connection.onTimeLengthChange.Value;
                }
                this.onTimeElapsedChangeSetText(min, max);
                this.helper.generateUrlText();
            });
            this.config.looks.songInfoOnTopSide.register((enabled: boolean) => {
                this.songInfo.toggleClassByValue(enabled, 'top');
                this.helper.generateUrlText();
            });
            this.config.looks.hideAllModifiers.register((enabled: boolean) => {
                this.modifiers.flex(!enabled);
                this.practiceMode.flex(!enabled);
                this.helper.generateUrlText();
            });
            this.config.looks.hideCounterSection.register((enabled: boolean) => {
                this.counterSection.display(!enabled);
                this.helper.generateUrlText();
            });
            this.config.looks.hideSongInfo.register((enabled: boolean) => {
                this.songInfo.display(!enabled);
                this.helper.generateUrlText();
            });
            this.config.looks.showRanked.register((enabled: boolean) => {
                this.ranked.display(enabled);
                this.helper.generateUrlText();
            });
            this.config.looks.showStars.register((enabled: boolean) => {
                this.stars.display(enabled);
                this.helper.generateUrlText();
            });
            this.config.looks.showAccuracyRank.register((enabled) => {
                this.accuracyRank.display(enabled);
                this.helper.generateUrlText();
            });

            this.config.looks.compareWithPreviousScore.register(() => {
                this.helper.generateUrlText();
            });
            this.config.looks.hideDefaultDifficultyOnCustomDifficulty.register(() => {
                this.helper.generateUrlText();
            });
            this.config.looks.speedDisplayRelative.register(() => {
                this.helper.generateUrlText();
            });
            this.config.looks.useMapColorForBackgroundColor.register(() => {
                this.helper.generateUrlText();
            });
            this.config.looks.useMapColorForTextColor.register(() => {
                this.helper.generateUrlText();
            });
            this.config.looks.borderRadius.register((newRadius: number) => {
                this.setRootCss('radius', newRadius + 'px');
                this.helper.generateUrlText();
            });

            this.config.pulsoid.type.register(() => {
                this.pulsoidConnection.stop();
            });
            this.config.pulsoid.tokenOrUrl.register(() => {
                this.pulsoidConnection.stop();
            });

            this.config.pulsoid.maxStaticBpm.register(() => {
                this.helper.generateUrlText();
            });
            this.config.pulsoid.useDynamicBpm.register(() => {
                this.helper.generateUrlText();
            });

            this.pulsoidConnection.bpm.register((bpm: number) => {
                let enabled = bpm > 0;
                this.pulsoid.display(enabled);
                this.counterSection.toggleClassByValue(enabled, 'pulsoid');
                if (!enabled) {
                    return;
                }

                this.pulsoidCircleBar.setProgress(bpm, this.pulsoidConnection.maxBpm.Value);
                this.pulsoidCircleBar.setText('Heart<br>' + bpm);
            });

            this.startAllMarquees();

            if (this.config.shouldOpenOptionPanelAfterLoad) {
                this.helper.toggleOptionPanel();
            } else {
                this.showElements.Value = false;
            }
        }

        /**
         * loads all used DOM elements to manipulate them later
         * @private
         */
        private loadAllDomElements(): void {
            // color
            this.cssRootVariables = document.get<HTMLHtmlElement>(':root');

            // sections
            this.counterSection = document.getDiv('counterSection');
            this.songInfo = document.getDiv('songInfo');
            this.modifiers = document.getDiv('modifiers');

            // counter section
            this.combo = document.getDiv('combo');
            this.miss = document.getDiv('miss');
            this.score = document.getDiv('score');
            this.blockSpeed = document.getDiv('njs');
            this.bpm = document.getDiv('bpm');
            this.ranked = document.getDiv('ranked');
            this.stars = document.getDiv('stars');
            this.mapKey = document.getDiv('bsr');

            this.comboValue = this.combo.children.item(1) as HTMLSpanElement;
            this.missValue = this.miss.children.item(1) as HTMLSpanElement;
            this.blockSpeedValue = this.blockSpeed.children.item(1) as HTMLSpanElement;
            this.bpmValue = this.bpm.children.item(1) as HTMLSpanElement;
            this.starsValue = this.stars.children.item(0).children.item(1) as HTMLSpanElement;

            this.health = document.getDiv('healthHolder');
            this.accuracy = document.getDiv('accuracyHolder');
            this.time = document.getDiv('timerHolder');
            this.pulsoid = document.getDiv('pulsoidHolder');

            this.timeCircleBar = new CircleBar(this.time);
            this.healthCircleBar = new CircleBar(this.health, (percent: string) => {
                return '<small>Health</small>' + parseFloat(percent).toFixed(0) + '%';
            });
            this.accuracyCircleBar = new CircleBar(this.accuracy, (percent: string) => {
                return '<small>Accuracy</small>' + percent + '%';
            });
            this.accuracyRank = document.getDiv('rank');
            this.pulsoidCircleBar = new CircleBar(this.pulsoid);

            this.healthCircleBar.setProgress(50, 100);
            this.accuracyCircleBar.setProgress(50, 100);
            this.timeCircleBar.setProgress(50, 100);
            this.onTimeElapsedChangeSetText(50, 100);
            this.pulsoidCircleBar.setProgress(50, 100);
            this.pulsoid.display(false);

            this.fullCombo = document.getDiv('fullCombo');

            // song info
            this.previousMapKey = document.getDiv('previousBSR');
            this.mapper = document.getDiv('mapper');
            this.difficulty = document.getDiv('difficulty');
            this.songArtist = document.getDiv('artist');
            this.songName = document.getDiv('mapName');
            this.cover = document.getDiv('beatMapCover');
            this.coverImage = document.getDiv('cover');

            this.difficultyValue = this.difficulty.children.item(0) as HTMLSpanElement;
            this.customDifficultyValue = this.difficulty.children.item(1) as HTMLSpanElement;
            this.previousMapKeyValue = this.previousMapKey.children.item(0) as HTMLDivElement;

            // modifiers
            this.modifierNoFailOn0Energy = document.getDiv('noFailOn0Energy');
            this.modifierOneLife = document.getDiv('oneLife');
            this.modifierFourLives = document.getDiv('fourLives');
            this.modifierNoBombs = document.getDiv('noBombs');
            this.modifierNoWalls = document.getDiv('noWalls');
            this.modifierNoArrows = document.getDiv('noArrows');
            this.modifierGhostNotes = document.getDiv('ghostNotes');
            this.modifierDisappearingArrows = document.getDiv('disappearingArrows');
            this.modifierSmallNotes = document.getDiv('smallNotes');
            this.modifierProMode = document.getDiv('proMode');
            this.modifierStrictAngles = document.getDiv('strictAngles');
            this.modifierZenMode = document.getDiv('zenMode');
            this.modifierSlowerSong = document.getDiv('slowerSong');
            this.modifierFasterSong = document.getDiv('fasterSong');
            this.modifierSuperFastSong = document.getDiv('superFastSong');

            // practice mode
            this.practiceMode = document.getDiv('practice');
            this.practiceModeInfo = document.getDiv('practiceMode');
            this.practiceModeSongSpeed = document.getDiv('practiceModeSongSpeed');
            this.practiceModeTimeOffset = document.getDiv('practiceModeTimeOffset');
        }

        /**
         * changes all background colored elements to the new color
         * @param color
         * @private
         */
        private setBackgroundColor(color: Color): void {
            this.setRootCss('background', color.toCss());
        }

        /**
         * changes all text colored elements to the new color
         * @param color
         * @private
         */
        private setTextColor(color: Color): void {
            this.setRootCss('text', color.toCss());
        }

        private setRootCss(property: string, value: string) {
            this.cssRootVariables.style.setProperty('--' + property, value);
        }

        /**
         * toggles all modifiers if short names should be used or not
         * @param enabled
         * @private
         */
        private handleShortNames(enabled: boolean): void {
            this.modifierNoFailOn0Energy.innerText = enabled ? 'NF' : 'No Fail';
            this.modifierOneLife.innerText = enabled ? '1L' : 'One Life';
            this.modifierFourLives.innerText = enabled ? '4L' : 'Four Lives';
            this.modifierNoBombs.innerText = enabled ? 'NB' : 'No Bombs';
            this.modifierNoWalls.innerText = enabled ? 'NW' : 'No Walls';
            this.modifierNoArrows.innerText = enabled ? 'NA' : 'No Arrows';
            this.modifierGhostNotes.innerText = enabled ? 'GN' : 'Ghost Notes';
            this.modifierDisappearingArrows.innerText = enabled ? 'DA' : 'Disappearing Arrows';
            this.modifierSmallNotes.innerText = enabled ? 'SN' : 'Small Notes';
            this.modifierProMode.innerText = enabled ? 'PM' : 'Pro Mode';
            this.modifierStrictAngles.innerText = enabled ? 'SA' : 'Strict Angles';
            this.modifierZenMode.innerText = enabled ? 'ZM' : 'Zen Mode';
            this.modifierSlowerSong.innerText = enabled ? 'SS' : 'Slower Song';
            this.modifierFasterSong.innerText = enabled ? 'FS' : 'Faster Spmg';
            this.modifierSuperFastSong.innerText = enabled ? 'SFS' : 'Super Fast Song';
            this.practiceModeInfo.innerText = enabled ? 'PM' : 'Practice Mode';
            this.practiceModeSongSpeed.innerText = this.getSongSpeedWithModifierName('100');
            this.practiceModeTimeOffset.innerText = this.getSongTimeOffsetWithModifierName('0');
        }

        /**
         * shows or hides a modifier on the side panel based on a value
         * @param modifier the modifier HTMLDivElement
         * @param display true if visible, false if not
         * @private
         */
        private displayModifier(modifier: HTMLDivElement, display: boolean): void {
            modifier.toggleClassByValue(display, 'active');
            this.addModifierClasses();
        }

        /**
         * adds first and last CSS class to modifiers for styling purposes
         * since :last-child and :first-child pseudo selectors will not work with classes
         * e.g. div.active:first-child will NOT select first element with given class but first div layer
         * this sorter will solve that, but it's way heavier than CSS :<
         * @private
         */
        private addModifierClasses(): void {
            if (this.config.looks.hideAllModifiers.Value) {
                this.practiceMode.flex(false);
                this.modifiers.flex(false);
                return;
            } else {
                this.practiceMode.flex(true);
                this.modifiers.flex(true);
            }

            this.allModifiers.forEach((ar: HTMLDivElement[]) => {

                let firstFound: boolean = false;
                let lastElement: HTMLDivElement;

                ar.forEach((element: HTMLDivElement) => {

                    element.removeClass('last');
                    element.removeClass('first');

                    if (!element.classList.contains('active')) {
                        return;
                    }

                    lastElement = element;

                    if (firstFound) {
                        return;
                    }

                    element.addClass('first');
                    firstFound = true;
                });

                if (lastElement instanceof HTMLDivElement) {
                    lastElement.addClass('last');
                }
            });
        }

        /**
         * modifies all marquees to use animation if necessary
         * @private
         */
        private startAllMarquees(): void {
            this.marquee['difficulty'] = new Marquee(document.getId('marqueeDifficulty'));
            this.marquee['songArtist'] = new Marquee(document.getId('marqueeSongArtist'));
            this.marquee['songName'] = new Marquee(document.getId('marqueeSongName'));
        }

        /**
         * registers a new game connection and registers all events from its supported values
         * @param connection game connection
         * @public
         */
        public registerConnection(connection: BaseConnection): void {
            this.unregisterConnection();

            this.connection = connection;

            let c = this.connection.getCompatibility();

            // counter section
            this.checkCompatibility(c.supportsCombo, this.comboValue, this.connection.onComboChange, (a) => {
                this.onComboChange(a);
            });
            this.checkCompatibility(c.supportsMiss, this.missValue, this.connection.onMissChange, (a) => {
                this.onMissChange(a);
            });
            this.checkCompatibility(c.supportsScore, this.score, this.connection.onScoreChange, (a) => {
                this.onScoreChange(a);
            });
            this.checkCompatibility(c.supportsBlockSpeed, this.blockSpeedValue, this.connection.onBlockSpeedChange, (a) => {
                this.onBlockSpeedChange(a);
            });
            this.checkCompatibility(c.supportsBpm, this.bpmValue, this.connection.onBpmChange, (a) => {
                this.onBpmChange(a);
            });
            this.checkCompatibility(c.supportsHealth, this.health, this.connection.onHealthChange, (a) => {
                this.onHealthChange(a);
            });
            this.checkCompatibility(c.supportsAccuracy, this.accuracy, this.connection.onAccuracyChange, (a) => {
                this.onAccuracyChange(a);
            });
            this.checkCompatibility(c.supportsTime, this.time, this.connection.onTimeElapsedChange, (a) => {
                this.onTimeElapsedChange(a);
            });
            // time length and timescale are not used here
            this.checkCompatibility(c.supportsRank, this.accuracyRank, this.connection.onRankChange, (a) => {
                this.onRankChange(a);
            });
            this.checkCompatibility(c.supportsFullCombo, this.fullCombo, this.connection.onFullComboChange, (a) => {
                this.onFullComboChange(a);
            });
            // modifier
            this.checkCompatibility(c.supportsModifier, this.modifiers, this.connection.onModifierChange, (a) => {
                this.onModifierChange();
            });
            this.checkCompatibility(c.supportsModifierNoFail, this.modifierNoFailOn0Energy, this.connection.onModifierNoFailChange, (a) => {
                this.onModifierNoFailChange(a);
            });
            this.checkCompatibility(c.supportsModifierOneLife, this.modifierOneLife, this.connection.onModifierOneLifeChange, (a) => {
                this.onModifierOneLifeChange(a);
            });
            this.checkCompatibility(c.supportsModifierFourLives, this.modifierFourLives, this.connection.onModifierFourLivesChange, (a) => {
                this.onModifierFourLivesChange(a);
            });
            this.checkCompatibility(c.supportsModifierNoBombs, this.modifierNoBombs, this.connection.onModifierNoBombsChange, (a) => {
                this.onModifierNoBombsChange(a);
            });
            this.checkCompatibility(c.supportsModifierNoWalls, this.modifierNoWalls, this.connection.onModifierNoWallsChange, (a) => {
                this.onModifierNoWallsChange(a);
            });
            this.checkCompatibility(c.supportsModifierNoArrows, this.modifierNoArrows, this.connection.onModifierNoArrowsChange, (a) => {
                this.onModifierNoArrowsChange(a);
            });
            this.checkCompatibility(c.supportsModifierGhostNotes, this.modifierGhostNotes, this.connection.onModifierGhostNotesChange, (a) => {
                this.onModifierGhostNotesChange(a);
            });
            this.checkCompatibility(c.supportsModifierDisappearingArrows, this.modifierDisappearingArrows, this.connection.onModifierDisappearingArrowsChange, (a) => {
                this.onModifierDisappearingArrowsChange(a);
            });
            this.checkCompatibility(c.supportsModifierSmallNotes, this.modifierSmallNotes, this.connection.onModifierSmallNotesChange, (a) => {
                this.onModifierSmallNotesChange(a);
            });
            this.checkCompatibility(c.supportsModifierProMode, this.modifierProMode, this.connection.onModifierProModeChange, (a) => {
                this.onModifierProModeChange(a);
            });
            this.checkCompatibility(c.supportsModifierStrictAngles, this.modifierStrictAngles, this.connection.onModifierStrictAnglesChange, (a) => {
                this.onModifierStrictAnglesChange(a);
            });
            this.checkCompatibility(c.supportsModifierZenMode, this.modifierZenMode, this.connection.onModifierZenModeChange, (a) => {
                this.onModifierZenModeChange(a);
            });
            this.checkCompatibility(c.supportsModifierSlowerSong, this.modifierSlowerSong, this.connection.onModifierSlowerSongChange, (a) => {
                this.onModifierSlowerSongChange(a);
            });
            this.checkCompatibility(c.supportsModifierFasterSong, this.modifierFasterSong, this.connection.onModifierFasterSongChange, (a) => {
                this.onModifierFasterSongChange(a);
            });
            this.checkCompatibility(c.supportsModifierSuperFastSong, this.modifierSuperFastSong, this.connection.onModifierSuperFastSongChange, (a) => {
                this.onModifierSuperFastSongChange(a);
            });
            // practice mode
            this.checkCompatibility(c.supportsPracticeMode, this.practiceModeInfo, this.connection.onPracticeModeChange, (a) => {
                this.onPracticeModeChange(a);
            });
            this.checkCompatibility(c.supportsPracticeModeSpeed, this.practiceModeSongSpeed, this.connection.onPracticeModeSpeedChange, (a) => {
                this.onPracticeModeSpeedChange(a);
            });
            this.checkCompatibility(c.supportsPracticeModeTimeOffset, this.practiceModeTimeOffset, this.connection.onPracticeModeSpeedChange, (a) => {
                this.onPracticeModeTimeOffset(a);
            });
            // song info
            this.checkCompatibility(c.supportsKey, this.mapKey, this.connection.onKeyChange, (a) => {
                this.onKeyChange(a);
            });
            this.checkCompatibility(c.supportsPreviousKey, this.previousMapKey, this.connection.onPreviousKeyChange, (a) => {
                this.onPreviousKeyChange(a);
            });
            this.checkCompatibility(c.supportsSongInfoMapperName, this.mapper, this.connection.onSongInfoMapperNameChange, (a) => {
                this.onSongInfoMapperNameChange(a);
            });
            this.checkCompatibility(c.supportsSongInfoDifficulty, this.difficulty, this.connection.onSongInfoDifficultyChange, (a) => {
                this.onSongInfoDifficultyChange(a);
            });
            this.checkCompatibility(c.supportsSongInfoCustomDifficulty, this.difficulty, this.connection.onSongInfoCustomDifficultyChange, (a) => {
                this.onSongInfoCustomDifficultyChange(a);
            });
            this.checkCompatibility(c.supportsSongInfoSongArtist, this.songArtist, this.connection.onSongInfoSongAuthorChange, (a) => {
                this.onSongInfoSongAuthorChange(a);
            });
            this.checkCompatibility(c.supportsSongInfoSongName, this.songName, this.connection.onSongInfoSongNameChange, (a) => {
                this.onSongInfoSongNameChange(a);
            });
            this.checkCompatibility(c.supportsSongInfoCoverImage, this.coverImage, this.connection.onSongInfoCoverImageChange, (a) => {
                this.onSongInfoCoverImageChange(a);
            });
            // ranked bullshit
            this.checkCompatibility(c.supportsStar, this.stars, this.connection.onStarChange, (a) => {
                this.onStarChange(a);
            });
            this.checkCompatibility(c.supportsPerformancePoints, this.ranked, this.connection.onPerformancePointsChange, (a) => {
                this.onPerformancePointsChange(a);
            });
            // simple check for those because they do not bind to DOM by value
            if (c.supportsLevelChange) {
                this.connection.onLevelChange.register((change: boolean) => {
                    this.onLevelChange(change);
                });
            }
            if (c.supportsLevelPause) {
                this.connection.onLevelPausedChange.register((pause: boolean) => {
                    this.onLevelPausedChange(pause);
                });
            }
            if (c.supportsLevelFinish) {
                this.connection.onLevelFinishedChange.register((finish: boolean) => {
                    this.onLevelFinishedChange(finish);
                });
            }
            if (c.supportsLevelFailed) {
                this.connection.onLevelFailedChange.register((failed: boolean) => {
                    this.onLevelFailedChange(failed);
                });
            }
            if (c.supportsLevelQuit) {
                this.connection.onLevelQuitChange.register((quit: boolean) => {
                    this.onLevelQuitChange(quit);
                });
            }

            if (c.supportsMultiplayer) {
                this.connection.onMultiplayerChange.register((isMultiplayer: boolean) => {
                    this.onMultiplayerChange(isMultiplayer);
                });
            }

            if (c.supportsPreviousScore) {
                this.connection.onPreviousScoreChange.register((a) => {
                    this.onPreviousScoreChange(a);
                });
            }
            if (c.supportsPlayerColorsUsage) {
                this.connection.onPlayerColorAChange.register((newColor: Color) => {
                    this.handleColorChange(this.config.looks.useMapColorForBackgroundColor.Value, newColor);
                });
                this.connection.onPlayerColorBChange.register((newColor: Color) => {
                    this.handleColorChange(this.config.looks.useMapColorForTextColor.Value, newColor);
                });
            }
        }

        /**
         * changes colors of the background or text based on a settings value
         * @param setting
         * @param newColor
         * @private
         */
        private handleColorChange(setting: number, newColor: Color): void {
            switch (setting.clamp(0, 2)) {
                case 0:
                    // reset to config colors
                    this.setBackgroundColor(this.config.colors.background.Value);
                    this.setTextColor(this.config.colors.text.Value);
                    break
                case 1:
                    this.setBackgroundColor(newColor);
                    break;
                case 2:
                    this.setTextColor(newColor);
                    break;
            }
        }

        /**
         * unregisters a connection if any to free resources
         * @private
         */
        private unregisterConnection(): void {
            if (!this.connection) {
                return;
            }

            this.connection.onComboChange.unregister();
            this.connection.onMissChange.unregister();
            this.connection.onScoreChange.unregister();
            this.connection.onPreviousScoreChange.unregister();
            this.connection.onBlockSpeedChange.unregister();
            this.connection.onBpmChange.unregister();
            this.connection.onHealthChange.unregister();
            this.connection.onAccuracyChange.unregister();
            this.connection.onTimeElapsedChange.unregister();
            this.connection.onTimeLengthChange.unregister();
            this.connection.onTimeScaleChange.unregister();
            this.connection.onRankChange.unregister();
            this.connection.onFullComboChange.unregister();

            this.connection.onModifierChange.unregister();
            this.connection.onModifierNoFailChange.unregister();
            this.connection.onModifierOneLifeChange.unregister();
            this.connection.onModifierFourLivesChange.unregister();
            this.connection.onModifierNoBombsChange.unregister();
            this.connection.onModifierNoWallsChange.unregister();
            this.connection.onModifierNoArrowsChange.unregister();
            this.connection.onModifierGhostNotesChange.unregister();
            this.connection.onModifierDisappearingArrowsChange.unregister();
            this.connection.onModifierSmallNotesChange.unregister();
            this.connection.onModifierProModeChange.unregister();
            this.connection.onModifierStrictAnglesChange.unregister();
            this.connection.onModifierZenModeChange.unregister();
            this.connection.onModifierSlowerSongChange.unregister();
            this.connection.onModifierFasterSongChange.unregister();
            this.connection.onModifierSuperFastSongChange.unregister();

            this.connection.onPracticeModeChange.unregister();
            this.connection.onPracticeModeSpeedChange.unregister();
            this.connection.onPracticeModeTimeOffset.unregister();

            this.connection.onKeyChange.unregister();
            this.connection.onPreviousKeyChange.unregister();
            this.connection.onSongInfoMapperNameChange.unregister();
            this.connection.onSongInfoDifficultyChange.unregister();
            this.connection.onSongInfoCustomDifficultyChange.unregister();
            this.connection.onSongInfoSongAuthorChange.unregister();
            this.connection.onSongInfoSongNameChange.unregister();
            this.connection.onSongInfoCoverImageChange.unregister();
            this.connection.onStarChange.unregister();

            this.connection.onLevelChange.unregister();
            this.connection.onLevelPausedChange.unregister();
            this.connection.onLevelFinishedChange.unregister();
            this.connection.onLevelFailedChange.unregister();
            this.connection.onLevelQuitChange.unregister();

            this.connection.onMultiplayerChange.unregister();
            this.connection.onPlayerColorAChange.unregister();
            this.connection.onPlayerColorBChange.unregister();
        }

        /**
         * helper function to check if compatibility bit is set and registers event to property with callback if true
         * @param value compatibility bit
         * @param element element to enable/disable
         * @param event EventProperty<T> to register to
         * @param callback callback for event
         * @private
         */
        private checkCompatibility<T>(value: boolean, element: HTMLDivElement | HTMLSpanElement, event: EventProperty<T>, callback: (T) => void): void {
            /*
            if (element.tagName == 'DIV') {
                element.display(value);
            } else {
                element.inline(value);
            }
            */
            if (value) {
                event.register(callback);
            }
        }

        /**
         * displays new combo
         * @param combo
         * @private
         */
        private onComboChange(combo: number): void {
            this.comboValue.innerText = combo.toString();
        };

        /**
         * displays miss and fail hit counter
         * @param miss
         * @private
         */
        private onMissChange(miss: number): void {
            this.missValue.innerText = miss.toString();
        };

        /**
         * displays score, will check if compare mode is active
         * @param score
         * @private
         */
        private onScoreChange(score: number): void {
            switch (this.config.looks.compareWithPreviousScore.Value) {
                case 0:
                    this.score.innerText = score.toString();
                    break;
                case 1:
                    this.score.innerHTML = (this.valuePreviousScore < score ? '&u' : '&d') + 'arr; ' + score.toString();
                    break;
                case 2:
                    this.score.innerText = (score - this.valuePreviousScore).toString();
                    break;
            }
        }

        /**
         * saves previous score of currently played map for combo display purposes
         * @param previousScore
         * @private
         */
        private onPreviousScoreChange(previousScore: number): void {
            this.valuePreviousScore = previousScore;
        }

        private onBlockSpeedChange(blockSpeed: number): void {
            this.blockSpeedValue.innerText = blockSpeed.toFixed();
        }

        private onBpmChange(bpm: number): void {
            this.bpmValue.innerText = bpm.toFixed();
        }

        private onHealthChange(health: number): void {
            this.healthCircleBar.setProgress(health, 100, 0);
        }

        private onAccuracyChange(accuracy: number): void {
            this.accuracyCircleBar.setProgress(accuracy);
        }

        /**
         * event handler for time circle bar
         * @param value new time in seconds
         * @private
         */
        private onTimeElapsedChange(value: number): void {
            this.timeCircleBar.setProgress(value, this.connection.onTimeLengthChange.Value);
            this.onTimeElapsedChangeSetText(value, this.connection.onTimeLengthChange.Value);
        }

        /**
         * sets the time while checking if circle design should match others
         * @param value
         * @param total
         * @private
         */
        private onTimeElapsedChangeSetText(value: number, total: number): void {
            let text: string;
            if (this.config.looks.timeCircleLikeOtherCircles.Value) {
                text = 'Time<br>' + value.toDateString();
            } else {
                if (total == undefined) {
                    total = 120;
                }
                text = value.toDateString() + '<br>' + total.toDateString();
            }

            this.timeCircleBar.setText(text);
        }

        /**
         * displays rank info
         * @param rank
         * @private
         */
        private onRankChange(rank: string): void {
            this.accuracyRank.innerText = rank;
        }

        private onFullComboChange(hasFullCombo: boolean): void {
            this.fullCombo.display(hasFullCombo);
        }

        private onModifierChange(): void {
            this.addModifierClasses();
        }

        /**
         * displays or hides no fail modifier
         * @param modifier
         * @private
         */
        private onModifierNoFailChange(modifier: boolean): void {
            this.modifierNoFailOn0Energy.toggleClassByValue(modifier, 'active');
            this.addModifierClasses();
        }

        /**
         * displays or hides one life modifier
         * @param modifier
         * @private
         */
        private onModifierOneLifeChange(modifier: boolean): void {
            this.modifierOneLife.toggleClassByValue(modifier, 'active');
            this.addModifierClasses();
        }

        /**
         * displays or hides four lives modifier
         * @param modifier
         * @private
         */
        private onModifierFourLivesChange(modifier: boolean): void {
            this.modifierFourLives.toggleClassByValue(modifier, 'active');
            this.addModifierClasses();
        }

        /**
         * displays or hides no bombs modifier
         * @param modifier
         * @private
         */
        private onModifierNoBombsChange(modifier: boolean): void {
            this.modifierNoBombs.toggleClassByValue(modifier, 'active');
            this.addModifierClasses();
        }

        /**
         * displays or hides no walls modifier
         * @param modifier
         * @private
         */
        private onModifierNoWallsChange(modifier: boolean): void {
            this.modifierNoWalls.toggleClassByValue(modifier, 'active');
            this.addModifierClasses();
        }

        /**
         * displays or hides no arrows modifier
         * @param modifier
         * @private
         */
        private onModifierNoArrowsChange(modifier: boolean): void {
            this.modifierNoArrows.toggleClassByValue(modifier, 'active');
            this.addModifierClasses();
        }

        /**
         * displays or hides ghost notes modifier
         * @param modifier
         * @private
         */
        private onModifierGhostNotesChange(modifier: boolean): void {
            this.modifierGhostNotes.toggleClassByValue(modifier, 'active');
            this.addModifierClasses();
        }

        /**
         * displays or hides disappearing arrows modifier
         * @param modifier
         * @private
         */
        private onModifierDisappearingArrowsChange(modifier: boolean): void {
            this.modifierDisappearingArrows.toggleClassByValue(modifier, 'active');
            this.addModifierClasses();
        }

        /**
         * displays or hides small notes modifier
         * @param modifier
         * @private
         */
        private onModifierSmallNotesChange(modifier: boolean): void {
            this.modifierSmallNotes.toggleClassByValue(modifier, 'active');
            this.addModifierClasses();
        }

        /**
         * displays or hides pro mode modifier
         * @param modifier
         * @private
         */
        private onModifierProModeChange(modifier: boolean): void {
            this.modifierProMode.toggleClassByValue(modifier, 'active');
            this.addModifierClasses();
        }

        /**
         * displays or hides strict angles modifier
         * @param modifier
         * @private
         */
        private onModifierStrictAnglesChange(modifier: boolean): void {
            this.modifierStrictAngles.toggleClassByValue(modifier, 'active');
            this.addModifierClasses();
        }

        /**
         * displays or hides zen mode modifier
         * @param modifier
         * @private
         */
        private onModifierZenModeChange(modifier: boolean): void {
            this.modifierZenMode.toggleClassByValue(modifier, 'active');
            this.addModifierClasses();
        }

        /**
         * displays or hides slower song modifier
         * @param modifier
         * @private
         */
        private onModifierSlowerSongChange(modifier: boolean): void {
            this.modifierSlowerSong.toggleClassByValue(modifier, 'active');
            this.addModifierClasses();
        }

        /**
         * displays or hides faster song modifier
         * @param modifier
         * @private
         */
        private onModifierFasterSongChange(modifier: boolean): void {
            this.modifierFasterSong.toggleClassByValue(modifier, 'active');
            this.addModifierClasses();
        }

        /**
         * displays or hides super-fast song modifier
         * @param modifier
         * @private
         */
        private onModifierSuperFastSongChange(modifier: boolean): void {
            this.modifierSuperFastSong.toggleClassByValue(modifier, 'active');
            this.addModifierClasses();
        }

        /**
         * displays or hides complete practice mode section
         * @param modifier
         * @private
         */
        private onPracticeModeChange(modifier: boolean): void {
            this.practiceMode.flex(modifier);
        }

        /**
         * displays song speed in practice mode section
         * @param speed
         * @private
         */
        private onPracticeModeSpeedChange(speed: number): void {
            let data;
            speed = Math.floor(speed * 100);
            if (this.config.looks.speedDisplayRelative.Value) {
                speed -= 100;
                data = (speed < 0 ? '-' : '+') + speed;
            } else {
                data = speed.toString();
            }
            this.practiceModeSongSpeed.innerText = this.getSongSpeedWithModifierName(data);
            //this.practiceModeSongSpeed.toggleClassByValue(speed > 0, 'active');
            //this.addModifierClasses();
        }

        /**
         * displays song time offset in practice mode section
         * @param modifier
         * @private
         */
        private onPracticeModeTimeOffset(modifier: number): void {
            this.practiceModeTimeOffset.innerText = this.getSongTimeOffsetWithModifierName(modifier.toDateString())
        }

        private onKeyChange(key: string): void {
            if (key.length == 0) {
                this.mapKey.visibility(false);
                this.cover.addClass('noKey');
                return;
            }
            this.cover.removeClass('noKey');
            this.mapKey.visibility(true);
            this.mapKey.innerText = key;
        }

        private onPreviousKeyChange(previousKey: string): void {
            this.previousMapKeyValue.innerText = previousKey;
        }

        private onSongInfoMapperNameChange(mapperName: string): void {
            this.mapper.innerText = mapperName;
        }

        private onSongInfoDifficultyChange(difficulty: string): void {
            this.valueDifficulty = difficulty;
            if (this.valueCustomDifficulty == undefined) {
                this.valueCustomDifficulty = "";
            }
            this.setCompleteDifficultyLabel();
        }

        private onSongInfoCustomDifficultyChange(difficulty: string): void {
            this.valueCustomDifficulty = difficulty;
            if (this.valueDifficulty == undefined) {
                this.valueDifficulty = "";
            }
            this.setCompleteDifficultyLabel();
        }

        private setCompleteDifficultyLabel(): void {
            let text;
            if (this.config.looks.hideDefaultDifficultyOnCustomDifficulty) {
                text = this.valueCustomDifficulty.length > 0 ? this.valueCustomDifficulty : this.valueDifficulty;
            } else {
                if (this.valueCustomDifficulty === '' || this.valueCustomDifficulty === this.valueDifficulty) {
                    text = this.valueDifficulty;
                } else {
                    text = this.valueCustomDifficulty + ' - ' + this.valueDifficulty;
                }
            }
            this.marquee['difficulty'].setValue(text);
        }

        private onSongInfoSongAuthorChange(songAuthor: string): void {
            this.marquee['songArtist'].setValue(songAuthor);
        }

        private onSongInfoSongNameChange(songName: string): void {
            this.marquee['songName'].setValue(songName);
        }

        private onSongInfoCoverImageChange(coverImage: string): void {
            let i = new Image();
            i.onload = () => {
                if (i.complete) {
                    this.coverImage.style.backgroundImage = 'url(' + i.src + ')';
                }
            };
            i.onerror = () => {
                this.coverImage.style.backgroundImage = 'url(img/BS_logo.jpg)';
            };
            i.src = coverImage;
        }

        private onStarChange(stars: number): void {
            if (!this.config.looks.showRanked.Value) {
                return;
            }

            if (stars > 0) {
                this.stars.display(true);
                this.starsValue.innerText = stars.toFixed(1);
            } else {
                this.stars.display(false);
            }
        }

        private onPerformancePointsChange(x: number): void {
            this.ranked.display(x > 0);
        }

        private onLevelChange(changed: boolean): void {
            this.showElements.Value = changed;
        }

        private onLevelPausedChange(changed: boolean): void {
        }

        private onLevelFinishedChange(changed: boolean): void {
            this.valuePreviousScore = 0;
        }

        private onLevelFailedChange(changed: boolean): void {
            this.valuePreviousScore = 0;
        }

        private onLevelQuitChange(changed: boolean): void {
            this.valuePreviousScore = 0;
        }

        private onMultiplayerChange(isMultiplayer: boolean): void {
        }

        private onPlayerColorAChange(color: string): void {
        }

        private onPlayerColorBChange(color: string): void {
        }

        /**
         * returns readable song speed for practice mode, it checks for short modifier namee flag
         * @param speed
         * @private
         */
        private getSongSpeedWithModifierName(speed: string): string {
            return (this.config.looks.shortModifierNames.Value ? speed : 'Speed: ' + speed) + '%';
        }

        /**
         * returns readable offset time for practice mode, it checks for short modifier namee flag
         * @param offset
         * @private
         */
        private getSongTimeOffsetWithModifierName(offset: string): string {
            return (this.config.looks.shortModifierNames.Value ? offset : 'Start: ' + offset) + 's';
        }
    }
}