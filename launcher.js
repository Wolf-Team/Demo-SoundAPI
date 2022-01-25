const MOD_ID = "demosoundapi";
ConfigureMultiplayer({
	name: MOD_ID,
	isClientOnly: false,
	version: "1.0.0"
});

IMPORT("CheckDeps");

new CheckDeps()
	.add("SoundAPI", function (SoundAPI) {
		return new SoundAPI(MOD_ID)
	})
	.launch(scope => Launch(scope));
