/// <reference path="headers.ts" />
const SoundInMainUId = "main";
SoundPool.registerSound(SoundInMainUId, {
	source: FOLDER_SOUNDS + "/main.mp3",
	type: SoundAPI.Type.MUSIC,
	sync: false
});

const MainPlayer = SoundPool.select(SoundInMainUId);

Callback.addCallback("PostLoaded", () => {
	MainPlayer.play();
});
Callback.addCallback("LevelLeft", () => {
	MainPlayer.play();
});

Callback.addCallback("LevelLoaded", () => {
	MainPlayer.stop();
});
