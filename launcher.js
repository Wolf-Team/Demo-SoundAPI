const MOD_ID = "demosoundapi";
ConfigureMultiplayer({
	name: MOD_ID,
	isClientOnly: false,
	version: "1.0.0"
});

ModAPI.addAPICallback("SoundAPI", function (SoundAPI) {
	Launch({ SoundAPI: new SoundAPI(MOD_ID) });
});
