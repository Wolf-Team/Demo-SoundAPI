const MOD_ID = "demosoundapi";
ConfigureMultiplayer({
	name: MOD_ID,
	isClientOnly: false,
	version: "1.0.0"
});

IMPORT("CheckDeps");

new CheckDeps()
	.add("SoundAPI", function (SoundAPI) {
		return SoundAPI.init(MOD_ID)
	})
	.launch(function (scope) {
		Launch(scope)
	});
