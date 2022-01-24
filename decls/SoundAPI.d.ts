declare type Range = {
    min: number;
    max: number;
};
interface Dict<value> {
    [key: string]: value;
}
interface SoundAdditiveOptions {
    /**
     * Sound hearing distance.
     * @default 16
     */
    defaultDistance: number;
    /**
    * Default sound volume
    * @default 1
    */
    defaultVolume: number;
    /**
     * Clamp sound volume,
     * @default (0,1)
     */
    clampVolume: Range;
    /**
     * Set default mode looping
     * @default false
     */
    loop: boolean;
    /**
     * Type sound. Used for setting volume from game settings.
     * @default "main"
     */
    type: SoundAPI.Type;
}
interface SoundOptions extends Partial<SoundAdditiveOptions> {
    /**
     * Path to file
     */
    source: string;
}
interface SoundMeta extends SoundOptions {
    typePlayer: "pool" | "player";
}
interface MediaMeta extends SoundMeta {
    typePlayer: "player";
    file: string;
}
interface PoolMeta extends SoundMeta {
    typePlayer: "pool";
    soundId: number;
}
declare function isPoolMeta(meta: Meta): meta is PoolMeta;
declare type Meta = PoolMeta | MediaMeta;
declare namespace SoundAPI {
    enum Type {
        MAIN = "main",
        SOUND = "sound",
        MUSIC = "music",
        AMBIENT = "ambient",
        BLOCK = "block",
        HOSTILE = "hostile",
        NEUTRAL = "neutral",
        RECORD = "record",
        PLAYER = "player",
        WEATHER = "weather"
    }
    /**
     * Register sound in system
     * @param {string} uid - Unical ID for sound
     * @param {SoundOptions} options - Options sound
     */
    function registerSound(uid: string, options: SoundOptions): void;
    function select(uid: string): SoundAPIPlayer;
}
interface SoundAPI {
    registerSound(uid: string, options: SoundOptions): void;
    select(uid: string): SoundAPIPlayer;
}
declare namespace ModAPI {
    function addAPICallback(apiName: "SoundAPI", callback: (api: SoundAPI) => void): void;
}
interface Position extends Vector {
    dimension: number;
}
declare type Target = number | Position;
declare const MIN_RADIUS = 2;
declare abstract class SoundAPIPlayer {
    protected readonly options: Meta;
    private static players;
    static tick(): void;
    protected target: Target;
    protected _distance: number;
    protected _volume: number;
    protected _loop: boolean;
    get looped(): boolean;
    private prepared;
    private paused;
    constructor(options: Meta);
    /**
     * Set source at entity
     * @param {number} entity - UID entity
     * @returns {this} this player
     */
    at(entity: number): this;
    /**
     * Set source at coordinates in dimension
     * @param {Position} position - Coordinates with dimension
     * @returns {this} this player
     */
    at(position: Position): this;
    /**
     * Set source at entity or coordinates indimension
     * @param {Target} target - UID entity or Coordinates with dimension
     * @returns {this} this player
     */
    at(target: Target): this;
    /**
     * Set sound distance
     * @param {number} dist - sound distance
     * @returns {this} this player
     */
    distance(dist: number): this;
    /**
     * Set volume for player
     * @param {number} volume - volume >= 0 and <= 1
     * @returns {this} this player
     */
    volume(volume: number): this;
    /**
     * Set looping
     * @param {boolean} looping - if true, enables playback looping, otherwise disables.
     * @returns {this} this player
     */
    loop(looping?: boolean): this;
    protected _prepare(): void;
    /**
     * Prepare player.
     */
    prepare(): this;
    protected abstract _play(): void;
    protected abstract _resume(): void;
    protected abstract _pause(): void;
    protected abstract _stop(): void;
    /**
     * Start or resume playing sound.
     */
    play(): void;
    /**
     * Pause playing sound.
     */
    pause(): void;
    /**
     * Stop playing sound.
     */
    stop(): void;
    protected calcVolume(): number[];
    protected abstract _tick(leftVolume: number, rightVolume: number): any;
    private tick;
}
declare class MediaPlayer extends SoundAPIPlayer {
    protected options: MediaMeta;
    protected media: android.media.MediaPlayer;
    protected _prepare(): void;
    protected _play(): void;
    protected _resume(): void;
    protected _pause(): void;
    protected _stop(): void;
    protected _tick(leftVolume: number, rightVolume: number): void;
}
declare class SoundPlayer extends SoundAPIPlayer {
    private static SoundPool;
    private static initFunctions;
    private static getMaxStreams;
    static init(): void;
    static load(file: string): number;
    protected streamId: number;
    protected get SoundPool(): globalAndroid.media.SoundPool;
    protected options: PoolMeta;
    protected _play(): void;
    protected _resume(): void;
    protected _pause(): void;
    protected _stop(): void;
    protected _tick(leftVolume: number, rightVolume: number): void;
}
declare class InvalidOptions extends Error {
    readonly uid: string;
    constructor(uid: string, message: string);
}
declare class SourceError extends Error {
    readonly uid: string;
    constructor(uid: string);
}
declare function buildAudioAttributes(): android.media.AudioAttributes | false;
declare const File: typeof java.io.File;
interface ObjectConstructor {
    values<A>(a: A): A[keyof A][];
}
declare namespace Vector {
    function getDistance(A: Vector, B: Vector): number;
}
