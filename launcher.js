ConfigureMultiplayer({
	name: "demosoundapi",
	isClientOnly: false,
	version: "1.0.0"
});

ModAPI.addAPICallback("SoundAPI", function (api) {
	Launch({ SoundAPI: api });
});
