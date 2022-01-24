/// <reference path="headers.ts" />
const SoundInMainUId = "testsoundapi.main";
SoundAPI.registerSound(SoundInMainUId, {
	source: FOLDER_SOUNDS + "/main.mp3"
});

const MainPlayer = SoundAPI.select(SoundInMainUId);

Callback.addCallback("PostLoaded", () => {
	MainPlayer.play();
});

Callback.addCallback("NativeGuiChanged", (screen: string, prev: string) => {
	if (screen == "in_game_play_screen") {
		MainPlayer.stop();
	} else if (screen.indexOf("play_screen") != -1 && prev.indexOf("play_screen") == -1 && prev != "start_screen") {
		MainPlayer.play();
	}
})
