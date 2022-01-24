ModAPI.addAPICallback("SoundAPI", function (api) {
	ConfigureMultiplayer({
		isClientOnly: false,
		version: "3.0"
	});

	Launch({ SoundAPI: api });
});
